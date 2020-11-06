import fetch from "node-fetch";
import { GOOGLE_MAP_API } from "../../../config";
import { GoogleGeoCodeResponse } from "../../../model/google-geo-code";
const APIKEY = GOOGLE_MAP_API;

export const getGeoCodes = async (address: string) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${APIKEY}`;
  const response = await fetch(url);
  return (await response.json()) as GoogleGeoCodeResponse;
};
