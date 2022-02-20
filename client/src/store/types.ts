import { types } from "mobx-state-tree";
import distance from "@turf/distance";
import { Position } from "geojson";
export interface TApiRequest_Airport {
  airport_id: number;
  file_id: number;
  ident: string;
  icao?: any;
  iata: string;
  faa?: any;
  local?: any;
  name: string;
  city?: any;
  state?: any;
  country: string;
  region: string;
  flatten?: any;
  type?: any;
  fuel_flags: number;
  has_avgas: number;
  has_jetfuel: number;
  has_tower_object: number;
  tower_frequency: number;
  atis_frequency: number;
  awos_frequency?: any;
  asos_frequency?: any;
  unicom_frequency: number;
  is_closed: number;
  is_military: number;
  is_addon: number;
  num_com: number;
  num_parking_gate: number;
  num_parking_ga_ramp: number;
  num_parking_cargo: number;
  num_parking_mil_cargo: number;
  num_parking_mil_combat: number;
  num_approach: number;
  num_runway_hard: number;
  num_runway_soft: number;
  num_runway_water: number;
  num_runway_light: number;
  num_runway_end_closed: number;
  num_runway_end_vasi: number;
  num_runway_end_als: number;
  num_runway_end_ils: number;
  num_apron: number;
  num_taxi_path: number;
  num_helipad: number;
  num_jetway: number;
  num_starts: number;
  longest_runway_length: number;
  longest_runway_width: number;
  longest_runway_heading: number;
  longest_runway_surface?: any;
  num_runways: number;
  largest_parking_ramp?: any;
  largest_parking_gate?: any;
  rating: number;
  is_3d: number;
  scenery_local_path?: any;
  bgl_filename?: any;
  left_lonx: number;
  top_laty: number;
  right_lonx: number;
  bottom_laty: number;
  mag_var: number;
  tower_altitude?: any;
  tower_lonx?: any;
  tower_laty?: any;
  transition_altitude: number;
  altitude: number;
  lonx: number;
  laty: number;
}

export interface TAirport {
  name: string;
  icaoId: string;
  coordinates: Position;
}

export interface TRoute {
  id: string;
  origin: TAirport;
  destination: TAirport;
  description: string;
}
