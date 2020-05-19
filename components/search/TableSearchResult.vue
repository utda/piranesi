<template>
  <div>
    <v-simple-table fixed-header>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left"></th>
            <th class="text-left"></th>
            <th class="text-left">{{ $t('Edificio') }}</th>
            <th class="text-left">{{ $t('conservazione') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key) in items" :key="key">
            <td>
              <nuxt-link class="mb-4" :to="localePath(item.path)">
                <v-img
                  :src="item.image"
                  contain
                  style="height: 90px; width: 90px;"
                  class="grey lighten-2 my-2"
                ></v-img>
              </nuxt-link>
            </td>
            <td>
              <router-link :to="localePath(item.path)">
                <template v-if="$i18n.locale == 'en'">
                  <small
                    >Vol. {{ $utils.formatArrayValue(item._source.volume) }}
                    {{ $utils.formatArrayValue(item._source.series) }}</small
                  >
                  <br />
                  Page. {{ getPlate(item._source) }}
                  <br />
                  {{ $utils.formatArrayValue(item._source.title) }}
                </template>
                <template v-else>
                  <small
                    >{{ $utils.formatArrayValue(item._source.volume) }}巻
                    {{ $utils.formatArrayValue(item._source.series_JP) }}</small
                  >
                  <br />
                  {{ getPlate(item._source) }}葉
                  {{ $utils.formatArrayValue(item._source.title_JP) }}
                  <br />
                  {{ $utils.formatArrayValue(item._source.title) }}
                </template>
              </router-link>
            </td>
            <td>{{ $utils.formatArrayValue(item._source.Edificio_IL) }}</td>
            <td>{{ $utils.formatArrayValue(item._source.conservazione) }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component, Watch } from 'nuxt-property-decorator'

@Component({
  components: {},
})
export default class TableSearchResult extends Vue {
  created() {
    this.main()
  }

  @Watch('results')
  watchLayout() {
    this.main()
  }

  items: any[] = []

  main() {
    const items: any[] = []
    for (let i = 0; i < this.results.length; i++) {
      const obj = this.results[i]
      const item: any = this.$utils.item2CardItem(
        obj,
        // this.query,
        // i,
        ''
        // this.$i18n.locale
      )
      items.push(item)
    }
    this.items = items
  }

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

  getPlate(obj: any) {
    return (
      (this.$utils.formatArrayValue(obj.plate)
        ? this.$utils.formatArrayValue(obj.plate)
        : 0) + this.$utils.formatArrayValue(obj.constellation)
    )
  }
}
</script>
