<template>
  <v-row>
    <v-col v-for="(value, index) in results" :key="index" cols="12" :sm="col">
      <CardItem
        :item="$utils.item2CardItem(value, query, index, '', $i18n.locale)"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'
import CardItem from '~/components/display/CardItem.vue'
import { queryStore } from '~/store'

@Component({
  components: {
    CardItem,
  },
})
export default class GridSearchResult extends Vue {
  get col() {
    const col: number = queryStore ? queryStore.query.col : 3
    return 12 / col
  }

  @Prop({
    required: true,
    default() {
      return []
    },
  })
  results!: any

  @Prop({
    default() {
      return {}
    },
  })
  query!: any
}
</script>
