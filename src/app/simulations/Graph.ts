import cytoscape, { NodeCollection, NodeSingular, Stylesheet } from 'cytoscape'
import { Node, NODE_TYPES, StreetNode, TrafficLightNode } from 'src/app/simulations/Node'
import { NodeInterface } from 'src/app/simulations/NodeInterface'
import { NodeListeners } from 'src/app/simulations/NodeListeners'
import { Sample, SampleInterface } from 'src/app/models/simulations/Sample'

export interface GraphPosition {
  x: number;
  y: number;
}

export default class Graph {

  private graph: cytoscape.Core
  private _nodeManager: NodeManager
  private style: GraphStyle
  private element: HTMLElement
  private _defaultNodePadding = 8

  constructor (element: HTMLElement) {
    this.style = new GraphStyle()
    this._nodeManager = new NodeManager(this)
    this.element = element
    this.graph = cytoscape({
      container: element,
      style: this.style.toArray()
    })
  }

  public addNodeEventListeners (eventName: string, type: string, handler: Function): void {
    this.graph.on(eventName, type, event => {
      if (eventName === 'select') {
        handler(this._createNodes([event.target])[0])
        return
      }
      handler(undefined)
    })
  }

  public changeNodeAttribute (attribute: string, name: string|number, node: NodeInterface) {
    this.graph.getElementById(node.id).data(attribute, name)
  }

  public removeNode (node: NodeInterface) {
    this._removeConnections(node)
    this.graph.remove(`#${node.id}`)
  }

  private _createNodes (rawNodes: NodeSingular[]|NodeCollection) : NodeInterface[] {
    const listeners = this._nodeManager.getListeners()
    const nodes: NodeInterface[] = []
    rawNodes.forEach((rawNode:NodeSingular|void) => {
      if (rawNode) {
        nodes.push(Node.Create(listeners, rawNode))
      }
    })
    return nodes
  }

  private _getStreetNodes () : StreetNode[] {
    const listeners = this._nodeManager.getListeners()
    const nodes: StreetNode[] = []
    this.graph.filter(`node[type = ${NODE_TYPES.STREET}]`).forEach((rawNode:NodeSingular|void) => {
      if (rawNode) {
        nodes.push(StreetNode.Create(listeners, rawNode))
      }
    })
    return nodes
  }

  private _getTrafficLightNodes () : TrafficLightNode[] {
    const listeners = this._nodeManager.getListeners()
    const nodes: TrafficLightNode[] = []
    this.graph.filter(`node[type = ${NODE_TYPES.TRAFFIC_LIGHT}]`).forEach((rawNode:NodeSingular|void) => {
      if (rawNode) {
        nodes.push(TrafficLightNode.Create(listeners, rawNode))
      }
    })
    return nodes
  }

  private _removeConnections (node: NodeInterface) : void {
    const parents = this.graph.getElementById(node.id).incomers()
    parents.forEach(rawElement => {
      if (rawElement.isNode()) {
        const nodes = rawElement.data('outgoingNodes').filter((id: string) => id !== node.id)
        rawElement.data('outgoingNodes', nodes)
      }
    })
  }

  public getCenterPosition (): GraphPosition {
    return {
      x: this.element.offsetWidth / 2,
      y: this.element.offsetHeight / 2
    }
  }

  public connectNodes (baseNode: NodeInterface, node: NodeInterface) : void {
    const rawNode = this.graph.getElementById(baseNode.id)
    const outgoingNodes = rawNode.data('outgoingNodes')
    outgoingNodes.push(node.id)
    rawNode.data('outgoingNodes', outgoingNodes)
    this._addEdge(baseNode.id, node.id)
  }

  public addNode (name: string, type = NODE_TYPES.ANY, position: GraphPosition = { x: -1, y: 0 }): void {
    position = position.x === -1 ? this.getNextNodePosition() : { x: 0, y: 0 }
    if (type === NODE_TYPES.TRAFFIC_LIGHT) {
      this.addTrafficLightNode(name, position)
      return
    }
    this.graph.add({ group: 'nodes', data: { name, type, outgoingNodes: [] }, position })
  }

  private _addEdge(fromId: string, toId: string) : void {
    this.graph.add({ group: 'edges', data: { source: fromId, target: toId } })
  }

  private getNextNodePosition (): GraphPosition {
    let position = this.getCenterPosition()
    const nodes = this.graph.nodes()

    if (nodes.length > 0) {
      const node = nodes[nodes.length - 1]
      const nodePosition = nodes[nodes.length - 1].position()
      return {
        x: nodePosition.x,
        y: nodePosition.y + node.outerHeight() + this._defaultNodePadding
      }
    }

    return position
  }

  private addTrafficLightNode (name: string, position: GraphPosition) : void {
    this.graph.add({ group: 'nodes', data: { name, type: NODE_TYPES.TRAFFIC_LIGHT, outgoingNodes: [], switchTime: 3 }, position })
  }

  public clean (): void {
    this.graph.remove('*')
  }

  public createSample () : SampleInterface {
    return Sample.CreateFromNodes(this._getStreetNodes(), this._getTrafficLightNodes());
  }
}

class GraphStyle {
  private _sheets: Stylesheet[] = []

  constructor () {
    this._addNodeStyles()
    this._addEdgeStyles()
  }

  private _addNodeStyles (): void {
    this._sheets.push({
      selector: 'node',
      css: {
        label: 'data(name)',
        color: 'white',
        'text-outline-color': '#514b4b',
        'text-outline-width': '1.5',
        'text-valign': 'center',
        'text-halign': 'center',
        height: '50px',
        width: '50px',
        backgroundColor: '#1976d2'
      }
    })
    this._sheets.push({ selector: `node[type = ${NODE_TYPES.TRAFFIC_LIGHT}]`, css: { backgroundColor: '#f9a825', shape: 'triangle', 'text-margin-y': 8 } })
    this._sheets.push({
      selector: ':selected',
      css: { backgroundColor: 'black' }
    })
  }

  private _addEdgeStyles (): void {
    this._sheets.push({ selector: 'edge', css: { 'line-color': 'black', width: 7, 'curve-style': 'straight', 'target-arrow-shape': 'triangle' } })
  }

  public toArray (): Stylesheet[] {
    return this._sheets
  }
}

class NodeManager{
  private readonly _graph: Graph;

  constructor (graph: Graph) {
    this._graph = graph
  }

  public getListeners () : NodeListeners {
    return this._getNodeListeners()
  }

  private _getNodeListeners () : NodeListeners {
    return {
      changeAttribute: (attribute: string, value: string|number, node: NodeInterface) => this._graph.changeNodeAttribute(attribute, value, node),
      remove: node => this._graph.removeNode(node),
      connectNodes: (baseNode, node) => this._graph.connectNodes(baseNode, node)
    }
  }
}
