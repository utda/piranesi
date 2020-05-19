<template>
  <div>
    <v-container>
      <h2 class="my-5">
        {{ $t('browse') }}
      </h2>

      <div v-show="loadingFlag" class="text-center pa-10">
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>

      <v-card
        v-for="(collection1, index1) in data.collections"
        :key="index1"
        class="mb-10"
      >
        <v-card-title class="headline grey lighten-2" primary-title>{{
          collection1.label
        }}</v-card-title>
        <div class="pa-5">
          <v-row class="mb-5">
            <v-col class="py-0" cols="12" sm="8">
              <v-row v-if="map[index1]">
                <v-col class="py-0" cols="12" sm="12">
                  <a :href="map[index1].url" target="_blank">
                    {{ map[index1].label }}
                  </a>
                </v-col>
                <v-col cols="12">
                  <v-divider />
                </v-col>
              </v-row>

              <v-row
                v-for="(collection2, index2) in collection1.collections"
                :key="index2"
                class="mb-5"
              >
                <v-col class="py-0" cols="12" sm="2">
                  <nuxt-link
                    :to="
                      localePath({
                        name: 'search',
                        query: { 'fc-volume': item(collection2).vol },
                      })
                    "
                  >
                    {{
                      $i18n.locale == 'en'
                        ? 'Vol. ' + item(collection2).vol
                        : item(collection2).vol + '巻'
                    }}
                  </nuxt-link>
                </v-col>
                <v-col class="pt-0" cols="12" sm="10">
                  <nuxt-link
                    :to="
                      localePath({
                        name: 'search',
                        query: { 'fc-volume': item(collection2).vol },
                      })
                    "
                  >
                    {{ item(collection2).title }}</nuxt-link
                  >
                  <template v-if="$i18n.locale == 'ja'">
                    <br />
                    <small>{{ item(collection2).titleJP }}</small>
                  </template>
                </v-col>
                <v-col cols="12">
                  <v-divider />
                </v-col>
              </v-row>
            </v-col>
            <v-col class="py-0" cols="12" sm="4">
              <nuxt-link
                :to="
                  localePath({
                    name: 'search',
                    query: { 'fc-volume': collection(collection1).vol },
                  })
                "
              >
                <v-img
                  :src="collection(collection1).thumbnail"
                  contain
                  style="height: 200px;"
                  class="grey lighten-2"
                ></v-img>
              </nuxt-link>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import axios from 'axios'

@Component
export default class Volume extends Vue {
  loadingFlag: boolean = false
  title: string = ''
  data: any = {}

  map: any = {}

  mounted() {
    this.loadingFlag = true
    axios
      .get(
        'https://raw.githubusercontent.com/nakamura196/piranesi/master/docs/print/iiif/top2.json'
      )
      .then((response) => {
        const data = response.data
        // console.log({ data })
        this.data = data
        this.loadingFlag = false
      })

    this.map = {
      0: {
        label: this.$t('序文'),
        url:
          'https://iiif.dl.itc.u-tokyo.ac.jp/repo/s/piranesi/document/70c86f6a-084f-46c0-8a63-05e5d86aa3c3',
      },
    }
  }

  item(collection: any) {
    const manifest = collection.manifests[0]
    const metadata = manifest.metadata

    let vol = ''
    let title = ''
    let titleJP = ''

    for (let i = 0; i < metadata.length; i++) {
      const obj = metadata[i]
      const label = obj.label
      const value = obj.value
      if (label === 'volume') {
        vol = value
      } else if (label === 'series') {
        title = value
      } else if (label === 'series_JP') {
        titleJP = value
      }
    }
    return {
      vol,
      title,
      titleJP,
    }
  }

  collection(collection: any) {
    const manifest = collection.collections[0].manifests[0]
    const thumbnail = manifest.thumbnail
    const metadata = manifest.metadata

    let vol = ''
    for (let i = 0; i < metadata.length; i++) {
      const obj = metadata[i]
      const label = obj.label
      const value = obj.value
      if (label === 'volume') {
        vol = value
      }
    }
    return {
      thumbnail,
      vol,
    }
  }
}
</script>
