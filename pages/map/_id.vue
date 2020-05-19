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

  async created() {
    const mapNo = this.$route.params.id

    const data = await this.$searchUtils.createIndexFromIIIFCollection(
      'https://raw.githubusercontent.com/nakamura196/piranesi/master/docs/print/iiif/top.json'
    )

    const index = data.index
    const dataAll = data.results

    const id = index.map_no[mapNo][0]
    const obj = dataAll[id]
    this.title = obj._source.Edificio_i[0]
  }
}
</script>
