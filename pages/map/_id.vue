<template>
  <div>
    <v-container>
      <h2 class="my-5">{{ title }}</h2>

      <iframe
        width="100%"
        height="600px"
        allowfullscreen
        frameborder="0"
        src="https://nakamura196.github.io/piranesi/icv/?curation=https://mp.ex.nii.ac.jp/api/curation/json/af18d11d-0d58-46de-aa50-28bb930babd9&mode=annotation&lang=ja&full=1"
      />

      <p class="mt-5">
        <router-link :to="{ path: '/mapsearch' }">Show all places.</router-link>
      </p>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import breadcrumbs from '~/components/common/Breadcrumbs.vue'
import toc from '~/components/common/Toc.vue'

@Component({
  components: {
    breadcrumbs,
    toc,
  },
})
export default class Search extends Vue {
  data: any = {}
  title: string = ''

  async fetch(context: any) {
    const store = context.store
    const state = store.state

    if (state.index == null) {
      const index = await context.app.$searchUtils.createIndexFromIIIFCollection(
        'https://piranesi.dl.itc.u-tokyo.ac.jp/data/print/iiif/top2.json'
      )
      store.commit('setIndex', index.index)
      store.commit('setData', index.data)
    }

    const routeQuery = context.query
    const esQuery = context.app.$searchUtils.createQuery(routeQuery, state)
    store.commit('setQuery', esQuery)

    const result = context.app.$searchUtils.search(
      store.state.index,
      store.state.data,
      store.state.query
    )

    context.store.commit('setResult', result)
  }

  created() {
    const mapNo = this.$route.params.id

    const data = this.$store.state

    const index = data.index
    const dataAll = data.results

    const id = index.map_no[mapNo][0]
    const obj = dataAll[id]
    this.title = obj._source.Edificio_i[0]
  }
}
</script>
