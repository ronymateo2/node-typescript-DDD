export interface ServiceArea {
  address1: string;
  serviceArea: string;
  lat: number;
  lng: number;

  address2?: string;
  city?: string;
  postCode?: string;
}

export interface Coordinate {
  lat: number;
  lng: number;
}
