<template>
  <div>
    <v-navigation-drawer v-model="drawer" :temporary="true" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ $t('piranesi_db') }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list>
        <v-list-item :to="localePath('index')" link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <span>Home</span>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="localePath({ name: 'volume' })" link>
          <v-list-item-action>
            <v-icon>mdi-view-list</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <span>{{ $t('browse') }}</span>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="localePath({ name: 'search' })" link>
          <v-list-item-action>
            <v-icon>mdi-magnify</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <span>{{ $t('search_works') }}</span>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="localePath({ name: 'mapsearch' })" link>
          <v-list-item-action>
            <v-icon>mdi-map</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <span>{{ $t('rome_map') }}</span>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="localePath({ name: 'subject' })" link>
          <v-list-item-action>
            <v-icon>mdi-magnify</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <span>{{ $t('subject_search') }}</span>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="localePath({ name: 'concordance' })" link>
          <v-list-item-action>
            <v-icon>mdi-view-list</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <span>{{ $t('concordance') }}</span>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="localePath({ name: 'inscriptions' })" link>
          <v-list-item-action>
            <v-icon>mdi-view-grid</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <span>{{ $t('latin_inscriptions') }}</span>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="localePath('help')" link>
          <v-list-item-action>
            <v-icon>mdi-information</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <span>{{ $t('help') }}</span>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          href="https://iiif.dl.itc.u-tokyo.ac.jp/repo/s/piranesi/page/about"
          link
          target="_blank"
        >
          <v-list-item-action>
            <v-icon>mdi-book</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <span>{{ $t('about') }} <v-icon>mdi-open-in-new</v-icon></span>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          href="https://iiif.dl.itc.u-tokyo.ac.jp/repo/s/piranesi/page/legend"
          link
          target="_blank"
        >
          <v-list-item-action>
            <v-icon>mdi-information</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <span>{{ $t('legend') }} <v-icon>mdi-open-in-new</v-icon></span>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          href="https://www.lib.u-tokyo.ac.jp/ja/library/contents/archives-top/reuse"
          link
          target="_blank"
        >
          <v-list-item-action>
            <v-icon>mdi-information</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <span>{{ $t('license') }} <v-icon>mdi-open-in-new</v-icon></span>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="localePath('dataset')" link>
          <v-list-item-action>
            <v-icon>mdi-download</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <span>{{ $t('data_set') }}</span>
          </v-list-item-content>
        </v-list-item>

        <v-list-item href="/sitemap.xml" link target="_blank">
          <v-list-item-action>
            <v-icon>mdi-view-list</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <span>{{ $t('sitemap') }} <v-icon>mdi-open-in-new</v-icon></span>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="white">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-show="!isMobile()">
        <nuxt-link
          :to="localePath({ name: 'index' })"
          style="color: inherit; text-decoration: inherit;"
        >
          {{ $t('piranesi_db') }}
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-text-field
        v-model="keywordStr"
        single-line
        background-color="grey lighten-2"
        class="mr-2"
        filled
        rounded
        dense
        hide-details
        :label="$t('search_works')"
        clearable
        clear-icon="mdi-close-circle"
        append-icon="mdi-magnify"
        @click:append="search"
        @keydown.enter="trigger"
      ></v-text-field>

      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn depressed btn v-on="on">
            <v-icon class="mr-2">mdi-translate</v-icon>
            <template v-if="!isMobile()">
              {{ $i18n.locale == 'ja' ? '日本語' : 'English' }}
              <v-icon class="ml-2">mdi-menu-down</v-icon>
            </template>
          </v-btn>
        </template>

        <v-list>
          <v-list-item :to="switchLocalePath('ja')">
            <v-list-item-title>日本語</v-list-item-title>
          </v-list-item>
          <v-list-item :to="switchLocalePath('en')">
            <v-list-item-title>English</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- 

    <v-dialog v-model="dialog" scrollable>
      <v-card>
        <v-card-title class="grey lighten-2">
          {{ $t('advanced_search') }}
        </v-card-title>
        <v-card-text :style="'height: ' + height * 0.6 + ';'">
          <v-container>
            <v-row dense>
              <v-col cols="12" :sm="4">
                <v-subheader>{{ $t('keyword') }}</v-subheader>
              </v-col>
              <v-col cols="12" :sm="8">
                <v-text-field
                  v-model="keywordStr"
                  @keyup.enter="advancedSearch"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="12" :sm="4">
                <v-subheader>{{ $t('author') }}</v-subheader>
              </v-col>
              <v-col cols="12" :sm="8">
                <v-select
                  v-model="advanced['q-author']"
                  :items="creators"
                ></v-select>
              </v-col>
            </v-row>

            <v-sheet class="pa-2 mb-5" color="grey lighten-3">
              {{ $t('Field') }}
            </v-sheet>

            <v-row dense>
              <v-col cols="12" :sm="4">
                <v-subheader>{{ $t('volume') }}</v-subheader>
              </v-col>
              <v-col cols="12" :sm="8">
                <v-text-field
                  v-model="advanced['fc-volume']"
                  :label="$t('half-width-help')"
                  @keyup.enter="advancedSearch"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="12" :sm="4">
                <v-subheader>{{ $t('plate') }}</v-subheader>
              </v-col>
              <v-col cols="12" :sm="8">
                <v-text-field
                  v-model="advanced['fc-plate']"
                  :label="$t('half-width-help')"
                  @keyup.enter="advancedSearch"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="12" :sm="4">
                <v-subheader>{{ $t('image_ID') }}</v-subheader>
              </v-col>
              <v-col cols="12" :sm="8">
                <v-text-field
                  v-model="advanced['fc-image_ID']"
                  :label="$t('half-width-help')"
                  @keyup.enter="advancedSearch"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="12" :sm="4">
                <v-subheader
                  >{{ $t('series') }}
                  <small>({{ $t('ja_text') }}）</small></v-subheader
                >
              </v-col>
              <v-col cols="12" :sm="8">
                <v-text-field
                  v-model="advanced['q-series_JP']"
                  :label="$t('partical-match')"
                  @keyup.enter="advancedSearch"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="12" :sm="4">
                <v-subheader
                  >{{ $t('series') }}
                  <small>({{ $t('it_text') }}）</small></v-subheader
                >
              </v-col>
              <v-col cols="12" :sm="8">
                <v-text-field
                  v-model="advanced['q-series']"
                  :label="$t('partical-match')"
                  @keyup.enter="advancedSearch"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="12" :sm="4">
                <v-subheader
                  >{{ $t('work') }}
                  <small>({{ $t('ja_text') }}）</small></v-subheader
                >
              </v-col>
              <v-col cols="12" :sm="8">
                <v-text-field
                  v-model="advanced['q-title_JP']"
                  :label="$t('partical-match')"
                  @keyup.enter="advancedSearch"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="12" :sm="4">
                <v-subheader
                  >{{ $t('work') }}
                  <small>({{ $t('it_text') }}）</small></v-subheader
                >
              </v-col>
              <v-col cols="12" :sm="8">
                <v-text-field
                  v-model="advanced['q-title']"
                  :label="$t('partical-match')"
                  @keyup.enter="advancedSearch"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="12" :sm="4">
                <v-subheader
                  >{{ $t('WE_title') }}
                  <small>({{ $t('en_text') }}）</small></v-subheader
                >
              </v-col>
              <v-col cols="12" :sm="8">
                <v-text-field
                  v-model="advanced['q-WE_title']"
                  :label="$t('partical-match')"
                  @keyup.enter="advancedSearch"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="12" :sm="4">
                <v-subheader
                  >{{ $t('author') }}
                  <small>({{ $t('ja_text') }}）</small></v-subheader
                >
              </v-col>
              <v-col cols="12" :sm="8">
                <v-text-field
                  v-model="advanced['q-author_JP']"
                  :label="$t('partical-match')"
                  @keyup.enter="advancedSearch"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="12" :sm="4">
                <v-subheader
                  >{{ $t('author') }}
                  <small>({{ $t('it_text') }}）</small></v-subheader
                >
              </v-col>
              <v-col cols="12" :sm="8">
                <v-text-field
                  v-model="advanced['q-author']"
                  :label="$t('partical-match')"
                  @keyup.enter="advancedSearch"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="12" :sm="4">
                <v-subheader>{{ $t('kamei_no') }}</v-subheader>
              </v-col>
              <v-col cols="12" :sm="8">
                <v-text-field
                  v-model="advanced['fc-Kamei_no']"
                  :label="$t('half-width-help')"
                  @keyup.enter="advancedSearch"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-sheet class="pa-2 mb-5" color="grey lighten-3">
              {{ $t('catalogues_no') }}
            </v-sheet>

            <v-row dense>
              <v-col cols="12" :sm="4">
                <v-subheader>F.Didot</v-subheader>
              </v-col>
              <v-col cols="12" :sm="8">
                <v-text-field
                  v-model="advanced['fc-FD_no']"
                  :label="$t('half-width-help')"
                  @keyup.enter="advancedSearch"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="12" :sm="4">
                <v-subheader>Calcografia</v-subheader>
              </v-col>
              <v-col cols="12" :sm="8">
                <v-text-field
                  v-model="advanced['fc-Calco_no']"
                  :label="$t('half-width-help')"
                  @keyup.enter="advancedSearch"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="12" :sm="4">
                <v-subheader>H.Focillon</v-subheader>
              </v-col>
              <v-col cols="12" :sm="8">
                <v-text-field
                  v-model="advanced['fc-HF_no']"
                  :label="$t('half-width-help')"
                  @keyup.enter="advancedSearch"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="12" :sm="4">
                <v-subheader>J.Wilton-Ely</v-subheader>
              </v-col>
              <v-col cols="12" :sm="8">
                <v-text-field
                  v-model="advanced['fc-WE_no']"
                  :label="$t('half-width-help')"
                  @keyup.enter="advancedSearch"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="12" :sm="4">
                <v-subheader>Taschen</v-subheader>
              </v-col>
              <v-col cols="12" :sm="8">
                <v-text-field
                  v-model="advanced['fc-Taschen_no']"
                  :label="$t('half-width-help')"
                  @keyup.enter="advancedSearch"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-sheet class="pa-2 mb-5" color="grey lighten-3">
              {{ $t('Exhibition catalogues no') }}
            </v-sheet>

            <v-row dense>
              <v-col cols="12" :sm="4">
                <v-subheader>{{ $t('machida') }}</v-subheader>
              </v-col>
              <v-col cols="12" :sm="8">
                <v-text-field
                  v-model="advanced['fc-machida']"
                  :label="$t('half-width-help')"
                  @keyup.enter="advancedSearch"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="12" :sm="4">
                <v-subheader>{{ $t('kanagawa') }}</v-subheader>
              </v-col>
              <v-col cols="12" :sm="8">
                <v-text-field
                  v-model="advanced['fc-kanagawa']"
                  :label="$t('half-width-help')"
                  @keyup.enter="advancedSearch"
                ></v-text-field>
              </v-col>
            </v-row>

       
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" btn @click="advancedSearch()">{{
            $t('search')
          }}</v-btn>
          <v-btn btn @click="dialog = false">{{ $t('close') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    -->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'

@Component
export default class Header extends Vue {
  trigger(event: any) {
    // 日本語入力中のEnterキー操作は無効にする
    if (event.keyCode !== 13) return

    this.search()
  }

  width: number = window.innerWidth
  height: number = window.innerHeight

  handleResize() {
    // resizeのたびにこいつが発火するので、ここでやりたいことをやる
    this.width = window.innerWidth
    this.height = window.innerHeight
  }

  mounted() {
    window.addEventListener('resize', this.handleResize)
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  }

  drawer: boolean = false
  fixed: boolean = false

  keywordStr: string = ''
  keywords: string[] = []

  dialog: boolean = false

  advanced: any = {}

  creators: any = [
    {
      value: '',
      text: 'All',
    },
    {
      value: 'Giovanni Battista Piranesi',
      text: 'Giovanni Battista Piranesi',
    },
    {
      value: 'Francesco Piranesi',
      text: 'Francesco Piranesi',
    },
  ] // 'All', 'Giovanni Battista Piranesi', 'Francesco Piranesi'

  // 保留。queryStoreを使いたい。
  @Watch('$route', { deep: true, immediate: true })
  watchRoute(val: any) {
    const keywords: any = val.query.keyword
    if (keywords) {
      this.keywords = this.$utils.convert2arr(keywords)
      this.keywordStr = this.$utils.formatArrayValue(this.keywords, ' ')
    } else {
      this.keywordStr = ''
    }
  }

  search() {
    let keywordStr = this.keywordStr

    if (!keywordStr) {
      keywordStr = ''
    }

    const keywords = this.$utils.splitKeyword(keywordStr)

    // push 処理
    const query: any = Object.assign({}, this.$route.query)
    query.keyword = keywords
    query.from = 0

    this.$router.push(
      this.localePath({
        name: 'search',
        query,
      }),
      () => {},
      () => {}
    )
  }

  /*
  advancedSearch() {
    const advanced = this.advanced
    const query: any = Object.assign({}, this.$route.query)
    for (const term in advanced) {
      const value: string = advanced[term].trim()
      if (value === '') {
        if (query[term]) {
          delete query[term]
        }
      } else {
        query[term] = value
      }
    }

    const keywordStr = this.keywordStr

    if (keywordStr) {
      const keywords = this.$utils.splitKeyword(keywordStr)
      query.keyword = keywords
    }

    query.from = 0

    this.$router.push(
      this.localePath({
        name: 'search',
        query,
      }),
      () => {},
      () => {}
    )

    this.dialog = false
  }
  */

  isMobile() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      return true
    } else {
      return false
    }
  }
}
</script>
