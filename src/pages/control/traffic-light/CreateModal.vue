<template>
  <q-dialog v-model="status">
    <q-card class="dialog-medium">
      <q-card-section class="bg-primary text-right text-white q-pa">
        <div class="row">
          <div class="col text-center row-card-modal">
            <span class="description">
              Cadastrar Semáforo
            </span>
            <q-btn icon="mdi-close" flat round dense v-close-popup/>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <traffic-light-form ref="trafficLightForm"/>
      </q-card-section>
      <q-separator/>
      <q-card-actions align="right" class="text-primary">
        <div class="row full-width justify-center">
          <div class="col-6">
            <q-btn color="positive" icon="mdi-check" @click="saveTrafficLight" unelevated class="full-width" label="Cadastrar Semáforo"/>
          </div>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Notify } from 'boot/notify'
import TrafficLightForm from 'components/control/traffic-light/TrafficLightForm.vue'
import { TrafficLightInterface } from 'src/app/models/control/ControlInterfaces'

declare module 'vue/types/vue' {
  interface Vue {
    $notify: Notify
  }
}

@Component({
  components: { TrafficLightForm }
})

export default class CreateTrafficLight extends Vue {
  status = false
  $refs!: {
    trafficLightForm: TrafficLightForm
  }

  public open () {
    this.status = true
  }

  private async saveTrafficLight () {
    await this.sendTrafficLight(await this.$refs.trafficLightForm.getModel())
  }

  private async sendTrafficLight (trafficLight: TrafficLightInterface|null) : Promise<void> {
    if (trafficLight !== null) {
      try {
        await this.$axios.post(`${this.$API_URL}/traffic-lights`, trafficLight)
        this.$notify.success('Semáforo cadastrada com sucesso!')
        this.$emit('model-created');
        this.status = false
      } catch (error) {
        this.$notify.error()
      }
    }
  }
}
</script>
