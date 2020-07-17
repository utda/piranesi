<template>
  <div>
    <v-container>
      <h2 class="my-5">
        {{ $t('data_set') }}
      </h2>

      <p>
        <template v-if="$i18n.locale == 'ja'">
          本サイトの構築に利用しているデータの一覧です。
        </template>
      </p>

      <v-row>
        <v-col v-for="(data, index) in dataSet" :key="index" cols="12" sm="3">
          <v-card class="mx-auto" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">
                  <a :href="data.url" target="_blank">{{ data.label }} </a>
                </v-list-item-title>
                <v-list-item-subtitle>{{
                  data.description
                }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar tile size="80">
                <v-img contain :src="data.icon" />
              </v-list-item-avatar>
            </v-list-item>

            <v-card-actions>
              <v-btn
                v-for="(obj, index2) in data.related"
                :key="index2"
                text
                color="primary"
                :href="obj.url"
                target="_blank"
                >{{ obj.label }}</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class Data extends Vue {
  baseUrl: any = process.env.BASE_URL
  title: string = ''
  dataSet: any[] = []

  head() {
    return {
      title: this.$t('data_set'),
    }
  }

  mounted() {
    this.dataSet = [
      {
        label: this.$t('list_of_prints'),
        icon: this.baseUrl + '/img/iiif-logo.svg',
        description: '',
        url: this.baseUrl + '/data/print/iiif/top.json',
        related: [
          {
            label: this.$t('view_ia'),
            url:
              'https://www.kanzaki.com/works/2016/pub/image-annotator?u=' +
              this.baseUrl +
              '/data/print/iiif/top.json',
          },
        ],
      },
      {
        label: this.$t('list_of_photo'),
        icon: this.baseUrl + '/img/iiif-logo.svg',
        description: '',
        url: this.baseUrl + '/data/photo/iiif/top.json',
        related: [
          {
            label: this.$t('view_ia'),
            url:
              'https://www.kanzaki.com/works/2016/pub/image-annotator?u=' +
              this.baseUrl +
              '/data/photo/iiif/top.json',
          },
        ],
      },
      {
        label: this.$t('Index of cities'),
        icon: this.baseUrl + '/img/rdf-logo.svg',
        description: '',
        url: this.baseUrl + '/json/city_index.json',
        related: [
          {
            label: this.$t('view_ld'),
            url:
              'https://www.kanzaki.com/works/2014/pub/ld-browser?u=' +
              this.baseUrl +
              '/json/city_index.json',
          },
        ],
      },
      {
        label: this.$t('Maps of areas'),
        icon: this.baseUrl + '/img/rdf-logo.svg',
        description: '',
        url: this.baseUrl + '/json/map.json',
        related: [
          {
            label: this.$t('view_ld'),
            url:
              'https://www.kanzaki.com/works/2014/pub/ld-browser?u=' +
              this.baseUrl +
              '/json/map.json',
          },
        ],
      },
      {
        label: this.$t('Index of all places'),
        icon: this.baseUrl + '/img/json-logo.svg',
        description: '',
        url: this.baseUrl + '/json/edificio.json',
        related: [],
      },
      {
        label: this.$t('subject'),
        icon: this.baseUrl + '/img/json-logo.svg',
        description: '',
        url: this.baseUrl + '/json/subject.json',
        related: [],
      },
    ]
  }
}
</script>
