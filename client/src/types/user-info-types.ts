// Role interface
export interface Role {
  _id: string;
  name: "CUSTOMER" | "SELLER" | "ADMIN" | string; // can extend roles
  permissions: string[]; // e.g., "VIEW_PRODUCTS", "CREATE_ORDER"
}

// User interface
export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  profilePicture: string | null;
  role: Role;
  address: string[];
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
