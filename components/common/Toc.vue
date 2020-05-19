<template>
  <v-select
    v-model="value"
    :label="$t('volume_index')"
    :items="items"
    flat
    hide-details
    @change="changeToc()"
  ></v-select>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Toc extends Vue {
  breadcrumbs: any[] = []
  items: any = []
  value: number = -1

  created() {
    const items = []
    for (let i = 0; i < 29; i++) {
      items.push({
        value: i + 1,
        text:
          this.$i18n.locale === 'en'
            ? 'Vol. ' + (i + 1)
            : '第' + (i + 1) + '巻',
      })
    }
    this.items = items
  }

  changeToc() {
    this.$router.push(
      this.localePath({
        name: 'search',
        query: {
          'fc-volume': '' + this.value,
        },
      }),
      () => {},
      () => {}
    )
  }
}
</script>
