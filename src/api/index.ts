import { Router } from "express";
import serviceAreas from "./routes/service-areas";

export default () => {
  const appRouter = Router();
  serviceAreas(appRouter);
  return appRouter;
};
