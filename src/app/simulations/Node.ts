import { NodeSingular } from 'cytoscape'
import { NodeInterface } from 'src/app/simulations/NodeInterface'
import { NodeListeners } from 'src/app/simulations/NodeListeners'

export interface BasicInfoInterface {
  id: string,
  name: string
}

export enum NODE_TYPES {
  ANY,
  STREET,
  TRAFFIC_LIGHT
}

export class Node implements NodeInterface {
  private readonly _id: string
  private _name: string
  protected readonly _listeners: NodeListeners
  private readonly _outgoingNodes: string[]

  protected constructor (listeners: NodeListeners, rawNode: NodeSingular) {
    this._id = rawNode.data('id')
    this._name = rawNode.data('name')
    this._outgoingNodes = rawNode.data('outgoingNodes')
    this._listeners = listeners
  }

  public static Create (listeners: NodeListeners, rawNode: NodeSingular): NodeInterface {
    const nodeType = [Node, StreetNode, TrafficLightNode]
    return new nodeType[rawNode.data('type')](listeners, rawNode)
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

  get outgoingNodes (): string[] {
    return this._outgoingNodes
  }

  public changeName (name: string): void {
    this._name = name
    this._listeners.changeAttribute('name', name, this)
  }

  public remove (): void {
    this._listeners.remove(this)
  }

  public connectTo (node: NodeInterface): void {
    this._listeners.connectNodes(this, node)
  }

  public get isTrafficLight () {
    return false
  }

  get info () : BasicInfoInterface {
    return { id: this._id, name: this._name }
  }
}

export class StreetNode extends Node {
  public static Create (listeners: NodeListeners, rawNode: NodeSingular): StreetNode {
    return new StreetNode(listeners, rawNode)
  }

  get label (): string {
    return 'Rua'
  }

  get color (): string {
    return 'primary'
  }
}

export class TrafficLightNode extends Node {
  private _switchTime : number;

  constructor (listeners: NodeListeners, rawNode: NodeSingular) {
    super(listeners, rawNode)
    this._switchTime = rawNode.data('switchTime')
  }

  public static Create (listeners: NodeListeners, rawNode: NodeSingular): TrafficLightNode {
    return new TrafficLightNode(listeners, rawNode)
  }

  get label (): string {
    return 'Semáforo'
  }

  get color (): string {
    return 'yellow-9'
  }

  public get isTrafficLight () {
    return true
  }

  get switchTime (): number {
    return this._switchTime
  }

  public changeSwitchTime (time: number): void {
    this._switchTime = time
    this._listeners.changeAttribute('switchTime', time, this)
  }
}
