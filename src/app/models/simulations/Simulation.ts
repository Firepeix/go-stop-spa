import SelectStreetStep from 'src/app/models/simulations/steps/SelectStreet'
import { StepInterface } from 'src/app/models/simulations/Step'
import ConfigureSimulationStep from 'src/app/models/simulations/steps/ConfigureSimulation'
import { LocalStorage } from 'quasar'
import { StepModel } from 'src/app/models/simulations/StepModel'

export class Simulation {
  public static getSteps () : StepInterface[] {
    return [new SelectStreetStep(), new ConfigureSimulationStep()]
  }

  public static getLastSavedStepId () : number {
    const simulation : StepModel[]|null = LocalStorage.has('simulation') ? LocalStorage.getItem('simulation') : []
    if (simulation !== null) {
      const step = simulation.reverse()[0]
      if (step !== undefined) {
        const steps = Simulation.getSteps()
        const nextStep = steps.find(stepModel => stepModel.id === step.id + 1)
        if (nextStep !== undefined) {
          return nextStep.id
        }
        return step.id
      }
    }

    return 1
  }

  public static getLastStepPayload () : string {
    const simulation : StepModel[]|null = LocalStorage.has('simulation') ? LocalStorage.getItem('simulation') : []
    if (simulation !== null) {
      const step = simulation.reverse()[0]
      if (step !== undefined) {
        return step.payload
      }
    }

    return ''
  }

  public static saveStep(step: StepInterface, payload: string) {
    const simulation : StepModel[]|null = LocalStorage.has('simulation') ? LocalStorage.getItem('simulation') : []
    if (simulation !== null) {
      const savedStep = simulation.findIndex(model => model.id === step.id);
      if (savedStep !== -1) {
        simulation[savedStep] = { id: step.id, payload }
      } else {
        simulation.push({ id: step.id, payload })
      }
      LocalStorage.set('simulation', simulation)
    }
  }
}


