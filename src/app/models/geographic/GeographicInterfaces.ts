export interface StreetInterface {
  id: number|null
  name: string;
}

export interface RawStreetInterface {
  id: number
  name: string
}

export interface RawStreetResponse {
  data: RawStreetInterface[]
}

export interface RawStreetFindResponse {
  data: RawStreetInterface
}
