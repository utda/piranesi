<template>
  <v-container class="my-5">
    <sheet id="27009" />
    <div class="text-center">
      <img
        :src="$utils.getHibunUrl('27009')"
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
            <td align="center">1</td>
            <td>
              cf. <i>CIL</i> X 831 = <i>ILS</i> 5619: <br />
              L(ucius) Sepunius L(uci) f(ilius) Sandilianus /<br />
              M(arcus) Herennius A(uli) f(ilius) Epidianus / <br />
              duovir(i) i(ure) d(icundo) scol(a) et horol(ogium) / <br />
              d(e) s(ua) p(ecunia) f(aciendum) c(uraverunt)
            </td>
          </tr>
          <tr>
            <td align="center">2</td>
            <td>
              cf. <i>CIL</i> X 997 = <i>CIL</i> I<sup>2</sup> 1637 =
              <i>ILLRP</i> 650:<br />
              M(arci) Porci / <br />
              M(arci) f(ilii) ex dec(urionum) / <br />
              decret(o) in / <br />
              frontem / <br />
              ped(es) XXV / <br />
              in agrum / <br />
              ped(es) XXV<br />
              <br />
              <i>vd</i>., V. Kockel, tav. 7, b.
            </td>
          </tr>
          <tr>
            <td align="center">3</td>
            <td>
              <i>CIL</i> X 998 = <i>ILS</i> 6369: <br />
              M[a]miae P(ubli) f(iliae) sacerdoti publicae locus sepultur(ae)
              datus decurionum decreto<br />
              <br />
              <i>vd</i>., V. Kockel, tav. 10, a
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
