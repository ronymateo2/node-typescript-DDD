import { Request, Response } from "express";

import { FindServiceArea } from "../application/use-case-find-service-area";
import { ServiceAreaResponse } from "../model/service-area-response";
import { ServiceArea } from "../domain/service-area/data";

export const findServiceAreaController = (useCase: FindServiceArea) => async (
  req: Request,
  res: Response
): Promise<void> => {
  const either = await useCase(req.query["address"] as string);
  either.fold(
    (err: Error) => {
      res.status(500);
      if (err.name === "NotFoundError") {
        res.json({
          status: "NOT_FOUND",
          search: req.query["address"],
        } as ServiceAreaResponse);
      } else {
        res.json({
          status: "ERROR",
          search: req.query["address"],
          error: err.message,
        } as ServiceAreaResponse);
      }
    },
    (value: ServiceArea) => {
      res.status(200);
      res.json({
        status: "OK",
        search: req.query["address"],
        location: value,
      } as ServiceAreaResponse);
    }
  );
};
