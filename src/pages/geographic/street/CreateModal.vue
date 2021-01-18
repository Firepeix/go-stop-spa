<template>
  <q-dialog v-model="status">
    <q-card>
      <q-card-section class="bg-primary text-right text-white q-pa">
        <div class="row">
          <div class="col text-center row-card-modal">
            <span class="description">
              Cadastrar Rua
            </span>
            <q-btn icon="close" flat round dense v-close-popup />
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis laudantium minus earum totam modi laborum illo, corporis fuga saepe animi aliquam ea enim assumenda ut nulla natus aperiam quis. Iste.
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Salvar" @click="secondDialog = true" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'

@Component({
})
export default class CreateStreet extends Vue {
  status: false
}
</script>
