<template>
  <q-table @request="setStreets" :loading="loading" :pagination.sync="paginationOptions" bordered flat :data="streets" :columns="columns" row-key="id"/>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import PaginationMixin from 'src/mixins/page/PaginationMixin'
import { RawStreetInterface, RawStreetResponse, StreetInterface } from 'src/app/models/geographic/GeographicInterfaces'
import { Street } from 'src/app/models/geographic/GeographicModels'
import { Notify } from 'boot/notify'

declare module 'vue/types/vue' {
  interface Vue {
    $notify: Notify
  }
}

@Component
export default class StreetTable extends Mixins(PaginationMixin) {
  loading = false

  public streets: StreetInterface[] = []

  columns = Street.getTableColumns()

  private construct () {
    void this.setStreets()
  }

  public async setStreets (): Promise<void> {
    this.loading = true
    this.streets = this.parseResponse(await this.searchStreets())
    this.loading = false
  }

  private async searchStreets (): Promise<RawStreetResponse> {
    const response = await this.$axios.get<RawStreetResponse>(`${this.$API_URL}/streets`)
    return response.data
  }

  private parseResponse (response: RawStreetResponse): StreetInterface[] {
    return response.data.map((street: RawStreetInterface) => Street.fromRaw(street))
  }

  public mounted () {
    this.$nextTick(() => this.construct())
  }
}
</script>
