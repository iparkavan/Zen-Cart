import { RoleType, PermissionType } from "../enums/role.enum";

export const RolePermissions: Record<RoleType, Array<PermissionType>> = {
  CUSTOMER: ["VIEW_PRODUCTS", "CREATE_ORDER", "VIEW_ORDERS", "CREATE_REVIEW"],

  SELLER: [
    "CREATE_PRODUCT",
    "EDIT_PRODUCT",
    "DELETE_PRODUCT",
    "VIEW_PRODUCTS",
    "VIEW_ORDERS",
    "MANAGE_ORDERS",
  ],

  ADMIN: [
    "CREATE_PRODUCT",
    "EDIT_PRODUCT",
    "DELETE_PRODUCT",
    "VIEW_PRODUCTS",
    "CREATE_ORDER",
    "VIEW_ORDERS",
    "MANAGE_ORDERS",
    "VIEW_USERS",
    "MANAGE_USERS",
    "DELETE_REVIEW",
    "ACCESS_ADMIN_PANEL",
  ],
};
