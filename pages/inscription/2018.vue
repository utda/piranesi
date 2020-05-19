<template>
  <v-container class="my-5">
    <sheet id="2018" />
    <div class="text-center">
      <img
        :src="baseUrl + '/img/CIL_list/img/2018.jpg'"
        contain
        width="300"
        usemap="#Map"
        class="my-5"
      />
    </div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th></th>
            <th><i>CIL no. </i></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>VI 5917</td>
          </tr>
          <tr>
            <td>2</td>
            <td>VI 5921</td>
          </tr>
          <tr>
            <td>3</td>
            <td>VI 5897</td>
          </tr>
          <tr>
            <td>4</td>
            <td>VI 5918</td>
          </tr>
          <tr>
            <td>5</td>
            <td>VI 5892</td>
          </tr>
          <tr>
            <td>6</td>
            <td>VI 5901</td>
          </tr>
          <tr>
            <td>7</td>
            <td>VI 5923</td>
          </tr>
          <tr>
            <td>8</td>
            <td>VI 5913</td>
          </tr>
          <tr>
            <td>9</td>
            <td>VI 5915</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <!-- :src="baseUrl + '/img/CIL_list/img/2018.jpg'" -->

    <map name="Map">
      <area
        shape="rect"
        coords="16,26,106,69"
        :href="getUrl('2018/1.jpg')"
        target="_blank"
        alt="1"
      />
      <area
        shape="rect"
        coords="110,52,192,102"
        :href="getUrl('2018/2.jpg')"
        target="_blank"
        alt="2"
      />
      <area
        shape="rect"
        coords="205,23,272,61"
        :href="getUrl('2018/3.jpg')"
        target="_blank"
        alt="3"
      />
      <area
        shape="rect"
        coords="68,104,131,134"
        :href="getUrl('2018/4.jpg')"
        target="_blank"
        alt="4"
      />
      <area
        shape="rect"
        coords="172,105,235,133"
        :href="getUrl('2018/5.jpg')"
        target="_blank"
        alt="5"
      />
      <area
        shape="rect"
        coords="19,143,69,171"
        :href="getUrl('2018/6.jpg')"
        target="_blank"
        alt="6"
      />
      <area
        shape="rect"
        coords="234,144,287,169"
        :href="getUrl('2018/7.jpg')"
        target="_blank"
        alt="7"
      />
      <area
        shape="rect"
        coords="89,164,221,199"
        :href="getUrl('2018/8.jpg')"
        target="_blank"
        alt="8"
      />
      <area
        shape="rect"
        coords="207,200,262,228"
        :href="getUrl('2018/9.jpg')"
        target="_blank"
        alt="9"
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

  getUrl(id: string) {
    return this.baseUrl + '/img/CIL_list/img/' + id
  }
}
</script>
