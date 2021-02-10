import cytoscape, { Stylesheet } from 'cytoscape'

export interface GraphPosition {
  x: number;
  y: number;
}

export default class Graph {

  private graph: cytoscape.Core
  private element: HTMLElement
  private _defaultNodePadding = 8

  constructor (element: HTMLElement) {
    this.element = element
    this.graph = cytoscape({ container: element, style: [Graph._getNodeStyle(), Graph._getSelectedStyle()] })
  }

  private static _getNodeStyle () : Stylesheet {
    return { selector: 'node', css: { label: 'data(name)', 'text-valign': 'center', 'text-halign': 'center', 'height': '50px', 'width': '50px' } }
  }

  private static _getSelectedStyle () : Stylesheet {
    return { selector: ':selected', css: { backgroundColor: '#8dbeff' } }
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

  public addNode (name: string, position: GraphPosition = { x: -1, y: 0 }): void {
    position = position.x === -1 ? this.getNextNodePosition() : { x:0, y: 0 }
    this.graph.add({ group: 'nodes', data: { name }, position })
  }
}
