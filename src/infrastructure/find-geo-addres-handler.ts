import { GeoAddress } from "../domain/geo-address";
import { FindGeoAddress } from "../domain/service-area/find-geo-address";
import { GeoAddressProvider } from "./providers/geo-address-provider";
import { googleGeoAddressProvider } from "./providers/geo-address-impl/google-provider";

export const getProvidersList = (): GeoAddressProvider[] => {
  const providers: GeoAddressProvider[] = [];
  providers.push(googleGeoAddressProvider);
  return providers;
};

export function findGeoAddresHandler(
  providers: GeoAddressProvider[]
): FindGeoAddress {
  return async (address: string): Promise<GeoAddress | null> => {
    for (let provider of providers) {
      const geoAddress = await provider.getGeoAddress(address);

      if (geoAddress) {
        return geoAddress;
      }
    }

    return null;
  };
}
