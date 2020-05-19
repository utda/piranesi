<template>
  <v-container class="my-5">
    <sheet id="5003" />
    <div class="text-center">
      <img
        :src="$utils.getHibunUrl('5003')"
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
            <th class="text-center"><i>CIL</i></th>
            <th class="text-center"><i>ILS</i></th>
            <th class="text-center"><i>ROL</i></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td align="center">1</td>
            <td align="center">I<sup>2</sup> 16</td>
            <td align="center">10</td>
            <td align="center">p. 6, n. 9</td>
          </tr>
          <tr>
            <td align="center">2</td>
            <td align="center">I<sup>2</sup> 6</td>
            <td align="center">1</td>
            <td align="center">p. 2, n. 1</td>
          </tr>
          <tr>
            <td align="center">3</td>
            <td align="center">I<sup>2</sup> 7</td>
            <td align="center">1</td>
            <td align="center">p. 2, n. 2</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <map name="Map">
      <area
        shape="rect"
        coords="81,34,219,58"
        :href="$utils.getHibunUrl('5003/1')"
        target="_blank"
        alt="1"
      />
      <area
        shape="rect"
        coords="98,64,223,83"
        :href="$utils.getHibunUrl('5003/2')"
        target="_blank"
        alt="2"
      />
      <area
        shape="rect"
        coords="58,129,255,162"
        :href="$utils.getHibunUrl('5003/3')"
        target="_blank"
        alt="3"
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
