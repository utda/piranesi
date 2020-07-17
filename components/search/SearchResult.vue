<template>
  <div>
    <template v-if="layoutOption === 'grid'">
      <GridSearchResult />
    </template>
    <template v-else-if="layoutOption === 'list'">
      <ListSearchResult />
    </template>
    <template v-else-if="layoutOption === 'image'">
      <ImageSearchResult />
    </template>
    <template v-else-if="layoutOption === 'table'">
      <TableSearchResult />
    </template>
    <template v-else-if="layoutOption === 'stats'">
      <StatsSearchResult />
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import GridSearchResult from '~/components/search/GridSearchResult.vue'
import ListSearchResult from '~/components/search/ListSearchResult.vue'
import ImageSearchResult from '~/components/search/ImageSearchResult.vue'
import TableSearchResult from '~/components/search/TableSearchResult.vue'
import StatsSearchResult from '~/components/search/StatsSearchResult.vue'

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
  get layoutOption() {
    return this.$store.state.layout
  }
}
</script>
