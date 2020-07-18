<template>
  <div v-if="obj != null">
    <v-container>
      <sheet :id="fileNo" />

      <h3>
        <!-- <b>{{ $t('Edificio') }}</b
        >: -->{{ $utils.formatArrayValue(obj.Edificio_i) }}
        <i
          ><!-- <b>{{ $t('Edificio') }}</b
          >: -->{{ $utils.formatArrayValue(obj.Edificio_l) }}</i
        >
      </h3>

      <h2 class="my-5">
        <!-- <b>{{ $t('Didascalia') }}</b
        >: -->{{ $utils.formatArrayValue(obj.Didascalia) }}
      </h2>

      <iframe
        :key="'jotform-iframe-' + uv"
        :src="uv"
        width="100%"
        height="600px"
        allowfullscreen
        frameborder="0"
        class="mb-5"
      ></iframe>

      <v-sheet
        class="grey lighten-3 py-5 px-3 py-3 text-center mb-5"
        style="background-color: #f9f6f0;"
      >
        <v-btn icon class="mr-2">
          <a :href="manifest">
            <v-img
              contain
              height="24px"
              :src="baseUrl + '/img/iiif-logo.svg'"
            />
          </a>
        </v-btn>
        <v-btn v-if="data" icon class="mr-2">
          <a>
            <v-img
              contain
              width="24px"
              :src="baseUrl + '/img/json-logo.svg'"
              @click="dwnJson()"
            />
          </a>
        </v-btn>

        <v-btn icon>
          <v-menu top offset-y>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">mdi-share-variant</v-icon>
            </template>

            <ShareButtons :url="url" :title="title" :manifest="manifest" />
          </v-menu>
        </v-btn>
      </v-sheet>

      <div class="text-right">
        <p>
          <small
            ><b>{{ $t('Photo by') }}</b>
            {{ $utils.formatArrayValue(obj.photographer) }},
            {{ $utils.formatArrayValue(obj.photo_date) }}.</small
          >
        </p>
        <p>
          <small
            ><b>{{ $t('Description by') }}</b> Natsumi ARAKI.</small
          >
        </p>
      </div>

      <v-row class="mb-5">
        <v-col cols="12" sm="2" class="py-0"
          ><b>{{ $t("Parte dell'oggetto") }}</b></v-col
        >
        <v-col cols="12" sm="10" class="py-0">{{
          $utils.formatArrayValue(obj["Parte dell'oggetto"])
        }}</v-col>
      </v-row>

      <v-row class="mb-5">
        <v-col cols="12" sm="2" class="py-0"
          ><b>{{ $t('Cronologia') }}</b></v-col
        >
        <v-col cols="12" sm="10" class="py-0">{{
          $utils.formatArrayValue(obj['Cronologia'])
        }}</v-col>
      </v-row>

      <v-row class="mb-5">
        <v-col cols="12" sm="2" class="py-0"
          ><small
            ><b>{{ $t('Localizzazione moderna') }}</b></small
          ></v-col
        >
        <v-col cols="12" sm="10" class="py-0">{{
          $utils.formatArrayValue(obj['Localizzazione moderna'])
        }}</v-col>
      </v-row>

      <v-card v-if="arr.length > 1" class="mt-10">
        <v-card-title class="headline grey lighten-2" primary-title>{{
          $t('Photos')
        }}</v-card-title>
        <div class="pa-5">
          <v-row>
            <template v-for="(item, key) in arr">
              <v-col v-if="key != index" :key="key" cols="6" sm="4">
                <v-card
                  class="mb-5"
                  @click="
                    index = key
                    goTop()
                  "
                >
                  <v-img
                    :contain="true"
                    class="mt-2"
                    height="200px"
                    :src="
                      'https://piranesi.dl.itc.u-tokyo.ac.jp/data/photo/m/' +
                      $utils.formatArrayValue(item._source.photo_no) +
                      '.jpg'
                    "
                    style="background-color: lightgray;"
                  ></v-img>
                  <v-card-text>
                    <p>
                      {{ $utils.formatArrayValue(item._source.Didascalia) }}
                    </p>
                  </v-card-text>
                </v-card>
              </v-col>
            </template>
          </v-row>
        </div>
      </v-card>

      <sheet :id="fileNo" class="my-10" />
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import sheet from '~/components/common/Sheet.vue'
import ShareButtons from '~/components/common/ShareButtons.vue'

@Component({
  components: {
    ShareButtons,
    sheet,
  },
})
export default class Volumes extends Vue {
  baseUrl: any = process.env.BASE_URL

  arr: any[] = []
  index: number = 0
  fileNo: string = ''

  data: any = {}

  head() {
    return {
      title: this.title,
    }
  }

  async fetch(context: any) {
    const store = context.store
    const state = store.state

    if (state.index4Photo == null) {
      const index = await context.app.$searchUtils.createIndexFromIIIFCollection(
        'https://piranesi.dl.itc.u-tokyo.ac.jp/data/photo/iiif/top.json'
      )
      store.commit('setIndex4Photo', index.index)
      store.commit('setData4Photo', index.data)
    }

    const routeQuery = context.query
    const esQuery = context.app.$searchUtils.createQuery(routeQuery, state)
    store.commit('setQuery', esQuery)

    const result = context.app.$searchUtils.search(
      store.state.index4Photo,
      store.state.data4Photo,
      store.state.query
    )

    context.store.commit('setResult', result)
  }

  mounted() {
    const result = this.$store.state

    const photoId: string = this.$route.params.id ? this.$route.params.id : ''

    const fileNo: any = this.$route.query.file_no
    if (fileNo != null) {
      this.fileNo = fileNo
    }

    const ids = []

    const dataAll = result.data4Photo

    const arr = []

    const index = result.index4Photo

    if (fileNo != null) {
      // this.title = this.$t('photo')
      // 複数の場合
      const keys = ['file_n1', 'file_n2', 'file_n3']

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        if (index[key][fileNo]) {
          const ids2 = index[key][fileNo]
          for (let j = 0; j < ids2.length; j++) {
            ids.push(ids2[j])
          }
        }
      }
    } else if (index.photo_no[photoId]) {
      // 一点の場合
      const ids2 = index.photo_no[photoId]
      for (let j = 0; j < ids2.length; j++) {
        ids.push(ids2[j])
      }

      const obj = dataAll[ids[0]]

      this.data = obj
      this.fileNo = this.$utils.formatArrayValue(obj._source.file_n1)
    }

    // めもめも
    for (let i = 0; i < ids.length; i++) {
      arr.push(dataAll[ids[i]])
    }

    this.arr = arr
  }

  get obj() {
    let data = this.arr[this.index]
    if (data == null) {
      return data
    }
    data = data._source
    return data
  }

  get manifest() {
    return this.arr[this.index]._id
  }

  get currentId() {
    if (this.arr.length === 0) {
      return ''
    }
    return this.$utils.formatArrayValue(this.arr[this.index]._source.photo_no)
  }

  get url() {
    if (this.arr.length === 0) {
      return ''
    }
    return process.env.BASE_URL + '/photo/' + this.currentId
  }

  get title() {
    if (this.arr.length === 0) {
      return ''
    }
    return this.$utils.formatArrayValue(this.arr[this.index]._source._title)
  }

  get uv() {
    const url =
      /*
      'https://universalviewer.io/examples/uv/./uv.html#?manifest=' +
      encodeURIComponent(this.arr[this.index]._id) */
      this.baseUrl + '/mirador/?manifest=' + encodeURIComponent(this.manifest)
    return url
  }

  dwnJson() {
    // 保存するJSONファイルの名前
    const fileName = this.currentId + '.json'

    // データをJSON形式の文字列に変換する。
    const data = JSON.stringify(this.data, null, '\t')

    // HTMLのリンク要素を生成する。
    const link = document.createElement('a')

    // リンク先にJSON形式の文字列データを置いておく。
    link.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(data)

    // 保存するJSONファイルの名前をリンクに設定する。
    link.download = fileName

    // ファイルを保存する。
    link.click()
  }

  goTop() {
    if (process.browser) {
      window.scrollTo(0, 0)
    }
  }
}
</script>
