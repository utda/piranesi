<template>
  <v-card>
    <router-link :to="item.path ? localePath(item.path) : null">
      <v-img
        :src="item.image"
        contain
        style="height: 200px;"
        width="100%"
        class="grey lighten-2"
      ></v-img>
    </router-link>

    <v-card-title>
      <router-link :to="item.path ? localePath(item.path) : null">
        <template v-if="obj">
          <template v-if="$i18n.locale == 'en'">
            Vol.
            {{ $utils.formatArrayValue(obj.volume) }}
            Page. {{ plate }}
          </template>
          <template v-else>
            第{{ $utils.formatArrayValue(obj.volume) }}巻 第{{ plate }}葉
          </template>
        </template>
        <template v-else>
          {{ item.label }}
        </template>
      </router-link>
    </v-card-title>

    <v-divider />

    <v-card-actions>
      <v-spacer></v-spacer>

      <ResultOption :item="item" />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'
import ResultOption from '~/components/display/ResultOption.vue'

@Component({
  components: {
    ResultOption,
  },
})
export default class cardItem extends Vue {
  baseUrl: any = process.env.BASE_URL

  @Prop({
    default: 200,
  })
  width!: number

  @Prop({ required: true })
  item!: any

  get obj() {
    return this.item._source
  }

  @Prop({
    default: false,
  })
  horizontal!: boolean

  get plate() {
    return (
      (this.$utils.formatArrayValue(this.obj.plate)
        ? this.$utils.formatArrayValue(this.obj.plate)
        : 0) + this.$utils.formatArrayValue(this.obj.constellation)
    )
  }
}
</script>
