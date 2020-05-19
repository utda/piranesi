<template>
  <div>
    <!--
  <div
    v-for="(buckets, index) in results.aggregations"
    :key="index"
    class="mb-4"
  >
    <b-card v-if="buckets.buckets.length > 1" no-body>
      <b-card-body>
        <h4 class="mb-4">{{ index }}</h4>
        <chart
          :height="200"
          class="mb-4"
          :buckets="buckets.buckets"
          :label="index"
        ></chart>
        <PieChart
          :height="200"
          :buckets="buckets.buckets"
          :label="index"
        ></PieChart>
      </b-card-body>
    </b-card>
  </div>
  --></div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'
import CardItem from '~/components/display/CardItem.vue'

@Component({
  components: {
    CardItem,
  },
})
export default class statssearchresult extends Vue {
  @Prop({
    required: true,
    default() {
      return []
    },
  })
  results88!: any
}
</script>
