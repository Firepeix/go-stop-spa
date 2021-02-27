<template>
  <div class="row">
    <div class="col">
      123123231
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { StepComponentInterface } from 'src/app/models/simulations/Step'
@Component
export default class ConfigureSimulation extends Vue implements StepComponentInterface{

  complete (): void {
    console.log(231)
  }

}
</script>
