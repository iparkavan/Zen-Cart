import "dotenv/config";
import "./config/passport.config";
import express from "express";
import cors from "cors";
import { config } from "./config/app.config";
import connectDatabase from "./config/database.config";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import cookieSession from "cookie-session";
import passport from "passport";
import userRoutes from "./routes/user.routes";
import { isAuthenticated } from "./middlewares/isAuthenticated.middleware";
import { validateSeller } from "./middlewares/validateSeller.middleware";
import categoryRoutes from "./routes/category.routes";

const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// app.use(
//   cookieSession({
//     name: "session",
//     keys: [config.SESSION_SECRET],
//     maxAge: 24 * 60 * 60 * 1000,
//     secure: config.NODE_ENV === "production",
//     httpOnly: true,
//     sameSite: "lax",
//   })
// );

app.use(passport.initialize());
// app.use(passport.session());

app.use(
  cors({
    origin: config.FRONTEND_ORGIN,
    credentials: true,
  })
);

app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/user`, isAuthenticated, userRoutes);
app.use(`${BASE_PATH}/products`, productRoutes);
app.use(`${BASE_PATH}/category`, categoryRoutes);

app.use(errorHandler);

app.listen(config.PORT, async () => {
  console.log(
    `Server is listening on port ${config.PORT} in ${config.NODE_ENV} http://localhost:${config.PORT}`
  );
  await connectDatabase();
});
