<template>
  <q-card bordered flat class="fit">
    <q-card-section>
      <div class="row">
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
          <q-btn color="primary" dense icon="mdi-plus-circle-outline" unelevated class="full-width" label="Conectar"/>
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
import Graph from 'src/app/simulations/Graph'

@Component
export default class CreateGraph extends Vue {

  private streetName = '';
  private graph : Graph|undefined;

  private construct (): void {
    this.initGraph()
  }

  private initGraph (): void {
    const element = document.getElementById('graph');
    if (element !== null) {
      this.graph = new Graph(element)
    }
  }

  private addStreet (): void {
    this.graph?.addNode(this.streetName)
    this.streetName = ''
  }

  public mounted () {
    this.$nextTick(() => this.construct())
  }
}
</script>
