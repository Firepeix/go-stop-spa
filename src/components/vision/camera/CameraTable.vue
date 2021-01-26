<template>
  <q-table @request="setModels" :loading="loading" :pagination.sync="paginationOptions" bordered flat :data="models" :columns="columns" row-key="id" />
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import PaginationMixin from 'src/mixins/page/PaginationMixin'
import { Notify } from 'boot/notify'
import { CameraInterface, RawCameraInterface, RawCameraResponse } from 'src/app/models/vision/VisionInterfaces'
import { Camera } from 'src/app/models/vision/VisionModels'

declare module 'vue/types/vue' {
  interface Vue {
    $notify: Notify
  }
}

@Component
export default class CameraTable extends Mixins(PaginationMixin) {
  loading = false

  public models: CameraInterface[] = []

  columns = Camera.getTableColumns()

  private construct () {
    void this.setModels()
  }

  public async setModels () {
    this.loading = true;
    this.models = this.parseResponse(await this.search())
    this.loading = false;
  }

  private async search (): Promise<RawCameraResponse> {
    const response = await this.$axios.get<RawCameraResponse>(`${this.$API_URL}/cameras?include=trafficLight`);
    return response.data;
  }

  private parseResponse (response : RawCameraResponse) : CameraInterface[] {
    return response.data.map((model: RawCameraInterface) => Camera.fromRaw(model));
  }

  public mounted () {
    this.$nextTick(() => this.construct())
  }
}
</script>
