import { GeoAddress } from "../domain/geo-address";
import { Coordinate, ServiceArea } from "../domain/service-area/data";
import { Left, Right } from "../utils/fp";
import { useCaseGetServiceArea } from "./use-case-find-service-area";

describe("use-case-find-service-area", () => {
  it("should find service area when it exists in geoAdrress and service area", async () => {
    const context = {
      findGeoAddress: (address: string) =>
        Promise.resolve({
          address: address,
          location: { lat: 0, lng: 0 },
          city: "CITY",
          postalCode: "POSTAL_CODE",
        } as GeoAddress),
      findServiceAreaName: (c: Coordinate) => Promise.resolve("SERVICE_AREA_1"),
    };

    const dummyAddres = "dummyAddress";
    const either = await useCaseGetServiceArea(context)(dummyAddres);

    expect(either).toBeInstanceOf(Right);

    either.fold(
      () => {}, //error case
      (value: ServiceArea) => {
        expect(value).toStrictEqual({
          address1: "dummyAddress",
          city: "CITY",
          lat: 0,
          lng: 0,
          postCode: "POSTAL_CODE",
          serviceArea: "SERVICE_AREA_1",
        });
      }
    );
  });

  it("should not find service area if address doesn't exist in goeAddress Providers", async () => {
    const context = {
      findGeoAddress: (address: string) => Promise.resolve(null),
      findServiceAreaName: (c: Coordinate) => Promise.resolve(null),
    };

    const dummyAddres = "dummyAddress";
    const either = await useCaseGetServiceArea(context)(dummyAddres);

    expect(either).toBeInstanceOf(Left);

    either.fold(
      (error: Error) => {
        expect(error.message).toBe("address not found");
        expect(error.name).toBe("NotFoundError");
      }, //error case
      (value: ServiceArea) => {}
    );
  });

  it("should not find service area it service name doesn't exist in ServiceNames(GeoJson)", async () => {
    const context = {
      findGeoAddress: (address: string) =>
        Promise.resolve({
          address: address,
          location: { lat: 0, lng: 0 },
          city: "CITY",
          postalCode: "POSTAL_CODE",
        } as GeoAddress),
      findServiceAreaName: (c: Coordinate) => Promise.resolve(null),
    };

    const dummyAddres = "dummyAddress";
    const either = await useCaseGetServiceArea(context)(dummyAddres);

    expect(either).toBeInstanceOf(Left); //means error case

    either.fold(
      (error: Error) => {
        expect(error.message).toBe("service address not found");
        expect(error.name).toBe("NotFoundError");
      }, //error case
      (value: ServiceArea) => {}
    );
  });
});
