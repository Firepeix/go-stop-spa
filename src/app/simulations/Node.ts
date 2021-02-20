export enum NODE_TYPES {
  ANY,
  STREET,
  TRAFFIC_LIGHT
}

export interface NodeListeners {
  changeName (node: NodeInterface, name: string): void;
  remove (node: NodeInterface): void;
}

export interface NodeInterface {
  id: string;
  name: string;
  label: string;
  color: string;

  changeName (name: string): void;
  remove (): void;
}

export class Node implements NodeInterface {
  private readonly _id: string
  private _name: string
  private readonly _listeners: NodeListeners

  protected constructor (listeners: NodeListeners, id: string, _name: string) {
    this._id = id
    this._name = _name
    this._listeners = listeners
  }

  public static Create (listeners: NodeListeners, id: string, name: string, type: NODE_TYPES): NodeInterface {
    return [new Node(listeners, id, name), new StreetNode(listeners, id, name), new TrafficLightNode(listeners, id, name)][type]
  }

  get id (): string {
    return this._id
  }

  get name (): string {
    return this._name
  }

  get label (): string {
    return 'Comum'
  }

  get color (): string {
    return '#E0E0E0'
  }

  public changeName (name: string): void {
    this._name = name
    this._listeners.changeName(this, name)
  }

  public remove (): void {
    this._listeners.remove(this)
  }
}

export class StreetNode extends Node {
  get label (): string {
    return 'Rua'
  }

  get color (): string {
    return 'primary'
  }
}

export class TrafficLightNode extends Node {
  get label (): string {
    return 'Semáforo'
  }

  get color (): string {
    return 'yellow-9'
  }
}
