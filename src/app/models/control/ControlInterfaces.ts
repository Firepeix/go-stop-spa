import { RawStreetFindResponse, StreetInterface } from 'src/app/models/geographic/GeographicInterfaces'

export interface TrafficLightInterface {
  defaultSwitchTime: number;
  id: number|null;
  streetId: number;
  street: StreetInterface|null
  protocol: string|null
}

export interface RawTrafficLightInterface {
  id: number,
  protocol: string,
  defaultSwitchTime: number;
  streetId: number,
  street: RawStreetFindResponse|undefined
}

export interface RawTrafficLightResponse {
  data: RawTrafficLightInterface[]
}

export interface RawTrafficLightFindResponse {
  data: RawTrafficLightInterface
}
