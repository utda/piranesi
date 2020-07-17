<template>
  <div>
    <v-container>
      <h2 class="my-5">{{ $t('rome_map') }}</h2>

      <!-- 
      <p>
        <router-link :to="{ path: '/subject' }"
          >Index of Subjects is here.</router-link
        >
      </p>
      -->

      <p>
        Prints of views, ruins, and architectures by Giovanni Battista Piranesi
        and Francesco Piranesi can be searched.
      </p>

      <v-card class="mt-10">
        <v-card-title class="headline grey lighten-2" primary-title
          ><span class="mr-5">{{ $t('rome_map') }}</span
          ><small>{{ ' (' + $t('move_to_comp') + ')' }}</small></v-card-title
        >
        <div class="pa-5">
          <p>
            {{ $t('Select the number on the map.') }}
          </p>

          <div class="text-center">
            <img
              :src="baseUrl + '/img/p_maps/roma_mapping.jpg'"
              alt="RomaMap"
              width="660"
              border="0"
              usemap="#RomaMap"
            />
          </div>

          <map id="RomaMap" name="RomaMap">
            <!--*DB: piranesi, フィールド [map_no] =68を検索し，maprf.htmlに結果表示。--><area
              shape="rect"
              coords="430,470,460,489"
              :href="getUrl(68)"
              alt="Arco di Druso"
            />
            <!--*[map_no] = 56。以下同様--><area
              shape="rect"
              coords="408,137,433,153"
              :href="getUrl(56)"
              alt="Terme di Diocleziano"
            />
            <area
              shape="rect"
              coords="520,245,546,259"
              :href="getUrl(61)"
              alt="Ninfeo degli Orti Liciniani"
            />
            <area
              shape="rect"
              coords="186,422,217,442"
              :href="getUrl(72)"
              alt="Portico di M. Emilio Lepido"
            />
            <area
              shape="poly"
              coords="541,262,552,262,559,268,556,280,534,277"
              :href="getUrl(65)"
              alt="Speranza Vecchia"
            />
            <area
              shape="poly"
              coords="538,290,544,285,551,288,562,290,571,302,546,302"
              :href="getUrl(63)"
              alt="Arco di Nerone"
            />
            <!--* "p_maps/via.html#cassia" への単なるリンク--><area
              shape="poly"
              coords="157,15,252,15,252,1,269,1,273,34,157,34"
              :href="getOtherUrl('via#cassia')"
            />
            <!--*[map_no] = 113。--><area
              shape="rect"
              coords="221,346,258,366"
              :href="getUrl(113)"
              alt="Porto di Ripa Grande"
            />
            <!--* "p_maps/via.html#tibr" への単なるリンク--><area
              shape="poly"
              coords="515,61,659,61,659,92,622,102,606,81,515,81"
              :href="getOtherUrl('via#tibr')"
            />
            <!--*[map_no] = 133。--><area
              shape="rect"
              coords="7,317,41,337"
              :href="getUrl(133)"
              alt="Villa Doria Pamphili "
            />
            <!--* "p_maps/via.html#appia" への単なるリンク--><area
              shape="poly"
              coords="457,492,457,522,475,521,475,512,591,512,591,492"
              :href="getOtherUrl('via#appia')"
            />
            <!--*[map_no] = 21。以下同様--><area
              shape="poly"
              coords="282,260,302,259,306,262,297,274,283,273"
              :href="getUrl(21)"
              alt="Monte Capitolino"
            />
            <area
              shape="rect"
              coords="231,383,256,410"
              :href="getUrl(71)"
              alt="Parte sud della scarpata dell'Aventino"
            />
            <area
              shape="poly"
              coords="438,230,451,213,465,213,464,229,447,235"
              :href="getUrl(58)"
              alt="Arco di Gallieno"
            />
            <area
              shape="poly"
              coords="210,100,235,100,232,125,228,120,211,119"
              :href="getUrl(129)"
              alt="Porto di Ripetta"
            />
            <area
              shape="rect"
              coords="231,51,263,69"
              :href="getUrl(117)"
              alt="Piazza del Popolo "
            />
            <area
              shape="poly"
              coords="481,343,470,335,447,339,448,356,473,354"
              :href="getUrl(106)"
              alt="Battistero Lateranense"
            />
            <area
              shape="poly"
              coords="562,306,573,314,573,328,548,328,552,313"
              :href="getUrl(64)"
              alt="Anfiteatro Castrense"
            />
            <area
              shape="rect"
              coords="408,357,439,375"
              :href="getUrl(107)"
              alt="Chiesa di S. Stefano Rotondo "
            />
            <area
              shape="poly"
              coords="289,212,292,223,318,219,318,207,302,207"
              :href="getUrl(126)"
              alt="Palazzo Mancini-Salviati"
            />
            <area
              shape="rect"
              coords="148,158,175,174"
              :href="getUrl(47)"
              alt="Ponte S. Angelo"
            />
            <area
              shape="rect"
              coords="425,13,460,29"
              :href="getUrl(136)"
              alt="Villa Albani"
            />
            <!--* "p_maps/via.html#salaria" への単なるリンク--><area
              shape="poly"
              coords="424,1,424,39,302,39,302,22,405,22,405,1"
              :href="getOtherUrl('via#salaria')"
            />
            <!--*[map_no] = 66。以下同様--><area
              shape="poly"
              coords="406,350,395,341,395,329,416,329"
              :href="getUrl(66)"
              alt="Arco di Dolabella e Silano"
            />
            <area
              shape="rect"
              coords="608,130,631,153"
              :href="getUrl(109)"
              alt="Basilica di S. Lorenzo fuori le Mura"
            />
            <!--*フィールド [map_area] = a を検索し，maprf.htmlに結果表示。--><area
              shape="poly"
              coords="7,306,7,314,36,314,67,332,110,329,138,336,137,323,107,319,70,324,42,311"
              :href="getAreaUrl('a')"
              alt="Acqua Traiana"
            />
            <!--*[map_no] = 57--><area
              shape="rect"
              coords="485,111,518,128"
              :href="getUrl(57)"
              alt="Castro pretorio"
            />
            <!--*[map_area] = f--><area
              shape="poly"
              coords="333,298,347,298,352,320,384,335,405,351,469,320,504,320,538,293,544,301,510,326,474,326,416,354,399,356,387,343,353,331,345,323,344,312,333,314"
              :href="getAreaUrl('f')"
              alt="Acqua Claudia"
            />
            <!--*[map_no] = 108。以下同様--><area
              shape="poly"
              coords="419,195,443,195,443,202,430,215,419,214"
              :href="getUrl(108)"
              alt="Basilica di S. Maria Maggiore "
            />
            <area
              shape="rect"
              coords="306,330,319,353"
              :href="getUrl(7)"
              alt="Circo Massimo"
            />
            <!--*[map_area] = c--><area
              shape="poly"
              coords="445,161,434,161,434,145,444,145,510,202,521,203,563,255,571,263,583,263,583,276,574,276,520,210,513,210,449,155"
              :href="getAreaUrl('c')"
            />
            <!--*[map_no] = 121。以下同様--><area
              shape="rect"
              coords="306,172,332,192"
              :href="getUrl(121)"
              alt="Piazza del Quirinale"
            />
            <area
              shape="poly"
              coords="571,303,575,314,576,323,593,317,586,304"
              :href="getUrl(116)"
              alt="Basilica di S. Croce in Gerusalemme"
            />
            <area
              shape="rect"
              coords="400,71,425,91"
              :href="getUrl(54)"
              alt="Palazzo e Bagni di Sallustio"
            />
            <!--* "p_maps/FR.html" への単なるリンク--><area
              shape="poly"
              coords="300,273,314,257,359,280,345,295"
              :href="getOtherUrl('fr')"
              alt="Foro Romano"
            />
            <!--*[map_no] = 105。以下同様--><area
              shape="rect"
              coords="511,0,540,29"
              :href="getUrl(105)"
              alt="Mausoleo di Costanza"
            />
            <area
              shape="rect"
              coords="428,445,456,463"
              :href="getUrl(67)"
              alt="Sepolcro degli Scipioni"
            />
            <area
              shape="rect"
              coords="379,307,399,323"
              :href="getUrl(4)"
              alt="Tempio di Claudio"
            />
            <area
              shape="rect"
              coords="619,442,658,459"
              :href="getUrl(96)"
              alt="Sepolcro di Alessandro Severo"
            />
            <area
              shape="rect"
              coords="481,340,513,354"
              :href="getUrl(114)"
              alt="S. Giovanni in Laterano"
            />
            <area
              shape="rect"
              coords="14,439,171,454"
              :href="getAreaUrl('h')"
              alt="Mura Aureliane"
            />
            <area
              shape="rect"
              coords="141,301,172,315"
              :href="getUrl(132)"
              alt="Castello dell'Acqua Paola"
            />
            <!--*[map_area] = e--><area
              shape="poly"
              coords="433,215,448,200,448,173,461,170,514,215,509,219,459,181,455,206,440,222"
              :href="getAreaUrl('e')"
              alt="Aniene Vecchio"
            />
            <!--*[map_area] = g--><area
              shape="poly"
              coords="461,475,461,487,492,466,492,452,479,452"
              :href="getAreaUrl('g')"
              alt="Acqua Antoniniana"
            />
            <!--*[map_no] = 45。以下同様--><area
              shape="rect"
              coords="114,165,143,185"
              :href="getUrl(45)"
              alt="Ponte Trionfale"
            />
            <area
              shape="poly"
              coords="333,190,333,197,365,201,363,186,344,185"
              :href="getUrl(122)"
              alt="Palazzo della Consulta "
            />
            <area
              shape="rect"
              coords="363,405,391,423"
              :href="getUrl(69)"
              alt="Terme di Caracalla"
            />
            <area
              shape="rect"
              coords="46,139,71,162"
              :href="getUrl(134)"
              alt="Basilica di S. Pietro"
            />
            <area
              shape="poly"
              coords="291,233,301,233,306,243,306,255,288,255"
              :href="getUrl(22)"
              alt="Sepolcro di C. Poblicio Bibulo"
            />
            <area
              shape="rect"
              coords="382,121,419,136"
              :href="getUrl(124)"
              alt="Castello dell'Acqua Felice "
            />
            <!--* "p_maps/CM.html" への単なるリンク--><area
              shape="poly"
              coords="273,182,242,191,248,209,278,200,288,232,280,247,281,257,267,269,268,278,263,279,251,271,229,277,206,270,180,242,194,176,257,140"
              :href="getOtherUrl('cm')"
              alt="Campo Marzo"
            />
            <!--*[map_area] = g--><area
              shape="poly"
              coords="351,428,351,442,413,492,424,492,424,482,366,435,366,428"
              :href="getAreaUrl('g')"
              alt="Acqua Antoniniana"
            />
            <!--* "p_maps/FI.html" への単なるリンク--><area
              shape="poly"
              coords="308,228,334,215,353,240,326,252"
              :href="getOtherUrl('fi')"
              alt="Fori Imperiali"
            />
            <!--*[map_no] = 55。以下同様--><area
              shape="rect"
              coords="410,48,429,70"
              :href="getUrl(55)"
              alt="Mura Aureliane tratto presso Porta Salaria"
            />
            <area
              shape="rect"
              coords="255,494,285,523"
              :href="getUrl(110)"
              alt="Basilica di S. Paolo fuori le Mura"
            />
            <area
              shape="rect"
              coords="394,252,418,273"
              :href="getUrl(3)"
              alt="Terme di Traiano"
            />
            <area
              shape="rect"
              coords="264,432,286,457"
              :href="getUrl(70)"
              alt="Piramide di C. Cestio"
            />
            <area
              shape="poly"
              coords="469,332,479,339,507,339,506,327,476,327"
              :href="getUrl(115)"
              alt="Piazza S. Giovanni in Laterano"
            />
            <!--*[map_area] = d--><area
              shape="poly"
              coords="465,255,465,246,473,240,483,240,493,234,495,229,516,217,524,217,524,228,516,230,515,224,488,245,477,247,477,255"
              :href="getAreaUrl('d')"
              alt="Acqua Giulia"
            />
            <!--*[map_no] = 59。以下同様--><area
              shape="poly"
              coords="459,240,470,226,494,227,484,236,472,238,466,244"
              :href="getUrl(59)"
              alt="Ninfeo di Alessandro Severo"
            />
            <area
              shape="rect"
              coords="319,320,331,347"
              :href="getUrl(6)"
              alt="Domus Augustana"
            />
            <area
              shape="rect"
              coords="620,494,648,523"
              :href="getUrl(95)"
              alt="Villa dei Sette Bassi "
            />
            <area
              shape="rect"
              coords="369,283,390,299"
              :href="getUrl(2)"
              alt="Anfiteatro Flavio (Colosseo)"
            />
            <area
              shape="rect"
              coords="132,138,160,156"
              :href="getUrl(46)"
              alt="Mausoleo di Adriano (Castel sant'Angelo)"
            />
            <area
              shape="poly"
              coords="282,194,302,190,302,204,285,210"
              :href="getUrl(125)"
              alt="Palazzo Odescalchi "
            />
            <area
              shape="rect"
              coords="351,293,368,310"
              :href="getUrl(1)"
              alt="Arco di Costantino"
            />
            <area
              shape="poly"
              coords="525,204,552,196,555,219,536,219"
              :href="getUrl(60)"
              alt="Porta Tiburtina"
            />
            <area
              shape="rect"
              coords="620,346,660,362"
              :href="getUrl(97)"
              alt="Mausoleo di S. Elena"
            />
            <area
              shape="poly"
              coords="237,122,236,116,239,102,254,102,254,121"
              :href="getUrl(48)"
              alt="Mausoleo di Augusto"
            />
            <!--* "p_maps/FB.html" への単なるリンク--><area
              shape="poly"
              coords="240,301,253,281,263,285,270,283,292,293,278,318"
              :href="getOtherUrl('fb')"
              alt="Foro Boario ecc."
            />
            <!--*[map_no] = 123。以下同様--><area
              shape="rect"
              coords="349,138,387,156"
              :href="getUrl(123)"
              alt="Palazzo Barberini "
            />
            <area
              shape="poly"
              coords="553,286,562,274,583,281,579,288"
              :href="getUrl(62)"
              alt="Porta Maggiore"
            />
            <area
              shape="rect"
              coords="73,140,97,163"
              :href="getUrl(135)"
              alt="Piazza di Pietro"
            />
            <area
              shape="poly"
              coords="269,96,286,95,295,115,280,114,271,107"
              :href="getUrl(119)"
              alt="Piazza di Spagna "
            />
            <area
              shape="poly"
              coords="292,81,292,98,312,100,306,87"
              :href="getUrl(118)"
              alt="Villa Medici "
            />
            <area
              shape="poly"
              coords="318,96,304,74,324,74"
              :href="getUrl(53)"
              alt="Muro Torto"
            />
            <area
              shape="poly"
              coords="314,195,319,206,332,212,340,205,326,196"
              :href="getUrl(52)"
              alt="Tempio di Serapis"
            />
            <!--*[map_area] = b--><area
              shape="poly"
              coords="273,11,284,12,293,64,295,77,286,77"
              :href="getAreaUrl('b')"
              alt="Acqua Vergine"
            />
            <area
              shape="poly"
              coords="296,104,314,133,315,145,306,159,303,151,308,139,298,117"
              :href="getAreaUrl('b')"
              alt="Acqua Vergine"
            />
            <!--*[map_no] = 127--><area
              shape="rect"
              coords="279,156,303,178"
              :href="getUrl(127)"
              alt="Fontana di Trevi"
            />
            <!--*[map_area] = b--><area
              shape="poly"
              coords="289,180,299,182,278,192,256,203,248,194"
              :href="getAreaUrl('b')"
              alt="Acqua Vergine"
            />
            <!--*[map_no] = 5--><area
              shape="poly"
              coords="334,318,341,317,345,333,339,337,334,331"
              :href="getUrl(5)"
              alt="Stadio"
            />
            <!--*[map_area] = e--><area
              shape="poly"
              coords="633,285,643,286,640,303,614,306,583,290,587,281,614,299,631,294"
              :href="getAreaUrl('e')"
              alt="Aniene Vecchio"
            />
            <!--*[map_area] = f--><area
              shape="poly"
              coords="628,335,627,342,644,341,649,326,598,302,576,291,579,297,632,330"
              :href="getAreaUrl('f')"
              alt="Acqua Claudia"
            />
          </map>
        </div>
      </v-card>

      <cityindex class="mt-10"></cityindex>

      <indexOfAllPlaces class="mt-10"></indexOfAllPlaces>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

import cityindex from '@/components/map/cityindex.vue'
import indexOfAllPlaces from '@/components/map/index_of_all_places.vue'

@Component({
  components: {
    cityindex,
    indexOfAllPlaces,
  },
})
export default class Search extends Vue {
  baseUrl: any = process.env.BASE_URL
  title: string = ''

  head() {
    return {
      title: this.$t('rome_map'),
    }
  }

  getUrl(id: string) {
    return (
      this.baseUrl +
      (this.$i18n.locale === 'ja' ? '' : '/en') +
      '/compare?map_no=' +
      id
    )
  }

  getAreaUrl(id: string) {
    return (
      this.baseUrl +
      (this.$i18n.locale === 'ja' ? '' : '/en') +
      '/compare?map_area=' +
      id
    )
  }

  getOtherUrl(id: string) {
    return (
      this.baseUrl + (this.$i18n.locale === 'ja' ? '' : '/en') + '/p_maps/' + id
    )
  }
}
</script>
