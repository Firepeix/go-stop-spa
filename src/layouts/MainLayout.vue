<template>
  <q-layout view="hHh LpR lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="mdi-menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          GO STOP
        </q-toolbar-title>

        <div>Protótipo</div>
      </q-toolbar>
    </q-header>
    <left-nav-bar />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import LeftNavBar from "components/navigation/bars/LeftNavBar.vue";

@Component({
  components: { LeftNavBar }
})
export default class MainLayout extends Vue {
}
</script>
