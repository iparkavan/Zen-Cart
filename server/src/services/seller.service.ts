import UserModel from "../models/user.model";
import { Roles } from "../enums/role.enum";
import { NotFoundException, UnauthorizedException } from "../utils/app-error";

export const validateSellerById = async (sellerId: string) => {
  const seller = await UserModel.findById(sellerId).populate("role");

  if (!seller) {
    throw new NotFoundException("Seller not found");
  }

  if (seller.role.name !== Roles.SELLER) {
    throw new UnauthorizedException("Provided id does not belong to a seller.");
  }

  console.log("seller.role.name", seller.role.name);

  return seller;
};
