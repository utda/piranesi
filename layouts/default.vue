<template>
  <v-app>
    <Header />

    <v-content>
      <nuxt />
    </v-content>

    <v-btn
      v-show="fab"
      v-scroll="onScroll"
      fab
      dark
      fixed
      bottom
      right
      large
      color="error"
      @click="toTop"
    >
      <v-icon>mdi-arrow-up</v-icon>
    </v-btn>

    <Footer />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Footer from '~/components/layouts/Footer.vue'
import Header from '~/components/layouts/Header.vue'

@Component({
  components: {
    Header,
    Footer,
  },
})
export default class LayoutDefault extends Vue {
  fab: boolean = false

  changeLocale(): void {
    this.$i18n.locale = this.$i18n.locale === 'ja' ? 'en' : 'ja'
  }

  onScroll(e: any): void {
    if (typeof window === 'undefined') return
    const top = window.pageYOffset || e.target.scrollTop || 0
    this.fab = top > 20
  }

  toTop(): void {
    this.$vuetify.goTo(0)
  }
}
</script>

<style>
.v-btn {
  text-transform: none !important;
}
</style>
