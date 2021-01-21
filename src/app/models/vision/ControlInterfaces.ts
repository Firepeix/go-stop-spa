import { RawTrafficLightInterface, TrafficLightInterface } from 'src/app/models/control/ControlInterfaces'

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
  trafficLight: RawTrafficLightFindResponse|null
}

export interface RawTrafficLightResponse {
  data: RawTrafficLightInterface[]
}
