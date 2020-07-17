<template>
  <v-container class="pt-5">
    <v-row align="center">
      <v-col cols="12" sm="8">
        <v-text-field
          v-model="keywordStr"
          class="mr-2"
          filled
          background-color="grey lighten-2"
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
      </v-col>
      <v-col cols="12" sm="4">
        <v-btn color="primary" class="mr-2" @click="search">
          {{ $t('search') }}
        </v-btn>
        <v-btn @click="dialog = !dialog">
          {{ $t('advanced_search') }}
        </v-btn>
      </v-col>
    </v-row>

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

            <!-- -->

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

            <!-- -->
          </v-container>
          <!-- <small>*indicates required field</small> -->
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
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({})
export default class SearchForm extends Vue {
  trigger(event: any) {
    // 日本語入力中のEnterキー操作は無効にする
    if (event.keyCode !== 13) return

    this.search()
  }

  keywordStr: string = ''
  keywords: string[] = []

  dialog: boolean = false

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

  // dialog: boolean = false

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

    // const keywords = this.$utils.splitKeyword(keywordStr)
    query.keyword = keywordStr // keywords
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
}
</script>
