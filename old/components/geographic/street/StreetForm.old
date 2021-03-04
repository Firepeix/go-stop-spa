<template>
  <q-form ref="form">
    <q-input v-model="streetModel.name" dense label="Nome" hint="Nome da Rua" lazy-rules :rules="rules.name" filled />
  </q-form>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { StreetInterface } from 'src/app/models/geographic/GeographicInterfaces'
import { QForm } from 'quasar'
import { Street } from 'src/app/models/geographic/GeographicModels'

@Component
export default class StreetForm extends Vue {
  rules = {
    name: [
      (val: string) => val && val.length > 1 || 'Nome da rua é obrigatório'
    ]
  }

  $refs!: {
    form: QForm
  }

  streetModel: StreetInterface = {
    id: null,
    name: ''
  }

  public async getModel () : Promise<null|StreetInterface> {
    const validation = await this.$refs.form.validate();

    return new Promise((resolve) => {
      if (validation) {
        resolve(new Street(this.streetModel.name))
      }

      resolve(null)
    })
  }
}
</script>
