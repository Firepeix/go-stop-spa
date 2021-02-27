import { Icon } from 'src/app/primitives/Icon'
import { Vue } from 'vue-property-decorator'
import { VueClass } from 'vue-class-component/lib/declarations'

export interface StepInterface {
  id: number;
  title: string;
  icon: Icon;
  isCompleted: boolean;
  getComponent () : VueClass<Vue>
  complete () : void
}

export interface StepComponentInterface {
  complete () : void
}

export abstract class Step implements StepInterface {
  private readonly _icon: Icon
  private readonly _id: number
  private readonly _title: string
  private _isCompleted: boolean

  protected constructor (id: number, title: string, icon: Icon) {
    this._icon = icon
    this._id = id
    this._isCompleted = false
    this._title = title
  }

  get icon (): Icon {
    return this._icon
  }

  get id (): number {
    return this._id
  }

  get isCompleted (): boolean {
    return this._isCompleted
  }

  get title (): string {
    return this._title
  }

  getComponent (): VueClass<Vue> {
    return this.getComponentStep();
  }

  complete () {
    this._isCompleted = true
  }

  protected abstract getComponentStep (): VueClass<Vue>;
}
