import { CameraInterface, RawCameraInterface } from 'src/app/models/vision/VisionInterfaces'
import { TrafficLightInterface } from 'src/app/models/control/ControlInterfaces'
import { TableColumnInterface } from 'src/app/tables/TableInterfaces'
import { TrafficLight } from 'src/app/models/control/ControlModels'

export class Camera implements CameraInterface {
  protocol: string | null
  trafficLight: TrafficLightInterface | null
  trafficLightId: number
  view: string

  private constructor (protocol: string | null, trafficLightId: number, view: string, trafficLight: TrafficLightInterface | null) {
    this.protocol = protocol
    this.trafficLight = trafficLight
    this.trafficLightId = trafficLightId
    this.view = view
  }

  public static New (trafficLightId: number, view: string) {
    return new Camera(null, trafficLightId, view, null);
  }

  public static fromRaw (rawCamera: RawCameraInterface) : Camera {
    const light = rawCamera.trafficLight !== undefined ? TrafficLight.fromRaw(rawCamera.trafficLight.data) : null;
    return new Camera(rawCamera.protocol, rawCamera.trafficLightId, rawCamera.view, light);
  }

  public static getTableColumns () : TableColumnInterface[] {
    return [
      { name: 'protocol', label: 'Protocolo', field: 'protocol', align: 'center', sortable: true },
      { name: 'view', label: 'Tipo de Captura', field: 'view', align: 'center', sortable: true },
      { name: 'light', label: 'Semáforo', field: 'trafficLight', format: (light: TrafficLightInterface) => light?.protocol, align: 'center'}
    ]
  }
}
