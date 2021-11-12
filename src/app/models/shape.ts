import { Geometry } from "./geometry";

export interface Shape {
  _id: string;
  type: string;
  geometry: Geometry;
}
