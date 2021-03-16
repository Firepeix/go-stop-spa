import { Position, PositionInterface } from 'src/app/primitives/PrimitivesModels'

export interface TrafficLightInterface {
  id: number;
  defaultSwitchTime: number;
  sampleId: number;
  status: string;
  uuid: string;
  outgoingStreetsUUIDs: string[];
  name: string;
  upperPosition: Position;
  lowerPosition: Position;
  graphPosition: PositionInterface;
}

export interface RawTrafficLightInterface {
  id: number;
  sampleId: number;
  defaultSwitchTime: number;
  status: string;
  uuid: string;
  name: string;
  outgoingStreetsUUIDs: string[];
  upperPosition: PositionInterface;
  lowerPosition: PositionInterface;
  graphPosition: PositionInterface;
}

export interface RawTrafficLightsResponse {
  data: RawTrafficLightInterface[]
}
