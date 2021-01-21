import { StreetInterface } from 'src/app/models/geographic/GeographicInterfaces'
import { TableColumnInterface } from 'src/app/tables/TableInterfaces'
import { TrafficLightInterface } from 'src/app/models/control/ControlInterfaces'

export class TrafficLight implements TrafficLightInterface {
  defaultSwitchTime: number
  street: StreetInterface | null
  streetId: number
  protocol: string | null

  constructor (defaultSwitchTime: number, streetId: number, street: StreetInterface | null = null, protocol: string | null = null) {
    this.defaultSwitchTime = defaultSwitchTime
    this.streetId = streetId
    this.street = street
    this.protocol = protocol
  }

  public static getTableColumns () : TableColumnInterface[] {
    return [
      { name: 'protocol', label: 'Protocolo', field: 'protocol', align: 'center', sortable: true },
      { name: 'defaultSwitchTime', label: 'Tempo de Espera', field: 'defaultSwitchTime', align: 'center', sortable: true },
      { name: 'street', label: 'Rua', field: 'street', format: (street: StreetInterface) => street.name, align: 'center', sortable: true }
    ]
  }
}
