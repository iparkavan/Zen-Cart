import { Request, Response, NextFunction } from "express";
import { PermissionType } from "../enums/role.enum";
import { UnauthorizedException } from "../utils/app-error"; // adjust import path
import { hasPermission } from "../utils/has-permission";

export const checkPermission = (requiredPermissions: PermissionType[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    console.log(user);

    if (!user || !user.role) {
      throw new UnauthorizedException("Forbidden. No user role found.");
    }

    if (!hasPermission(user.role, requiredPermissions)) {
      throw new UnauthorizedException(
        "Forbidden. You do not have the required permission."
      );
    }

    next();
  };
};
