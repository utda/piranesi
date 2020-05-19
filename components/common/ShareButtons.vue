<template>
  <v-list>
    <v-list-item :href="twitterUrl" target="_blank" title="Twitterで共有">
      <v-icon>mdi-twitter</v-icon>
    </v-list-item>
    <v-list-item :href="facebookUrl" target="_blank" title="Facebookで共有">
      <v-icon>mdi-facebook</v-icon>
    </v-list-item>
    <v-list-item :href="pocketUrl" target="_blank" title="pocketで共有">
      <v-icon>mdi-pocket</v-icon>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator'

@Component
export default class ShareButtons extends Vue {
  @Prop({ required: true })
  url!: string

  @Prop({ required: true })
  title!: string

  get twitterUrl() {
    return (
      'https://twitter.com/intent/tweet?url=' + this.url + '&text=' + this.title
    )
  }

  get facebookUrl() {
    return 'https://www.facebook.com/sharer/sharer.php?u=' + this.url
  }

  get pocketUrl() {
    return 'http://getpocket.com/edit?url=' + this.url
  }
}
</script>
