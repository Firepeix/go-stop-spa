<template>
  <q-stepper v-model="step" ref="stepper" color="primary" animated flat bordered>
    <q-step v-for="step in steps" :key="`step-${step.id}`" :name="step.id" :title="step.title" :icon="step.icon.name" :done="step.isCompleted">
      <component :is="step.getComponent()" />
    </q-step>

    <template v-slot:navigation>
      <q-stepper-navigation>
        <q-btn @click="$refs.stepper.next()" color="primary" :label="step === 4 ? 'Finish' : 'Continue'" />
        <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
      </q-stepper-navigation>
    </template>
  </q-stepper>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Notify } from 'boot/notify'
import { Simulation } from 'src/app/models/simulations/Simulation'
import { StepInterface } from 'src/app/models/simulations/Step'

declare module 'vue/types/vue' {
  interface Vue {
    $notify: Notify
  }
}

@Component
export default class SimulationCreateStepper extends Vue {
  private step = 1;
  private steps : StepInterface[] = [];

  private construct () {
    this.steps = Simulation.getSteps()
  }

  private mounted () {
    this.construct()
  }
}
</script>
