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

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn v-if="item.manifest" icon :href="item.manifest">
        <img height="24px" :src="baseUrl + '/img/iiif-logo.svg'" />
      </v-btn>

      <v-btn icon>
        <v-menu open-on-hover top offset-y>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on">mdi-share-variant</v-icon>
          </template>

          <ShareButtons :url="item.url" :title="item.label" />
        </v-menu>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'
import ResultOption from '~/components/display/ResultOption.vue'
import ShareButtons from '~/components/common/ShareButtons.vue'
import { queryStore } from '~/store'

@Component({
  components: {
    ResultOption,
    ShareButtons,
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

  removeItem(id: string, type: string) {
    if (type === 'id') {
      queryStore.removeId([id])
    } else {
      queryStore.removeImage([id])
    }

    this.$router.push(
      this.localePath({
        name: 'search',
        query: this.$utils.getSearchQueryFromQueryStore(queryStore.query),
      }),
      () => {},
      () => {}
    )
  }

  get plate() {
    return (
      (this.$utils.formatArrayValue(this.obj.plate)
        ? this.$utils.formatArrayValue(this.obj.plate)
        : 0) + this.$utils.formatArrayValue(this.obj.constellation)
    )
  }
}
</script>
