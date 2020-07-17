<template>
  <div>
    <v-container>
      <sheet :id="$route.params.id" />

      <iframe
        v-if="manifest != ''"
        :src="baseUrl + '/mirador/?manifest=' + encodeURIComponent(manifest)"
        width="100%"
        height="600"
        allowfullscreen
        frameborder="0"
        class="mb-5"
      ></iframe>

      <v-row>
        <v-col cols="12" sm="8">
          <v-card class="mb-10">
            <v-card-title class="grey lighten-2">{{
              $t('basic_information')
            }}</v-card-title>
            <div class="pa-5">
              <v-row class="pb-5" dense>
                <v-col cols="12" sm="2"
                  ><b>{{ $t('kamei_no') }}</b></v-col
                >
                <v-col cols="12" sm="4">
                  <template v-if="$utils.formatArrayValue(data.constellation)">
                    {{
                      $utils.formatArrayValue(data.Kamei_no) +
                      '.' +
                      $utils
                        .formatArrayValue(data.constellation)
                        .replace('.', '')
                    }} </template
                  ><template v-else>
                    {{ $utils.formatArrayValue(data.Kamei_no) }}
                  </template>
                </v-col>

                <v-col cols="12" sm="2"
                  ><b>{{ $t('image_no') }}</b></v-col
                >
                <v-col cols="12" sm="4"
                  >{{ $utils.formatArrayValue(data.image_ID) }}
                </v-col>
              </v-row>

              <v-row class="pb-5" dense>
                <v-col cols="12" sm="2"
                  ><b>{{ $i18n.locale === 'en' ? 'Vol. ' : '巻' }}</b></v-col
                >
                <v-col cols="12" sm="4">{{
                  $utils.formatArrayValue(data.volume)
                }}</v-col>

                <v-col cols="12" sm="2"
                  ><b>{{ $i18n.locale === 'en' ? 'Page. ' : '葉' }}</b></v-col
                >
                <v-col cols="12" sm="4"
                  >{{
                    $utils.formatArrayValue(data.plate) +
                    $utils.formatArrayValue(data.constellation)
                  }}
                </v-col>
              </v-row>

              <v-row v-if="data.opera" class="mb-5" dense>
                <v-col cols="12" sm="2">
                  <b>{{ $t('opera') }}</b>
                </v-col>
                <v-col cols="12" sm="10">
                  <nuxt-link
                    :to="
                      localePath({
                        name: 'search',
                        query: {
                          'fc-opera': data.opera,
                        },
                      })
                    "
                    >{{ $utils.formatArrayValue(data.opera) }}
                  </nuxt-link>
                </v-col>
              </v-row>

              <v-row class="mb-5" dense>
                <v-col cols="12" sm="2"
                  ><b>{{ $t('series') }}</b></v-col
                >
                <v-col cols="12" sm="10">
                  <nuxt-link
                    :to="
                      localePath({
                        name: 'search',
                        query: {
                          'fc-series': data.series,
                        },
                      })
                    "
                  >
                    {{ $utils.formatArrayValue(data.series) }}
                  </nuxt-link>
                  <template v-if="$i18n.locale === 'ja'">
                    <br />
                    <nuxt-link
                      :to="
                        localePath({
                          name: 'search',
                          query: {
                            'fc-series_JP': data.series_JP,
                          },
                        })
                      "
                    >
                      {{ $utils.formatArrayValue(data.series_JP) }}
                    </nuxt-link>
                  </template>
                </v-col>
              </v-row>

              <v-row class="pb-5" dense>
                <v-col cols="12" sm="2"
                  ><b>{{ $t('work') }}</b></v-col
                >
                <v-col cols="12" sm="10">
                  {{ $utils.formatArrayValue(data.title) }}
                  <template v-if="$i18n.locale === 'ja'">
                    <br />
                    {{ $utils.formatArrayValue(data.title_JP) }}
                  </template>
                </v-col>
              </v-row>

              <v-row v-if="data.author" class="pb-5" dense>
                <v-col cols="12" sm="2"
                  ><b>{{ $t('author') }}</b></v-col
                >
                <v-col cols="12" sm="10">
                  <nuxt-link
                    :to="
                      localePath({
                        name: 'search',
                        query: {
                          'fc-author': data.author,
                        },
                      })
                    "
                    >{{ $utils.formatArrayValue(data.author) }}
                  </nuxt-link></v-col
                >
              </v-row>
              <v-row
                v-if="$i18n.locale === 'ja' && data.author_JP"
                class="pb-5"
                dense
              >
                <v-col cols="12" sm="2"
                  ><b>{{ $t('author_JP') }}</b></v-col
                >
                <v-col cols="12" sm="10">
                  <nuxt-link
                    :to="
                      localePath({
                        name: 'search',
                        query: {
                          'fc-author_JP': data.author_JP,
                        },
                      })
                    "
                    >{{ $utils.formatArrayValue(data.author_JP) }}</nuxt-link
                  ></v-col
                >
              </v-row>
              <v-row class="pb-5" dense>
                <v-col cols="12" sm="2"
                  ><b>{{ $t('plate_size') }}</b></v-col
                >
                <v-col cols="12" sm="4"
                  >{{ $utils.formatArrayValue(data.plate_size) }} mm
                </v-col>

                <template v-if="data.image_size" class="pb-5" dense>
                  <v-col cols="12" sm="2"
                    ><b>{{ $t('image_size') }}</b></v-col
                  >
                  <v-col cols="12" sm="4"
                    >{{ $utils.formatArrayValue(data.image_size) }} mm
                  </v-col>
                </template>
              </v-row>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4">
          <v-card class="mb-10">
            <v-card-title class="grey lighten-2">{{
              $t('related_information')
            }}</v-card-title>

            <template v-if="photoFlg">
              <v-list-item
                :to="
                  localePath({
                    name: 'photo-id',
                    query: { file_no: $utils.formatArrayValue(data.file_no) },
                  })
                "
              >
                <v-list-item-icon>
                  <v-icon>mdi-image</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  {{ $t('present_photos') }}
                </v-list-item-content>
              </v-list-item>

              <v-divider />
            </template>

            <v-list-item
              v-if="data.Edificio_IL"
              :to="
                localePath({
                  name: 'compare',
                  query: {
                    Edificio_IL: $utils.formatArrayValue(data.Edificio_IL),
                  },
                })
              "
            >
              <v-list-item-icon>
                <v-icon>mdi-image</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                {{ $t('prints_and_photos') }}
              </v-list-item-content>
            </v-list-item>

            <v-divider />

            <v-list-item
              v-if="
                localePath({ name: 'inscription-' + data.file_no }).includes(
                  'inscription'
                )
              "
              :to="localePath({ name: 'inscription-' + data.file_no })"
            >
              <v-list-item-icon>
                <v-icon>mdi-flag</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{
                  $t('latin_inscriptions')
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>

          <v-sheet
            class="grey lighten-3 py-5 px-3 py-3 text-center"
            style="background-color: #f9f6f0;"
          >
            <v-btn v-if="manifest" icon class="mr-2">
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
          </v-sheet>

          <v-sheet
            class="grey lighten-3 py-5 px-3 py-3 mt-4"
            style="background-color: #f9f6f0;"
          >
            <ShareButtons :url="url" :title="data.title" :manifest="manifest" />
          </v-sheet>
        </v-col>
      </v-row>

      <v-expansion-panels class="pb-5 mb-10" :value="0">
        <v-expansion-panel>
          <v-expansion-panel-header class="grey lighten-2">
            {{ $t('detailed_information') }}
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <div class="pa-5">
              <v-sheet class="pa-2 mb-5" color="grey lighten-3">
                <span> {{ $t('subject') }}, {{ $t('other') }}</span>
              </v-sheet>

              <v-row dense class="mb-5">
                <v-col v-if="data['subject']" cols="12" sm="2">
                  <b>{{ $t('subject') }}</b>
                </v-col>
                <v-col cols="12" sm="10">
                  <nuxt-link
                    :to="
                      localePath({
                        name: 'search',
                        query: {
                          'fc-subject': data.subject,
                        },
                      })
                    "
                  >
                    {{ $utils.formatArrayValue(data['subject']) }}
                  </nuxt-link>
                </v-col>
              </v-row>
              <v-row v-if="data['subcategoria']" dense class="mb-5">
                <v-col cols="12" sm="2">
                  <b>{{ $t('subcategoria') }}</b>
                </v-col>
                <v-col cols="12" sm="10">
                  <nuxt-link
                    :to="
                      localePath({
                        name: 'search',
                        query: {
                          'fc-subcategoria': data.subcategoria,
                        },
                      })
                    "
                  >
                    {{ $utils.formatArrayValue(data['subcategoria']) }}
                  </nuxt-link>
                </v-col>
              </v-row>
              <v-row v-if="data['Edificio_IL']" dense class="mb-5">
                <v-col cols="12" sm="2">
                  <b>{{ $t('Edificio') }}</b>
                </v-col>
                <v-col cols="12" sm="10">
                  <nuxt-link
                    :to="
                      localePath({
                        name: 'search',
                        query: {
                          'fc-Edificio_IL': data.Edificio_IL,
                        },
                      })
                    "
                  >
                    {{ $utils.formatArrayValue(data['Edificio_IL']) }}
                  </nuxt-link>
                </v-col>
              </v-row>
              <v-row v-if="data['conservazione']" dense class="mb-5">
                <v-col cols="12" sm="2">
                  <b>{{ $t('conservazione') }}</b>
                </v-col>
                <v-col cols="12" sm="10">
                  {{ $utils.formatArrayValue(data['conservazione']) }}
                </v-col>
              </v-row>

              <v-sheet class="pa-2 mb-5" color="grey lighten-3">
                <span> {{ $t('catalogues_no') }}</span>
              </v-sheet>

              <!-- 
              <v-sheet class="pa-2 mb-5" color="grey lighten-3">
                <span> {{ $t('レゾネ番号') }}</span>
              </v-sheet>
              -->

              <v-row dense class="mb-5">
                <v-col cols="12" sm="2">
                  <b>F. Didot</b>
                </v-col>
                <v-col cols="12" sm="4">
                  {{ $utils.formatArrayValue(data['FD_no']) }}
                </v-col>
                <v-col cols="12" sm="2">
                  <b>{{ $t('Calcografia') }}</b>
                </v-col>
                <v-col cols="12" sm="4">
                  {{ $utils.formatArrayValue(data['Calco_no']) }}
                  {{ $utils.formatArrayValue(data['Calco_tav_no']) }}
                </v-col>
                <template v-if="data['WE_no']">
                  <v-col cols="12" sm="2">
                    <b>{{ $t('J. W. Ely') }}</b>
                  </v-col>
                  <v-col cols="12" sm="4">
                    {{ $utils.formatArrayValue(data['WE_no']) }}
                  </v-col>
                </template>
                <template v-if="data['Taschen_no']">
                  <v-col cols="12" sm="2">
                    <b>Taschen</b>
                  </v-col>
                  <v-col cols="12" sm="4">{{
                    $utils.formatArrayValue(data['Taschen_no'])
                  }}</v-col>
                </template>
              </v-row>

              <!-- 
              <v-sheet class="pa-2 mb-5" color="grey lighten-3">
                <span> {{ $t('H. Focillon レゾネ記述') }}</span>
              </v-sheet>
              -->

              <v-row v-if="data['HF_no']" dense class="mb-5">
                <v-col cols="12" sm="2">
                  <b>H. Focillon</b>
                </v-col>
                <v-col cols="12" sm="10">
                  {{ $utils.formatArrayValue(data['HF_no']) }}<br /><small
                    v-html="$utils.formatArrayValue(data['HF_desc'])"
                  >
                  </small
                ></v-col>
              </v-row>

              <v-row
                v-if="$i18n.locale === 'ja' && data['HF_desc_tr']"
                dense
                class="mb-5"
              >
                <v-col cols="12" sm="2">
                  <small><b>H. Focillon 訳</b></small>
                </v-col>
                <v-col cols="12" sm="10">
                  <small v-html="$utils.formatArrayValue(data['HF_desc_tr'])">
                  </small
                ></v-col>
              </v-row>

              <v-sheet class="pa-2 mb-5" color="grey lighten-3">
                <span> {{ $t('Exhibition catalogues no') }}</span>
              </v-sheet>

              <v-row v-if="data['Kanagawa_no']" dense class="mb-5">
                <v-col cols="12" sm="2">
                  <b>{{ $t('kanagawa') }}</b>
                </v-col>
                <v-col cols="12" sm="10">{{
                  $utils.formatArrayValue(data['Kanagawa_no'])
                }}</v-col>

                <template v-if="data['Machida_no']" dense class="mb-5">
                  <v-col cols="12" sm="2">
                    <b>{{ $t('machida') }}</b>
                  </v-col>
                  <v-col cols="12" sm="10">{{
                    $utils.formatArrayValue(data['Machida_no'])
                  }}</v-col>
                </template>
              </v-row>

              <v-divider class="my-10" />

              <!-- ************************************************ -->

              <v-sheet class="pa-2 mb-5" color="grey lighten-3">
                <span> {{ $t('incriptions_on_the_print') }}</span>
              </v-sheet>

              <v-row v-if="data.inscription1" dense class="mb-5">
                <v-col cols="12" sm="2"
                  ><b>{{ $t('Inscription 1') }}</b></v-col
                >
                <v-col cols="12" sm="10"
                  ><span
                    v-html="$utils.formatArrayValue(data.inscription1)"
                  ></span
                ></v-col>
              </v-row>

              <v-row v-if="data.sign_ecc" dense class="mb-5">
                <v-col cols="12" sm="2"
                  ><b>{{ $t('signatute') }}</b></v-col
                >
                <v-col cols="12" sm="10">
                  <span v-html="$utils.formatArrayValue(data.sign_ecc)"></span
                ></v-col>
              </v-row>

              <template v-if="$i18n.locale === 'ja'">
                <v-row v-if="data.inscription1_tr" dense class="mb-5">
                  <v-col cols="12" sm="2"><b>記載文１訳</b></v-col>
                  <v-col cols="12" sm="10"
                    ><span
                      v-html="$utils.formatArrayValue(data.inscription1_tr)"
                    ></span
                  ></v-col>
                </v-row>

                <v-row v-if="data.sign_ecc_tr" dense class="mb-5">
                  <v-col cols="12" sm="2"><b>署名訳</b></v-col>
                  <v-col cols="12" sm="10">
                    <span
                      v-html="$utils.formatArrayValue(data.sign_ecc_tr)"
                    ></span
                  ></v-col>
                </v-row>

                <v-row v-if="data.tr_comment1" dense class="mb-5">
                  <v-col cols="12" sm="2"><b>訳者註１</b></v-col>
                  <v-col cols="12" sm="10"
                    ><span
                      v-html="$utils.formatArrayValue(data.tr_comment1)"
                    ></span
                  ></v-col>
                </v-row>
              </template>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-expansion-panels v-if="mapFlag" class="pb-5 mb-10">
        <v-expansion-panel>
          <v-expansion-panel-header class="grey lighten-2">
            {{ $t('rome_map') }}
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <div class="pa-5">
              <v-img
                :src="
                  'https://nakamura196.github.io/piranesi/p_maps/' +
                  $utils.formatArrayValue(data.map_no) +
                  '.jpg'
                "
                height="600px"
                contain
              ></v-img>

              <p class="mt-5">
                <router-link :to="localePath({ name: 'mapsearch' })">{{
                  $t('Show all places.')
                }}</router-link>
              </p>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <sheet :id="$route.params.id" />
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
export default class Search extends Vue {
  data: any = {}
  manifest: string = ''
  fileNo: string = ''

  photoFlg: boolean = false

  baseUrl: any = process.env.BASE_URL

  url: string = ''

  title: string = ''

  head() {
    return {
      title: this.title,
    }
  }

  async fetch(context: any) {
    const store = context.store
    const state = store.state

    if (state.index == null) {
      const index = await context.app.$searchUtils.createIndexFromIIIFCollection(
        'https://piranesi.dl.itc.u-tokyo.ac.jp/data/print/iiif/top2.json'
      )
      store.commit('setIndex', index.index)
      store.commit('setData', index.data)
    }

    const routeQuery = context.query
    const esQuery = context.app.$searchUtils.createQuery(routeQuery, state)
    store.commit('setQuery', esQuery)

    const result = context.app.$searchUtils.search(
      store.state.index,
      store.state.data,
      store.state.query
    )

    context.store.commit('setResult', result)
  }

  created() {
    const fileNo: string = this.$route.params.id
    this.fileNo = fileNo

    const n = this.$store.state.index.file_no[fileNo][0]

    const obj = this.$store.state.data[n]

    this.data = obj._source

    this.manifest = obj._id
    this.title =
      obj._source.title && obj._source.title.length > 0
        ? obj._source.title[0]
        : ''
    this.url = process.env.BASE_URL + '/item/' + fileNo

    this.checkPhoto()
  }

  async checkPhoto(): Promise<void> {
    const result = await this.$searchUtils.createIndexFromIIIFCollection(
      'https://raw.githubusercontent.com/nakamura196/piranesi/master/docs/photo/iiif/top.json'
    )
    const ids = []

    const keys = ['file_n1', 'file_n2', 'file_n3']

    const index = result.index

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      if (index[key][this.fileNo]) {
        const ids2 = index[key][this.fileNo]
        for (let j = 0; j < ids2.length; j++) {
          ids.push(ids2[j])
        }
      }
    }

    const dataAll = result.data

    const arr = []

    for (let i = 0; i < ids.length; i++) {
      arr.push(dataAll[ids[i]])
    }

    if (arr.length > 0) {
      this.photoFlg = true
    }
  }

  dwnJson() {
    // 保存するJSONファイルの名前
    const fileName = this.fileNo + '.json'

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

  get mapFlag() {
    if (this.data.map_no && this.data.map_no.length > 0) {
      const mapNo = this.data.map_no[0]
      const url = process.env.BASE_URL + '/img/p_maps/img/' + mapNo + '.jpg'

      const xhr = new XMLHttpRequest()
      xhr.open('HEAD', url, false)
      xhr.send()

      if (xhr.status === 404) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>
<style>
.v-expansion-panel-content__wrap {
  padding: 0 0 0 0;
}
</style>
