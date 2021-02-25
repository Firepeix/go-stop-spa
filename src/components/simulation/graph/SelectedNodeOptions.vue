<template>
  <div id="selected-node-options" v-if="node !== null">
    <div class="row">
      <div class="col">
        <q-chip class="full-width" square :color="node.color"><div class="text-center full-width text-bold label">{{ node.label }}</div></q-chip>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <q-input @input="changeName" :value="node.name" dense label="Nome" />
      </div>
    </div>
    <traffic-light-options class="q-mt-sm" :node="node" v-if="node.isTrafficLight" />
    <div class="row q-mt-xs q-col-gutter-md">
      <div class="col-6">
        <q-btn color="positive" @click="connect" dense unelevated class="full-width" label="Conectar"/>
      </div>
      <div class="col-6">
        <q-btn color="negative" @click="removeNode" dense unelevated class="full-width" label="Remover"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import TrafficLightOptions from 'components/simulation/graph/traffic-lights/TrafficLightOptions.vue'
import { NodeInterface } from 'src/app/simulations/NodeInterface'
@Component({
  components: { TrafficLightOptions }
})
export default class SelectedNodeOptions extends Vue {
  @Prop({ type: Object, required: false }) readonly node!: NodeInterface;

  private previousSelected : NodeInterface|null = null

  public changeName (name: string) : void {
    this.node.changeName(name)
  }

  public connect () : void {
    this._keep(this.node)
  }

  private _keep (node: NodeInterface) {
    this.previousSelected = node
    this.$emit('unselect')
  }

  @Watch('node')
  public onNodeChanged () {
    if (this.node !== null) {
      console.log(this.node)
    }
    if (this.previousSelected !== null && this.node !== null) {
      this._connectTo(this.node)
    }
  }

  private _connectTo (node: NodeInterface) {
    if (this.previousSelected !== null) {
      this.previousSelected.connectTo(node)
      this.previousSelected = null
    }
  }

  public removeNode () : void {
    this.node.remove()
    this.$emit('unselect')
  }
}
</script>
<style lang="stylus">
#selected-node-options
  border-left solid rgb(194 194 194) 1px
  height 100%
  padding-left 12px
  .label
    color white
    text-outline-color #514b4b
    text-outline-width 1.5

</style>
