import React, { useEffect, useMemo, useState } from "react";
import DebouncingInput from "@/components/DebouncingInput.tsx";
import { EUserType } from "@/interfaces";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { useLazyGetPermissionsQuery } from "@/store/permission/api.ts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { defaultGetPermissionResponse } from "@/interfaces/permission.ts";

const Index: React.FC = () => {
  const [getPermissions, { data = defaultGetPermissionResponse, isFetching }] = useLazyGetPermissionsQuery();
  const [search, setSearch] = useState<string>('');
  const [listType, setListType] = useState<EUserType>(EUserType.ADMIN);
  const [assignedPermission, setAssignedPermission] = useState<string[]>([]);

  // Fetch permissions on listType change
  useEffect(() => {
    getPermissions(`?type=${listType}`);
  }, [listType, getPermissions]);

  useEffect(() => {
    if (data.roleHasPermissions.length > 0) {
      setAssignedPermission(data.roleHasPermissions.map(r => `${r.roleId}-${r.permissionId}`));
    } else {
      setAssignedPermission([])
    }
  }, [data.roleHasPermissions]);

  // Memoized filtered data
  const filteredPermissions = useMemo(
    () => data.permissions.filter(p => !p.parentId),
    [data.permissions]
  );

  // Helper function to render role cells
  const renderRoleCells = (permissionId: string) => {
    return data.roles.map((role) => (
      <TableCell key={role.id} className="capitalize text-center">
        <Checkbox id={`${role.id}-${permissionId}`} checked={assignedPermission.includes(`${role.id}-${permissionId}`)} />
      </TableCell>
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <DebouncingInput
            placeholder="Search..."
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
            {filteredPermissions.map((permission) => (
              <React.Fragment key={permission.id}>
                <TableRow>
                  <TableCell className="font-medium capitalize">{permission.name}</TableCell>
                  {renderRoleCells(permission.id)}
                </TableRow>

                {data.permissions
                  .filter((p) => p.parentId === permission.id)
                  .map((childPermission) => (
                    <TableRow key={childPermission.id}>
                      <TableCell className="capitalize pl-8">{childPermission.name.replace(`${permission.name}-`, '')}</TableCell>
                      {renderRoleCells(childPermission.id)}
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
