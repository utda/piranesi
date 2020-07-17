<template>
  <div>
    <v-data-table :headers="headers" :items="items" hide-default-footer>
      <template v-slot:item.image="{ item }">
        <nuxt-link
          class="mb-4"
          :to="
            localePath({
              name: 'item',
              query: { id: item.id, u: $route.query.u },
            })
          "
        >
          <v-img
            :src="item.image"
            contain
            style="height: 90px; width: 90px;"
            class="grey lighten-2 my-2"
          ></v-img>
        </nuxt-link>
      </template>

      <template v-slot:item.label="{ item }">
        <nuxt-link
          class="mb-4"
          :to="
            localePath({
              name: 'item',
              query: { id: item.id, u: $route.query.u },
            })
          "
        >
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
        </nuxt-link>
      </template>

      <template v-slot:item.icons="{ item }">
        <ResultOption :item="item" />
      </template>
    </v-data-table>

    <v-simple-table v-if="false" fixed-header>
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
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import ResultOption from '~/components/display/ResultOption.vue'

@Component({
  components: {
    ResultOption,
  },
})
export default class TableSearchResult extends Vue {
  get results() {
    return this.$store.state.result.hits.hits
  }

  items: any[] = []
  fields!: any[]

  headers: any[] = []

  @Watch('results', { deep: true })
  watchTmp() {
    this.main()
  }

  mounted() {
    const fields: any = [
      { key: 'image', label: '' },
      { key: 'label', label: this.$t('title') },
      { key: 'Edificio', label: this.$t('Edificio') },
      { key: 'conservazione', label: this.$t('conservazione') },
      { key: 'icons', label: '' },
    ]
    this.fields = fields

    const headers = []
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i]
      if (field.label.startsWith('_')) {
        continue
      }
      headers.push({
        text: field.label,
        align: 'start',
        value: field.key,
      })
    }
    this.headers = headers

    this.main()
  }

  main() {
    const fields = this.fields
    const results = this.results
    const items: any[] = []
    for (let i = 0; i < results.length; i++) {
      const result: any = results[i]

      const item: any = {
        image: this.$utils.formatArrayValue(result._source._image),
        label: this.$utils.formatArrayValue(result._source._title),
        id: result._id,
        raw: result,
        manifest: result._id,
        url:
          process.env.BASE_URL +
          '/item/' +
          this.$utils.formatArrayValue(result._source.file_no),
        _source: result._source,
      }

      for (let j = 0; j < fields.length; j++) {
        const label = fields[j].key
        if (result._source[label]) {
          item[label] = this.$utils.truncate(
            this.$utils.formatArrayValue(result._source[label]),
            50
          )
        }
      }
      items.push(item)
    }
    this.items = items
  }

  getPlate(obj: any) {
    return (
      (this.$utils.formatArrayValue(obj.plate)
        ? this.$utils.formatArrayValue(obj.plate)
        : 0) + this.$utils.formatArrayValue(obj.constellation)
    )
  }
}
</script>
