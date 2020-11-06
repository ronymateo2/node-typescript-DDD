import { GeoAddress } from "../../domain/geo-address";

export interface GeoAddressProvider {
  getGeoAddress(address: string): Promise<GeoAddress | null>;
}
