import { Icon } from 'src/app/primitives/Icon'
import { Step } from 'src/app/models/simulations/Step'
import SelectStreet from 'components/simulation/steps/SelectStreet.vue'
import { VueClass } from 'vue-class-component/lib/declarations'

export default class ConfigureSimulationStep extends Step {
  constructor () {
    super(2, 'Configurar Simulação', new Icon('cog'));
  }

  protected getComponentStep (): VueClass<Vue> {
    return SelectStreet;
  }
}
