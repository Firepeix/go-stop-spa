<template>
  <q-form ref="form">
    <div class="row q-col-gutter-md">
      <div class="col-6">
        <q-select dense filled @input="setStreetId" v-model="street" :rules="rules.street" option-label="name" :options="streets" label="Rua" hint="A rua que esse semáforo esta instalado" />
      </div>
      <div class="col-6">
        <q-input dense type="number" filled :rules="rules.defaultSwitchTime" v-model="defaultSwitchTime" label="Tempo de Espera (Segundos)" hint="O tempo deve ser em segundos" />
      </div>
    </div>
  </q-form>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { RawStreetInterface, RawStreetResponse, StreetInterface } from 'src/app/models/geographic/GeographicInterfaces'
import { QForm } from 'quasar'
import { Street } from 'src/app/models/geographic/GeographicModels'
import { TrafficLightInterface } from 'src/app/models/control/ControlInterfaces'
import { TrafficLight } from 'src/app/models/control/ControlModels'

@Component
export default class TrafficLightForm extends Vue {
  public streets: StreetInterface[] = []

  private streetId = 0
  private street = null
  private defaultSwitchTime : number|null = null

  rules = {
    street: [
      (val: StreetInterface|null ) => val !== null || 'O campo rua é obrigatório'
    ],

    defaultSwitchTime: [
      (val: number|null ) => val !== null && val > 0 || 'O tempo de espera é obrigatório'
    ]
  }

  $refs!: {
    form: QForm
  }

  private construct () {
    this.setStreets()
  }

  public async setStreets () {
    this.streets = await this.parseResponse(await this.searchStreets())
  }

  private async searchStreets (): Promise<RawStreetResponse> {
    const response = await this.$axios.get<RawStreetResponse>(`${this.$API_URL}/streets`);
    return response.data;
  }

  private async parseResponse (response : RawStreetResponse) : Promise<StreetInterface[]> {
    return response.data.map((street: RawStreetInterface) => new Street(street.name, street.id));
  }

  private setStreetId (street: StreetInterface) : void {
     this.streetId = street.id ?? 0;
  }

  public async getModel () : Promise<null|TrafficLightInterface> {
    const validation = await this.$refs.form.validate();
    if (validation && this.defaultSwitchTime !== null) {
      return new TrafficLight(this.defaultSwitchTime, this.streetId);
    }

    return null;
  }

  public mounted () {
    this.$nextTick(() => this.construct())
  }
}
</script>
