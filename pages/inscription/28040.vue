<template>
  <v-container class="my-5">
    <sheet id="28040" />
    <div class="text-center">
      <img
        :src="$utils.getHibunUrl('28040')"
        contain
        width="300"
        usemap="#Map"
        class="my-5"
      />
    </div>
    <v-simple-table class="text-center">
      <template v-slot:default>
        <thead>
          <tr>
            <th></th>
            <th class="text-center">CIL</th>
            <th class="text-center">ILS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td align="center">1</td>
            <td align="center">X 847</td>
            <td align="center"></td>
          </tr>
          <tr>
            <td align="center">2</td>
            <td align="center">X 849</td>
            <td align="center"></td>
          </tr>
          <tr>
            <td align="center">3</td>
            <td align="center">X 848</td>
            <td align="center"></td>
          </tr>
          <tr>
            <td align="center">4</td>
            <td align="center">X 814</td>
            <td align="center">5198</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import sheet from '~/components/common/Sheet.vue'

@Component({
  components: {
    sheet,
  },
})
export default class Page extends Vue {
  baseUrl: any = process.env.BASE_URL
  head() {
    return {
      titleTemplate: null,
      title: this.$t('latin_inscriptions'),
    }
  }
}
</script>
<style>
table th + th {
  border-left: 1px solid #dddddd;
}
table td + td {
  border-left: 1px solid #dddddd;
}
</style>
