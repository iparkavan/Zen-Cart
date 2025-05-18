import { ExpressHandler } from "../@types/express.types";
import { HTTPSTATUS } from "../config/http.config";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { fetchCurrentUserService } from "../services/user.service";
// import { fetchCurrentUserService } from "../services/user.service";

export const getCurrentUserController: ExpressHandler = asyncHandler(
  async (req, res, next) => {
    if (!req.user) {
      return res.status(HTTPSTATUS.UNAUTHORIZED).json({
        message: "User not authenticated",
      });
    }

    const { userId, role } = req.user;

    const { user } = await fetchCurrentUserService(userId);
    return res.status(HTTPSTATUS.OK).json({
      message: "Current User fetched Successfully",
      user,
    });
  }
);
