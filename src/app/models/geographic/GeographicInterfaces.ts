import { PositionInterface } from 'src/app/primitives/PrimitivesModels'

export interface StreetInterface {
  id: number
  name: string;
  uuid: string;
  outgoingStreetsUUIDs: string[];
  outgoingTrafficLightsUUIDs: string[];
  graphPosition: PositionInterface;
}

export interface RawStreetInterface {
  id: number;
  name: string;
  uuid: string;
  outgoingStreetsUUIDs: string[];
  outgoingTrafficLightsUUIDs: string[];
  graphPosition: PositionInterface;
}

export interface RawStreetsResponse {
  data: RawStreetInterface[]
}
