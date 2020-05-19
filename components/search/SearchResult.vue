<template>
  <div>
    <template v-if="layoutOption === 'grid'">
      <GridSearchResult :results="results" :query="query" />
    </template>
    <template v-else-if="layoutOption === 'list'">
      <ListSearchResult :results="results" :query="query" />
    </template>
    <template v-else-if="layoutOption === 'stats'">
      <StatsSearchResult :results="results" />
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, /* Watch, */ Component } from 'nuxt-property-decorator'
import GridSearchResult from '~/components/search/GridSearchResult.vue'
import ListSearchResult from '~/components/search/ListSearchResult.vue'
import StatsSearchResult from '~/components/search/StatsSearchResult.vue'
import { queryStore } from '~/store'

@Component({
  components: {
    GridSearchResult,
    ListSearchResult,
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
}
</script>
