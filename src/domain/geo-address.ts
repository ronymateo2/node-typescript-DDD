export interface GeoAddress {
  location: { lat: number; lng: number };
  address: string;
  postalCode?: string;
  city?: string;
}
