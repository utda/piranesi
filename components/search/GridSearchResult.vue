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
import { Vue, Component } from 'nuxt-property-decorator'
import CardItem from '~/components/display/CardItem.vue'

@Component({
  components: {
    CardItem,
  },
})
export default class GridSearchResult extends Vue {
  get col() {
    return 12 / this.$store.state.col
  }

  get results() {
    return this.$store.state.result.hits.hits
  }

  get query() {
    return this.$store.state.query
  }
}
</script>
