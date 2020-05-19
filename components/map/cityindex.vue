<template>
  <v-card class="mb-10">
    <v-card-title class="headline grey lighten-2" primary-title
      ><span class="mr-5">{{ $t('Index of cities') }}</span>
      <small>{{ ' (' + $t('move_to_search') + ')' }}</small></v-card-title
    >
    <div class="pa-5">
      <v-sheet class="pa-2 mb-5" color="grey lighten-3">
        <span>
          {{
            $t('According to the site of architecures, remains excavated.')
          }}</span
        >
      </v-sheet>

      <v-row>
        <v-col
          v-for="(value, index) in dataRemains"
          :key="index"
          cols="12"
          sm="3"
        >
          <router-link
            :to="
              localePath({
                name: 'search',
                query: {
                  'q-Edificio_IL': value.label,
                  'q-Edificio_all': value.label,
                  'q-title': value.label,
                  advancedOr: true,
                },
              })
            "
            >{{ value.label }}
            <small v-if="value.label_ja"
              >({{ value.label_ja }})</small
            ></router-link
          >
          <v-btn v-if="value.url" icon :href="value.url" target="_blank"
            ><v-icon>mdi-wikipedia</v-icon></v-btn
          >
        </v-col>
      </v-row>

      <v-sheet class="pa-2 my-5" color="grey lighten-3">
        <span> {{ $t('Maps of areas') }}</span>
      </v-sheet>

      <v-row>
        <v-col v-for="(value, index) in dataArea" :key="index" cols="12" sm="4">
          <router-link
            :to="
              localePath({
                name: value.name,
              })
            "
          >
            <span>
              {{ value.label }}
              <small v-if="value.label_ja">({{ value.label_ja }})</small>
            </span>
          </router-link>

          <v-btn v-if="value.url" icon :href="value.url" target="_blank"
            ><v-icon>mdi-wikipedia</v-icon></v-btn
          >
        </v-col>
      </v-row>
    </div>

    <div v-if="markers.length > 0" class="mt-5" style="height: 50vh;">
      <p-map :markers="markers" :zoom="5" :center="[41.9027, 12.4963]" />
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
  head() {
    return {
      titleTemplate: null,
    }
  }

  dataRemains: any = {}
  dataArea: any = {}

  mounted() {
    const self = this
    axios
      .get(this.baseUrl + '/json/city_index.json')
      .then((response) => {
        const data = response.data[0]['http://purl.org/dc/terms/hasPart']

        const dataRemains = data[0]['http://purl.org/dc/terms/hasPart']
        const resultRemains: any = {}
        for (let i = 0; i < dataRemains.length; i++) {
          const obj = dataRemains[i]
          resultRemains[obj['@id']] = {
            label: obj['http://www.w3.org/2000/01/rdf-schema#label'],
          }
        }
        self.dataRemains = resultRemains

        const dataArea = data[1]['http://purl.org/dc/terms/hasPart']
        const resultArea: any = {}
        for (let i = 0; i < dataArea.length; i++) {
          const obj = dataArea[i]
          resultArea[obj['@id']] = {
            label: obj['http://www.w3.org/2000/01/rdf-schema#label'],
            name: obj['http://example.org/slug'],
          }
        }
        self.dataArea = resultArea

        this.getMarkers()
      })
      .catch((error) => {
        console.log({ error })
      })
  }

  markers: any[] = []

  /*
  area: any = {
    'http://dbpedia.org/resource/Paestum': {
      label: 'Pesto',
      name: 'p_maps-pesto',
    },
    'http://dbpedia.org/resource/Pula,_Sardinia': {
      label: 'Pula',
      name: 'p_maps-pula',
    },
    "http://dbpedia.org/resource/Hadrian's_Villa": {
      label: 'Villa Adriana',
      name: 'p_maps-villaadriana',
    },
  }

  data2: any = {
    'http://dbpedia.org/resource/Agrigento': {
      label: 'Agrigento',
    },
    'http://dbpedia.org/resource/Lake_Albano': {
      label: 'Albano',
    },
    'http://dbpedia.org/resource/Ancona': {
      label: 'Ancona',
    },
    'http://dbpedia.org/resource/Anzio': {
      label: 'Anzio',
    },
  }

  data: any[] = [
    'Agrigento',
    'Albano',
    'Ancona',
    'Anzio',
    'Aosta',
    'Athens',
    'Avvezzano',
    'Benevento',
    'Boville (Frattocchie)',
    'Campello sul Clitunno',
    'Capua',
    'Castel Gandolfo',
    'Chiusi',
    'Cori',
    'Cornazzano',
    'Corneto',
    'Ercolano',
    'Frascati',
    'Napoli',
    'Ostia',
    'Padova',
    'Palazzolo',
    'Palestrina',
    'Pesto',
    'Pompei',
    'Posilipo',
    'Pula',
    'Rimini',
    'Roma',
    'Siena',
    'Stabia',
    'Tivoli',
    'Verona',
  ]
  */

  getMarkers() {
    let filter = ''
    let keys = Object.keys(this.dataRemains)
    const keys2 = Object.keys(this.dataArea)
    keys = keys.concat(keys2)

    for (let i = 0; i < keys.length; i++) {
      filter +=
        `
        ?s = <` +
        keys[i] +
        `>
      `
      if (i !== keys.length - 1) {
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

    url = this.baseUrl + '/json/city_index_result.json'

    const self = this
    axios
      .get(url)
      .then((response) => {
        const results = response.data.results.bindings

        const markers = []

        for (let i = 0; i < results.length; i++) {
          const obj = results[i]

          const s = obj.s.value

          let map: any = {}
          if (self.dataRemains[s]) {
            map = self.dataRemains[s]
          } else {
            map = self.dataArea[s]
          }

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
              path: {
                name: 'search',
                query: {
                  'q-Edificio_IL': map.label,
                  'q-Edificio_all': map.label,
                  'q-title': map.label,
                  advancedOr: true,
                },
              },
            }

            markers.push(marker)
          }

          // data 更新
          if (obj.label_ja) {
            map.label_ja = obj.label_ja.value
          }

          map.url = obj.url.value
        }

        this.markers = markers
      })
      .catch((error: any) => {
        // eslint-disable-next-line
        console.error(error)
      })
  }
}
</script>
