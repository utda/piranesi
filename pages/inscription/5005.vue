<template>
  <v-container class="my-5">
    <sheet id="5005" />
    <div class="text-center">
      <img
        :src="$utils.getHibunUrl('5005')"
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
            <td align="center">I<sup>2</sup> 9</td>
            <td align="center">3</td>
            <td align="center">p. 4, n. 4</td>
          </tr>
          <tr>
            <td align="center">2</td>
            <td align="center">I<sup>2</sup> 8</td>
            <td align="center">2</td>
            <td align="center">p. 4, n. 3</td>
          </tr>
          <tr>
            <td align="center">3</td>
            <td align="center">I<sup>2</sup> 15</td>
            <td align="center">6</td>
            <td align="center">p. 8, n. 10</td>
          </tr>
          <tr>
            <td align="center">4</td>
            <td align="center">I<sup>2</sup> 11</td>
            <td align="center">7</td>
            <td align="center">p. 6, n. 6</td>
          </tr>
          <tr>
            <td align="center">5</td>
            <td align="center">I<sup>2</sup> 12</td>
            <td align="center">5</td>
            <td align="center">p. 6, n. 7</td>
          </tr>
          <tr>
            <td align="center">6</td>
            <td align="center">I<sup>2</sup> 13</td>
            <td align="center">8</td>
            <td align="center">p. 6, n. 8</td>
          </tr>
          <tr>
            <td align="center">7</td>
            <td align="center">I<sup>2</sup> 10</td>
            <td align="center">4</td>
            <td align="center">p. 4, n. 10</td>
          </tr>
          <tr>
            <td align="center">8</td>
            <td align="center">I<sup>2</sup> 14</td>
            <td align="center">9</td>
            <td align="center">-</td>
          </tr>
          <tr>
            <td align="center">9</td>
            <td align="center">I<sup>2</sup> 16</td>
            <td align="center">10</td>
            <td align="center">p. 6, n. 9</td>
          </tr>
          <tr>
            <td align="center">10</td>
            <td align="center">VI 1392 = 31643</td>
            <td align="center">958</td>
            <td align="center">-</td>
          </tr>
          <tr>
            <td align="center">11</td>
            <td align="center">VI 1439</td>
            <td align="center">959</td>
            <td align="center">-</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <map name="Map">
      <area
        shape="rect"
        coords="6,14,76,53"
        :href="$utils.getHibunUrl('5005/1')"
        target="_blank"
        alt="1"
      />
      <area
        shape="rect"
        coords="79,16,171,49"
        :href="$utils.getHibunUrl('5005/2')"
        target="_blank"
        alt="2"
      />
      <area
        shape="rect"
        coords="175,16,297,49"
        :href="$utils.getHibunUrl('5005/3')"
        target="_blank"
        alt="3"
      />
      <area
        shape="rect"
        coords="13,80,105,118"
        :href="$utils.getHibunUrl('5005/4')"
        target="_blank"
        alt="4"
      />
      <area
        shape="rect"
        coords="113,78,155,121"
        :href="$utils.getHibunUrl('5005/5')"
        target="_blank"
        alt="5"
      />
      <area
        shape="rect"
        coords="162,79,199,119"
        :href="$utils.getHibunUrl('5005/6')"
        target="_blank"
        alt="6"
      />
      <area
        shape="rect"
        coords="9,151,47,177"
        :href="$utils.getHibunUrl('5005/8')"
        target="_blank"
        alt="8"
      />
      <area
        shape="rect"
        coords="52,151,155,177"
        :href="$utils.getHibunUrl('5005/9')"
        target="_blank"
        alt="9"
      />
      <area
        shape="rect"
        coords="170,152,202,178"
        :href="$utils.getHibunUrl('5005/10')"
        target="_blank"
        alt="10"
      />
      <area
        shape="rect"
        coords="209,80,289,117"
        :href="$utils.getHibunUrl('5005/7')"
        target="_blank"
        alt="7"
      />
      <area
        shape="rect"
        coords="217,138,280,177"
        :href="$utils.getHibunUrl('5005/11')"
        target="_blank"
        alt="11"
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
