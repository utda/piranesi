<template>
  <v-container class="my-5">
    <sheet id="2019" />
    <div class="text-center">
      <img
        :src="$utils.getHibunUrl('2019')"
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
            <td>VI 5912</td>
          </tr>
          <tr>
            <td>2</td>
            <td>VI 5921</td>
          </tr>
          <tr>
            <td>3</td>
            <td>VI 5894</td>
          </tr>
          <tr>
            <td>4</td>
            <td>VI 5914</td>
          </tr>
          <tr>
            <td>5</td>
            <td>VI 5910</td>
          </tr>
          <tr>
            <td>6</td>
            <td>VI 5909</td>
          </tr>
          <tr>
            <td>7</td>
            <td>VI 5907</td>
          </tr>
          <tr>
            <td>8</td>
            <td>VI 5905</td>
          </tr>
          <tr>
            <td>9</td>
            <td>VI 5927</td>
          </tr>
          <tr>
            <td>10</td>
            <td>VI 5898</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <map name="Map">
      <area
        shape="rect"
        coords="87,33,147,67"
        :href="$utils.getHibunUrl('2019/1')"
        target="_blank"
        alt="1"
      />
      <area
        shape="rect"
        coords="5,75,68,102"
        :href="$utils.getHibunUrl('2019/3')"
        target="_blank"
        alt="3"
      />
      <area
        shape="rect"
        coords="245,59,299,92"
        :href="$utils.getHibunUrl('2019/4')"
        target="_blank"
        alt="4"
      />
      <area
        shape="rect"
        coords="23,125,164,157"
        :href="$utils.getHibunUrl('2019/5')"
        target="_blank"
        alt="5"
      />
      <area
        shape="rect"
        coords="191,108,274,152"
        :href="$utils.getHibunUrl('2019/6')"
        target="_blank"
        alt="6"
      />
      <area
        shape="rect"
        coords="12,190,69,221"
        :href="$utils.getHibunUrl('2019/7')"
        target="_blank"
        alt="7"
      />
      <area
        shape="rect"
        coords="86,187,143,221"
        :href="$utils.getHibunUrl('2019/8')"
        target="_blank"
        alt="8"
      />
      <area
        shape="rect"
        coords="167,189,227,222"
        :href="$utils.getHibunUrl('2019/9')"
        target="_blank"
        alt="9"
      />
      <area
        shape="rect"
        coords="242,191,293,221"
        :href="$utils.getHibunUrl('2019/10')"
        target="_blank"
        alt="10"
      />
      <area
        shape="rect"
        coords="244,6,296,46"
        :href="$utils.getHibunUrl('2019/2')"
        target="_blank"
        alt="2"
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
