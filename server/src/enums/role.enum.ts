export const Roles = {
  CUSTOMER: "CUSTOMER",
  SELLER: "SELLER",
  ADMIN: "ADMIN",
} as const;

export type RoleType = keyof typeof Roles;

export const Permissions = {
  // 🛒 Product Management
  CREATE_PRODUCT: "CREATE_PRODUCT",
  EDIT_PRODUCT: "EDIT_PRODUCT",
  DELETE_PRODUCT: "DELETE_PRODUCT",
  VIEW_PRODUCTS: "VIEW_PRODUCTS",

  // 📦 Order Management
  CREATE_ORDER: "CREATE_ORDER",
  VIEW_ORDERS: "VIEW_ORDERS",
  MANAGE_ORDERS: "MANAGE_ORDERS", // approve/cancel/refund etc.

  // 👤 User Management
  VIEW_USERS: "VIEW_USERS",
  MANAGE_USERS: "MANAGE_USERS",

  // 🧾 Review & Rating
  CREATE_REVIEW: "CREATE_REVIEW",
  DELETE_REVIEW: "DELETE_REVIEW",

  // 🛠️ Admin/System
  ACCESS_ADMIN_PANEL: "ACCESS_ADMIN_PANEL",

  // 👁️ View Only (minimal read access)
  VIEW_ONLY: "VIEW_ONLY",
} as const;

export type PermissionType = keyof typeof Permissions;
