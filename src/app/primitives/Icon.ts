import { IconInterface } from 'src/app/primitives/PrimitivesModels'

export class Icon implements IconInterface {
  private readonly _id: string

  constructor (id: string) {
    this._id = id
  }

  get id (): string {
    return this._id
  }

  get name (): string {
    return `mdi-${this._id}`
  }
}
