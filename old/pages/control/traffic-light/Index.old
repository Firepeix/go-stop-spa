<template>
  <q-page class="row justify-evenly">
    <div class="col">
      <q-card class="q-ma-lg">
        <q-card-section class="title-page">
          <div class="row">
            <div class="col-2 title-card" style="height: 36px">
              <q-icon name="mdi-traffic-light"/>
              <span style="height: 23px"> Semáforos</span>
            </div>
            <div class="col">
              <div class="row q-gutter-md justify-end">
                <div class="col-3">
                  <q-btn color="positive" icon="mdi-plus-circle-outline"  @click="openCreateModal" unelevated class="full-width" label="Semáforo"/>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-separator/>
        <q-card-section>
          <div class="row">
            <div class="col">
              <traffic-light-table ref="trafficLightTable"/>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <create-modal ref="createModal" @model-created="refresh" />
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import CreateModal from 'pages/control/traffic-light/CreateModal.vue'
import TrafficLightTable from 'components/control/traffic-light/TrafficLightTable.vue'

@Component({
  components: { TrafficLightTable, CreateModal }
})
export default class TrafficLightIndex extends Vue {
  $refs!: {
    createModal: CreateModal,
    trafficLightTable: TrafficLightTable
  }

  openCreateModal () {
    this.$refs.createModal.open();
  }

  private refresh () : void {
    this.$refs.trafficLightTable.setModels();
  }
}
</script>
