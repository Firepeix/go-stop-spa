import { StreetInterface } from 'src/app/models/geographic/GeographicInterfaces'
import { TableColumnInterface } from 'src/app/tables/TableInterfaces'
import { RawTrafficLightInterface, TrafficLightInterface } from 'src/app/models/control/ControlInterfaces'
import { Street } from 'src/app/models/geographic/GeographicModels'

export class TrafficLight implements TrafficLightInterface {
  id: number | null
  defaultSwitchTime: number
  street: StreetInterface | null
  streetId: number
  protocol: string | null

  constructor (defaultSwitchTime: number, streetId: number, street: StreetInterface | null = null, protocol: string | null = null, id: number|null = null) {
    this.defaultSwitchTime = defaultSwitchTime
    this.streetId = streetId
    this.street = street
    this.protocol = protocol
    this.id = id
  }

  public static fromRaw(rawLight: RawTrafficLightInterface) : TrafficLight {
    const street = rawLight.street !== undefined ? Street.fromRaw(rawLight.street.data) : null;
    return new TrafficLight(rawLight.defaultSwitchTime, rawLight.streetId, street, rawLight.protocol, rawLight.id);
  }

  public static getTableColumns () : TableColumnInterface[] {
    return [
      { name: 'protocol', label: 'Protocolo', field: 'protocol', align: 'center', sortable: true },
      { name: 'defaultSwitchTime', label: 'Tempo de Espera', field: 'defaultSwitchTime', align: 'center', sortable: true }
    ]
  }
}
