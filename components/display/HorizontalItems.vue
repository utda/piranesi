<template>
  <table class="table-responsive">
    <tbody>
      <tr>
        <td v-for="(obj, index) in data" :key="index">
          <CardItem
            :key="'value_' + index"
            class="mt-2 mb-4"
            :horizontal="true"
            :item="obj"
            :width="width"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'
import CardItem from '~/components/display/CardItem.vue'

@Component({
  components: {
    CardItem,
  },
})
export default class Header extends Vue {
  @Prop({
    default: 200,
  })
  width!: number

  @Prop({ default: [] })
  data!: any[]
}
</script>
