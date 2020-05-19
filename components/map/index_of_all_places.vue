<template>
  <v-card class="pb-5 mb-10">
    <v-card-title class="headline grey lighten-2" primary-title
      ><span class="mr-5"
        >{{ $t('Index of all places') }} {{ $t('[ A to Z ]') }}</span
      ><small>{{ ' (' + $t('move_to_comp') + ')' }}</small></v-card-title
    >
    <div class="pa-5">
      <ul>
        <li>{{ $t('[ ]= the no. on the Roman map.') }}</li>
        <li>{{ $t("' '= the Latin name of the site.") }}</li>
      </ul>
      <v-list>
        <v-list-item-group>
          <v-list-item v-for="(obj, key) in result" :key="key">
            <v-list-item-content>
              <router-link
                :to="
                  localePath({ name: 'compare', query: { Edificio_IL: key } })
                "
                >{{ key }}</router-link
              >
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import axios from 'axios'
import sheet from '~/components/common/Sheet.vue'
import pMap from '~/components/map/Map.vue'

@Component({
  components: {
    sheet,
    pMap,
  },
})
export default class Page extends Vue {
  baseUrl: any = process.env.BASE_URL

  // data: []

  result: any = {}

  created() {
    this.init()
  }

  init() {
    axios.get(this.baseUrl + '/json/edificio.json').then((response) => {
      const result = response.data
      this.result = result

      console.log({ result })

      /*

      const data = {}
      const index = {}

      // 初期化
      const manifests = result.manifests
      for (let i = 0; i < manifests.length; i++) {
        const obj = manifests[i]
        const metadata = obj.metadata

        const map = {}
        for (let j = 0; j < metadata.length; j++) {
          const m = metadata[j]
          const label = m.label
          const value = m.value
          if (!index[label]) {
            index[label] = {}
          }
          if (!index[label][value]) {
            index[label][value] = []
          }
          index[label][value].push(obj['@id'])

          map[label] = value
        }

        data[obj['@id']] = map

        map.thumbnail = obj.thumbnail
        map.manifest = obj['@id']
      }

      const obj = index.Edificio_IL
      const arr = []
      for (const key in obj) {
        arr.push(key)
      }
      this.data = arr.sort()

      */
    })
  }
}
</script>
