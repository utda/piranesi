<template>
  <div>
    <template v-for="(value, label) in facetLabels">
      <v-card
        v-if="
          aggregations[label] &&
          aggregations[label].buckets &&
          aggregations[label].buckets.length > 0
        "
        :key="label"
        no-body
        class="mb-10"
      >
        <v-card-title class="grey lighten-2">{{
          value.startsWith('_') ? $t(value.slice(1)) : $t(value)
        }}</v-card-title>

        <div class="pa-5">
          <Chart
            :height="200"
            class="mb-4"
            :buckets="aggregations[label].buckets"
          ></Chart>
        </div>
      </v-card>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Chart from '~/components/search/TestChart.vue'

@Component({
  components: {
    Chart,
  },
})
export default class StatsSearchResult extends Vue {
  get aggregations() {
    return this.$store.state.result.aggregations
  }

  get facetLabels() {
    return this.$store.state.facetLabels
  }
}
</script>
