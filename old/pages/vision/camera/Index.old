<template>
  <q-page class="row justify-evenly">
    <div class="col">
      <q-card class="q-ma-lg">
        <q-card-section class="title-page">
          <div class="row">
            <div class="col-2 title-card" >
              <q-icon name="mdi-camera"/>
              <span> Cameras</span>
            </div>
            <div class="col">
              <div class="row q-gutter-md justify-end">
                <div class="col-2">
                  <q-btn color="positive" icon="mdi-plus-circle-outline"  @click="openCreateModal" unelevated class="full-width" label="Camera"/>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-separator/>
        <q-card-section>
          <div class="row">
            <div class="col">
              <camera-table ref="cameraTable" />
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
import CameraTable from 'components/vision/camera/CameraTable.vue'
import CreateModal from 'pages/vision/camera/CreateModal.vue'
import CreateCamera from 'pages/vision/camera/CreateModal.vue'

@Component({
  components: { CreateModal, CameraTable }
})
export default class CameraIndex extends Vue {
  $refs!: {
    cameraTable: CameraTable
    createModal: CreateCamera
  }
  openCreateModal () {
    this.$refs.createModal.open();
  }

  private refresh () : void {
    this.$refs.cameraTable.setModels();
  }
}
</script>
