import { BasicInfoInterface, StreetNode, TrafficLightNode } from 'src/app/simulations/Node'
import { TableColumnInterface } from 'src/app/tables/TableInterfaces'
import { CameraInterface, RawCameraInterface } from 'src/app/models/vision/VisionInterfaces'
import { CameraModel } from 'src/app/models/vision/VisionModels'
import { RawTrafficLightInterface, RawTrafficLightsResponse, TrafficLightInterface } from 'src/app/models/control/ControlInterfaces'
import { TrafficLightModel } from 'src/app/models/control/ControlModels'
import { RawStreetInterface, RawStreetsResponse, StreetInterface } from 'src/app/models/geographic/GeographicInterfaces'
import { StreetModel } from 'src/app/models/geographic/GeographicModels'

export interface SampleInterface {
  id: number;
  name: string;
  link: string;
  entryStreetsIds: string[];
  departureStreetsIds: string[];
  streetSamples: StreetSampleCollection;
  basicStreets: BasicInfoInterface[];
  trafficLights: TrafficLightInterface[];
  streets: StreetInterface[];
  camera?: CameraInterface;
}

export interface RawSampleInterfaceResponse {
  data: RawSampleInterface[]
}

export interface RawFindSampleInterfaceResponse {
  data: RawSampleInterface
}

export interface RawSampleInterface {
  id: number;
  name: string;
  cameraLink: string;
  payload: string;
  entryStreetsIds: string[];
  departureStreetsIds: string[];
  camera?: {
    data: RawCameraInterface
  };
  trafficLights?: RawTrafficLightsResponse
  streets?: RawStreetsResponse
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
  private _id = 0
  private _name = ''
  private _link = ''
  private _entryStreetsIds: string[] = []
  private _departureStreetsIds: string[] = []
  private readonly _streetSamples: StreetSampleCollection
  private _trafficLights: TrafficLightInterface[] = []
  private _streets: StreetInterface[] = []
  private _camera: CameraInterface|undefined = undefined

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

  public static CreateFromModel (rawSample: RawSampleInterface) : SampleInterface {
    const sample = new Sample(JSON.parse(rawSample.payload))
    sample._applyMetadata(rawSample.id, rawSample.name, rawSample.cameraLink, rawSample.entryStreetsIds, rawSample.departureStreetsIds)
    sample._applyRelations(rawSample.camera?.data, rawSample.trafficLights?.data, rawSample.streets?.data)
    return sample;
  }

  public static Empty () : SampleInterface {
    return new Sample(JSON.parse('[]'));
  }

  public static createTrafficLightSample (lightNodes: TrafficLightNode[], streetNodes: StreetNode[]): TrafficLightSampleCollection {
    const collection: TrafficLightSampleCollection = {}
    lightNodes.forEach(light => {
      const outgoingStreets = streetNodes.filter(node => light.outgoingNodes.find(id => node.id === id) !== undefined)

      collection[light.id] = {
        info: light.info,
        streets: outgoingStreets.map(node => node.info)
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

  private _applyMetadata (id: number, name: string, link: string, entryStreets: string[], departureStreets: string[]) : void {
    this._id = id
    this._name = name
    this._link = link
    this._entryStreetsIds = entryStreets
    this._departureStreetsIds = departureStreets
  }

  private _applyRelations (camera: RawCameraInterface|undefined, trafficLights: RawTrafficLightInterface[]|undefined, streets: RawStreetInterface[]|undefined) : void {
    this._camera = camera !== undefined ? new CameraModel(camera.view, camera.isRecording) : undefined
    if (trafficLights !== undefined) {
      this._trafficLights = trafficLights.map(rawTrafficLight => TrafficLightModel.Create(rawTrafficLight))
    }
    if (streets !== undefined) {
      this._streets = streets.map(rawStreet => StreetModel.Create(rawStreet))
    }
  }

  get departureStreetsIds (): string[] {
    return this._departureStreetsIds
  }

  get entryStreetsIds (): string[] {
    return this._entryStreetsIds
  }

  get link (): string {
    return this._link
  }

  get name (): string {
    return this._name
  }

  get id (): number {
    return this._id
  }

  get camera (): CameraInterface | undefined {
    return this._camera
  }

  get trafficLights (): TrafficLightInterface[] {
    return this._trafficLights
  }

  get streets () : StreetInterface[] {
    return this._streets
  }

  public static getTableColumns () : TableColumnInterface[] {
    return [
      { name: 'id', label: 'Protocolo', field: 'id', align: 'center', sortable: true },
      { name: 'name', label: 'Nome', field: 'name', align: 'center', sortable: true },
      { name: 'link', label: 'Camera', field: 'link', align: 'center', sortable: true }
    ]
  }
}
