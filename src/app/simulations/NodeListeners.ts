import { NodeInterface } from 'src/app/simulations/NodeInterface'

export interface NodeListeners {
  changeName (node: NodeInterface, name: string): void;
  remove (node: NodeInterface): void;
  connectNodes (baseNode: NodeInterface, node: NodeInterface): void;
}

export interface TrafficLightNodeListeners extends NodeListeners{
  connectNodes (baseNode: NodeInterface, node: NodeInterface): void;
  changeSwitchTime (time: number, node: NodeInterface): void;
}
