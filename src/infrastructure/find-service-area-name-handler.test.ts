import { findServiceAreaNameHandler } from "./find-service-area-name-handler";
import GeoJsonGeometriesLookup from "geojson-geometries-lookup";

import data from "./data/formatted-districts.json";

describe("find-service-area-name-handler", () => {
  it("should find service area name if it is inside in Polygon", async () => {
    const glookup = {
      getContainers: (coordinates) => {
        // here where testing real implementation
        const geojson = {
          type: "FeatureCollection",
          features: data.features,
        };
        const glookup = new GeoJsonGeometriesLookup(geojson);
        return glookup.getContainers(coordinates);
      },
    };

    const findServiceAreaName = findServiceAreaNameHandler(glookup);

    const result = await findServiceAreaName({
      lng: -0.16158507159372,
      lat: 51.50128314520106,
    });
    expect(result).toBe("LONCENTRAL");
  });

  it("should not find service area name if it is not inside any Polygon", async () => {
    const glookup = {
      getContainers: (coordinates) => {
        // here where testing real implementation
        const geojson = {
          type: "FeatureCollection",
          features: data.features,
        };
        const glookup = new GeoJsonGeometriesLookup(geojson);
        return glookup.getContainers(coordinates);
      },
    };

    const findServiceAreaName = findServiceAreaNameHandler(glookup);

    const result = await findServiceAreaName({
      lng: 0,
      lat: 0,
    });
    expect(result).toBeNull();
  });
});
