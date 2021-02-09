<template>
  <q-card bordered flat class="fit">
    <q-card-section>
      <div class="row">
        <div class="col-2">
          <q-btn color="primary" dense @click="addStreet" icon="mdi-plus-circle-outline" unelevated class="full-width" label="Rua"/>
        </div>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div id="graph" style="min-height: 395px"></div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import cytoscape from 'cytoscape'

@Component
export default class CreateGraph extends Vue {

  private graph: cytoscape.Core|undefined;

  private construct (): void {
    this.initCytoscape()
  }

  private initCytoscape (): void {
    this.graph = cytoscape({ container: document.getElementById('graph') })
  }

  private addStreet (): void {
    this.graph?.add({ group: 'nodes', data: { id: 'A', name: 'Teste' } })
  }

  public mounted () {
    this.$nextTick(() => this.construct())
  }
}
</script>
