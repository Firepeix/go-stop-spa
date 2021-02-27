import { NodeInterface } from 'src/app/simulations/NodeInterface'

export interface NodeListeners {
  changeAttribute (attribute: string, value: string|number, node: NodeInterface): void;
  remove (node: NodeInterface): void;
  connectNodes (baseNode: NodeInterface, node: NodeInterface): void;
}
