<template>
  <v-container class="my-5">
    <sheet id="3028" />
    <div class="text-center">
      <img
        :src="$utils.getHibunUrl('3028')"
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
            <th class="text-center"><i>CIL VI</i></th>
            <th></th>
            <th class="text-center"><i>CIL VI</i></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td align="center">1</td>
            <td align="center">
              4223<br />
              <i>Imag. </i>58<br />
              <a :href="$utils.getHibunImageUrl('l/58')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('58')"
              /></a>
            </td>
            <td align="center">4</td>
            <td align="center">4228<br /><i>Imag. </i>127</td>
          </tr>
          <tr>
            <td align="center">2</td>
            <td align="center">
              4226<br /><i>Imag. </i>40<br />
              <i>ILS. </i>1620
            </td>
            <td align="center">5</td>
            <td align="center">
              4087<br /><i>Imag. </i>1385<br />
              <a :href="$utils.getHibunImageUrl('l/1385')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('1385')" />
              </a>
            </td>
          </tr>
          <tr>
            <td align="center">3</td>
            <td align="center">
              4224<br />
              <i>Imag. </i>58
            </td>
            <td align="center">6</td>
            <td align="center">1393 = 4229<br /><i>Imag. </i>143</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <map name="Map">
      <area
        shape="rect"
        coords="12,84,43,137"
        :href="$utils.getHibunUrl('3028/1')"
        target="_blank"
        alt="1"
      />
      <area
        shape="rect"
        coords="41,25,71,72"
        :href="$utils.getHibunUrl('3028/2')"
        target="_blank"
        alt="2"
      />
      <area
        shape="rect"
        coords="127,11,156,38"
        :href="$utils.getHibunUrl('3028/3')"
        target="_blank"
        alt="3"
      />
      <area
        shape="rect"
        coords="210,23,241,71"
        :href="$utils.getHibunUrl('3028/4')"
        target="_blank"
        alt="4"
      />
      <area
        shape="rect"
        coords="256,16,287,65"
        :href="$utils.getHibunUrl('3028/5')"
        target="_blank"
        alt="5"
      />
      <area
        shape="rect"
        coords="261,79,288,131"
        :href="$utils.getHibunUrl('3028/6')"
        target="_blank"
        alt="6"
      />
    </map>
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
