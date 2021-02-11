import cytoscape, { NodeSingular, Stylesheet } from 'cytoscape'

export interface GraphPosition {
  x: number;
  y: number;
}

export default class Graph {

  private graph: cytoscape.Core
  private style: GraphStyle
  private element: HTMLElement
  private _defaultNodePadding = 8
  private _selectedNode = null

  constructor (element: HTMLElement) {
    this.style = new GraphStyle()
    this.element = element
    this.graph = cytoscape({ container: element, style: this.style.toArray() })
    this._addEventListeners()
  }

  get selectedNode (): any {
    return this._selectedNode
  }

  private _addEventListeners () {
    this.graph.on('select', 'node', event => console.log(event.target))
  }

  private _selectionNode (node: NodeSingular, type: string) {

  }

  public getCenterPosition () : GraphPosition {
    return { x: this.element.offsetWidth / 2, y: this.element.offsetHeight / 2 }
  }

  private getNextNodePosition () : GraphPosition {
    let position = this.getCenterPosition()
    const nodes = this.graph.nodes()

    if (nodes.length > 0) {
      const node = nodes[nodes.length - 1]
      const nodePosition = nodes[nodes.length - 1].position()
      return { x: nodePosition.x, y: nodePosition.y  + node.outerHeight() + this._defaultNodePadding }
    }


    return position;
  }

  public addNode (name: string, type = NODE_TYPES.ANY, position: GraphPosition = { x: -1, y: 0 }): void {
    position = position.x === -1 ? this.getNextNodePosition() : { x:0, y: 0 }
    this.graph.add({ group: 'nodes', data: { name, type }, position })
  }

  public clean (): void {
    this.graph.remove('*')
  }
}

class GraphStyle {
  private _sheets: Stylesheet[] = []

  constructor () {
    this._addNodeStyles()
  }

  public _addNodeStyles () : void {
    this._sheets.push({ selector: 'node', css: { label: 'data(name)', color: 'white', 'text-outline-color': '#514b4b','text-outline-width': '1.5', 'text-valign': 'center', 'text-halign': 'center', height: '50px', width: '50px', backgroundColor: '#1976d2' } })
    this._sheets.push({ selector: `node[type = ${NODE_TYPES.TRAFFIC_LIGHT}]`, css: { backgroundColor: '#f9a825' } })
    this._sheets.push({ selector: ':selected', css: { backgroundColor: 'black' } })
  }

  public toArray () : Stylesheet[] {
    return this._sheets
  }
}

export enum NODE_TYPES {
  ANY,
  STREET,
  TRAFFIC_LIGHT
}
