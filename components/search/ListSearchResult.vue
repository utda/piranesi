<template>
  <div>
    <template v-for="(value, index) in results">
      <ListItem
        :key="index"
        :item="$utils.item2CardItem(value, query, index, '', $i18n.locale)"
      />
      <v-divider :key="'hr-' + index" class="my-3" />
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'
import ListItem from '~/components/display/ListItem.vue'

@Component({
  components: {
    ListItem,
  },
})
export default class listsearchresult extends Vue {
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
}
</script>
