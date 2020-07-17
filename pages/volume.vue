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
        v-for="(collection1, index1) in result4print.collections"
        :key="index1"
        class="mb-10"
      >
        <v-card-title class="headline grey lighten-2" primary-title>{{
          collection1.label
        }}</v-card-title>
        <div class="pa-5">
          <v-row class="mb-5">
            <v-col class="py-0" cols="12" sm="8">
              <template v-if="map[index1 + 1]">
                <v-row
                  v-for="(obj, index2) in map[index1 + 1]"
                  :key="index2 + '-1'"
                >
                  <v-col class="py-0" cols="12" sm="12">
                    <a :href="obj.url" target="_blank">
                      <span
                        >{{ obj.label }} <v-icon>mdi-open-in-new</v-icon></span
                      >
                    </a>
                  </v-col>
                  <v-col cols="12">
                    <v-divider />
                  </v-col>
                </v-row>
              </template>

              <v-row
                v-for="(collection2, index2) in collection1.collections"
                :key="index2 + '-2'"
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
// import axios from 'axios'

@Component
export default class Volume extends Vue {
  head() {
    return {
      title: this.$t('browse'),
    }
  }

  loadingFlag: boolean = false
  title: string = ''
  // data: any = {}

  map: any = {}

  async fetch(context: any) {
    const store = context.store
    const state = store.state

    if (state.collection == null) {
      const index = await context.$axios
        .get('https://piranesi.dl.itc.u-tokyo.ac.jp/data/print/iiif/top2.json')
        .then((res: any) => {
          return res.data
        })
        .catch((error: any) => {
          return error
        })

      store.commit('setCollection', index)
    }
  }

  get result4print(): any {
    return this.$store.state.collection
  }

  mounted() {
    /*
    this.loadingFlag = true
    axios
      .get(
        'https://raw.githubusercontent.com/nakamura196/piranesi/master/docs/print/iiif/top2.json'
      )
      .then((response) => {
        const data = response.data
        // console.log({ data })
        // this.data = data
        console.log({ data })
        this.loadingFlag = false
      })
      */

    this.map = {
      1: [
        {
          label: this.$t('序文'),
          url:
            'https://iiif.dl.itc.u-tokyo.ac.jp/repo/s/piranesi/document/70c86f6a-084f-46c0-8a63-05e5d86aa3c3',
        },
      ],
      2: [
        {
          label: this.$t('序文'),
          url:
            'https://iiif.dl.itc.u-tokyo.ac.jp/repo/s/piranesi/document/75d8b931-d0e4-45af-94da-603a110e6d1f',
        },
      ],
      3: [
        {
          label: this.$t('序文'),
          url:
            'https://iiif.dl.itc.u-tokyo.ac.jp/repo/s/piranesi/document/5ff5e35e-1b66-41c4-8192-22c5ed1b3180',
        },
      ],
      4: [
        {
          label: this.$t('序文'),
          url:
            'https://iiif.dl.itc.u-tokyo.ac.jp/repo/s/piranesi/document/de4e7884-d02e-4234-8986-b86c0e58dc7e',
        },
        {
          label: 'Osservazioni',
          url:
            'https://iiif.dl.itc.u-tokyo.ac.jp/repo/s/piranesi/document/90aff229-9f07-4bbc-b4e7-98273853d85f',
        },
      ],
      6: [
        {
          label: this.$t('序文') + ' PARTE I',
          url:
            'https://iiif.dl.itc.u-tokyo.ac.jp/repo/s/piranesi/document/db8a8835-5f76-412b-921b-f7c78216ee05',
        },
        {
          label: 'PARTE II',
          url:
            'https://iiif.dl.itc.u-tokyo.ac.jp/repo/s/piranesi/document/d1c19d11-f5a6-40a3-b679-72f5011354c4',
        },
        {
          label: 'PARTE III',
          url:
            'https://iiif.dl.itc.u-tokyo.ac.jp/repo/s/piranesi/document/c46591ee-366c-40c5-a118-080c7488f629',
        },
      ],
      7: [
        {
          label: this.$t('序文'),
          url:
            'https://iiif.dl.itc.u-tokyo.ac.jp/repo/s/piranesi/document/a8eb6bb4-3c2e-4bb4-9897-8d97c46a2761',
        },
      ],
      8: [
        {
          label: this.$t('序文') + ' PARTE I',
          url:
            'https://iiif.dl.itc.u-tokyo.ac.jp/repo/s/piranesi/document/2a6d9499-023a-427b-a721-34d186185de0',
        },
        {
          label: 'PARTE II',
          url:
            'https://iiif.dl.itc.u-tokyo.ac.jp/repo/s/piranesi/document/7dc8ccc2-86fb-49ba-8407-15aa84b5fab1',
        },
      ],
      17: [
        {
          label: this.$t('序文'),
          url:
            'https://iiif.dl.itc.u-tokyo.ac.jp/repo/s/piranesi/document/b75cc64a-3dc7-40ac-956a-c08d5527c24f',
        },
      ],
      21: [
        {
          label: this.$t('図版目録'),
          url:
            'https://iiif.dl.itc.u-tokyo.ac.jp/repo/s/piranesi/document/37a42964-6a01-4cba-bcb9-28114af5ab75',
        },
      ],
      23: [
        {
          label: this.$t('図版目録'),
          url:
            'https://iiif.dl.itc.u-tokyo.ac.jp/repo/s/piranesi/document/fc52da49-a19d-49c0-9e20-7cf4b899b2f3',
        },
      ],
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
