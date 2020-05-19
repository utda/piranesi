<template>
  <no-ssr>
    <l-map :zoom="zoom" :center="center" style="z-index: 0;">
      <l-tile-layer
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      ></l-tile-layer>

      <l-marker-cluster>
        <template v-for="(marker, index) in markers">
          <l-marker :key="index" :lat-lng="marker.latlng">
            <!-- 
          <l-icon class-name="someExtraClass" :icon-anchor="staticAnchor">
            <div class="headline">
              {{ marker.n ? marker.n : 'N' }}
            </div>
          </l-icon>
          -->
            <l-popup v-if="marker.content" width="300px">
              <v-card width="300" elevation="0">
                <v-list-item three-line>
                  <v-list-item-content>
                    <nuxt-link :to="localePath(marker.path)">
                      <v-list-item-title class="headline mb-1">{{
                        marker.content.label
                      }}</v-list-item-title>
                    </nuxt-link>
                    <div>
                      {{
                        marker.content.description.length > 150
                          ? marker.content.description.slice(0, 150) + '...'
                          : marker.content.description
                      }}
                      <a
                        class="ml-2"
                        :href="marker.content.url"
                        target="_blank"
                        >{{ $t('wikipedia') }}</a
                      >
                    </div>
                  </v-list-item-content>

                  <v-list-item-avatar
                    tile
                    size="80"
                    color="grey"
                    :src="marker.content.thumbnail"
                  >
                    <v-img contain :src="marker.content.thumbnail"></v-img>
                  </v-list-item-avatar>
                </v-list-item>
              </v-card>
            </l-popup>
          </l-marker>
        </template>
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

  staticAnchor: number[] = [16, 37]
}
</script>
<style>
@import 'leaflet.markercluster/dist/MarkerCluster.css';
@import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
.someExtraClass {
  /*background-color: aqua;*/
  padding: 10px;
  border: 1px solid #333;
  border-radius: 0 20px 20px 20px;
  box-shadow: 5px 3px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: auto !important;
  height: auto !important;
  margin: 0 !important;
  color: blue;
}
</style>
