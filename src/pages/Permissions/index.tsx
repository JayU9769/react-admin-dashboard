import React, { useEffect, useMemo, useState } from "react";
import DebouncingInput from "@/components/DebouncingInput.tsx";
import { EAPITags, EUserType } from "@/interfaces";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { permissionApi, useGetPermissionsQuery, useUpdatePermissionMutation } from "@/store/permission/api.ts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { defaultGetPermissionResponse, IPermission } from "@/interfaces/permission.ts";
import { IRole } from "@/interfaces/role.ts";
import { ReloadIcon } from "@radix-ui/react-icons";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";

const Index: React.FC = () => {

  ///////////////////////// Redux States and Actions... /////////////////////////
  const dispatch = useDispatch<AppDispatch>();
  const [updatePermission] = useUpdatePermissionMutation();
  const [search, setSearch] = useState<string>("");
  const [listType, setListType] = useState<EUserType>(EUserType.ADMIN);
  const [assignedPermission, setAssignedPermission] = useState<string[]>([]);
  const [updatingPermission, setUpdatingPermission] = useState<string[]>([]);

  // Use useGetPermissionsQuery with listType as a dependency
  const { data = defaultGetPermissionResponse } = useGetPermissionsQuery(`?type=${listType}`);

  // Update assigned permissions whenever new data is fetched
  useEffect(() => {
    setAssignedPermission(data.roleHasPermissions.length > 0 ? data.roleHasPermissions.map((r) => `${r.roleId}-${r.permissionId}`) : []);
  }, [data.roleHasPermissions]);

  // Filter permissions based on search input
  const filteredPermissions = useMemo(() => {
    return data.permissions.filter((p) => !p.parentId);
  }, [data.permissions]);

  // Memoized map of parent-child permissions for easy lookup
  const parentPermissions = useMemo(() => {
    return filteredPermissions.reduce((acc, parent) => {
      acc[parent.id] = data.permissions.filter((child) => child.parentId === parent.id).map((child) => child.id);
      return acc;
    }, {} as Record<string, string[]>);
  }, [filteredPermissions, data.permissions]);

  // Handle updating the permission state
  const handleChangeChecked = async (value: boolean, role: IRole, permission: IPermission) => {
    if (role.isSystem) return
    const loadingString = `${role.id}-${permission.id}`;
    setUpdatingPermission((prev) => [...prev, loadingString]);

    try {
      await updatePermission({ value: value ? 1 : 0, role, permission });
    } finally {
      setUpdatingPermission((prev) => prev.filter((p) => p !== loadingString));
    }
  };

  const handleRefresh = () => dispatch(permissionApi.util.invalidateTags([{ type: EAPITags.PERMISSION, id: `?type=${listType}` }]));

  // Helper function to render the role cells for each permission
  const renderRoleCells = (permission: IPermission) => {
    const permissionIds = permission.parentId ? [permission.id] : parentPermissions[permission.id] || [];

    return data.roles.map((role) => {
      const id = `${role.id}-${permission.id}`;
      const isUpdating = updatingPermission.includes(id);
      const isChecked = permissionIds.every((pid) => assignedPermission.includes(`${role.id}-${pid}`));

      return (
        <TableCell key={role.id} className="capitalize text-center flex justify-center">
          {isUpdating ? <ReloadIcon className="h-5 w-4 animate-spin text-primary" /> : <Checkbox id={id} checked={isChecked} disabled={!!role.isSystem} onCheckedChange={(value) => handleChangeChecked(value as boolean, role, permission)} />}
        </TableCell>
      );
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <DebouncingInput placeholder="Search permissions..." value={search} onChange={(value) => setSearch(value)} className="h-8 w-[150px] lg:w-[250px] bg-white" />
          <Button variant={"outline"} size={"sm"} onClick={handleRefresh}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Reload
          </Button>
        </div>
        <div>
          <Tabs defaultValue={EUserType.ADMIN} onValueChange={(value) => setListType(value as EUserType)}>
            <TabsList>
              <TabsTrigger value={EUserType.ADMIN} className="capitalize">
                {EUserType.ADMIN}
              </TabsTrigger>
              <TabsTrigger value={EUserType.USER} className="capitalize">
                {EUserType.USER}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Name</TableHead>
              {data.roles.map((role) => (
                <TableHead key={role.id} className="capitalize text-center">
                  {role.name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          {filteredPermissions.length > 0 ? (
            <TableBody>
              {filteredPermissions.map((permission) => (
                <React.Fragment key={permission.id}>
                  <TableRow className={`bg-gray-100 hover:bg-gray-100`}>
                    <TableCell className="font-medium capitalize">{permission.name}</TableCell>
                    {renderRoleCells(permission)}
                  </TableRow>

                  {data.permissions
                    .filter((child) => child.parentId === permission.id && child.name.toLowerCase().includes(search.toLowerCase()))
                    .map((childPermission) => (
                      <TableRow key={childPermission.id}>
                        <TableCell className="capitalize pl-8">{childPermission.name.replace(`${permission.name}-`, "")}</TableCell>
                        {renderRoleCells(childPermission)}
                      </TableRow>
                    ))}
                </React.Fragment>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={data.roles.length + 1} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  );
};

export default Index;
