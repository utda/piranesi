<template>
  <no-ssr>
    <l-map :zoom="zoom" :center="center">
      <l-tile-layer
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      ></l-tile-layer>

      <l-marker-cluster>
        <l-marker
          v-for="(marker, index) in markers"
          :key="index"
          :lat-lng="marker.latlng"
        >
          <l-popup>
            <nuxt-link :to="localePath(marker.path)">{{
              marker.content
            }}</nuxt-link>
          </l-popup>
        </l-marker>
      </l-marker-cluster>
    </l-map>
  </no-ssr>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'

// const Vue2LeafletMarkerCluster = require('vue2-leaflet-markercluster')

let Vue2LeafletMarkerCluster = {}
if (process.client)
  Vue2LeafletMarkerCluster = require('vue2-leaflet-markercluster')

@Component({
  components: {
    'l-marker-cluster': Vue2LeafletMarkerCluster,
  },
})
export default class Map extends Vue {
  @Prop()
  markers!: any[]

  @Prop({ default: 1 })
  zoom!: number

  @Prop({
    default: [35.681489, 139.767136],
  })
  center!: number[]
}
</script>
<style>
@import 'leaflet.markercluster/dist/MarkerCluster.css';
@import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
</style>
