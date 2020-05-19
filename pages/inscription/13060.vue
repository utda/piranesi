<template>
  <v-container class="my-5">
    <sheet id="13060" />
    <div class="text-center">
      <img
        :src="$utils.getHibunUrl('13060')"
        contain
        width="300"
        usemap="#Map"
        class="my-5"
      />
    </div>
    <v-simple-table class="text-center">
      <template v-slot:default>
        <tbody>
          <tr>
            <td width="640">
              <i>CIL.</i> VI. 2572<br />
              <i>Imag.</i> 2099<br />
              <img :src="$utils.getHibunImageUrl('l/2099')" border="1" />
            </td>
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
