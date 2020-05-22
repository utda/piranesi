<template>
  <div>
    <SearchForm />

    <div style="background-color: #eeeeee;">
      <v-container class="pt-5">
        <v-row no-gutters align="center">
          <v-col cols="12" sm="5">
            <h3 class="my-5">{{ total.toLocaleString() }}{{ $t('hits') }}</h3>
          </v-col>
          <v-col cols="12" sm="7">
            <v-row dense>
              <template v-if="layout !== 'stats'">
                <v-col cols="12" sm="3">
                  <v-select
                    v-model="sort"
                    :items="computedItemsSort"
                    :label="$t('Sort by')"
                    @change="setSort"
                  ></v-select>
                </v-col>

                <v-col cols="12" sm="3" dense>
                  <v-select
                    v-model="size"
                    :items="[
                      { value: 20, text: '20' },
                      { value: 50, text: '50' },
                      { value: 100, text: '100' },
                      { value: 500, text: '500' },
                    ]"
                    :label="$t('items_per_page')"
                    @change="setSize"
                  ></v-select>
                </v-col>
              </template>

              <v-col cols="12" sm="3">
                <v-select
                  v-model="layout"
                  :items="[
                    { value: 'grid', text: $t('grid') },
                    { value: 'list', text: $t('list') },
                    { value: 'image', text: $t('thumbnail') },
                    {
                      text: $t('table'),
                      value: 'table',
                    },
                    {
                      text: $t('graph'),
                      value: 'stats',
                    },
                  ]"
                  :label="$t('layout')"
                ></v-select>
              </v-col>

              <v-col
                v-if="layout === 'grid' || layout === 'image'"
                cols="12"
                sm="3"
              >
                <v-select
                  v-model="col"
                  :label="$t('col')"
                  :items="[
                    { value: 3, text: '3' },
                    { value: 4, text: '4' },
                    { value: 6, text: '6' },
                    { value: 12, text: '12' },
                  ]"
                  @change="setCol"
                ></v-select>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>

      <SearchFilter />
    </div>

    <div v-show="loadingFlag" class="text-center pa-10">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>

    <v-container v-show="!loadingFlag" class="mt-5">
      <v-row>
        <v-col cols="12" :sm="facetFlag ? 8 : 12" order-sm="12">
          <h3 class="mb-5">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <i
                  v-show="!facetFlag"
                  style="cursor: pointer;"
                  class="far fa-caret-square-right mr-2"
                  v-on="on"
                  @click="setFacetFlag(facetFlag)"
                ></i>
              </template>
              <span>{{ $t('open_facets') }}</span>
            </v-tooltip>
            {{ $t('search_result') }}
          </h3>

          <template v-if="total > 0">
            <div class="text-center">
              <v-pagination
                v-show="layout !== 'stats'"
                v-model="currentPage"
                :length="paginationLength"
                :total-visible="7"
                @input="setCurrentPage"
              ></v-pagination>
            </div>

            <SearchResult
              v-if="results.hits"
              :results="results.hits.hits"
              :query="$route.query"
              class="my-5"
            />

            <div class="text-center">
              <v-pagination
                v-show="layout !== 'stats'"
                v-model="currentPage"
                :length="paginationLength"
                :total-visible="7"
                @input="setCurrentPage"
              ></v-pagination>
            </div>
          </template>
        </v-col>

        <v-col v-show="facetFlag" :sm="4" order-sm="1">
          <template v-if="total > 0">
            <h3 class="mb-5">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <i
                    v-show="facetFlag"
                    style="cursor: pointer;"
                    class="far fa-caret-square-left mr-2"
                    v-on="on"
                    @click="setFacetFlag(!facetFlag)"
                  ></i>
                </template>
                <span>{{ $t('close_facets') }}</span>
              </v-tooltip>
              {{ $t('refine_your_search') }}
            </h3>

            <FacetSearchOptions :tmp="results" />
          </template>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import SearchForm from '~/components/search/SearchForm.vue'
import SearchResult from '~/components/search/SearchResult.vue'
import SearchFilter from '~/components/search/filter.vue'
import FacetSearchOptions from '~/components/search/FacetSearchOptions.vue'

import { queryStore, dataStore } from '~/store'

const SORT_LABELS = JSON.stringify(['_title'])

@Component({
  components: {
    SearchResult,
    SearchForm,
    SearchFilter,
    FacetSearchOptions,
  },
})
export default class search extends Vue {
  loadingFlag: boolean = false

  // ソート項目
  itemsSort: string[] = JSON.parse(SORT_LABELS)

  currentPage: number = 1

  layout: string = ''

  col: number = -1

  size: number = -1

  sort: string = ''

  results: any = {} // ページで分けた数

  get paginationLength() {
    return Math.ceil(this.total / this.size)
  }

  created() {
    this.main()
  }

  async main() {
    this.loadingFlag = true
    queryStore.setFacetLabels({
      author: this.$t('author'),
      author_JP: this.$t('author_JP'),
      series: this.$t('series'),
      series_JP: this.$t('series_JP'),
      volume: this.$t('volume'),
      subject: this.$t('subject'),
      subcategoria: this.$t('subcategoria'),
      Edificio_IL: this.$t('Edificio'),
      conservazione: this.$t('conservazione'),
    })

    // hyoujino tame
    queryStore.setTermLabels({
      Edificio_all: this.$t('Edificio'),
      author: this.$t('author'),
      author_JP: this.$t('author_JP'),
      series: this.$t('series'),
      series_JP: this.$t('series_JP'),
      volume: this.$t('volume'),
      subject: this.$t('subject'),
      subcategoria: this.$t('subcategoria'),
      Edificio_IL: this.$t('Edificio'),
      conservazione: this.$t('conservazione'),
    })

    // 初期化
    queryStore.init()

    // get パラメータに基づいてクエリを作成する
    const esQuery = this.$searchUtils.createQuery(
      this.$route.query,
      queryStore.query
    )

    dataStore.setQuery(esQuery)

    const routeQuery: any = this.$route.query

    const sort: string = routeQuery.sort
    if (sort) {
      queryStore.setSort(sort)
    }
    this.sort = queryStore.query.sort

    //
    const currentPage: number = esQuery.from / esQuery.size + 1
    queryStore.setCurrentPage(currentPage)
    this.currentPage = currentPage

    //
    queryStore.setSize(esQuery.size)
    this.size = esQuery.size

    // 非クエリ
    // これらは初期化されない
    this.layout = queryStore.query.layout
    this.col = queryStore.query.col

    //

    const id: string = routeQuery.id
    if (id) {
      queryStore.setId(this.$utils.convert2arr(id))
    }

    const image: string = routeQuery.image
    if (image) {
      queryStore.setImage(this.$utils.convert2arr(image))
    }

    const keywords: any = routeQuery.keyword
    if (keywords) {
      queryStore.setKeywords(this.$utils.convert2arr(keywords))
    }

    for (const key in routeQuery) {
      const types = ['fc', 'q']
      for (let t = 0; t < types.length; t++) {
        const type = types[t]
        if (key.includes(type + '-')) {
          queryStore.setAdvanced({
            label: key,
            values: this.$utils.convert2arr(routeQuery[key]),
            type,
          })
        }
      }
    }

    if (!dataStore.data.all.data) {
      const result = await this.$searchUtils.createIndexFromIIIFCollection(
        'https://raw.githubusercontent.com/nakamura196/piranesi/master/docs/print/iiif/top.json'
      )
      dataStore.setIndex(result.index)
      dataStore.setData(result.data)
    }

    const result = this.$searchUtils.search2(dataStore.data.all)
    dataStore.setResult(result)

    this.results = result
    console.log({ esQuery, result })
    window.scrollTo(0, 0)
    this.loadingFlag = false
  }

  // ------ Watch -------

  @Watch('layout')
  watchLayout(currentValue: any) {
    if (
      (currentValue === 'image' || currentValue === 'stats') &&
      this.facetFlag
    ) {
      this.setFacetFlag()
    } else if (
      currentValue !== 'image' &&
      currentValue !== 'stats' &&
      !this.facetFlag
    ) {
      this.setFacetFlag()
    }
    queryStore.setLayout(currentValue)
  }

  @Watch('$route')
  watchRoute() {
    this.main()
  }

  // ------ 関数 -------

  setCurrentPage() {
    if (this.currentPage > 0) {
      const query: any = Object.assign({}, this.$route.query)
      query.from = (this.currentPage - 1) * this.size
      this.updateQuery(query)
    }
  }

  setCol() {
    queryStore.setCol(this.col)
  }

  setSize() {
    const query: any = Object.assign({}, this.$route.query)
    query.from = 0
    query.size = this.size
    this.updateQuery(query)
  }

  setSort() {
    const query: any = Object.assign({}, this.$route.query)
    query.from = 0
    query.sort = this.sort
    this.updateQuery(query)
  }

  updateQuery(query: any) {
    this.$router.push(
      this.localePath({
        name: 'search',
        query,
      }),
      () => {},
      () => {}
    )
  }

  setFacetFlag() {
    queryStore.setFacetFlag(!this.facetFlag)
  }

  // ------ Computed --------

  get facetFlag(): boolean {
    return queryStore.query.facetFlag
  }

  get total() {
    return this.results.hits ? this.results.hits.total.value : 0
  }

  get computedItemsSort() {
    const arr: any[] = [
      {
        value: '_score:desc',
        text: this.$t('relevance'),
      },
    ]

    const orders = ['asc', 'desc']

    const itemsSort = this.itemsSort

    for (let i = 0; i < itemsSort.length; i++) {
      const value = itemsSort[i]
      for (let j = 0; j < orders.length; j++) {
        const order = orders[j]
        const label = value.startsWith('_') ? this.$t(value.slice(1)) : value
        arr.push({
          value: value + '.keyword:' + order,
          text: label + ' ' + this.$t(order),
        })
      }
    }

    return arr
  }
}
</script>
