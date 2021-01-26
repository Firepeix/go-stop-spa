<template>
  <q-table @request="setModels" :loading="loading" :pagination.sync="paginationOptions" bordered flat :data="models" :columns="columns" row-key="id" />
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import PaginationMixin from 'src/mixins/page/PaginationMixin'
import { Street } from 'src/app/models/geographic/GeographicModels'
import { Notify } from 'boot/notify'
import { RawTrafficLightInterface, RawTrafficLightResponse, TrafficLightInterface } from 'src/app/models/control/ControlInterfaces'
import { TrafficLight } from 'src/app/models/control/ControlModels'

declare module 'vue/types/vue' {
  interface Vue {
    $notify: Notify
  }
}

@Component
export default class TrafficLightTable extends Mixins(PaginationMixin) {
  loading = false

  public models: TrafficLightInterface[] = []

  columns = TrafficLight.getTableColumns()

  private construct () {
    void this.setModels()
  }

  public async setModels () {
    this.loading = true;
    this.models = this.parseResponse(await this.search())
    this.loading = false;
  }

  private async search (): Promise<RawTrafficLightResponse> {
    const response = await this.$axios.get<RawTrafficLightResponse>(`${this.$API_URL}/traffic-lights?include=street`);
    return response.data;
  }

  private parseResponse (response : RawTrafficLightResponse) : TrafficLightInterface[] {
    return response.data.map((model: RawTrafficLightInterface) => TrafficLight.fromRaw(model));
  }

  public mounted () {
    this.$nextTick(() => this.construct())
  }
}
</script>
