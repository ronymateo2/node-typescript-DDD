import { GeoAddress } from "../../../domain/geo-address";
import { GeoAddressProvider } from "../geo-address-provider";
import { getGeoCodes } from "./google-geo-code.service";

const CITY_TYPES = ["postal_town", "town"];
const POSTAL_CODE_TYPES = ["postal_code", "postal_code_prefix"];

export const googleGeoAddressProvider: GeoAddressProvider = {
  async getGeoAddress(address: string): Promise<GeoAddress | null> {
    const geoCodeResponse = await getGeoCodes(address);
    if (geoCodeResponse.results.length === 0) return null;

    const city = geoCodeResponse.results[0].address_components.find((c) =>
      c.types.some((c) => CITY_TYPES.includes(c))
    );

    const postalCode = geoCodeResponse.results[0].address_components.find((c) =>
      c.types.some((c) => POSTAL_CODE_TYPES.includes(c))
    );
    // validates if the first one is the rigth value
    return {
      address: geoCodeResponse.results[0].formatted_address,
      location: { ...geoCodeResponse.results[0].geometry.location },
      city: city ? city.long_name : null,
      postalCode: postalCode ? postalCode.long_name : null,
    } as GeoAddress;
  },
};
