<template>
  <q-page class="row justify-evenly">
    <div class="col">
      <q-card class="q-ma-lg">
        <q-card-section class="title-page">
          <div class="row">
            <div class="col-2 title-card" >
              <q-icon name="mdi-stairs"/>
              <span> Simulações</span>
            </div>
            <div class="col">
              <div class="row q-gutter-md justify-end">
                <div class="col-3">
                  <q-btn color="positive" icon="mdi-plus-circle-outline" :to="{ name: 'simulation.create' }" unelevated class="full-width" label="Simulação"/>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-separator/>
        <q-card-section>
          <div class="row">
            <div class="col">
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import CameraTable from 'components/vision/camera/CameraTable.vue'
import CreateModal from 'pages/vision/camera/CreateModal.vue'
import CreateCamera from 'pages/vision/camera/CreateModal.vue'

@Component
export default class SimulationIndex extends Vue {
}
</script>
