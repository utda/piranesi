<template>
  <span>
    {{ title }}
    <i v-if="mtFlg" id="tooltip-target-1" class="mdi mdi-google-translate"></i>
    <b-tooltip target="tooltip-target-1" triggers="hover">
      {{ $t('機械的に翻訳したタイトルです。') }}
    </b-tooltip>
  </span>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator'

@Component
export default class CjTitle extends Vue {
  @Prop({ required: true })
  metadata!: any

  mtFlg: boolean = false

  get title(): string {
    const metadata = this.metadata

    if (this.$i18n.locale === 'en') {
      return this.$utils.formatArrayValue(metadata._title)
    }

    if (metadata.title_mt && metadata.title_mt.length > 0) {
      this.mtFlg = true
      return this.$utils.formatArrayValue(metadata.title_mt)
    } else {
      this.mtFlg = false
      return this.$utils.formatArrayValue(metadata._title)
    }
  }
}
</script>
