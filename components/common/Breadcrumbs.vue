<template>
  <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Breadcrumbs extends Vue {
  @Prop()
  id!: string

  @Prop()
  vol!: string

  breadcrumbs: any[] = []

  // data: any = {}

  async created() {
    const store = this.$store
    const state = store.state

    if (state.index == null) {
      const index = await this.$searchUtils.createIndexFromIIIFCollection(
        'https://piranesi.dl.itc.u-tokyo.ac.jp/data/print/iiif/top.json'
      )
      store.commit('setIndex', index.index)
      store.commit('setData', index.data)
    }

    if (this.id !== '' && this.id != null) {
      const result = this.$store.state
      const index = result.index
      const dataAll = result.data
      const n = index.file_no[this.id][0]
      const obj = dataAll[n]
      const source = obj._source

      this.breadcrumbs = [
        {
          text: this.$t('top'),
          disabled: false,
          to: this.localePath({
            name: 'index',
          }),
        },
        {
          text: this.$t('volume_index'),
          disabled: false,
          to: this.localePath({
            name: 'volume',
          }),
        },
        {
          text:
            this.$i18n.locale === 'ja'
              ? source.volume + '巻'
              : 'Vol. ' + source.volume,
          disabled: false,
          to: this.localePath({
            name: 'search',
            query: {
              'fc-volume': source.volume,
            },
          }),
        },
        {
          text:
            this.$i18n.locale === 'ja'
              ? source.plate + '葉'
              : 'Page. ' + source.plate,
          disabled: false,
          to: this.localePath({
            name: 'item-id',
            params: { id: this.id },
          }),
        },
      ]
    }
  }
}
</script>
