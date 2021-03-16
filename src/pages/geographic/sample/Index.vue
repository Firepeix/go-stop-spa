<template>
  <q-page class="row justify-evenly">
    <div class="col">
      <q-card class="q-ma-lg">
        <q-card-section class="title-page">
          <div class="row">
            <div class="col-2 title-card" >
              <q-icon name="mdi-map-marker-radius"/>
              <span> Amostras</span>
            </div>
            <div class="col">
              <div class="row q-gutter-md justify-end">
                <div class="col-3">
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-separator/>
        <q-card-section>
          <div class="row">
            <div class="col">
              <sample-table ref="sampleTable" :samples="samples" />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { RawSampleInterface, RawSampleInterfaceResponse, Sample, SampleInterface } from 'src/app/models/simulations/Sample'
import SampleTable from 'components/geographic/sample/SampleTable.vue'
@Component({
  components: { SampleTable }
})
export default class SampleIndex extends Vue {
  public samples : SampleInterface[] = []

  public construct () {
    void this.setSamples()
  }

  public async setSamples () {
    this.samples = await this.getSamples()
  }

  public async getSamples () : Promise<SampleInterface[]> {
    const response = await this.$axios.get<RawSampleInterfaceResponse>(`${this.$API_URL}/samples`)
    return Promise.resolve(this.parseSample(response.data.data))
  }

  public parseSample (rawSamples: RawSampleInterface[]): SampleInterface[] {
    return rawSamples.map(rawSample => Sample.CreateFromModel(rawSample))
  }

  public mounted () {
    this.$nextTick(() => this.construct())
  }
}
</script>
