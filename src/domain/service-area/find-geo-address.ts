import { GeoAddress } from "../geo-address";

export type FindGeoAddress = (address: string) => Promise<GeoAddress | null>;
