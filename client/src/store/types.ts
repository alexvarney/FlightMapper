import { Position } from "geojson";

export interface TAirport {
  name: string;
  icao: string;
  coordinates: Position;
}

export interface TRoute {
  origin: TAirport;
  destination: TAirport;
  id: string;
  description?: string;
}
