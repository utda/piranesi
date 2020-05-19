<template>
  <v-container class="mb-5">
    <v-card class="mt-5">
      <!--
        <v-card-title class="headline grey lighten-2" primary-title>{{
          $t('簡易検索')
        }}</v-card-title>
        -->
      <div class="pa-5">
        <v-row>
          <v-col cols="12" :sm="8">
            <v-text-field
              v-model="keywordStr"
              :label="$t('keyword')"
              @keyup.enter="search"
            ></v-text-field>
          </v-col>
          <v-col cols="12" :sm="4">
            <v-btn color="primary" class="ma-2" @click="search">{{
              $t('search')
            }}</v-btn>
            <v-btn class="ma-2" @click="reset()">{{ $t('reset') }}</v-btn>
            <v-btn
              class="ma-2"
              @click="advancedSearchFlag = !advancedSearchFlag"
              >{{ $t('advanced_search') }}</v-btn
            >
          </v-col>
        </v-row>
        <v-expansion-panels v-if="advancedSearchFlag" flat>
          <v-expansion-panel>
            <v-row>
              <v-col cols="12" :sm="8">
                <v-row>
                  <v-col class="py-0" cols="12" :sm="4">
                    <v-subheader>{{ $t('巻') }}</v-subheader>
                  </v-col>
                  <v-col class="py-0" cols="12" :sm="8">
                    <v-text-field
                      value=""
                      :label="$t('半角数字でご入力下さい')"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col class="py-0" cols="12" :sm="4"> </v-col>
            </v-row>

            <v-row class="mb-5">
              <v-col cols="12" :sm="8">
                <v-row>
                  <v-col class="py-0" cols="12" :sm="4">
                    <v-subheader>{{ $t('葉') }}</v-subheader>
                  </v-col>
                  <v-col class="py-0" cols="12" :sm="8">
                    <v-text-field
                      value=""
                      :label="$t('半角数字でご入力下さい')"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col class="py-0" cols="12" :sm="4"> </v-col>
            </v-row>

            <!-- 

            <v-card>
              <v-card-title class="headline grey lighten-2" primary-title>{{
                $t('詳細検索')
              }}</v-card-title>
              <div class="pa-5">
                
              </div>
            </v-card>
            -->

            <!-- 
                <v-sheet color="grey">
                  <v-row>
                    <v-col cols="8">
                      <v-subheader>{{ $t('項目') }}</v-subheader>
                    </v-col>
                    <v-col cols="4">
                      <v-subheader>{{ $t('タイプ') }}</v-subheader>
                    </v-col>
                  </v-row>
                </v-sheet>
                -->
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'

@Component({
  components: {},
})
export default class AdvancedSearchOptions extends Vue {
  keywordStr: string = ''
  keywords: string[] = []

  advancedSearchFlag: boolean = false

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
    const keywordStr = this.keywordStr

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

  reset() {
    console.log('aaa')
  }
}
</script>
