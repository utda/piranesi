<template>
  <div>
    <template v-for="(label, term) in facetLabels">
      <FacetOption
        v-if="
          result.result.aggregations[term] &&
          result.result.aggregations[term].buckets.length > 0 //削除を入れる場合には要検討
        "
        :key="term"
        :term="term"
        :label="label"
        class="mb-5"
        :tmp="tmp"
      />
    </template>

    <DateFacet v-if="dateFacetFlag" />
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Watch, Component } from 'nuxt-property-decorator'
import FacetOption from '~/components/search/FacetOption.vue'
import DateFacet from '~/components/search/DateFacet.vue'
import { queryStore, dataStore } from '~/store'

@Component({
  components: {
    FacetOption,
    DateFacet,
  },
})
export default class searchoptions extends Vue {
  // とりあえず非表示
  dateFacetFlag: boolean = false

  @Prop({
    default() {
      return {}
    },
  })
  tmp!: any

  facetLabels: any = {}
  result: any = {}

  @Watch('tmp')
  watchTmp() {
    this.main()
  }

  created() {
    this.main()
  }

  main() {
    if (dataStore) {
      this.facetLabels = queryStore.query.facetLabels
      this.result = dataStore.data.all
    }
  }
}
</script>
