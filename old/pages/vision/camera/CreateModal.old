<template>
  <q-dialog v-model="status">
    <q-card class="dialog-medium">
      <q-card-section class="bg-primary text-right text-white q-pa">
        <div class="row">
          <div class="col text-center row-card-modal">
            <span class="description">
              Cadastrar Camera
            </span>
            <q-btn icon="mdi-close" flat round dense v-close-popup/>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <camera-form ref="cameraForm"/>
      </q-card-section>
      <q-separator/>
      <q-card-actions align="right" class="text-primary">
        <div class="row full-width justify-center">
          <div class="col-6">
            <q-btn color="positive" icon="mdi-check" @click="saveModel" unelevated class="full-width" label="Cadastrar Camara"/>
          </div>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Notify } from 'boot/notify'
import CameraForm from 'components/vision/camera/CameraForm.vue'
import { CameraInterface } from 'src/app/models/vision/VisionInterfaces'

declare module 'vue/types/vue' {
  interface Vue {
    $notify: Notify
  }
}

@Component({
  components: { CameraForm }
})

export default class CreateCamera extends Vue {
  status = false
  $refs!: {
    cameraForm: CameraForm
  }

  public open () {
    this.status = true
  }

  private async saveModel () {
    await this.sendModel(await this.$refs.cameraForm.getModel())
  }

  private async sendModel (model: CameraInterface|null) : Promise<void> {
    if (model !== null) {
      try {
        await this.$axios.post(`${this.$API_URL}/cameras`, model)
        this.$notify.success('Camera cadastrada com sucesso!')
        this.$emit('model-created');
        this.status = false
      } catch (error) {
        this.$notify.error()
      }
    }
  }
}
</script>
