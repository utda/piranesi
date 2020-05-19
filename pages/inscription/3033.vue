<template>
  <v-container class="my-5">
    <sheet id="3033" />
    <div class="text-center">
      <img
        :src="$utils.getHibunUrl('3033')"
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
            <td align="center">4314</td>
            <td align="center">4308</td>
            <td align="center">
              4093<br /><i>Imag. </i>1389<br />
              <a :href="$utils.getHibunImageUrl('l/1389')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('1389')"
              /></a>
            </td>
            <td align="center">
              4150<br /><i>Imag. </i>1417<br />
              <a :href="$utils.getHibunImageUrl('l/1417')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('1417')"
              /></a>
            </td>
            <td align="center">
              3930a<br /><i>Imag. </i>1270<br />
              <a :href="$utils.getHibunImageUrl('l/1270')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('1270')"
              /></a>
            </td>
          </tr>
          <tr>
            <td width="20" align="center" class="hibun">2</td>
            <td align="center">4009</td>
            <td align="center">4310</td>
            <td align="center">4061</td>
            <td align="center">
              4122<br /><i>Imag. </i>1405<br />
              <a :href="$utils.getHibunImageUrl('l/1405')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('1405')"
              /></a>
            </td>
            <td align="center">
              4067<br /><i>Imag. </i>1370<br />
              <a :href="$utils.getHibunImageUrl('l/1370')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('1370')"
              /></a>
            </td>
          </tr>
          <tr>
            <td width="20" align="center" class="hibun">3</td>
            <td align="center">4211</td>
            <td align="center">4178</td>
            <td align="center">4091</td>
            <td align="center">
              4024<br /><i>Imag. </i>1337<br />
              <a :href="$utils.getHibunImageUrl('l/1337')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('1337')"
              /></a>
            </td>
            <td align="center">4010</td>
          </tr>
          <tr>
            <td width="20" align="center" class="hibun">4</td>
            <td align="center">
              3980<br /><i>Imag. </i>1312<br />
              <a :href="$utils.getHibunImageUrl('l/1312')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('1312')"
              /></a>
            </td>
            <td align="center">3986</td>
            <td align="center">3996</td>
            <td align="center">
              4159<br /><i>Imag. </i>1425<br />
              <a :href="$utils.getHibunImageUrl('l/1425')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('1425')"
              /></a>
            </td>
            <td align="center">4126</td>
          </tr>
          <tr>
            <td width="20" align="center" class="hibun">5</td>
            <td align="center">
              4152<br /><i>Imag. </i>1419<br />
              <a :href="$utils.getHibunImageUrl('l/1419')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('1419')"
              /></a>
            </td>
            <td align="center">3975</td>
            <td align="center">
              4012<br /><i>Imag. </i>1329<br />
              <i>ILS. </i>7887<br />
              <a :href="$utils.getHibunImageUrl('l/1329')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('1329')"
              /></a>
            </td>
            <td align="center">3984</td>
            <td align="center">3983</td>
          </tr>
          <tr>
            <td width="20" align="center" class="hibun">6</td>
            <td align="center">
              3958<br /><i>Imag. </i>1295<br />
              <a :href="$utils.getHibunImageUrl('l/1295')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('1295')"
              /></a>
            </td>
            <td align="center">4108</td>
            <td align="center">4050</td>
            <td align="center">
              4018<br /><i>Imag. </i>1332<br />
              <a :href="$utils.getHibunImageUrl('l/1332')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('1332')"
              /></a>
            </td>
            <td align="center">
              4151<br /><i>Imag. </i>1418<br />
              <a :href="$utils.getHibunImageUrl('l/1418')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('1418')"
              /></a>
            </td>
          </tr>
          <tr>
            <td width="20" align="center" class="hibun">7</td>
            <td align="center">
              3998<br />
              <i>Imag. </i>1322<br />
              <a :href="$utils.getHibunImageUrl('l/1322')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('1322')"
              /></a>
            </td>
            <td align="center">4169</td>
            <td align="center">4051</td>
            <td align="center">4052</td>
            <td align="center">
              4162<br /><i>Imag. </i>1428<br />
              <a :href="$utils.getHibunImageUrl('l/1428')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('1428')"
              /></a>
            </td>
          </tr>

          <tr>
            <td width="20" align="center" class="hibun">8</td>
            <td align="center">3991</td>
            <td align="center">
              4026<br /><i>Imag. </i>1339<br />
              <a :href="$utils.getHibunImageUrl('l/1339')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('1339')"
              /></a>
            </td>
            <td align="center">
              4113<br /><i>Imag. </i>1400<br />
              <a :href="$utils.getHibunImageUrl('l/1400')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('1400')"
              /></a>
            </td>
            <td align="center">
              3944<br /><i>Imag. </i>1281<br />
              <a :href="$utils.getHibunImageUrl('l/1281')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('1281')"
              /></a>
            </td>
            <td align="center">4121</td>
          </tr>
          <tr>
            <td width="20" align="center" class="hibun">9</td>
            <td align="center">
              3959<br /><i>Imag. </i>1296<br />
              <a :href="$utils.getHibunImageUrl('l/1296')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('1296')"
              /></a>
            </td>
            <td align="center">4130</td>
            <td align="center">4119</td>
            <td align="center">
              4200<br /><i>Imag. </i>1452<br />
              <a :href="$utils.getHibunImageUrl('l/1452')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('1452')"
              /></a>
            </td>
            <td align="center">4112</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <map name="Map">
      <area
        shape="rect"
        coords="28,29,75,45"
        :href="$utils.getHibunUrl('3033/A1')"
        target="_blank"
        alt="A1"
      />
      <area
        shape="rect"
        coords="26,52,73,72"
        :href="$utils.getHibunUrl('3033/A2')"
        target="_blank"
        alt="A2"
      />
      <area
        shape="rect"
        coords="26,147,74,168"
        :href="$utils.getHibunUrl('3033/A6')"
        target="_blank"
        alt="A6"
      />
      <area
        shape="rect"
        coords="27,76,77,95"
        :href="$utils.getHibunUrl('3033/A3')"
        target="_blank"
        alt="A3"
      />
      <area
        shape="rect"
        coords="27,101,73,121"
        :href="$utils.getHibunUrl('3033/A4')"
        target="_blank"
        alt="A4"
      />
      <area
        shape="rect"
        coords="27,123,73,141"
        :href="$utils.getHibunUrl('3033/A5')"
        target="_blank"
        alt="A5"
      />
      <area
        shape="rect"
        coords="26,173,73,192"
        :href="$utils.getHibunUrl('3033/A7')"
        target="_blank"
        alt="A7"
      />
      <area
        shape="rect"
        coords="26,198,73,213"
        :href="$utils.getHibunUrl('3033/A8')"
        target="_blank"
        alt="A8"
      />
      <area
        shape="rect"
        coords="26,219,73,237"
        :href="$utils.getHibunUrl('3033/A9')"
        target="_blank"
        alt="A9"
      />
      <area
        shape="rect"
        coords="82,30,128,48"
        :href="$utils.getHibunUrl('3033/B1')"
        target="_blank"
        alt="B1"
      />
      <area
        shape="rect"
        coords="84,53,129,73"
        :href="$utils.getHibunUrl('3033/B2')"
        target="_blank"
        alt="B2"
      />
      <area
        shape="rect"
        coords="80,76,129,95"
        :href="$utils.getHibunUrl('3033/B3')"
        target="_blank"
        alt="B3"
      />
      <area
        shape="rect"
        coords="82,102,128,123"
        :href="$utils.getHibunUrl('3033/B4')"
        target="_blank"
        alt="B4"
      />
      <area
        shape="rect"
        coords="79,126,128,145"
        :href="$utils.getHibunUrl('3033/B5')"
        target="_blank"
        alt="B5"
      />
      <area
        shape="rect"
        coords="81,146,125,166"
        :href="$utils.getHibunUrl('3033/B6')"
        target="_blank"
        alt="B6"
      />
      <area
        shape="rect"
        coords="81,173,126,192"
        :href="$utils.getHibunUrl('3033/B7')"
        target="_blank"
        alt="B7"
      />
      <area
        shape="rect"
        coords="79,196,126,213"
        :href="$utils.getHibunUrl('3033/B8')"
        target="_blank"
        alt="B8"
      />
      <area
        shape="rect"
        coords="79,220,126,237"
        :href="$utils.getHibunUrl('3033/B9')"
        target="_blank"
        alt="B9"
      />
      <area
        shape="rect"
        coords="135,29,183,45"
        :href="$utils.getHibunUrl('3033/C1')"
        target="_blank"
        alt="C1"
      />
      <area
        shape="rect"
        coords="135,54,182,72"
        :href="$utils.getHibunUrl('3033/C2')"
        target="_blank"
        alt="C2"
      />
      <area
        shape="rect"
        coords="135,77,182,94"
        :href="$utils.getHibunUrl('3033/C3')"
        target="_blank"
        alt="C3"
      />
      <area
        shape="rect"
        coords="134,100,183,117"
        :href="$utils.getHibunUrl('3033/C4')"
        target="_blank"
        alt="C4"
      />
      <area
        shape="rect"
        coords="135,124,182,142"
        :href="$utils.getHibunUrl('3033/C5')"
        target="_blank"
        alt="C5"
      />
      <area
        shape="rect"
        coords="135,148,182,166"
        :href="$utils.getHibunUrl('3033/C6')"
        target="_blank"
        alt="C6"
      />
      <area
        shape="rect"
        coords="134,172,182,189"
        :href="$utils.getHibunUrl('3033/C7')"
        target="_blank"
        alt="C7"
      />
      <area
        shape="rect"
        coords="133,196,183,215"
        :href="$utils.getHibunUrl('3033/C8')"
        target="_blank"
        alt="C8"
      />
      <area
        shape="rect"
        coords="135,222,182,236"
        :href="$utils.getHibunUrl('3033/C9')"
        target="_blank"
        alt="C9"
      />
      <area
        shape="rect"
        coords="191,28,239,46"
        :href="$utils.getHibunUrl('3033/D1')"
        target="_blank"
        alt="D1"
      />
      <area
        shape="rect"
        coords="190,54,239,71"
        :href="$utils.getHibunUrl('3033/D2')"
        target="_blank"
        alt="D2"
      />
      <area
        shape="rect"
        coords="189,77,238,94"
        :href="$utils.getHibunUrl('3033/D3')"
        target="_blank"
        alt="D3"
      />
      <area
        shape="rect"
        coords="189,101,237,119"
        :href="$utils.getHibunUrl('3033/D4')"
        target="_blank"
        alt="D4"
      />
      <area
        shape="rect"
        coords="189,125,236,143"
        :href="$utils.getHibunUrl('3033/D5')"
        target="_blank"
        alt="D5"
      />
      <area
        shape="rect"
        coords="189,151,236,167"
        :href="$utils.getHibunUrl('3033/D6')"
        target="_blank"
        alt="D6"
      />
      <area
        shape="rect"
        coords="189,173,237,190"
        :href="$utils.getHibunUrl('3033/D7')"
        target="_blank"
        alt="D7"
      />
      <area
        shape="rect"
        coords="188,195,235,213"
        :href="$utils.getHibunUrl('3033/D8')"
        target="_blank"
        alt="D8"
      />
      <area
        shape="rect"
        coords="188,220,239,237"
        :href="$utils.getHibunUrl('3033/D9')"
        target="_blank"
        alt="D9"
      />
      <area
        shape="rect"
        coords="245,29,293,44"
        :href="$utils.getHibunUrl('3033/E1')"
        target="_blank"
        alt="E1"
      />
      <area
        shape="rect"
        coords="246,53,291,70"
        :href="$utils.getHibunUrl('3033/E2')"
        target="_blank"
        alt="E2"
      />
      <area
        shape="rect"
        coords="245,76,289,93"
        :href="$utils.getHibunUrl('3033/E3')"
        target="_blank"
        alt="E3"
      />
      <area
        shape="rect"
        coords="243,101,292,119"
        :href="$utils.getHibunUrl('3033/E4')"
        target="_blank"
        alt="E4"
      />
      <area
        shape="rect"
        coords="243,124,291,142"
        :href="$utils.getHibunUrl('3033/E5')"
        target="_blank"
        alt="E5"
      />
      <area
        shape="rect"
        coords="242,150,291,165"
        :href="$utils.getHibunUrl('3033/E6')"
        target="_blank"
        alt="E6"
      />
      <area
        shape="rect"
        coords="241,172,290,188"
        :href="$utils.getHibunUrl('3033/E7')"
        target="_blank"
        alt="E7"
      />
      <area
        shape="rect"
        coords="245,195,290,212"
        :href="$utils.getHibunUrl('3033/E8')"
        target="_blank"
        alt="E8"
      />
      <area
        shape="rect"
        coords="244,219,293,239"
        :href="$utils.getHibunUrl('3033/E9')"
        target="_blank"
        alt="E9"
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
