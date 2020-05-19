<template>
  <v-container class="my-5">
    <sheet id="2051" />
    <div class="text-center">
      <img
        :src="$utils.getHibunUrl('2051')"
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
            <td>1</td>
            <td>
              2952<br /><i>ILS. </i>2133<br /><i>Imag. </i>293<br />
              <a :href="$utils.getHibunImageUrl('l/293')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('293')"
              /></a>
            </td>
            <td>2</td>
            <td>
              2753<br /><i>Imag. </i>374<br />
              <a :href="$utils.getHibunImageUrl('l/374')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('374')"
              /></a>
            </td>
          </tr>

          <tr>
            <td>3</td>
            <td>
              3640<br /><i>Imag. </i>384<br />
              <a :href="$utils.getHibunImageUrl('l/384')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('384')"
              /></a>
            </td>
            <td>4</td>
            <td>2986</td>
          </tr>

          <tr>
            <td>5</td>
            <td>2474<br /><i>Imag. </i>355</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <map name="Map">
      <area
        shape="rect"
        coords="116,30,189,124"
        :href="$utils.getHibunUrl('2051/1')"
        target="_blank"
        alt="1"
      />
      <area
        shape="rect"
        coords="24,7,84,80"
        :href="$utils.getHibunUrl('2051/2')"
        target="_blank"
        alt="2"
      />
      <area
        shape="rect"
        coords="218,6,285,82"
        :href="$utils.getHibunUrl('2051/3')"
        target="_blank"
        alt="3"
      />
      <area
        shape="rect"
        coords="13,140,99,230"
        :href="$utils.getHibunUrl('2051/4')"
        target="_blank"
        alt="4"
      />
      <area
        shape="rect"
        coords="204,152,290,230"
        :href="$utils.getHibunUrl('2051/5')"
        target="_blank"
        alt="5"
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
