<template>
  <v-container class="my-5">
    <sheet id="3036" />
    <div class="text-center">
      <img
        :src="$utils.getHibunUrl('3036')"
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
            <th colspan="5" class="text-center"><i>CIL VI</i></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td width="20" height="20" align="left"></td>
            <td width="100" height="20" align="center" class="hibun">A</td>
            <td width="100" align="center" class="hibun">B</td>
            <td width="100" align="center" class="hibun">C</td>
            <td width="100" align="center" class="hibun">D</td>
            <td width="100" height="20" align="center" class="hibun">E</td>
          </tr>

          <tr>
            <td width="20" align="center" class="hibun">1</td>
            <td align="center">3986 bis</td>
            <td align="center">
              4062 bis<br /><i>Imag. </i>1366<br />
              <a :href="$utils.getHibunImageUrl('l/1366')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('1366')"
              /></a>
            </td>
            <td align="center">4146</td>
            <td align="center">
              4077*<br />
              <i>Imag. </i>1379<br />
              <a :href="$utils.getHibunImageUrl('l/1379')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('1379')"
              /></a>
            </td>
            <td align="center">
              4160<br /><i>Imag. </i>1426<br />
              <a :href="$utils.getHibunImageUrl('l/1426')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('1426')"
              /></a>
            </td>
          </tr>
          <tr>
            <td width="20" align="center" class="hibun">2</td>
            <td align="center">4055</td>
            <td align="center">4017</td>
            <td align="center">4015</td>
            <td align="center">4139</td>
            <td align="center">4318</td>
          </tr>
          <tr>
            <td width="20" align="center" class="hibun">3</td>
            <td align="center">4021</td>
            <td align="center">4315</td>
            <td align="center">4081</td>
            <td align="center">4137/38</td>
            <td align="center">4096</td>
          </tr>
          <tr>
            <td width="20" align="center" class="hibun">4</td>
            <td align="center">4083</td>
            <td align="center">4158</td>
            <td align="center">4198</td>
            <td align="center">4133</td>
            <td align="center">4322</td>
          </tr>
          <tr>
            <td width="20" align="center" class="hibun">5</td>
            <td align="center">4039</td>
            <td align="center">4185</td>
            <td align="center">4064</td>
            <td align="center">4313</td>
            <td align="center"></td>
          </tr>
          <tr>
            <td width="20" align="center" class="hibun">6</td>
            <td align="center">4103</td>
            <td align="center">
              4068<br /><i>Imag. </i>1371<br />
              <a :href="$utils.getHibunImageUrl('l/1371')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('1371')"
              /></a>
            </td>
            <td align="center">3933</td>
            <td align="center">
              3948*<br />
              <i>Imag. </i>1285<br />
              <a :href="$utils.getHibunImageUrl('l/1285')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('1285')"
              /></a>
            </td>
            <td align="center">4011</td>
          </tr>
          <tr>
            <td width="20" align="center" class="hibun">7</td>
            <td align="center">
              4070*<br />
              <i>Imag. </i>1373<br />
              <a :href="$utils.getHibunImageUrl('l/1373')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('1373')"
              /></a>
            </td>
            <td align="center">4082</td>
            <td align="center">4030</td>
            <td align="center">
              4077<br /><i>Imag. </i>1379<br />
              <a :href="$utils.getHibunImageUrl('l/1379')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('1379')"
              /></a>
            </td>
            <td align="center">4001</td>
          </tr>
          <tr>
            <td width="20" align="center" class="hibun">8</td>
            <td align="center">
              4160*<br />
              <i>Imag. </i>1426<br />
              <a :href="$utils.getHibunImageUrl('l/1426')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('1426')"
              /></a>
            </td>
            <td align="center">4084</td>
            <td align="center">3938</td>
            <td align="center">3935</td>
            <td align="center">
              4100<br /><i>Imag. </i>1394<br />
              <a :href="$utils.getHibunImageUrl('l/1394')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('1394')"
              /></a>
            </td>
          </tr>
          <tr>
            <td width="20" align="center" class="hibun">9</td>
            <td align="center">4031</td>
            <td align="center">
              4098*<br />
              <i>Imag. </i>1392<br />
              <a :href="$utils.getHibunImageUrl('l/1392')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('1392')"
              /></a>
            </td>
            <td align="center">
              4070 bis<br /><i>Imag. </i>1373<br />
              <a :href="$utils.getHibunImageUrl('l/1373')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('1373')"
              /></a>
            </td>
            <td align="center">4225</td>
            <td align="center">4144</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <map name="Map">
      <area
        shape="rect"
        coords="31,31,76,49"
        :href="$utils.getHibunUrl('3036/A1')"
        target="_blank"
        alt="A1"
      />
      <area
        shape="rect"
        coords="81,29,127,47"
        :href="$utils.getHibunUrl('3036/B1')"
        target="_blank"
        alt="B1"
      />
      <area
        shape="rect"
        coords="31,124,76,141"
        :href="$utils.getHibunUrl('3036/A5')"
        target="_blank"
        alt="A5"
      />
      <area
        shape="rect"
        coords="82,77,129,95"
        :href="$utils.getHibunUrl('3036/B3')"
        target="_blank"
        alt="B3"
      />
      <area
        shape="rect"
        coords="136,30,181,48"
        :href="$utils.getHibunUrl('3036/C1')"
        target="_blank"
        alt="C1"
      />
      <area
        shape="rect"
        coords="189,29,237,47"
        :href="$utils.getHibunUrl('3036/D1')"
        target="_blank"
        alt="D1"
      />
      <area
        shape="rect"
        coords="189,218,236,235"
        :href="$utils.getHibunUrl('3036/D9')"
        target="_blank"
        alt="D9"
      />
      <area
        shape="rect"
        coords="31,78,75,95"
        :href="$utils.getHibunUrl('3036/A3')"
        target="_blank"
        alt="A3"
      />
      <area
        shape="rect"
        coords="190,147,236,164"
        :href="$utils.getHibunUrl('3036/D6')"
        target="_blank"
        alt="D6"
      />
      <area
        shape="rect"
        coords="137,100,182,118"
        :href="$utils.getHibunUrl('3036/C4')"
        target="_blank"
        alt="C4"
      />
      <area
        shape="rect"
        coords="135,147,182,165"
        :href="$utils.getHibunUrl('3036/C6')"
        target="_blank"
        alt="C6"
      />
      <area
        shape="rect"
        coords="135,123,182,141"
        :href="$utils.getHibunUrl('3036/C5')"
        target="_blank"
        alt="C5"
      />
      <area
        shape="rect"
        coords="190,77,235,93"
        :href="$utils.getHibunUrl('3036/D3')"
        target="_blank"
        alt="D3"
      />
      <area
        shape="rect"
        coords="134,193,184,212"
        :href="$utils.getHibunUrl('3036/C8')"
        target="_blank"
        alt="C8"
      />
      <area
        shape="rect"
        coords="136,77,183,94"
        :href="$utils.getHibunUrl('3036/C3')"
        target="_blank"
        alt="C3"
      />
      <area
        shape="rect"
        coords="244,194,291,211"
        :href="$utils.getHibunUrl('3036/E8')"
        target="_blank"
        alt="E8"
      />
      <area
        shape="rect"
        coords="81,170,128,189"
        :href="$utils.getHibunUrl('3036/B7')"
        target="_blank"
        alt="B7"
      />
      <area
        shape="rect"
        coords="33,30,78,48"
        :href="$utils.getHibunUrl('3036/A1')"
        target="_blank"
        alt="A1"
      />
      <area
        shape="rect"
        coords="244,53,289,70"
        :href="$utils.getHibunUrl('3036/E2')"
        target="_blank"
        alt="E2"
      />
      <area
        shape="rect"
        coords="28,194,76,212"
        :href="$utils.getHibunUrl('3036/A8')"
        target="_blank"
        alt="A8"
      />
      <area
        shape="rect"
        coords="29,171,75,190"
        :href="$utils.getHibunUrl('3036/A7')"
        target="_blank"
        alt="A7"
      />
      <area
        shape="rect"
        coords="134,169,181,187"
        :href="$utils.getHibunUrl('3036/C7')"
        target="_blank"
        alt="C7"
      />
      <area
        shape="rect"
        coords="81,147,128,164"
        :href="$utils.getHibunUrl('3036/B6')"
        target="_blank"
        alt="B6"
      />
      <area
        shape="rect"
        coords="31,146,76,165"
        :href="$utils.getHibunUrl('3036/A6')"
        target="_blank"
        alt="A6"
      />
      <area
        shape="rect"
        coords="245,171,291,187"
        :href="$utils.getHibunUrl('3036/E7')"
        target="_blank"
        alt="E7"
      />
      <area
        shape="rect"
        coords="244,123,290,140"
        :href="$utils.getHibunUrl('3036/E5')"
        target="_blank"
        alt="E5"
      />
      <area
        shape="rect"
        coords="31,101,75,119"
        :href="$utils.getHibunUrl('3036/A4')"
        target="_blank"
        alt="A4"
      />
      <area
        shape="rect"
        coords="81,29,127,47"
        :href="$utils.getHibunUrl('3036/B1')"
        target="_blank"
        alt="B1"
      />
      <area
        shape="rect"
        coords="244,77,288,94"
        :href="$utils.getHibunUrl('3036/E3')"
        target="_blank"
        alt="E3"
      />
      <area
        shape="rect"
        coords="83,101,130,118"
        :href="$utils.getHibunUrl('3036/B4')"
        target="_blank"
        alt="B4"
      />
      <area
        shape="rect"
        coords="244,100,290,118"
        :href="$utils.getHibunUrl('3036/E4')"
        target="_blank"
        alt="E4"
      />
      <area
        shape="rect"
        coords="189,101,235,116"
        :href="$utils.getHibunUrl('3036/D4')"
        target="_blank"
        alt="D4"
      />
      <area
        shape="rect"
        coords="242,218,289,236"
        :href="$utils.getHibunUrl('3036/E9')"
        target="_blank"
        alt="E9"
      />
      <area
        shape="rect"
        coords="190,193,237,211"
        :href="$utils.getHibunUrl('3036/D8')"
        target="_blank"
        alt="D8"
      />
      <area
        shape="rect"
        coords="135,54,182,72"
        :href="$utils.getHibunUrl('3036/C2')"
        target="_blank"
        alt="C2"
      />
      <area
        shape="rect"
        coords="81,54,127,71"
        :href="$utils.getHibunUrl('3036/B2')"
        target="_blank"
        alt="B2"
      />
      <area
        shape="rect"
        coords="190,124,237,142"
        :href="$utils.getHibunUrl('3036/D5')"
        target="_blank"
        alt="D5"
      />
      <area
        shape="rect"
        coords="82,195,129,212"
        :href="$utils.getHibunUrl('3036/B8')"
        target="_blank"
        alt="B8"
      />
      <area
        shape="rect"
        coords="30,218,74,235"
        :href="$utils.getHibunUrl('3036/A9')"
        target="_blank"
        alt="A9"
      />
      <area
        shape="rect"
        coords="135,218,181,235"
        :href="$utils.getHibunUrl('3036/C9')"
        target="_blank"
        alt="C9"
      />
      <area
        shape="rect"
        coords="188,54,236,72"
        :href="$utils.getHibunUrl('3036/D2')"
        target="_blank"
        alt="D2"
      />
      <area
        shape="rect"
        coords="30,55,75,71"
        :href="$utils.getHibunUrl('3036/A2')"
        target="_blank"
        alt="A2"
      />
      <area
        shape="rect"
        coords="80,218,127,235"
        :href="$utils.getHibunUrl('3036/B9')"
        target="_blank"
        alt="B9"
      />
      <area
        shape="rect"
        coords="190,171,239,188"
        :href="$utils.getHibunUrl('3036/D7')"
        target="_blank"
        alt="D7"
      />
      <area
        shape="rect"
        coords="244,29,291,45"
        :href="$utils.getHibunUrl('3036/E1')"
        target="_blank"
        alt="E1"
      />
      <area
        shape="rect"
        coords="82,124,129,141"
        :href="$utils.getHibunUrl('3036/B5')"
        target="_blank"
        alt="B5"
      />
      <area
        shape="rect"
        coords="244,147,289,165"
        :href="$utils.getHibunUrl('3036/E6')"
        target="_blank"
        alt="E6"
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
