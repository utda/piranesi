<template>
  <div>
    <section class="mb-5">
      <v-img :aspect-ratio="16 / 9" src="img/ogp/home.jpg" height="600px">
        <v-row align="center" class="lightbox white--text pa-2 fill-height">
          <v-col>
            <h1 class="display-1 text-center">
              <b>{{ $t('piranesi_db') }}</b>
            </h1>
          </v-col>
        </v-row>
      </v-img>
      <!-- 
      <v-parallax src="img/ogp/home.jpg" height="600">
        <v-layout column align-center justify-center class="white--text">
          <h1 class="white--text mb-2 display-1 text-center">
            <b>{{ $t('piranesi_db') }}</b>
          </h1>
        </v-layout>
      </v-parallax>
      -->
    </section>

    <v-container>
      <v-alert outlined type="info" prominent border="left" class="mt-5 mb-10">
        <template v-if="$i18n.locale == 'ja'">
          本サイトは
          <a
            href="https://warp.ndl.go.jp/info:ndljp/pid/1016139/www.coe.l.u-tokyo.ac.jp:8080/piranesi.html"
            >https://warp.ndl.go.jp/info:ndljp/pid/1016139/www.coe.l.u-tokyo.ac.jp:8080/piranesi.html</a
          >
          で提供されていた機能を再構築したものです。また、東京大学学術資産等共用サーバで公開されているサイト「ピラネージ画像データベース（以下、簡易版）」
          <a href="https://iiif.dl.itc.u-tokyo.ac.jp/repo/s/piranesi/page/home"
            >https://iiif.dl.itc.u-tokyo.ac.jp/repo/s/piranesi/page/home</a
          >
          の画像を利用しています。本サイトは簡易版サイトが提供する機能を包含していますので、こちらの拡張版サイトを利用されることをお勧めします。</template
        ><template v-else>
          This site is the reconstruction of
          <a
            href="https://warp.ndl.go.jp/info:ndljp/pid/1016139/www.coe.l.u-tokyo.ac.jp:8080/piranesi.html"
          >
            https://warp.ndl.go.jp/info:ndljp/pid/1016139/www.coe.l.u-tokyo.ac.jp:8080/piranesi.html</a
          >, and uses images provided by
          <a href="https://iiif.dl.itc.u-tokyo.ac.jp/repo/s/piranesi/page/home"
            >https://iiif.dl.itc.u-tokyo.ac.jp/repo/s/piranesi/page/home</a
          >.
        </template>
      </v-alert>

      <!--
      <p class="display-1 text--primary text-center my-5">
        {{ $t('about') }}
      </p>
      -->
      <p v-if="$i18n.locale == 'en'">
        This image database contains digital images of Giovanni Battista
        Piranesi's original etchings from
        <i>Opere di Giovanni Battista Piranesi, Francesco Piranesi e d'altri</i>
        (published by Firmin Didot Freres, Paris, 1835-1839), which are
        preserved in the University of Tokyo Library's
        <i>Kamei Collection.</i>
        <br />These digital images have been processed from negatives of the
        <i>Opere</i>, produced specifically for research objectives. All 1,440
        works of the 29 volumes can be browsed and searched on this website.
      </p>
      <p v-else>
        このデータベースは，東京大学附属図書館（総合図書館）所蔵
        の亀井文庫『ピラネージ版画集
        <i>
          Opere di Giovanni Battista Piranesi, Francesco Piranesi e d'altri
        </i>
        』（1835 ～ 39年，パリ，フィルマン・
        ディド兄弟出版社刊）全29巻に収録されたオリジナル版画1,440点をデータベース化したものです。亀井文庫『ピラネージ版画集』全作品の閲覧と作品情報の検索が可能です。
      </p>

      <v-row class="mb-5">
        <v-col cols="12" sm="6">
          <v-card outlined>
            <v-list-item :to="localePath({ name: 'volume' })" three-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">
                  {{ $t('browse') }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ $t('exp_browse') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card outlined>
            <v-list-item :to="localePath({ name: 'search' })" three-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">
                  {{ $t('search_works') }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ $t('exp_search') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6">
          <v-card outlined>
            <v-list-item :to="localePath({ name: 'mapsearch' })" three-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">
                  {{ $t('rome_map') }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ $t('exp_map') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6">
          <v-card outlined>
            <v-list-item :to="localePath({ name: 'subject' })" three-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">
                  {{ $t('subject_search') }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ $t('exp_subject') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>

      <p v-if="$i18n.locale == 'en'">
        <i>Opere</i> contains 940 etchings created by Giovanni Battista Piranesi
        (1720-1778), a famous Italian architect and etcher, 269 etchings by his
        son, Francesco Piranesi (1758-1810), and 231 works by other artists.
      </p>
      <p v-else>
        『ピラネージ版画集』には，18世紀イタリアの著名な建築家・版画家ジョヴァ
        ンニ・バッティスタ・ピラネージ（Giovanni Battista Piranesi,1720
        ～1778年）が制作した銅版画940点，息子のフランチェスコ・ピラネージ（Francesco
        Piranesi,
        1758～1810年）が制作した版画269点，その他の作家による作品231点が収録されています。
      </p>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Page extends Vue {
  head() {
    return {
      titleTemplate: null,
    }
  }
}
</script>
