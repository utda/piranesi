<template>
  <div>
    <!-- facets -->
    <template v-for="(label, index) in facetLabels">
      <FacetOption
        v-if="aggregations[index] && index != '_full_text'"
        :key="index"
        :term="index"
        :label="label"
        :buckets="aggregations[index].buckets"
        :query="query"
        class="mb-5"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import FacetOption from '~/components/search/FacetOption.vue'

@Component({
  components: {
    FacetOption,
  },
})
export default class FacetSearchOptions extends Vue {
  get aggregations() {
    return this.$store.state.result.aggregations
  }

  get facetLabels() {
    return this.$store.state.facetLabels
  }

  get query() {
    return this.$store.state.query
  }
}
</script>
