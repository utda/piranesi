<template>
  <v-card flat>
    <v-card-actions>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon class="ma-2" @click="copyLink()" v-on="on"
            ><v-icon>mdi-link</v-icon></v-btn
          >
        </template>
        <span>{{ 'Copy this link.' }}</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon class="ma-2" target="_blank" :href="twitterUrl" v-on="on"
            ><v-icon>mdi-twitter</v-icon></v-btn
          >
        </template>
        <span>{{ 'Twitter' }}</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon class="ma-2" target="_blank" :href="facebookUrl" v-on="on"
            ><v-icon>mdi-facebook</v-icon></v-btn
          >
        </template>
        <span>{{ 'Facebook' }}</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon class="ma-2" target="_blank" :href="pocketUrl" v-on="on"
            ><img style="font-size: 24px;" :src="baseUrl + '/img/pocket.svg'"
          /></v-btn>
        </template>
        <span>{{ 'Pocket' }}</span>
      </v-tooltip>

      <v-tooltip v-if="image" bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon class="ma-2" target="_blank" :href="googleUrl" v-on="on"
            ><v-icon>mdi-google</v-icon></v-btn
          >
        </template>
        <span>{{ $t('google_image_search') }}</span>
      </v-tooltip>

      <v-tooltip v-if="manifest != ''" bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon class="ma-2" target="_blank" :href="iiifUrl" v-on="on"
            ><v-icon>mdi-star</v-icon></v-btn
          >
        </template>
        <span>{{ 'IIIF pocket' }}</span>
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator'

@Component
export default class ShareButtons extends Vue {
  copyLink() {
    const str = this.url

    const listener = function (e: any) {
      e.clipboardData.setData('text/plain', str)
      // 本来のイベントをキャンセル
      e.preventDefault()
      // 終わったら一応削除
      document.removeEventListener('copy', listener)
    }

    // コピーのイベントが発生したときに、クリップボードに書き込むようにしておく
    document.addEventListener('copy', listener)

    // コピー
    document.execCommand('copy')
    // alert('Copied.')
  }

  baseUrl: any = process.env.BASE_URL

  @Prop({ required: true })
  url!: string

  @Prop({ required: true })
  title!: string

  @Prop()
  image!: string

  @Prop()
  manifest!: string

  get twitterUrl() {
    return (
      'https://twitter.com/intent/tweet?url=' +
      encodeURIComponent(this.url) +
      '&text=' +
      this.title
    )
  }

  get facebookUrl() {
    return (
      'https://www.facebook.com/sharer/sharer.php?u=' +
      encodeURIComponent(this.url)
    )
  }

  get pocketUrl() {
    return 'http://getpocket.com/edit?url=' + encodeURIComponent(this.url)
  }

  get googleUrl() {
    return (
      'https://www.google.co.jp/searchbyimage?image_url=' +
      encodeURIComponent(this.image)
    )
  }

  get iiifUrl() {
    const route: any = this.$route
    const lang: any = route.name.includes('___en') ? 'en/' : ''
    return (
      'http://pocket.cultural.jp/' +
      lang +
      '?url=' +
      encodeURIComponent(this.manifest) +
      '&related=' +
      this.url
    )
  }
}
</script>
