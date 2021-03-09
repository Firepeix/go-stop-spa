import { Position, PositionInterface } from 'src/app/primitives/PrimitivesModels'

export interface TrafficLightInterface {
  id: number;
  defaultSwitchTime: number;
  sampleId: number;
  status: string;
  uuid: string;
  name: string;
  upperPosition: Position;
  lowerPosition: Position;
}

export interface RawTrafficLightInterface {
  id: number;
  sampleId: number;
  defaultSwitchTime: number;
  status: string;
  uuid: string;
  name: string;
  upperPosition: PositionInterface;
  lowerPosition: PositionInterface;
}

export interface RawTrafficLightsResponse {
  data: RawTrafficLightInterface[]
}
