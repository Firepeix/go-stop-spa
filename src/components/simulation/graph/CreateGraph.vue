<template>
  <q-card bordered flat class="fit">
    <q-card-section>
      <div class="row q-col-gutter-sm">
        <div class="col-2">
          <q-btn color="primary" dense icon="mdi-plus-circle-outline" unelevated class="full-width" label="Rua"/>
          <q-popup-edit v-model="streetName" :validate="val => val.length > 0" @save="addStreet">
            <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
              <q-input autofocus dense :value="streetName" hint="Nome da Rua" :rules="[ () => validate(value) || 'Insira o nome da rua' ]" @input="emitValue">
              <template #after>
                  <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel" />
                  <q-btn flat dense color="positive" icon="check_circle" @click.stop="set" :disable="validate(value) === false || initialValue === value" />
                </template>
              </q-input>
            </template>
          </q-popup-edit>
        </div>
        <div class="col-2">
          <q-btn color="yellow-9" dense icon="mdi-plus-circle-outline" unelevated class="full-width" label="Semáforo"/>
          <q-popup-edit v-model="lightName" :validate="val => val.length > 0" @save="addTrafficLight">
            <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
              <q-input autofocus dense :value="lightName" hint="Identificador do Semáforo" :rules="[ () => validate(value) || 'Insira o identificador do semáforo' ]" @input="emitValue">
                <template #after>
                  <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel" />
                  <q-btn flat dense color="positive" icon="check_circle" @click.stop="set" :disable="validate(value) === false || initialValue === value" />
                </template>
              </q-input>
            </template>
          </q-popup-edit>
        </div>
        <div class="col-2">
        </div>
        <div class="col-2">
        </div>
        <div class="col-2">
        </div>
        <div class="col-2">
          <q-btn color="negative" @click="clean" dense unelevated class="full-width" label="Limpar"/>
        </div>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="row">
        <div class="col">
          <div id="graph" style="min-height: 395px"></div>
        </div>
        <div class="col-3" v-show="initialized && graph.selectedNode !== null">
          <selected-node-options />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import cytoscape from 'cytoscape'
import Graph, { NODE_TYPES } from 'src/app/simulations/Graph'
import SelectedNodeOptions from 'components/simulation/graph/SelectedNodeOptions.vue'
@Component({
  components: { SelectedNodeOptions }
})
export default class CreateGraph extends Vue {

  private initialized = false
  private streetName = '';
  private lightName = '';
  private graph : Graph|undefined = undefined;

  private construct (): void {
    this.initGraph()
  }

  private initGraph (): void {
    const element = document.getElementById('graph');
    if (element !== null) {
      this.graph = new Graph(element)
      this.initialized = true
    }
  }

  private addStreet (): void {
    this.graph?.addNode(this.streetName, NODE_TYPES.STREET)
    this.streetName = ''
  }

  private addTrafficLight (): void {
    this.graph?.addNode(this.lightName, NODE_TYPES.TRAFFIC_LIGHT)
    this.lightName = ''
  }

  private clean (): void {
    this.graph?.clean()
  }

  public mounted () {
    this.$nextTick(() => this.construct())
  }
}
</script>
