<template>
  <v-sheet color="grey lighten-3" class="my-5">
    <v-row no-gutters>
      <v-col cols="12" sm="9">
        <breadcrumbs :id="id" />
      </v-col>
      <v-col cols="12" sm="3">
        <toc class="mx-5 mb-2" />
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import breadcrumbs from '~/components/common/Breadcrumbs.vue'
import toc from '~/components/common/Toc.vue'

@Component({
  components: {
    breadcrumbs,
    toc,
  },
})
export default class Sheet extends Vue {
  @Prop()
  id!: string
}
</script>
