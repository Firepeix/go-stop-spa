export interface IconInterface {
  id: string;
  name: string;
}

export interface PositionInterface {
  x: number;
  y: number;
}

export class Position implements PositionInterface {
  private readonly _x: number;
  private readonly _y: number;

  constructor (x = 0, y = 0) {
    this._x = x
    this._y = y
  }

  get x (): number {
    return this._x
  }

  get y (): number {
    return this._y
  }
}
