import fetch from "node-fetch";
import { GoogleGeoCodeResponse } from "../../../model/google-geo-code";
const APIKEY = `AIzaSyCbViDjAg2NA56n4HHU3rYqFVoehkdAd04`;

export const getGeoCodes = async (address: string) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${APIKEY}`;
  const response = await fetch(url);
  return (await response.json()) as GoogleGeoCodeResponse;
};
