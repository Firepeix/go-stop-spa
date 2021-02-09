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
        <div class="col" v-show="sampleId !== 0">

        </div>
        <create-graph class="q-mt-md" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import CreateGraph from 'components/simulation/graph/CreateGraph.vue'
@Component({
  components: { CreateGraph }
})
export default class SelectStreet extends Vue {
  public sampleId = 0
  public sample = null
  public hasSample = false

  private newSample () : void {
    this.hasSample = true
  }
}
</script>
