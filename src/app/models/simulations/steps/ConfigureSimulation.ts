import { Icon } from 'src/app/primitives/Icon'
import { Step } from 'src/app/models/simulations/Step'
import { VueClass } from 'vue-class-component/lib/declarations'
import ConfigureSimulation from 'components/simulation/steps/ConfigureSimulation.vue'

export default class ConfigureSimulationStep extends Step {
  constructor () {
    super(2, 'Configurar Simulação', new Icon('cog'));
  }

  protected getComponentStep (): VueClass<Vue> {
    return ConfigureSimulation;
  }
}
