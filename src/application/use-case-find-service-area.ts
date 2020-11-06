import { ServiceArea } from "../domain/service-area/data";
import { FindGeoAddress } from "../domain/service-area/find-geo-address";
import { FindServiceAreaName } from "../domain/service-area/find-service-area-name";
import { NotFoundError } from "../core/errors/not-found-error";
import { Either, tryCatchAsync } from "../utils/fp";

export interface UseCaseGetServiceAreaContext {
  findGeoAddress: FindGeoAddress;
  findServiceAreaName: FindServiceAreaName;
}

export type FindServiceArea = (
  address: string
) => Promise<Either<ServiceArea, Error>>;

export function useCaseGetServiceArea(
  context: UseCaseGetServiceAreaContext
): FindServiceArea {
  return async function findServiceArea(
    address: string
  ): Promise<Either<ServiceArea, Error>> {
    return tryCatchAsync(async () => {
      const geoAddress = await context.findGeoAddress(address);
      if (!geoAddress) throw new NotFoundError("address not found");

      const serviceArea = await context.findServiceAreaName(
        geoAddress.location
      );
      if (!serviceArea) throw new NotFoundError("service address not found");

      return {
        address1: geoAddress.address,
        lat: geoAddress.location.lat,
        lng: geoAddress.location.lng,
        city: geoAddress.city,
        postCode: geoAddress.postalCode,
        serviceArea: serviceArea,
      } as ServiceArea;
    });
  };
}
