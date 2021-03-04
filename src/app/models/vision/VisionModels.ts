import { CameraInterface, RawCameraInterface } from 'src/app/models/vision/VisionInterfaces'
import { TrafficLightInterface } from 'src/app/models/control/ControlInterfaces'
import { TableColumnInterface } from 'src/app/tables/TableInterfaces'
import { TrafficLight } from 'src/app/models/control/ControlModels'

export enum CAMERA_ACTIONS {
  STOP,
  START
}

export class CameraModel implements CameraInterface {
  private readonly _isRecording: boolean
  private readonly _view: string

  constructor (view: string, isRecording: boolean) {
    this._isRecording = isRecording;
    this._view = view
  }

  get isRecording (): boolean {
    return this._isRecording
  }

  get view (): string {
    return this._view
  }

  public static getTableColumns () : TableColumnInterface[] {
    return [
      { name: 'protocol', label: 'Protocolo', field: 'protocol', align: 'center', sortable: true },
      { name: 'view', label: 'Tipo de Captura', field: 'view', align: 'center', sortable: true },
    ]
  }
}
