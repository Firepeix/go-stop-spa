import { RawStreetFindResponse, StreetInterface } from 'src/app/models/geographic/GeographicInterfaces'

export interface TrafficLightInterface {
  defaultSwitchTime: number;
  streetId: number;
  street: StreetInterface|null
  protocol: string|null
}

export interface RawTrafficLightInterface {
  protocol: string,
  defaultSwitchTime: number;
  streetId: number,
  street: RawStreetFindResponse
}

export interface RawTrafficLightResponse {
  data: RawTrafficLightInterface[]
}

export interface RawTrafficLightFindResponse {
  data: RawTrafficLightInterface
}
