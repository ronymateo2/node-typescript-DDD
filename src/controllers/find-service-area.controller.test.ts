import { NotFoundError } from "../core/errors/not-found-error";
import { ServiceArea } from "../domain/service-area/data";
import { Left, Right } from "../utils/fp";
import { findServiceAreaController } from "./find-service-area.controller";

describe("find-service-area.controller", () => {
  it("should get status 200 and service area if serviceArea exists", async () => {
    let useCase = (address: string) =>
      Promise.resolve(
        Right.of({
          address1: address,
          lat: 0,
          lng: 0,
          city: "city",
          postCode: "postalCode",
          serviceArea: "serviceArea",
        } as ServiceArea)
      );

    const fakeRespone = {
      status: jest.fn,
      json: jest.fn,
    };

    const spyStatus = jest.spyOn(fakeRespone, "status");
    const spyJson = jest.spyOn(fakeRespone, "json");

    const fakeRequest = { query: { address: "dummy_address" } };

    await findServiceAreaController(useCase)(
      fakeRequest as any,
      fakeRespone as any
    );

    expect(spyStatus).toHaveBeenCalledWith(200);
    expect(spyJson).toHaveBeenCalledWith({
      location: {
        address1: "dummy_address",
        city: "city",
        lat: 0,
        lng: 0,
        postCode: "postalCode",
        serviceArea: "serviceArea",
      },
      search: "dummy_address",
      status: "OK",
    });
  });

  it("should get status 500 and no service area if service Area does not exist", async () => {
    let useCase = (address: string) =>
      Promise.resolve(Left.of(new NotFoundError("not found")));

    const fakeRespone = {
      status: jest.fn,
      json: jest.fn,
    };

    const spyStatus = jest.spyOn(fakeRespone, "status");
    const spyJson = jest.spyOn(fakeRespone, "json");

    const fakeRequest = { query: { address: "dummy_address" } };

    await findServiceAreaController(useCase)(
      fakeRequest as any,
      fakeRespone as any
    );

    expect(spyStatus).toHaveBeenCalledWith(500);
    expect(spyJson).toHaveBeenCalledWith({
      search: "dummy_address",
      status: "NOT_FOUND",
    });
  });
});
