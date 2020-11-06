import { GeoAddress } from "../domain/geo-address";
import { findGeoAddresHandler } from "./find-geo-addres-handler";

describe("find-geo-addres-handler", () => {
  it("should not find address if provider list if empty", async () => {
    const listOfprovides = [];
    const findGeoAddres = findGeoAddresHandler(listOfprovides);
    const dummyAddress = "DUMMY_ADDRESS";
    const result = await findGeoAddres(dummyAddress);

    expect(result).toBeNull();
  });

  it("should find address if it exits in provider", async () => {
    const fakeGeoAddressProvider = {
      getGeoAddress: (address: string) =>
        Promise.resolve({
          address: address,
          location: { lat: 0, lng: 0 },
          city: "CITY",
          postalCode: "POSTAL_CODE",
        } as GeoAddress),
    };
    const listOfprovides = [fakeGeoAddressProvider];
    const findGeoAddres = findGeoAddresHandler(listOfprovides);
    const dummyAddress = "DUMMY_ADDRESS";
    const result = await findGeoAddres(dummyAddress);

    expect(result).toStrictEqual({
      address: "DUMMY_ADDRESS",
      city: "CITY",
      location: {
        lat: 0,
        lng: 0,
      },
      postalCode: "POSTAL_CODE",
    });
  });

  it("should find address if it exits in at least one provider", async () => {
    const fakeGeoAddressProvider1 = {
      getGeoAddress: (address: string) => Promise.resolve(null),
    };

    const fakeGeoAddressProvider2 = {
      getGeoAddress: (address: string) =>
        Promise.resolve({
          address: address,
          location: { lat: 0, lng: 0 },
          city: "CITY",
          postalCode: "POSTAL_CODE",
        } as GeoAddress),
    };

    const listOfprovides = [fakeGeoAddressProvider1, fakeGeoAddressProvider2];
    const findGeoAddres = findGeoAddresHandler(listOfprovides);
    const dummyAddress = "DUMMY_ADDRESS";
    const result = await findGeoAddres(dummyAddress);

    expect(result).toStrictEqual({
      address: "DUMMY_ADDRESS",
      city: "CITY",
      location: {
        lat: 0,
        lng: 0,
      },
      postalCode: "POSTAL_CODE",
    });
  });

  it("should not find address if it does not exits provider list", async () => {
    const fakeGetGeoAddress1 = jest.fn().mockReturnValue(Promise.resolve(null));
    const fakeGetGeoAddress2 = jest.fn().mockReturnValue(Promise.resolve(null));
    const fakeGeoAddressProvider1 = {
      getGeoAddress: fakeGetGeoAddress1,
    };
    const fakeGeoAddressProvider2 = {
      getGeoAddress: fakeGetGeoAddress2,
    };
    const spy1 = jest.spyOn(fakeGeoAddressProvider1, "getGeoAddress");
    const spy2 = jest.spyOn(fakeGeoAddressProvider2, "getGeoAddress");

    const listOfprovides = [fakeGeoAddressProvider1, fakeGeoAddressProvider2];
    const findGeoAddres = findGeoAddresHandler(listOfprovides);
    const dummyAddress = "DUMMY_ADDRESS";
    const result = await findGeoAddres(dummyAddress);

    expect(result).toBeNull();
    expect(spy1).toBeCalledTimes(1);
    expect(spy2).toBeCalledTimes(1);
  });
});
