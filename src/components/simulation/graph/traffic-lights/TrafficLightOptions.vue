<template>
  <div class="row">
    <div class="col">
      <div class="row">
        <div class="col">
          <q-input :value="node.switchTime" @input="changeSwitchTime" hint="Em Segundos" type="number" dense label="Tempo De Troca" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { TrafficLightNode } from 'src/app/simulations/Node'

@Component
export default class TrafficLightOptions extends Vue {

  @Prop({ type: Object, required: false }) readonly node!: TrafficLightNode;

  private construct (): void {
  }

  public changeSwitchTime (time: number) : void {
    this.node.changeSwitchTime(time)
  }

  public mounted () {
    this.$nextTick(() => this.construct())
  }
}
</script>
