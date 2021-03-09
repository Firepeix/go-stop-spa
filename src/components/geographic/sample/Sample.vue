<template>
  <q-page class="row justify-evenly">
    <div class="col">
      <div class="row q-col-gutter-md q-pr-lg q-pl-lg q-pt-md q-pb-md">
        <div class="col-5">
          <q-btn :color="`${isRecording ? 'negative' : 'positive'}`" :icon="`${isRecording ? 'mdi-stop' : 'mdi-record'}`"
                 @click="recordCamera" unelevated class="full-width" :label="`${isRecording ? 'Parar Gravação de' : 'Gravar'} Imagens da Camera`"/>
        </div>
      </div>
      <q-separator/>
      <div class="row q-pa-md q-col-gutter-md traffic-lights-wrapper">
        <traffic-light :key="light.uuid" :light="light" v-for="light in sample.trafficLights"/>
      </div>
      <q-separator/>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { SampleInterface } from 'src/app/models/simulations/Sample'
import { CAMERA_ACTIONS } from 'src/app/models/vision/VisionModels'
import TrafficLight from 'components/control/TrafficLight.vue'

@Component({
  components: { TrafficLight }
})
export default class SampleIndex extends Vue {
  @Prop({
    type: Object,
    required: true
  }) readonly sample!: SampleInterface

  public isRecording = false

  public construct () {
    this.isRecording = this.sample.camera !== undefined ? this.sample.camera.isRecording : false
  }

  public async recordCamera (): Promise<void> {
    const request = { action: this.isRecording ? CAMERA_ACTIONS.STOP : CAMERA_ACTIONS.START }
    this.isRecording = !this.isRecording
    await this.$axios.post(`${this.$API_URL}/samples/${this.$route.params.id}/record`, request)
  }

  public mounted () {
    this.$nextTick(() => this.construct())
  }
}
</script>
<style lang="stylus">
.tsraffic-lights-wrapper
  div.col-4:last-child
    padding-right 28px
</style>
