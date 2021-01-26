import { RawTrafficLightFindResponse, TrafficLightInterface } from 'src/app/models/control/ControlInterfaces'

export interface CameraInterface {
  view: string;
  trafficLightId: number;
  trafficLight: TrafficLightInterface|null
  protocol: string|null
}

export interface RawCameraInterface {
  protocol: string,
  view: string;
  trafficLightId: number,
  trafficLight: RawTrafficLightFindResponse|undefined
}

export interface RawCameraResponse {
  data: RawCameraInterface[]
}
