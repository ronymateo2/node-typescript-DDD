import GeoJsonGeometriesLookup from "geojson-geometries-lookup";
import { FindServiceAreaName } from "../domain/service-area/find-service-area-name";
import data from "./data/formatted-districts.json";

export const createGeoJsonLookUp = (): GeoJsonLookUp => {
  const geojson = {
    type: "FeatureCollection",
    features: data.features,
  };
  const glookup = new GeoJsonGeometriesLookup(geojson);
  return glookup;
};

export type GeoJsonLookUp = {
  getContainers: (point: any) => { features: any[] };
};

export function findServiceAreaNameHandler(
  glookup: GeoJsonLookUp
): FindServiceAreaName {
  return ({ lat, lng }: { lat: number; lng: number }) => {
    const point = {
      type: "Point",
      coordinates: [lng, lat],
    };
    //TODO: should separate this implementation
    const { features } = glookup.getContainers(point);

    if (features.length === 0) {
      return Promise.resolve(null);
    }

    return Promise.resolve(features[0]?.properties?.Name as string);
  };
}
