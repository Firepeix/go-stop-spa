<template>
  <q-drawer v-model="open" show-if-above bordered content-class="bg-grey-2">
    <q-list>
      <template v-for="(space, index) in spaces">
        <q-separator :key="`separator-${index}`" v-if="index === 0"/>
        <q-item :key="`item-${index}`">
          <q-item-section avatar>
            <q-icon :name="space.icon.name"/>
          </q-item-section>
          <q-item-section>
            <q-item-label header>{{ space.title }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable :to="{ name: link.route }" v-for="(link, subIndex) in space.links" :key="`sub-item-${index}-${subIndex}`">
          <q-item-section avatar>
            <q-icon :name="link.icon.name"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.title }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator :key="`sub-separator-${index}`"/>
      </template>
    </q-list>
  </q-drawer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { NavSpace } from 'src/app/navigation/BarsModels'
import { NavModelLink, NavNamespace } from 'src/app/navigation/Bars'
import { Icon } from 'src/app/primitives/Icon'

@Component
export default class LeftNavBar extends Vue {
  open = true
  public spaces: NavSpace[] = []

  construct () {
    this.setSpaces()
  }

  setSpaces () {
    this.addGeographicSpace()
    this.addControlSpace()
    this.addVisionSpace()
    this.addSimulationSpace()
  }

  addGeographicSpace () {
    const navSpace = new NavNamespace('Geográfico', new Icon('map-marker'))
    navSpace.addLink(new NavModelLink('Ruas', new Icon('map-marker-distance'), 'street.index'))
    this.spaces.push(navSpace)
  }

  addControlSpace () {
    const navSpace = new NavNamespace('Controle', new Icon('camera-control'))
    navSpace.addLink(new NavModelLink('Semáforos', new Icon('traffic-light'), 'traffic-light.index'))
    this.spaces.push(navSpace)
  }

  addVisionSpace () {
    const navSpace = new NavNamespace('Visão', new Icon('eye'))
    navSpace.addLink(new NavModelLink('Cameras', new Icon('camera'), 'camera.index'))
    this.spaces.push(navSpace)
  }

  addSimulationSpace () {
    const navSpace = new NavNamespace('Simulação', new Icon('matrix'))
    navSpace.addLink(new NavModelLink('Simulações', new Icon('stairs'), 'simulation.index'))
    this.spaces.push(navSpace)
  }

  mounted () {
    this.$nextTick(() => this.construct())
  }
}
</script>
