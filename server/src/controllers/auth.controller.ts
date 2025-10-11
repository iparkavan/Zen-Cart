import passport from "passport";
import { ExpressHandler } from "../@types/express.types";
import { HTTPSTATUS } from "../config/http.config";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import {
  isEmailExistService,
  registerAsCustomerService,
  registerAsSellerService,
} from "../services/auth.service";
import {
  customerAdditionalInfoSchema,
  registerAsCustomerSchema,
  registerAsSellerSchema,
  verifyEmailSchema,
} from "../validations/auth.validations.schema";
import UserModel from "../models/user.model";
import { generateToken } from "../utils/jwt";
import { RoleType } from "../enums/role.enum";

export const googleLoginCallback = asyncHandler(async (req, res, next) => {
  // After successful authentication, we receive the user and token
  const user = req.user;

  if (!user) {
    return res
      .status(HTTPSTATUS.BAD_REQUEST)
      .json({ message: "User not found after Google login" });
  }

  const token = generateToken({
    userId: (user as any)?._id as string,
    role: user?.role as RoleType,
  });

  res.json({
    message: "Authentication successful",
    user,
    access_token: token,
  });
});

export const loginController: ExpressHandler = asyncHandler(
  async (req, res, next) => {
    passport.authenticate(
      "local",
      { session: false },
      (
        err: Error | null,
        user: Express.User | false,
        info: { message: string } | undefined
      ) => {
        if (err) {
          return next(err);
        }

        if (!user) {
          return res.status(HTTPSTATUS.UNAUTHORIZED).json({
            message: info?.message || "Invalid email or password",
          });
        }

        const token = generateToken({
          userId: (user as any)._id.toString(),
          role: (user as any).role.name,
        });

        return res.status(HTTPSTATUS.OK).json({
          message: "Logged in successfully",
          user,
          access_token: token,
        });
      }
    )(req, res, next);
  }
);

export const logoutController: ExpressHandler = asyncHandler(
  async (req, res, next) => {
    return res.status(HTTPSTATUS.OK).json({
      message:
        "Successfully logged out. Please remove the token on client side.",
    });
  }
);

export const isEmailExistController: ExpressHandler = asyncHandler(
  async (req, res, next) => {
    const body = verifyEmailSchema.parse({ ...req.body });

    const { exist, userEmail } = await isEmailExistService(body);

    return res.status(HTTPSTATUS.OK).json({
      message: "Email verified successfully",
      exist,
      userEmail,
    });
  }
);

export const registerAsCustomerController: ExpressHandler = asyncHandler(
  async (req, res, next) => {
    const body = registerAsCustomerSchema.parse({ ...req.body });

    const { user, access_token } = await registerAsCustomerService(body);

    return res.status(HTTPSTATUS.CREATED).json({
      message: "User created successfully",
      user,
      access_token,
    });
  }
);

// export const CustomerAdditionalInfoController: ExpressHandler = asyncHandler(
//   async (req, res, next) => {
//     const body = customerAdditionalInfoSchema.parse({ ...req.body });

//     await customerAdditionalInfoService(body);

//     return res.status(HTTPSTATUS.CREATED).json({
//       message: "User created successfully",
//       user,
//       access_token,
//     });
//   }
// );

export const registerAsSellerController: ExpressHandler = asyncHandler(
  async (req, res, next) => {
    const body = registerAsSellerSchema.parse({ ...req.body });

    const { user, access_token } = await registerAsSellerService(body);

    return res.status(HTTPSTATUS.CREATED).json({
      message: "User created successfully",
      user,
      access_token,
    });
  }
);
