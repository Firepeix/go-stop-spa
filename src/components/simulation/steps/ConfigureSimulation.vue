<template>
  <div class="row">
    <div class="col">
      <q-form ref="form">
        <div class="row q-col-gutter-lg">
          <div class="col-6">
            <q-input :rules="rules.sampleName" v-model="sampleName" label="Nome da Amostra" counter />
          </div>
          <div class="col-6">
            <q-input type="number" :rules="rules.vehicleQuantity" v-model="vehicleQuantity" label="Quantidade de Veículos" hint="Quantidades de veículos à serem simulados" counter />
          </div>
        </div>
        <div class="row q-col-gutter-md">
          <div class="col-6">
            <q-select v-model="entryStreets" option-label="name" multiple :rules="rules.entryStreetsIds" :options="streets" label="Ruas de Entrada" hint="Ruas pelo qual os veículos irão entrar na simulação"/>
          </div>
          <div class="col-6">
            <q-select v-model="departureStreets" option-label="name" multiple :rules="rules.departureStreetsIds" :options="streets" label="Ruas de Saida" hint="Ruas pelo qual os veículos irão sair da simulação"/>
          </div>
        </div>
        <div class="row q-col-gutter-md">
          <div class="col-12">
          </div>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { StepComponentInterface } from 'src/app/models/simulations/Step'
import { StreetInterface } from 'src/app/models/geographic/GeographicInterfaces'
import { Simulation } from 'src/app/models/simulations/Simulation'
import { Sample, SampleInterface } from 'src/app/models/simulations/Sample'
import { BasicInfoInterface } from 'src/app/simulations/Node'

@Component
export default class ConfigureSimulation extends Vue implements StepComponentInterface {

  public sampleName = ''
  public vehicleQuantity = 3
  public entryStreets : BasicInfoInterface[] = []
  public departureStreets : BasicInfoInterface[] = []

  public entryStreetsIds : string[] = []
  public departureStreetsIds : string[] = []

  public streets : BasicInfoInterface[] = []

  private _sample: SampleInterface|null = null

  rules = {
    sampleName: [
      (val: string | null) => val !== null || 'Nome da amostra é obrigatório',
      (val: string | null) => val !== null && val.length < 190 || 'O maximo de caracteres é 190'
    ],

    vehicleQuantity: [
      (val: number | null) => val !== null || 'Numero de veículos a serem simulados',
      (val: number | null) => val !== null && val > 0 || 'Deve simular pelo menos 1 veiculo'
    ],

    entryStreetsIds: [
      (val: string[] | null) => val !== null || 'Deve selecionar pelo menos uma rua de entrada',
      (val: string[] | null) => val !== null && val.length > 0 || 'Deve selecionar pelo menos uma rua de entrada'
    ],

    departureStreetsIds: [
      (val: string[] | null) => val !== null || 'Deve selecionar pelo menos uma rua de saida',
      (val: string[] | null) => val !== null && val.length > 0 || 'Deve selecionar pelo menos uma rua de saida'
    ],
  }

  private construct () {
    this.setSample()
    this.setStreets()
  }

  private setSample() : void {
    const payload = Simulation.getLastStepPayload()
    this._sample = Sample.CreateFromSerialized(payload)
  }

  private setStreets () : void {
    if (this._sample !== null) {
      this.streets = this._sample.basicStreets
    }
  }

  complete (): void {
    console.log(this.entryStreetsIds)
  }

  public mounted () {
    this.construct()
  }

}
</script>
