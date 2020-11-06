import { Coordinate } from "./data";

export type FindServiceAreaName = ({
  lat,
  lng,
}: Coordinate) => Promise<string | null>;
