import React, { useEffect, useMemo, useState } from "react";
import DebouncingInput from "@/components/DebouncingInput.tsx";
import { EUserType } from "@/interfaces";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { useLazyGetPermissionsQuery, useUpdatePermissionMutation } from "@/store/permission/api.ts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { defaultGetPermissionResponse, IPermission } from "@/interfaces/permission.ts";
import { IRole } from "@/interfaces/role.ts";
import { ReloadIcon } from "@radix-ui/react-icons";

const Index: React.FC = () => {
  const [getPermissions, { data = defaultGetPermissionResponse }] = useLazyGetPermissionsQuery();
  const [updatePermission] = useUpdatePermissionMutation();
  const [search, setSearch] = useState<string>('');
  const [listType, setListType] = useState<EUserType>(EUserType.ADMIN);
  const [assignedPermission, setAssignedPermission] = useState<string[]>([]);
  const [updatingPermission, setUpdatingPermission] = useState<string[]>([]);

  // Fetch permissions when `listType` changes
  useEffect(() => {
    getPermissions(`?type=${listType}`);
  }, [listType, getPermissions]);

  // Update assigned permissions whenever new data is fetched
  useEffect(() => {
    setAssignedPermission(data.roleHasPermissions.length > 0
      ? data.roleHasPermissions.map(r => `${r.roleId}-${r.permissionId}`)
      : []
    );
  }, [data.roleHasPermissions]);

  // Filter permissions based on search input
  const filteredPermissions = useMemo(() => {
    const searchLower = search.toLowerCase(); // Convert search input to lowercase for case-insensitive search
    return data.permissions.filter(p => !p.parentId && p.name.toLowerCase().includes(searchLower));
  }, [data.permissions, search]);

  // Memoized map of parent-child permissions for easy lookup
  const parentPermissions = useMemo(() => {
    return filteredPermissions.reduce((acc, parent) => {
      acc[parent.id] = data.permissions
        .filter(child => child.parentId === parent.id)
        .map(child => child.id);
      return acc;
    }, {} as Record<string, string[]>);
  }, [filteredPermissions, data.permissions]);

  // Handle updating the permission state
  const handleChangeChecked = async (value: boolean, role: IRole, permission: IPermission) => {
    const loadingString = `${role.id}-${permission.id}`;
    setUpdatingPermission(prev => [...prev, loadingString]);

    try {
      await updatePermission({ value: value ? 1 : 0, role, permission });
    } finally {
      setUpdatingPermission(prev => prev.filter(p => p !== loadingString));
    }
  };

  // Helper function to render the role cells for each permission
  const renderRoleCells = (permission: IPermission) => {
    const permissionIds = permission.parentId
      ? [permission.id]
      : parentPermissions[permission.id] || [];

    return data.roles.map(role => {
      const id = `${role.id}-${permission.id}`;
      const isUpdating = updatingPermission.includes(id);
      const isChecked = permissionIds.every(pid => assignedPermission.includes(`${role.id}-${pid}`));

      return (
        <TableCell key={role.id} className="capitalize flex justify-center">
          {isUpdating
            ? <ReloadIcon className="h-5 w-4 animate-spin text-primary" />
            : <Checkbox
              id={id}
              checked={isChecked}
              onCheckedChange={(value) => handleChangeChecked(value as boolean, role, permission)}
            />}
        </TableCell>
      );
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <DebouncingInput
            placeholder="Search permissions..."
            value={search}
            onChange={(value) => setSearch(value)}
            className="h-8 w-[150px] lg:w-[250px] bg-white"
          />
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
          <TableBody>
            {filteredPermissions.map(permission => (
              <React.Fragment key={permission.id}>
                <TableRow>
                  <TableCell className="font-medium capitalize">{permission.name}</TableCell>
                  {renderRoleCells(permission)}
                </TableRow>

                {data.permissions
                  .filter(child => child.parentId === permission.id)
                  .map(childPermission => (
                    <TableRow key={childPermission.id}>
                      <TableCell className="capitalize pl-8">
                        {childPermission.name.replace(`${permission.name}-`, '')}
                      </TableCell>
                      {renderRoleCells(childPermission)}
                    </TableRow>
                  ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Index;
