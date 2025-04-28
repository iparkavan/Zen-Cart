import mongoose from "mongoose";
import UserModel from "../models/user.model";
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from "../utils/app-error";
import { ProviderEnum } from "../enums/account-provider.enum";
import { Roles } from "../enums/role.enum";
import AccountModel from "../models/account.model";
import RoleModel from "../models/roles-permissions.model";
import { generateToken } from "../utils/jwt";

export const verifyEmailService = async (body: { email: string }) => {
  const { email } = body;

  try {
    const user = await UserModel.findOne({ email });
    return { exist: Boolean(user), userEmail: user?.email };
  } catch (error) {
    throw error;
  }
};

export const verifyUserService = async ({
  email,
  password,
  provider = ProviderEnum.EMAIL,
}: {
  email: string;
  password: string;
  provider?: string;
}) => {
  const account = await AccountModel.findOne({ provider, providerId: email });

  if (!account) {
    throw new NotFoundException("Invalid email or password");
  }

  const user = await UserModel.findById(account.userId).populate("role");

  if (!user) {
    throw new NotFoundException("User not found for the given account Id");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new UnauthorizedException("Invalid email or password");
  }

  return user.omitPassword();
};

export const registerAsCustomerService = async (body: {
  name: string;
  email: string;
  password: string;
}) => {
  const { name, email, password } = body;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const existingUser = await UserModel.findOne({ email }).session(session);

    if (existingUser) {
      throw new BadRequestException("Email already exist");
    }

    const userRole = await RoleModel.findOne({ name: Roles.CUSTOMER }).session(
      session
    );

    if (!userRole) {
      throw new NotFoundException(`Owner role not found`);
    }

    const user = new UserModel({
      name,
      email,
      password,
      role: userRole._id,
    });

    await user.save({ session });

    const account = new AccountModel({
      userId: user._id,
      provider: ProviderEnum.EMAIL,
      providerId: email,
    });

    await account.save({ session });

    await session.commitTransaction();
    session.endSession();
    console.log(`End Session...`);

    const populatedRoleUser = await UserModel.findById(user._id).populate(
      "role"
    );

    if (!populatedRoleUser) {
      throw new NotFoundException("User not found after creation");
    }

    const token = generateToken({
      userId: user._id as string,
      role: populatedRoleUser?.role.name,
    });

    return {
      user: populatedRoleUser.omitPassword(),
      access_token: token,
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const registerAsSellerService = async (body: {
  name: string;
  email: string;
  password: string;
}) => {
  const { name, email, password } = body;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const existingUser = await UserModel.findOne({ email }).session(session);

    if (existingUser) {
      throw new BadRequestException("Email already exist");
    }

    const userRole = await RoleModel.findOne({ name: Roles.SELLER }).session(
      session
    );

    if (!userRole) {
      throw new NotFoundException(`Owner role not found`);
    }

    const user = new UserModel({
      name,
      email,
      password,
      role: userRole._id,
    });

    await user.save({ session });

    const account = new AccountModel({
      userId: user._id,
      provider: ProviderEnum.EMAIL,
      providerId: email,
    });

    await account.save({ session });

    await session.commitTransaction();
    session.endSession();
    console.log(`End Session...`);

    const populatedRoleUser = await UserModel.findById(user._id).populate(
      "role"
    );

    if (!populatedRoleUser) {
      throw new NotFoundException("User not found after creation");
    }

    const token = generateToken({
      userId: user._id as string,
      role: populatedRoleUser?.role.name,
    });

    return {
      user: populatedRoleUser.omitPassword(),
      access_token: token,
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const loginOrCreateAccountService = async (data: {
  provider: string;
  displayName: string;
  providerId: string;
  picture?: string;
  email?: string;
}) => {
  const { provider, providerId, displayName, picture, email } = data;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const existingAccount = await AccountModel.findOne({
      provider,
      providerId,
    })
      .populate({
        path: "userId",
        populate: { path: "role" },
      })
      .session(session);

    if (existingAccount && existingAccount._id) {
      const user = existingAccount.userId as any;

      const token = generateToken({
        userId: user._id as unknown as string,
        role: (user.role as any)?.name,
      });

      return {
        user: user.omitPassword(),
        access_token: token,
      };
    }

    if (email) {
      const emailTaken = await UserModel.findOne({ email }).session(session);
      if (emailTaken) {
        throw new BadRequestException(
          "Email already exist with another account"
        );
      }
    }

    const userRole = await RoleModel.findOne({ name: Roles.CUSTOMER }).session(
      session
    );

    if (!userRole) {
      throw new NotFoundException(`Owner role not found`);
    }

    const user = new UserModel({
      name: displayName,
      email,
      role: userRole._id,
      profilePicture: picture || null,
    });

    await user.save({ session });

    const account = new AccountModel({
      userId: user._id,
      provider,
      providerId,
    });

    await account.save({ session });

    await session.commitTransaction();
    session.endSession();
    console.log(`End Session...`);

    const populatedRoleUser = await UserModel.findById(user._id).populate(
      "role"
    );

    if (!populatedRoleUser) {
      throw new NotFoundException("User not found after creation");
    }

    // const token = generateToken({
    //   userId: user._id as string,
    //   role: populatedRoleUser?.role.name,
    // });

    return {
      user: populatedRoleUser.omitPassword(),
      // access_token: token,
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
