<template>
  <div>
    <v-container>
      <h2 class="my-5">
        {{ $t('latin_inscriptions') }}
      </h2>

      <v-row>
        <v-col v-for="(data, index) in dataSet" :key="index" cols="12" sm="3">
          <CardItem
            :item="{
              path: {
                name: 'inscription-' + data.id,
              },
              image: baseUrl + '/img/CIL_list/img/' + data.id + '.jpg',
              label: data.label,
              url: baseUrl + '/inscription/' + data.id,
            }"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import CardItem from '~/components/display/CardItem.vue'

@Component({
  components: {
    CardItem,
  },
})
export default class Data extends Vue {
  baseUrl: any = process.env.BASE_URL
  title: string = ''
  dataSet: any[] = []

  head() {
    return {
      titleTemplate: null,
      title: this.$t('latin_inscriptions'),
    }
  }

  mounted() {
    this.dataSet = [
      {
        label: this.$i18n.locale === 'ja' ? '第2巻 第18葉' : 'Vol. 2 Page. 18',
        id: '2018',
      },
      {
        label: this.$i18n.locale === 'ja' ? '第2巻 第19葉' : 'Vol. 2 Page. 19',
        id: '2019',
      },
      {
        label: this.$i18n.locale === 'ja' ? '第2巻 第20葉' : 'Vol. 2 Page. 20',
        id: '2020',
      },
      {
        label: this.$i18n.locale === 'ja' ? '第2巻 第51葉' : 'Vol. 2 Page. 51',
        id: '2051',
      },
      {
        label: this.$i18n.locale === 'ja' ? '第2巻 第53葉' : 'Vol. 2 Page. 53',
        id: '2053',
      },
      {
        label: this.$i18n.locale === 'ja' ? '第2巻 第53葉' : 'Vol. 2 Page. 53',
        id: '3028',
      },
      {
        label: this.$i18n.locale === 'ja' ? '第3巻 第30葉' : 'Vol. 3 Page. 30',
        id: '3030',
      },
      {
        label: this.$i18n.locale === 'ja' ? '第3巻 第31葉' : 'Vol. 3 Page. 31',
        id: '3031',
      },
      {
        label: this.$i18n.locale === 'ja' ? '第3巻 第32葉' : 'Vol. 3 Page. 32',
        id: '3032',
      },
      {
        label: this.$i18n.locale === 'ja' ? '第3巻 第33葉' : 'Vol. 3 Page. 33',
        id: '3033',
      },
      {
        label: this.$i18n.locale === 'ja' ? '第3巻 第34葉' : 'Vol. 3 Page. 34',
        id: '3034',
      },
      {
        label: this.$i18n.locale === 'ja' ? '第3巻 第35葉' : 'Vol. 3 Page. 35',
        id: '3035',
      },
      {
        label: this.$i18n.locale === 'ja' ? '第3巻 第36葉' : 'Vol. 3 Page. 36',
        id: '3036',
      },
      {
        label: this.$i18n.locale === 'ja' ? '第3巻 第37葉' : 'Vol. 3 Page. 37',
        id: '3037',
      },
      {
        label: this.$i18n.locale === 'ja' ? '第5巻 第3葉' : 'Vol. 5 Page. 3',
        id: '5003',
      },
      {
        label: this.$i18n.locale === 'ja' ? '第5巻 第5葉' : 'Vol. 5 Page. 5',
        id: '5005',
      },
      {
        label: this.$i18n.locale === 'ja' ? '第5巻 第6葉' : 'Vol. 5 Page. 6',
        id: '5006',
      },
      {
        label:
          this.$i18n.locale === 'ja' ? '第13巻 第47葉' : 'Vol. 13 Page. 47',
        id: '13060',
      },
      {
        label: this.$i18n.locale === 'ja' ? '第27巻 第9葉' : 'Vol. 27 Page. 9',
        id: '27009',
      },
      {
        label:
          this.$i18n.locale === 'ja' ? '第28巻 第39葉' : 'Vol. 28 Page. 39',
        id: '28040',
      },
    ]
  }
}
</script>
