import userRouter from "./users.js";
import projectRouter from "./projects.js";
import unitRouter from "./units.js";
import RequestRouter from "./requests.js";
import SharesUnitRouter from "./SharesUnti.js";
import authRouter from "./auth.js";
import rentRouter from "./rent.js";
export default (app) => {
  app.use("/api/users", userRouter);
  app.use("/api/projects", projectRouter);
  app.use("/api/units", unitRouter);
  app.use("/api/requests", RequestRouter);
  app.use("/api/shares", SharesUnitRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/rent", rentRouter);
};
