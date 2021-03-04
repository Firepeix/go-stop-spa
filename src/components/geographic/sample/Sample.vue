<template>
  <q-page class="row justify-evenly">
    <div class="col">
      <div class="row q-col-gutter-md q-pr-lg q-pl-lg q-pt-md q-pb-md">
        <div class="col-4">
          <q-btn color="primary" icon="mdi-strategy"  @click="searchVehicleRate" unelevated class="full-width" label="Buscar Taxa de Veículos"/>
        </div>
        <div class="col-5">
          <q-btn :color="`${isRecording ? 'negative' : 'positive'}`" :icon="`${isRecording ? 'mdi-stop' : 'mdi-record'}`"
                 @click="recordCamera" unelevated class="full-width" :label="`${isRecording ? 'Parar Gravação de' : 'Gravar'} Imagens da Camera`"/>
        </div>
      </div>
      <q-separator />
      <div class="row">
        <div class="col">
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { SampleInterface } from 'src/app/models/simulations/Sample'
import { CAMERA_ACTIONS } from 'src/app/models/vision/VisionModels'

@Component
export default class SampleIndex extends Vue {
  @Prop({ type: Object, required: true }) readonly sample!: SampleInterface;

  public isRecording = false

  public construct () {
    this.isRecording = this.sample.camera !== undefined ? this.sample.camera.isRecording : false
  }

  public async searchVehicleRate () : Promise<void> {

  }

  public async recordCamera () : Promise<void> {
    const request = { action: this.isRecording ? CAMERA_ACTIONS.STOP : CAMERA_ACTIONS.START }
    this.isRecording = !this.isRecording
    await this.$axios.post(`${this.$API_URL}/samples/${this.$route.params.id}/record`, request)
  }

  public mounted () {
    this.$nextTick(() => this.construct())
  }
}
</script>
