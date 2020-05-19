<template>
  <v-container class="my-5">
    <sheet id="2020" />
    <div class="text-center">
      <img
        :src="$utils.getHibunUrl('2020')"
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
            <th class="text-center"><i>CIL no. </i></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>VI 5894</td>
          </tr>
          <tr>
            <td>2</td>
            <td>VI 5908</td>
          </tr>
          <tr>
            <td>3</td>
            <td>VI 5887</td>
          </tr>
          <tr>
            <td>4</td>
            <td>VI 5928</td>
          </tr>
          <tr>
            <td>5</td>
            <td>VI 5924</td>
          </tr>
          <tr>
            <td>6</td>
            <td>VI 5922</td>
          </tr>
          <tr>
            <td>7</td>
            <td>VI 5929</td>
          </tr>
          <tr>
            <td>8</td>
            <td>VI 5903</td>
          </tr>
          <tr>
            <td>9</td>
            <td>VI 5888</td>
          </tr>
          <tr>
            <td>10</td>
            <td>VI 5899</td>
          </tr>
          <tr>
            <td>11</td>
            <td>VI 5904</td>
          </tr>
          <tr>
            <td>12</td>
            <td>VI 5898</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <map name="Map">
      <area
        shape="rect"
        coords="18,10,76,37"
        :href="$utils.getHibunUrl('2020/1')"
        target="_blank"
        alt="1"
      />
      <area
        shape="rect"
        coords="19,49,74,77"
        :href="$utils.getHibunUrl('2020/2')"
        target="_blank"
        alt="2"
      />
      <area
        shape="rect"
        coords="93,36,146,66"
        :href="$utils.getHibunUrl('2020/3')"
        target="_blank"
        alt="3"
      />
      <area
        shape="rect"
        coords="228,20,281,49"
        :href="$utils.getHibunUrl('2020/4')"
        target="_blank"
        alt="4"
      />
      <area
        shape="rect"
        coords="194,72,273,116"
        :href="$utils.getHibunUrl('2020/5')"
        target="_blank"
        alt="5"
      />
      <area
        shape="rect"
        coords="41,101,105,131"
        :href="$utils.getHibunUrl('2020/6')"
        target="_blank"
        alt="6"
      />
      <area
        shape="rect"
        coords="142,139,193,165"
        :href="$utils.getHibunUrl('2020/7')"
        target="_blank"
        alt="7"
      />
      <area
        shape="rect"
        coords="236,139,285,163"
        :href="$utils.getHibunUrl('2020/8')"
        target="_blank"
        alt="8"
      />
      <area
        shape="poly"
        coords="62,157,86,170,63,219,42,213"
        :href="$utils.getHibunUrl('2020/9')"
        target="_blank"
        alt="9"
      />
      <area
        shape="rect"
        coords="88,179,142,205"
        :href="$utils.getHibunUrl('2020/10')"
        target="_blank"
        alt="10"
      />
      <area
        shape="rect"
        coords="171,177,229,204"
        :href="$utils.getHibunUrl('2020/11')"
        target="_blank"
        alt="11"
      />
      <area
        shape="poly"
        coords="63,223,114,212,122,235,71,244"
        :href="$utils.getHibunUrl('2020/12')"
        target="_blank"
        alt="12"
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
