import { StreetInterface } from 'src/app/models/geographic/GeographicInterfaces'
import { TableColumnInterface } from 'src/app/tables/TableInterfaces'

export class Street implements StreetInterface {
  id: number|null
  name: string
  constructor (name: string, id: number|null = null) {
    this.name = name
    this.id = id;
  }

  public static getTableColumns () : TableColumnInterface[] {
    return [
      { name: 'name', label: 'Nome', field: 'name', align: 'center', sortable: true }
    ]
  }
}
