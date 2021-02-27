<template>
  <div class="row">
    <div class="col">
      <div class="row q-col-gutter-md">
        <div class="col">
          <q-select v-model="sample" :options="[]" label="Amostra" dense hint="Amostra ja utilizada"/>
        </div>
        <div class="col-3">
          <q-btn color="positive" style="min-height: 2.5rem;" @click="newSample" icon="mdi-plus-circle-outline" unelevated class="full-width" label="Amostra"/>
        </div>
      </div>
      <div class="row">
        <div class="col" v-show="sampleId !== 0 && hasSample">

        </div>
        <create-graph ref="createGraph" v-show="sampleId === 0 && hasSample" class="q-mt-md" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import CreateGraph from 'components/simulation/graph/CreateGraph.vue'
import { StepComponentInterface, StepInterface } from 'src/app/models/simulations/Step'
@Component({
  components: { CreateGraph }
})
export default class SelectStreet extends Vue implements StepComponentInterface{
  @Prop({ type: Object, required: true }) readonly step!: StepInterface;

  $refs!: {
    createGraph: CreateGraph
  }

  public sampleId = 0
  public sample = null
  public hasSample = false

  private newSample () : void {
    this.hasSample = true
  }

  complete (): void {
    const sample = this.sampleId === 0 ? this.$refs.createGraph.createSample() : null
    console.log(JSON.stringify(sample?.streetSamples))
  }

}
</script>
