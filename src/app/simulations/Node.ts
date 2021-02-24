export enum NODE_TYPES {
  ANY,
  STREET,
  TRAFFIC_LIGHT
}

export interface NodeListeners {
  changeName (node: NodeInterface, name: string): void;
  remove (node: NodeInterface): void;
  connectNodes (baseNode: NodeInterface, node: NodeInterface): void;
}

export interface NodeInterface {
  id: string;
  name: string;
  label: string;
  color: string;

  changeName (name: string): void;

  connectTo (node: NodeInterface): void;
  remove (): void;
}

export class Node implements NodeInterface {
  private readonly _id: string
  private _name: string
  private readonly _listeners: NodeListeners
  private readonly _outgoingNodes: string[]


  protected constructor (listeners: NodeListeners, id: string, name: string, outgoingNodes: string[]) {
    this._id = id
    this._name = name
    this._listeners = listeners
    this._outgoingNodes = outgoingNodes
  }

  public static Create (listeners: NodeListeners, id: string, name: string, type: NODE_TYPES, outgoingNodes: string[]): NodeInterface {
    const nodeType = [Node, StreetNode, TrafficLightNode]
    return new nodeType[type](listeners, id, name, outgoingNodes)
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

  public connectTo (node: NodeInterface): void {
    this._listeners.connectNodes(this, node)
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
