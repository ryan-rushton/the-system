export type CallbackFunction = () => void;

export interface PlanetDetails {
  radius: number;
  distance: number;
  orbitalPeriod: number;
}

export interface MoonDetails extends PlanetDetails {
  className: string;
}
