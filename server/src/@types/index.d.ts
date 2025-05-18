import { RoleType } from "../enums/role.enum";

declare global {
  namespace Express {
    interface User {
      userId: string;
      role: RoleType;
    }
  }
}
