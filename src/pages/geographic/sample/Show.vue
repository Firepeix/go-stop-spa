<template>
  <q-page class="row justify-evenly">
    <div class="col">
      <q-card class="q-ma-lg" v-if="sample !== null">
        <q-card-section class="title-page">
          <div class="row">
            <div class="col-10 title-card" >
              <q-icon name="mdi-map-marker-radius"/>
              <span> {{ sample.name }}</span>
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
        <q-card-section class="q-pa-none">
          <sample :sample="sample" />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { RawSampleInterface, Sample as SampleModel, SampleInterface } from 'src/app/models/simulations/Sample'
import SampleTable from 'components/geographic/sample/SampleTable.vue'
import Sample from 'components/geographic/sample/Sample.vue'
@Component({
  components: { Sample, SampleTable }
})
export default class SampleIndex extends Vue {
  public sample : SampleInterface|null = null

  public construct () {
    this.setSample()
  }

  public async setSample () {
    this.sample = await this.getSample()
  }

  @Watch('$route')
  public onIdChange (to: { params: { id: number } }) {
    if (this.sample === null || this.sample.id !== Number(to.params.id)) {
      this.construct();
    }
  }

  public async getSample () : Promise<SampleInterface> {
    const response = await this.$axios.get(`${this.$API_URL}/samples/${this.$route.params.id}`)
    return Promise.resolve(this.parseSample(response.data.data))
  }

  public parseSample (rawSample: RawSampleInterface): SampleInterface {
    return SampleModel.CreateFromModel(rawSample)
  }

  public mounted () {
    this.$nextTick(() => this.construct())
  }
}
</script>
