import SelectStreetStep from 'src/app/models/simulations/steps/SelectStreet'
import { StepInterface } from 'src/app/models/simulations/Step'
import ConfigureSimulationStep from 'src/app/models/simulations/steps/ConfigureSimulation'



export class Simulation {
  public static getSteps () : StepInterface[] {
    return [new SelectStreetStep(), new ConfigureSimulationStep()]
  }
}


