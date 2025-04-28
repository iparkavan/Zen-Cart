// import { PermissionType, RoleType } from "../enums/role.enum";
// import { UnauthorizedException } from "./app-error";
// import { RolePermissions } from "./roles-permissions";

// export const hasPermission = (
//   role: RoleType,
//   requiredPermissions: PermissionType[]
// ) => {
//   const permissions = RolePermissions[role];

//   const roleGarud = requiredPermissions.some((permission) =>
//     permissions.includes(permission)
//   );

//   if (!roleGarud) {
//     throw new UnauthorizedException(
//       "You do not have the necessary permission to perform this action"
//     );
//   }
// };

import { RoleType, PermissionType } from "../enums/role.enum";
import { RolePermissions } from "./roles-permissions";

export const hasPermission = (
  role: RoleType,
  permissions: PermissionType[]
): boolean => {
  const rolePermissions = RolePermissions[role];
  return rolePermissions
    ? permissions.some((permission) => rolePermissions.includes(permission))
    : false;
};
