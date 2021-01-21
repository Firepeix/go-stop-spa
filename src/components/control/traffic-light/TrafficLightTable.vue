<template>
  <q-table @request="setModels" :loading="loading" :pagination.sync="paginationOptions" bordered flat :data="models" :columns="columns" row-key="id">
    <template v-slot:body-cell-more="props">
      <!--q-td :props="props" class="more-menu">
        <dotted-menu align="justify-center" v-if="props.row.permissions !== null && props.row.permissions !== undefined">
          <q-item clickable v-close-popup v-if="props.row.permissions.data.read" @click="action(props.row.id, 'show')">
            <q-item-section><span class="see"><q-icon name="mdi-eye"></q-icon>&nbsp; Ver Detalhes</span></q-item-section>
          </q-item>
          <q-item clickable v-close-popup v-if="props.row.permissions.data.update" @click="action(props.row.id, 'edit')">
            <q-item-section><span class="edit"><q-icon name="mdi-pencil"></q-icon>&nbsp; Editar</span></q-item-section>
          </q-item>
          <q-item clickable v-close-popup v-if="props.row.permissions.data.delete" @click="action(props.row.id, 'remove')">
            <q-item-section><span class="delete"><q-icon name="mdi-close"></q-icon>&nbsp; Excluir</span></q-item-section>
          </q-item>
        </dotted-menu>
      </q-td-->
    </template>
  </q-table>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import PaginationMixin from 'src/mixins/page/PaginationMixin'
import { RawStreetInterface, RawStreetResponse, StreetInterface } from 'src/app/models/geographic/GeographicInterfaces'
import { Street } from 'src/app/models/geographic/GeographicModels'
import { Notify } from 'boot/notify'
import { AxiosPromise } from 'axios'
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
    this.setModels()
  }

  public async setModels () {
    this.loading = true;
    this.models = await this.parseResponse(await this.search())
    this.loading = false;
  }

  private async search (): Promise<RawTrafficLightResponse> {
    const response = await this.$axios.get<RawTrafficLightResponse>(`${this.$API_URL}/traffic-lights?include=street`);
    return response.data;
  }

  private async parseResponse (response : RawTrafficLightResponse) : Promise<TrafficLightInterface[]> {
    return response.data.map((model: RawTrafficLightInterface) => new TrafficLight(model.defaultSwitchTime, model.streetId, new Street(model.street.data.name), model.protocol));
  }

  public mounted () {
    this.$nextTick(() => this.construct())
  }
}
</script>
