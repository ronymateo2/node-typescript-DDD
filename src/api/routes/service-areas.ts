import { Request, Response, Router } from "express";
import { useCaseGetServiceArea } from "../../application/use-case-find-service-area";
import { findServiceAreaController } from "../../controllers/find-service-area.controller";
import {
  findGeoAddresHandler,
  getProvidersList,
} from "../../infrastructure/find-geo-addres-handler";
import {
  createGeoJsonLookUp,
  findServiceAreaNameHandler,
} from "../../infrastructure/find-service-area-name-handler";

const route = Router();
export default (app: Router) => {
  app.use("/service-area", route);

  route.get("/", async (req: Request, res: Response) => {
    const context = {
      findGeoAddress: findGeoAddresHandler(getProvidersList()),
      findServiceAreaName: findServiceAreaNameHandler(createGeoJsonLookUp()),
    };

    const useCase = useCaseGetServiceArea(context);

    const controllerWithUseCase = findServiceAreaController(useCase);

    await controllerWithUseCase(req, res);
  });
};
