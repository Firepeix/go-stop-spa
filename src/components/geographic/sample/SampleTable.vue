<template>
  <q-table @row-click="goToSample" @request="setSamples" :loading="loading" :pagination.sync="paginationOptions" bordered flat :data="samples" :columns="columns" row-key="id"/>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator'
import PaginationMixin from 'src/mixins/page/PaginationMixin'
import { Notify } from 'boot/notify'
import { Sample, SampleInterface } from 'src/app/models/simulations/Sample'

declare module 'vue/types/vue' {
  interface Vue {
    $notify: Notify
  }
}

@Component
export default class StreetTable extends Mixins(PaginationMixin) {
  loading = false
  @Prop({ type: Array, required: true }) readonly samples!: SampleInterface[];

  columns = Sample.getTableColumns()

  private construct () {
    void this.setSamples()
  }

  public async setSamples (): Promise<void> {
  }

  public goToSample (event: Event, sample: SampleInterface) {
    this.$router.push({ name: 'sample.show', params: { id: String(sample.id) } })
  }

  public mounted () {
    this.$nextTick(() => this.construct())
  }
}
</script>
