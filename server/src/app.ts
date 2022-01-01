import express from "express";

import cors from "cors";

import cookieParser from "cookie-parser";
import csrf from "csurf";

import createJwtConfig from "./middlewares/jwtMiddleware";

import baseRoutes from "./routes/base.routes";
import authRoutes from "./routes/auth.routes";
import itemRoutes from "./routes/item.routes";
import cartRoutes from "./routes/cart.routes";
import orderRoutes from "./routes/order.routes";
import profileRoutes from "./routes/profile.routes";

const app: express.Express = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(csrf({ cookie: true }));

app.use(baseRoutes);
app.use(authRoutes);
app.use(createJwtConfig());
app.use("/items", itemRoutes);
app.use("/carts", cartRoutes);
app.use("/orders", orderRoutes);
app.use("/profile", profileRoutes);

export default app;
