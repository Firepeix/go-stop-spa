import SelectStreetStep from 'src/app/models/simulations/steps/SelectStreet'
import { StepInterface } from 'src/app/models/simulations/Step'



export class Simulation {
  public static getSteps () : StepInterface[] {
    return [new SelectStreetStep()]
  }
}


