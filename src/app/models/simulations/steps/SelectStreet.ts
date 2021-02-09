import { Icon } from 'src/app/primitives/Icon'
import { Step } from 'src/app/models/simulations/Step'
import SelectStreet from 'components/simulation/steps/SelectStreet.vue'
import { VueClass } from 'vue-class-component/lib/declarations'

export default class SelectStreetStep extends Step {
  constructor () {
    super(1, 'Selecionar Ruas', new Icon('eye'));
  }

  protected getComponentStep (): VueClass<Vue> {
    return SelectStreet;
  }
}
