import { RawStreetInterface, StreetInterface } from 'src/app/models/geographic/GeographicInterfaces'
import { TableColumnInterface } from 'src/app/tables/TableInterfaces'
import { Position, PositionInterface } from 'src/app/primitives/PrimitivesModels'

export class StreetModel implements StreetInterface {
  private readonly _id: number
  private readonly _name: string
  private readonly _uuid: string
  private _outgoingStreetsUUIDs: string[] = []
  private _outgoingTrafficLightsUUIDs: string[] = []
  private _graphPosition: PositionInterface

  private constructor (id: number, name: string, uuid: string) {
    this._id = id
    this._name = name
    this._uuid = uuid
    this._graphPosition = new Position()
  }

  public static Create (rawStreet: RawStreetInterface): StreetModel {
    const model = new StreetModel(rawStreet.id, rawStreet.name, rawStreet.uuid)
    model._outgoingStreetsUUIDs = rawStreet.outgoingStreetsUUIDs
    model._outgoingTrafficLightsUUIDs = rawStreet.outgoingTrafficLightsUUIDs
    model._graphPosition = new Position(rawStreet.graphPosition.x, rawStreet.graphPosition.y)
    return model
  }

  get id (): number {
    return this._id
  }

  get name (): string {
    return this._name
  }

  get uuid (): string {
    return this._uuid
  }

  get outgoingStreetsUUIDs (): string[] {
    return this._outgoingStreetsUUIDs
  }

  get outgoingTrafficLightsUUIDs (): string[] {
    return this._outgoingTrafficLightsUUIDs
  }

  get graphPosition (): PositionInterface {
    return this._graphPosition
  }

  public static getTableColumns (): TableColumnInterface[] {
    return [
      {
        name: 'name',
        label: 'Nome',
        field: 'name',
        align: 'center',
        sortable: true
      }
    ]
  }
}
