<template>
  <v-container class="my-5">
    <sheet id="3031" />
    <div class="text-center">
      <img
        :src="$utils.getHibunUrl('3031')"
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
            <td align="center">4216</td>
            <td align="center">4143</td>
            <td align="center">4201</td>
            <td align="center">4316</td>
            <td align="center">4179</td>
          </tr>
          <tr>
            <td width="20" align="center" class="hibun">2</td>
            <td align="center">4203</td>
            <td align="center">4132</td>
            <td align="center">4167</td>
            <td align="center">4017</td>
            <td align="center">4219</td>
          </tr>
          <tr>
            <td width="20" align="center" class="hibun">3</td>
            <td align="center">3964</td>
            <td align="center">
              3956<br /><i>Imag. </i>1293<br />
              <a :href="$utils.getHibunImageUrl('l/1293')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('1293')"
              /></a>
            </td>
            <td align="center">4221<br /></td>
            <td align="center">
              4200*<br />
              <i>Imag. </i>1452<br />
              <a :href="$utils.getHibunImageUrl('l/1452')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('1452')"
              /></a>
            </td>
            <td align="center">4218</td>
          </tr>
          <tr>
            <td width="20" align="center" class="hibun">4</td>
            <td align="center">4090</td>
            <td align="center">3973</td>
            <td align="center">4217</td>
            <td align="center">
              4222*<br />
              <i>Imag. </i>2159<br />
              <a :href="$utils.getHibunImageUrl('l/2159')" target="_blank"
                ><img :src="$utils.getHibunImageUrl('2159')"
              /></a>
            </td>
            <td align="center">4197</td>
          </tr>
          <tr>
            <td width="20" align="center" class="hibun">5</td>
            <td align="center">4115</td>
            <td align="center">4320</td>
            <td align="center">4311</td>
            <td align="center">4052</td>
            <td align="center">4207</td>
          </tr>
          <tr>
            <td width="20" align="center" class="hibun">6</td>
            <td align="center">4123</td>
            <td align="center">4206</td>
            <td align="center"></td>
            <td align="center">4137/38</td>
            <td align="center">4210</td>
          </tr>
          <tr>
            <td width="20" align="center" class="hibun">7</td>
            <td align="center">4188</td>
            <td align="center">4205</td>
            <td align="center">4194</td>
            <td align="center">4212</td>
            <td align="center">4104</td>
          </tr>
          <tr>
            <td width="20" align="center" class="hibun">8</td>
            <td align="center">4319</td>
            <td align="center">4181</td>
            <td align="center">4209</td>
            <td align="center">4214</td>
            <td align="center">4250</td>
          </tr>
          <tr>
            <td width="20" align="center" class="hibun">9</td>
            <td align="center">4202</td>
            <td align="center">4186</td>
            <td align="center">4111</td>
            <td align="center">4317</td>
            <td align="center">4208</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <map name="Map">
      <area
        shape="rect"
        coords="28,29,78,50"
        :href="$utils.getHibunUrl('3031/A1')"
        target="_blank"
        alt="A1"
      />
      <area
        shape="rect"
        coords="29,54,76,74"
        :href="$utils.getHibunUrl('3031/A2')"
        target="_blank"
        alt="A2"
      />
      <area
        shape="rect"
        coords="26,148,78,167"
        :href="$utils.getHibunUrl('3031/A6')"
        target="_blank"
        alt="A6"
      />
      <area
        shape="rect"
        coords="28,78,79,96"
        :href="$utils.getHibunUrl('3031/A3')"
        target="_blank"
        alt="A3"
      />
      <area
        shape="rect"
        coords="28,102,77,120"
        :href="$utils.getHibunUrl('3031/A4')"
        target="_blank"
        alt="A4"
      />
      <area
        shape="rect"
        coords="28,126,78,143"
        :href="$utils.getHibunUrl('3031/A5')"
        target="_blank"
        alt="A5"
      />
      <area
        shape="rect"
        coords="27,172,78,192"
        :href="$utils.getHibunUrl('3031/A1')"
        target="_blank"
        alt="A7"
      />
      <area
        shape="rect"
        coords="29,197,77,211"
        :href="$utils.getHibunUrl('3031/A8')"
        target="_blank"
        alt="A8"
      />
      <area
        shape="rect"
        coords="28,220,77,236"
        :href="$utils.getHibunUrl('3031/A9')"
        target="_blank"
        alt="A9"
      />
      <area
        shape="rect"
        coords="81,31,133,50"
        :href="$utils.getHibunUrl('3031/B1')"
        target="_blank"
        alt="B1"
      />
      <area
        shape="rect"
        coords="82,54,134,73"
        :href="$utils.getHibunUrl('3031/B2')"
        target="_blank"
        alt="B2"
      />
      <area
        shape="rect"
        coords="81,78,133,97"
        :href="$utils.getHibunUrl('3031/B3')"
        target="_blank"
        alt="B3"
      />
      <area
        shape="rect"
        coords="81,102,133,121"
        :href="$utils.getHibunUrl('3031/B4')"
        target="_blank"
        alt="B4"
      />
      <area
        shape="rect"
        coords="82,124,132,143"
        :href="$utils.getHibunUrl('3031/B5')"
        target="_blank"
        alt="B5"
      />
      <area
        shape="rect"
        coords="82,149,131,168"
        :href="$utils.getHibunUrl('3031/B6')"
        target="_blank"
        alt="B6"
      />
      <area
        shape="rect"
        coords="83,173,131,191"
        :href="$utils.getHibunUrl('3031/B7')"
        target="_blank"
        alt="B7"
      />
      <area
        shape="rect"
        coords="83,197,130,214"
        :href="$utils.getHibunUrl('3031/B8')"
        target="_blank"
        alt="B8"
      />
      <area
        shape="rect"
        coords="83,219,130,236"
        :href="$utils.getHibunUrl('3031/B9')"
        target="_blank"
        alt="B9"
      />
      <area
        shape="rect"
        coords="139,30,186,50"
        :href="$utils.getHibunUrl('3031/C1')"
        target="_blank"
        alt="C1"
      />
      <area
        shape="rect"
        coords="139,56,187,72"
        :href="$utils.getHibunUrl('3031/C2')"
        target="_blank"
        alt="C2"
      />
      <area
        shape="rect"
        coords="139,80,186,96"
        :href="$utils.getHibunUrl('3031/C3')"
        target="_blank"
        alt="C3"
      />
      <area
        shape="rect"
        coords="138,102,187,120"
        :href="$utils.getHibunUrl('3031/C4')"
        target="_blank"
        alt="C4"
      />
      <area
        shape="rect"
        coords="137,125,184,143"
        :href="$utils.getHibunUrl('3031/C5')"
        target="_blank"
        alt="C5"
      />
      <area
        shape="rect"
        coords="137,150,184,168"
        :href="$utils.getHibunUrl('3031/C6')"
        target="_blank"
        alt="C6"
      />
      <area
        shape="rect"
        coords="137,173,185,190"
        :href="$utils.getHibunUrl('3031/C7')"
        target="_blank"
        alt="C7"
      />
      <area
        shape="rect"
        coords="136,196,186,215"
        :href="$utils.getHibunUrl('3031/C8')"
        target="_blank"
        alt="C8"
      />
      <area
        shape="rect"
        coords="136,219,186,240"
        :href="$utils.getHibunUrl('3031/C9')"
        target="_blank"
        alt="C9"
      />
      <area
        shape="rect"
        coords="192,31,240,49"
        :href="$utils.getHibunUrl('3031/D1')"
        target="_blank"
        alt="D1"
      />
      <area
        shape="rect"
        coords="191,56,240,73"
        :href="$utils.getHibunUrl('3031/D2')"
        target="_blank"
        alt="D2"
      />
      <area
        shape="rect"
        coords="192,80,241,97"
        :href="$utils.getHibunUrl('3031/D3')"
        target="_blank"
        alt="D3"
      />
      <area
        shape="rect"
        coords="191,103,239,121"
        :href="$utils.getHibunUrl('3031/D4')"
        target="_blank"
        alt="D4"
      />
      <area
        shape="rect"
        coords="190,127,237,145"
        :href="$utils.getHibunUrl('3031/D5')"
        target="_blank"
        alt="D5"
      />
      <area
        shape="rect"
        coords="190,151,237,167"
        :href="$utils.getHibunUrl('3031/D6')"
        target="_blank"
        alt="D6"
      />
      <area
        shape="rect"
        coords="190,174,238,191"
        :href="$utils.getHibunUrl('3031/D7')"
        target="_blank"
        alt="D7"
      />
      <area
        shape="rect"
        coords="191,197,238,215"
        :href="$utils.getHibunUrl('3031/D8')"
        target="_blank"
        alt="D8"
      />
      <area
        shape="rect"
        coords="189,221,240,237"
        :href="$utils.getHibunUrl('3031/D9')"
        target="_blank"
        alt="D9"
      />
      <area
        shape="rect"
        coords="245,30,291,51"
        :href="$utils.getHibunUrl('3031/E1')"
        target="_blank"
        alt="E1"
      />
      <area
        shape="rect"
        coords="245,57,289,73"
        :href="$utils.getHibunUrl('3031/E2')"
        target="_blank"
        alt="E2"
      />
      <area
        shape="rect"
        coords="246,82,289,96"
        :href="$utils.getHibunUrl('3031/E3')"
        target="_blank"
        alt="E3"
      />
      <area
        shape="rect"
        coords="246,104,292,121"
        :href="$utils.getHibunUrl('3031/E4')"
        target="_blank"
        alt="E4"
      />
      <area
        shape="rect"
        coords="244,128,288,144"
        :href="$utils.getHibunUrl('3031/E5')"
        target="_blank"
        alt="E5"
      />
      <area
        shape="rect"
        coords="245,151,290,166"
        :href="$utils.getHibunUrl('3031/E6')"
        target="_blank"
        alt="E6"
      />
      <area
        shape="rect"
        coords="244,172,288,191"
        :href="$utils.getHibunUrl('3031/E7')"
        target="_blank"
        alt="E7"
      />
      <area
        shape="rect"
        coords="245,198,290,212"
        :href="$utils.getHibunUrl('3031/E8')"
        target="_blank"
        alt="E8"
      />
      <area
        shape="rect"
        coords="248,222,290,236"
        :href="$utils.getHibunUrl('3031/E9')"
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
