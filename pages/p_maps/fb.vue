<template>
  <v-container class="my-5">
    <v-sheet color="grey lighten-3" class="mb-10">
      <v-breadcrumbs
        :items="[
          {
            text: $t('top'),
            disabled: false,
            to: localePath({
              name: 'index',
            }),
          },
          {
            text: $t('rome_map'),
            disabled: false,
            to: localePath({
              name: 'mapsearch',
            }),
          },
        ]"
      ></v-breadcrumbs>
    </v-sheet>

    <h2 class="my-5">Rome map - <i>Foro Boario, Foro Olitrio</i></h2>

    <div class="text-center">
      <img
        :src="baseUrl + '/img/p_maps/img/fb.jpg'"
        alt="UrbsRoma"
        width="476"
        height="397"
        border="0"
        usemap="#Map"
        class="mb-5"
      />
    </div>

    <map name="Map">
      <area
        shape="rect"
        coords="117,150,150,181"
        :href="getUrl(32)"
        target="_blank"
      />
      <area
        shape="rect"
        coords="166,77,202,107"
        :href="getUrl(24)"
        target="_blank"
      />
      <area
        shape="rect"
        coords="404,89,450,130"
        :href="getUrl(23)"
        target="_blank"
      />
      <area
        shape="rect"
        coords="267,192,316,220"
        :href="getUrl(112)"
        target="_blank"
      />
      <area
        shape="rect"
        coords="321,213,355,248"
        :href="getUrl(25)"
        target="_blank"
      />
      <area
        shape="rect"
        coords="353,262,396,301"
        :href="getUrl(26)"
        target="_blank"
      />
      <area
        shape="rect"
        coords="308,313,347,352"
        :href="getUrl(27)"
        target="_blank"
      />
      <area
        shape="rect"
        coords="202,304,249,345"
        :href="getUrl(28)"
        target="_blank"
      />
      <area
        shape="rect"
        coords="4,237,37,272"
        :href="getUrl(31)"
        target="_blank"
      />
      <area
        shape="rect"
        coords="36,309,81,341"
        :href="getUrl(29)"
        target="_blank"
      />
      <area
        shape="rect"
        coords="20,365,62,396"
        :href="getUrl(30)"
        target="_blank"
      />
    </map>

    <template v-for="(obj, key) in results">
      <v-card :id="obj.id" :key="key" class="mb-10">
        <v-card-title class="grey lighten-2"
          >{{ obj.label }} <i>{{ obj.label_la }}</i></v-card-title
        >

        <div class="pa-5">
          <v-simple-table :key="'table-' + key" v-slot:default class="mb-5">
            <template>
              <thead>
                <tr>
                  <th class="text-left">{{ $t('map_no') }}</th>
                  <th class="text-left">{{ $t('it') }}</th>
                  <th class="text-left">{{ $t('la') }}</th>
                  <th class="text-left">{{ $t('ja') }}</th>
                  <th class="text-left">{{ $t('wikipedia') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, key2) in obj.children" :key="key2">
                  <td>
                    <nuxt-link
                      :to="
                        localePath({
                          name: 'compare',
                          query: { map_no: item.n },
                        })
                      "
                      >{{ item.n }}</nuxt-link
                    >
                  </td>
                  <td>{{ item.label }}</td>
                  <td>
                    <i>{{ item.label_la }}</i>
                  </td>
                  <td>
                    {{ item.label_ja }}
                  </td>
                  <td>
                    <a v-if="item.url" :href="item.url" target="_blank">
                      <v-icon>mdi-wikipedia</v-icon>
                    </a>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>

        <div
          v-if="markersMap[key] && markersMap[key].length > 0"
          id="map-wrap"
          :key="'map-' + key"
          style="height: 50vh;"
        >
          <p-map
            :markers="markersMap[key]"
            :zoom="16"
            :center="[41.888889, 12.481111]"
          />
        </div>
      </v-card>
    </template>

    <v-sheet color="grey lighten-3" class="mt-10">
      <v-breadcrumbs
        :items="[
          {
            text: $t('top'),
            disabled: false,
            to: localePath({
              name: 'index',
            }),
          },
          {
            text: $t('rome_map'),
            disabled: false,
            to: localePath({
              name: 'mapsearch',
            }),
          },
        ]"
      ></v-breadcrumbs>
    </v-sheet>
  </v-container>
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
  getUrl(id: string) {
    return (
      this.baseUrl +
      (this.$i18n.locale === 'ja' ? '' : '/en') +
      '/compare?map_no=' +
      id
    )
  }

  baseUrl: any = process.env.BASE_URL
  head() {
    return {
      title: 'Rome map - Foro Romano',
    }
  }

  ids = ['http://dbpedia.org/resource/Forum_Boarium']

  results: any = {}
  uris: string[] = []
  markersMap: any = {}

  mounted() {
    const self = this
    axios
      .get(this.baseUrl + '/json/map.json')
      .then((response) => {
        const data = response.data[0]['http://purl.org/dc/terms/hasPart']

        const results: any = {}

        const uris: string[] = this.uris

        for (let l = 0; l < data.length; l++) {
          const obj = data[l]
          const id = obj['@id']
          if (this.ids.includes(id)) {
            // 形式の修正
            const result: any = this.arrange(obj, id)
            results[id] = result[id]

            for (const childId in result[id].children) {
              if (childId.includes('http://dbpedia.org')) {
                uris.push(childId)
              }
            }
            if (id.includes('http://dbpedia.org')) {
              uris.push(id)
            }
          }
        }

        self.uris = uris
        self.results = results

        this.getMarkers()
      })
      .catch((error) => {
        console.log({ error })
      })
  }

  arrange(obj: any, id: string) {
    // console.log({ id, obj })

    const results: any = {}

    const dataChildren = obj['http://purl.org/dc/terms/hasPart']

    const resultChildren: any = {}
    for (let i = 0; i < dataChildren.length; i++) {
      const obj2 = dataChildren[i]

      const tmp: any = {
        label: obj2['http://www.w3.org/2000/01/rdf-schema#label'][0].value,
        n: obj2['http://example.org/slug'],
      }

      if (obj2['http://www.w3.org/2000/01/rdf-schema#label'].length > 1) {
        tmp.label_la =
          obj2['http://www.w3.org/2000/01/rdf-schema#label'][1].value
      }

      resultChildren[obj2['@id']] = tmp
    }
    results[id] = {
      label: obj['http://www.w3.org/2000/01/rdf-schema#label'][0].value,
      label_la:
        obj['http://www.w3.org/2000/01/rdf-schema#label'].length > 1
          ? obj['http://www.w3.org/2000/01/rdf-schema#label'][1].value
          : '',
      children: resultChildren,
      id: obj['http://example.org/slug'],
    }

    return results
  }

  getMarkers() {
    let filter = ''

    const uris = this.uris

    for (let i = 0; i < uris.length; i++) {
      filter +=
        `
        ?s = <` +
        uris[i] +
        `>
      `
      if (i !== uris.length - 1) {
        filter += '||'
      }
    }

    const query =
      `
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      SELECT * WHERE {
        
        ?s rdfs:label ?label . 
        filter ( ` +
      filter +
      ` ) . 
        filter (lang(?label) = "en") . 
        ?s foaf:isPrimaryTopicOf ?url . 
        optional { ?s rdfs:comment ?comment . filter (lang(?comment) = "en") }

        optional { ?s rdfs:label ?label_ja . filter (lang(?label_ja) = "ja") }
        optional { ?s rdfs:comment ?comment_ja . filter (lang(?comment_ja) = "ja") }
        
        optional { ?s georss:point ?p }
        optional { ?s dbo:thumbnail ?thumbnail } 
      }
    `

    let url = 'https://dbpedia.org/sparql/?query='

    url = url + encodeURIComponent(query) + '&output=json'

    url = this.baseUrl + '/json/map_result.json'

    const self = this
    axios
      .get(url)
      .then((response) => {
        const results_ = response.data.results.bindings

        const dbpediaMap: any = {}

        for (let i = 0; i < results_.length; i++) {
          const obj = results_[i]

          const s = obj.s.value

          if (obj.p) {
            const p = obj.p.value.split(' ')
            const marker = {
              latlng: [Number(p[0]), Number(p[1])],
              content: {
                label:
                  self.$i18n.locale === 'ja' && obj.label_ja
                    ? obj.label_ja.value
                    : obj.label
                    ? obj.label.value
                    : '',
                thumbnail: obj.thumbnail ? obj.thumbnail.value : '',
                description:
                  self.$i18n.locale === 'ja' && obj.comment_ja
                    ? obj.comment_ja.value
                    : obj.comment
                    ? obj.comment.value
                    : '',
                url: obj.url.value,
              },

              label_ja: obj.label_ja ? obj.label_ja.value : '',
            }
            dbpediaMap[s] = marker
          }
        }

        // 反映
        const results = self.results
        const markersMap: any = {}

        for (const id in results) {
          if (dbpediaMap[id]) {
            results[id].resultMap = dbpediaMap[id]
          }

          markersMap[id] = []

          const children = results[id].children
          for (const childId in children) {
            const child = children[childId]

            if (dbpediaMap[childId]) {
              // マーカー
              const marker: any = dbpediaMap[childId]

              marker.path = {
                name: 'search',
                query: {
                  'q-Edificio_IL': child.label,
                  'q-Edificio_all': child.label,
                  'q-title': child.label,
                  advancedOr: true,
                },
              }

              markersMap[id].push(marker)

              // テープル用
              child.resultMap = marker
              child.url = marker.content.url
              child.label_ja = marker.label_ja
            }
          }
        }

        this.markersMap = markersMap
        this.results = results
      })
      .catch((error: any) => {
        // eslint-disable-next-line
        console.error(error)
      })
  }
}
</script>
