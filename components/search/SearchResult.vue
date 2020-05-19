<template>
  <div>
    <template v-if="layoutOption === 'grid'">
      <GridSearchResult :results="results" :query="query" />
    </template>
    <template v-else-if="layoutOption === 'list'">
      <ListSearchResult :results="results" :query="query" />
    </template>
    <template v-else-if="layoutOption === 'image'">
      <ImageSearchResult :results="results" :query="query" />
    </template>
    <template v-else-if="layoutOption === 'table'">
      <TableSearchResult :results="results" :query="query" />
    </template>
    <template v-else-if="layoutOption === 'stats'">
      <StatsSearchResult
        :aggregations="aggregations"
        :facet-labels="facetLabels"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, /* Watch, */ Component } from 'nuxt-property-decorator'
import GridSearchResult from '~/components/search/GridSearchResult.vue'
import ListSearchResult from '~/components/search/ListSearchResult.vue'
import ImageSearchResult from '~/components/search/ImageSearchResult.vue'
import TableSearchResult from '~/components/search/TableSearchResult.vue'
import StatsSearchResult from '~/components/search/StatsSearchResult.vue'
import { queryStore, dataStore } from '~/store'

@Component({
  components: {
    GridSearchResult,
    ListSearchResult,
    ImageSearchResult,
    TableSearchResult,
    StatsSearchResult,
  },
})
export default class SearchResult extends Vue {
  @Prop({
    required: true,
    default() {
      return []
    },
  })
  results!: any[]

  @Prop({
    default() {
      return {}
    },
  })
  query!: any

  get layoutOption() {
    return queryStore ? queryStore.query.layout : 'grid'
  }

  created() {
    this.main()
  }

  facetLabels: any = {}
  aggregations: any = {}

  main() {
    if (dataStore) {
      this.facetLabels = queryStore.query.facetLabels
      this.aggregations = dataStore.data.all.result.aggregations
    }
  }
}
</script>
