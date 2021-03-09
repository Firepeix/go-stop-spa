<template>
  <div class="col-4">
    <div class="row">
      <div class="col" style="padding-bottom: 10px">
        <q-chip class="full-width" square outline color="dark">
          <div class="text-center full-width text-bold label">{{ light.name }}</div>
        </q-chip>
      </div>
    </div>
    <div class="row">
      <div class="col-3">
        <div class="traffic-light">
          <div class="light-red active"></div>
          <div class="light-yellow"></div>
          <div class="light-green"></div>
        </div>
      </div>
      <div class="col">
        <q-btn color="primary"  @click="searchVehicleRate" unelevated class="full-width" label="Buscar Taxa"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { TrafficLightInterface } from 'src/app/models/control/ControlInterfaces'
import { exportFile } from 'quasar'

@Component
export default class TrafficLight extends Vue {
  @Prop({ type: Object, required: true }) readonly light!: TrafficLightInterface;


  public construct () {
  }

  public async searchVehicleRate () {
    const response = await this.$axios.get<number[]>(`${this.$API_URL}/samples/${this.light.sampleId}/get-rate/${this.light.id}`)
    this.downloadRate(response.data)
  }


  public downloadRate (int: number[]) : void {
    let file = '';
    int.forEach(rate => {
      file += `${rate}\n`
    })

    exportFile(`Taxa de ${this.light.name}.txt`, file)
  }

  public mounted () {
    this.$nextTick(() => this.construct())
  }
}
</script>
<style lang="stylus">
.traffic-light {
  position: relative;
  background: #222;
  border-radius: 10px;
  padding: 16px;
  width: 60px;
  box-shadow: inset 0 0 0 5px #2a2a2a;
}

.light-red,
.light-yellow,
.light-green {
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #333;
  transition all 400ms
}

.light-yellow {
  margin: 10px 0 10px 0;
}

.light-red.active {
  background: #f00;
  box-shadow: 0 0 40px #f00;
  z-index: 1;
}

.light-yellow.active {
  background: #fd0;
  box-shadow: 0 0 40px #fd0;
  z-index: 1;
}

.light-green.active {
  background: #0d0;
  box-shadow: 0 0 40px #0d0;
  z-index: 1;
}



</style>
