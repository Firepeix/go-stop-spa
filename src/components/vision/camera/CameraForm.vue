<template>
  <q-form ref="form">
    <div class="row q-col-gutter-md">
      <div class="col-6">
        <q-select dense filled @input="setLightId" v-model="light" :rules="rules.light" option-label="protocol" :options="lights" label="Semáforo"
                  hint="O semáforo que a camera esta instalado"/>
      </div>
      <div class="col-6">
        <q-select dense filled @input="setView" v-model="viewModel" :rules="rules.view" :options="views" label="Tipo de Captura"
                  hint="Tipo de captura que vai ser utilizado na camera"/>
      </div>
    </div>
  </q-form>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { QForm } from 'quasar'
import { RawTrafficLightInterface, RawTrafficLightResponse, TrafficLightInterface } from 'src/app/models/control/ControlInterfaces'
import { TrafficLight } from 'src/app/models/control/ControlModels'
import { CameraInterface } from 'src/app/models/vision/VisionInterfaces'
import { Camera } from 'src/app/models/vision/VisionModels'

@Component
export default class CameraForm extends Vue {
  public lights: TrafficLightInterface[] = []
  public views: string[] = ['diaonline']

  private trafficLightId = 0
  private view = ''

  private light = null
  private viewModel = null

  rules = {
    light: [
      (val: TrafficLightInterface | null) => val !== null || 'O campo semáforo é obrigatório'
    ],

    view: [
      (val: string | null) => val !== null && val.length > 0 || 'O tipo de captura é obrigatório'
    ]
  }

  $refs!: {
    form: QForm
  }

  private construct () {
    void this.setModels()
  }

  public async setModels () {
    this.lights = this.parseResponse(await this.search())
  }

  private async search (): Promise<RawTrafficLightResponse> {
    const response = await this.$axios.get<RawTrafficLightResponse>(`${this.$API_URL}/traffic-lights`);
    return response.data;
  }

  private parseResponse (response : RawTrafficLightResponse) : TrafficLightInterface[] {
    return response.data.map((model: RawTrafficLightInterface) => TrafficLight.fromRaw(model));
  }

  private setLightId (light: TrafficLightInterface): void {
    this.trafficLightId = light.id ?? 0
  }

  private setView (view: string): void {
    this.view = view
  }

  public async getModel (): Promise<null | CameraInterface> {
    const validation = await this.$refs.form.validate()
    if (validation) {
      return Camera.New(this.trafficLightId, this.view);
    }

    return null
  }

  public mounted () {
    this.$nextTick(() => this.construct())
  }
}
</script>
