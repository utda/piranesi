<template>
  <v-container class="my-5">
    <sheet id="2053" />
    <div class="text-center">
      <img
        :src="$utils.getHibunUrl('2053')"
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
              2492<br />
              <i>Imag. </i>281<br />
              <a :href="$utils.getHibunImageUrl('l/281')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('281')"
              /></a>
            </td>
            <td align="center">2</td>
            <td align="center">
              2754<br /><i>ILS. </i>2059<br />
              <i>Imag. </i>270<br />
              <a :href="$utils.getHibunImageUrl('l/270')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('270')"
              /></a>
            </td>
          </tr>

          <tr>
            <td align="center">3</td>
            <td align="center">
              2661<br />
              <i>Imag. </i>322<br />
              <a :href="$utils.getHibunImageUrl('l/322')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('322')"
              /></a>
            </td>
            <td align="center">4</td>
            <td align="center">
              2970<br />
              <i>Imag. </i>304<br />
              <a :href="$utils.getHibunImageUrl('l/304')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('304')"
              /></a>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <map name="Map">
      <area
        shape="rect"
        coords="26,23,82,115"
        :href="$utils.getHibunUrl('2053/1')"
        target="_blank"
        alt="1"
      />
      <area
        shape="rect"
        coords="30,139,80,226"
        :href="$utils.getHibunUrl('2053/2')"
        target="_blank"
        alt="2"
      />
      <area
        shape="rect"
        coords="105,28,187,138"
        :href="$utils.getHibunUrl('2053/3')"
        target="_blank"
        alt="3"
      />
      <area
        shape="rect"
        coords="211,25,285,131"
        :href="$utils.getHibunUrl('2053/4')"
        target="_blank"
        alt="4"
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
