<template>
  <div>
    <template v-for="(label, index) in facetLabels">
      <v-card
        v-if="
          aggregations[index] &&
          aggregations[index].buckets &&
          aggregations[index].buckets.length > 0
        "
        :key="index"
        no-body
        class="mb-10"
      >
        <v-card-title class="grey lighten-2">{{ label }}</v-card-title>
        <div class="pa-5">
          <Chart
            :height="400"
            class="mb-4"
            :buckets="aggregations[index].buckets"
          ></Chart>
        </div>
      </v-card>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'
import Chart from '~/components/search/TestChart.vue'

@Component({
  components: {
    Chart,
  },
})
export default class statssearchresult extends Vue {
  @Prop({
    required: true,
    default() {
      return []
    },
  })
  aggregations!: any

  @Prop({
    default() {
      return []
    },
  })
  facetLabels!: string[]
}
</script>
