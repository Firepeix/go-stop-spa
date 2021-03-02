import { BasicInfoInterface, StreetNode, TrafficLightNode } from 'src/app/simulations/Node'

export interface SampleInterface {
  streetSamples: StreetSampleCollection;
  basicStreets: BasicInfoInterface[]
}

interface StreetSampleCollection {
  [id: string]: StreetSample
}

interface TrafficLightSampleCollection {
  [id: string]: TrafficLightSample
}

export interface StreetSample {
  info: BasicInfoInterface
  outgoing: { trafficLights: TrafficLightSampleCollection, streets: BasicInfoInterface[] }
}

export interface TrafficLightSample {
  info: BasicInfoInterface
  streets: BasicInfoInterface[]
}

export class Sample implements SampleInterface {
  private readonly _streetSamples: StreetSampleCollection

  private constructor (streetSamples: StreetSampleCollection) {
    this._streetSamples = streetSamples
  }

  public static CreateFromNodes (streetNodes: StreetNode[], lightNodes: TrafficLightNode[]): SampleInterface {
    const collection: StreetSampleCollection = {}
    streetNodes.forEach(street => {
      const outgoingTrafficLights = lightNodes.filter(node => street.outgoingNodes.find(id => node.id === id) !== undefined)
      const outgoingStreets = streetNodes.filter(node => street.outgoingNodes.find(id => node.id === id) !== undefined)
      collection[street.id] = {
        info: street.info,
        outgoing: {
          streets: outgoingStreets.map(node => node.info),
          trafficLights: Sample.createTrafficLightSample(outgoingTrafficLights, streetNodes)
        }
      }
    })
    return new Sample(collection)
  }

  public static CreateFromSerialized (payload: string) : SampleInterface {
    return new Sample(JSON.parse(payload));
  }

  public static createTrafficLightSample (lightNodes: TrafficLightNode[], streetNodes: StreetNode[]): TrafficLightSampleCollection {
    const collection: TrafficLightSampleCollection = {}
    lightNodes.forEach(light => {
      const outgoingStreets = streetNodes.filter(node => light.outgoingNodes.find(id => node.id === id) !== undefined)

      collection[light.id] = {
        info: light.info,
        streets: outgoingStreets.map(node => node.info),
      }
    })
    return collection
  }

  get streetSamples (): StreetSampleCollection {
    return this._streetSamples
  }

  get basicStreets () : BasicInfoInterface[] {
    return Object.values(this._streetSamples).map(street => {
      return street.info
    })
  }
}
