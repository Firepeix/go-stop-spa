<template>
  <q-page class="row justify-evenly">
    <div class="col">
      <q-card class="q-ma-lg">
        <q-card-section class="title-page">
          <div class="row">
            <div class="col-3 title-card" >
              <q-icon name="mdi-plus-circle-outline"/>
              <span> Nova Simulação</span>
            </div>
            <div class="col">
              <div class="row q-gutter-md justify-end">
                <div class="col-3">
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-separator/>
        <q-card-section>
          <div class="row">
            <div class="col">
              <simulation-create-stepper />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import SimulationCreateStepper from 'components/simulation/SimulationCreateStepper.vue'
@Component({
  components: { SimulationCreateStepper }
})
export default class SimulationCreate extends Vue {
}
</script>
