import { UserRoleEnum } from "../../enums/role.enum"; // if you have enums, otherwise hardcode string

declare global {
  namespace Express {
    interface User {
      userId: string;
      role: UserRoleEnum; // or role: UserRoleEnum if you want stronger typing
    }
  }
}
