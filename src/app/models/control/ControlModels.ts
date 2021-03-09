import { RawTrafficLightInterface, TrafficLightInterface } from 'src/app/models/control/ControlInterfaces'
import { Position } from 'src/app/primitives/PrimitivesModels'

export class TrafficLightModel implements TrafficLightInterface {
  private _id: number = 0
  private _name: string = ''
  private _uuid: string = ''
  private _status: string = '0'
  private _sampleId: number = 0
  private _defaultSwitchTime: number = 3
  private _upperPosition: Position
  private _lowerPosition: Position

  private constructor () {
    this._lowerPosition = new Position()
    this._upperPosition = new Position()
  }

  public static Create(rawLight: RawTrafficLightInterface) : TrafficLightModel {
    const model = new TrafficLightModel()
    model._id = rawLight.id
    model._name = rawLight.name
    model._uuid = rawLight.uuid
    model._sampleId = rawLight.sampleId
    model._status = rawLight.status
    model._defaultSwitchTime = rawLight.defaultSwitchTime
    model._upperPosition = new Position(rawLight.upperPosition.x, rawLight.upperPosition.y)
    model._lowerPosition = new Position(rawLight.lowerPosition.x, rawLight.lowerPosition.y)
    return model;
  }

  get name (): string {
    return this._name
  }

  get uuid (): string {
    return this._uuid
  }

  get status (): string {
    return this._status
  }

  get defaultSwitchTime (): number {
    return this._defaultSwitchTime
  }

  get lowerPosition (): Position {
    return this._lowerPosition
  }

  get upperPosition (): Position {
    return this._upperPosition
  }

  get sampleId (): number {
    return this._sampleId
  }

  get id (): number {
    return this._id
  }
}
