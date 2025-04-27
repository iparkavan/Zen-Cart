import passport from "passport";
import { ExpressHandler } from "../@types/express.types";
import { HTTPSTATUS } from "../config/http.config";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import {
  registerAsCustomerService,
  registerAsSellerService,
  verifyEmailService,
} from "../services/auth.services";
import {
  registerAsCustomerSchema,
  registerAsSellerSchema,
  verifyEmailSchema,
} from "../validations/auth.validations.schema";

export const googleLoginCallback = asyncHandler(async (req, res, next) => {
  // After successful authentication, we receive the user and token
  const { user, access_token } = req.user as {
    user: any;
    access_token: string;
  };

  res.json({
    message: "Authentication successful",
    user,
    access_token,
  });
});

export const loginController: ExpressHandler = asyncHandler(
  async (req, res, next) => {
    passport.authenticate(
      "local",
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

        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }

          return res.status(HTTPSTATUS.OK).json({
            message: "Logged in successfully",
            user,
          });
        });
      }
    )(req, res, next);
  }
);

export const logoutController: ExpressHandler = asyncHandler(
  async (req, res, next) => {
    req.logout((err) => {
      if (err) {
        console.log("Logout error", err);
        return res
          .status(HTTPSTATUS.INTERNAL_SERVER_ERROR)
          .json({ error: "failed to log out" });
      }
    });

    req.session = null;
    return res
      .status(HTTPSTATUS.OK)
      .json({ message: "Successfully logged out" });
  }
);

export const verifyEmailController: ExpressHandler = asyncHandler(
  async (req, res, next) => {
    const body = verifyEmailSchema.parse({ ...req.body });

    const { exist, userEmail } = await verifyEmailService(body);

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

// export const googleLoginCallback = asyncHandler(async (req, res, next) => {

// });
