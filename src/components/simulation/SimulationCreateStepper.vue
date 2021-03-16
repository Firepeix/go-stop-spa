<template>
  <q-stepper v-model="step" ref="stepper" color="primary" animated flat bordered>
    <q-step v-for="step in steps" :key="`step-${step.id}`" :name="step.id" :title="step.title" :icon="step.icon.name" :done="step.isCompleted">
      <component @completed="stepCompleted" :step="step" :is="step.getComponent()" ref="step" />
    </q-step>

    <template v-slot:navigation>
      <q-stepper-navigation class="text-right">
        <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Voltar" class="q-ml-sm" />
        <q-btn @click="nextStep" color="primary" :label="step === 4 ? 'Simular' : 'Avançar'" />
      </q-stepper-navigation>
    </template>
  </q-stepper>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Notify } from 'boot/notify'
import { Simulation } from 'src/app/models/simulations/Simulation'
import { StepInterface } from 'src/app/models/simulations/Step'
import SelectStreet from 'components/simulation/steps/SelectStreet.vue'
import { QStepper } from 'quasar'

declare module 'vue/types/vue' {
  interface Vue {
    $notify: Notify
  }
}

@Component
export default class SimulationCreateStepper extends Vue {
  $refs!: {
    step: SelectStreet[]
    stepper: QStepper
  }

  private step = 1;
  public steps : StepInterface[] = [];

  private construct () {
    this.step = Simulation.getLastSavedStepId()
    this.steps = Simulation.getSteps()
  }

  public nextStep () : void {
    this.$refs.step[0].complete()
  }

  public stepCompleted () : void {
    this.$refs.stepper.next()
  }

  public mounted () {
    this.construct()
  }
}
</script>
