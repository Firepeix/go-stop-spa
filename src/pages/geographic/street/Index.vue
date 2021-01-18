<template>
  <q-page class="row justify-evenly">
    <div class="col">
      <q-card class="q-ma-lg">
        <q-card-section class="title-page">
          <div class="row" >
            <div class="col-2 title-card" style="height: 36px">
              <q-icon name="mdi-map-marker-distance"/>
              <span style="height: 23px"> Ruas</span>
            </div>
            <div class="col">
              <div class="row q-gutter-md justify-end" >
                <div class="col-2">
                  <q-btn color="positive" icon="mdi-plus-circle-outline" :to="{ name: 'street.create' }" unelevated class="full-width" label="Rua"/>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-separator/>
        <q-card-section>
          <div class="row">
            <div class="col">

            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import ExampleComponent from 'components/ClassComponent.vue'
import {Vue, Component} from 'vue-property-decorator'

@Component({
  components: {ExampleComponent}
})
export default class StreetIndex extends Vue {
}
</script>
