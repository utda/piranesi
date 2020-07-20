<template>
  <div>
    <section class="mb-5">
      <v-img src="img/ogp/home.jpg" height="300px">
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
          本サイトは、COE「<a
            href="https://kaken.nii.ac.jp/ja/grant/KAKENHI-PROJECT-11CE2001/"
            >象形文化の継承と創成に関する研究</a
          >」により提供されていたデータベース
          <a
            href="https://warp.ndl.go.jp/info:ndljp/pid/1016139/www.coe.l.u-tokyo.ac.jp:8080/piranesi.html"
            >https://warp.ndl.go.jp/info:ndljp/pid/1016139/www.coe.l.u-tokyo.ac.jp:8080/piranesi.html</a
          >
          を引き継ぎ、当時提供されていた機能を再構築したものです。なお、2019年に画像とメタデータのみの「ピラネージ画像データベース」
          <a href="https://iiif.dl.itc.u-tokyo.ac.jp/repo/s/piranesi/page/home"
            >https://iiif.dl.itc.u-tokyo.ac.jp/repo/s/piranesi/page/home</a
          >
          （以下「シンプル版」といいます）を公開しましたが、本サイトはシンプル版が提供する機能を包含していますので、こちらの拡張版サイトを利用されることをお勧めします。 </template
        ><template v-else>
          This site is the reconstruction of the database (
          <a
            href="https://warp.ndl.go.jp/info:ndljp/pid/1016139/www.coe.l.u-tokyo.ac.jp:8080/piranesi.html"
          >
            https://warp.ndl.go.jp/info:ndljp/pid/1016139/www.coe.l.u-tokyo.ac.jp:8080/piranesi.html</a
          >) developed by the Grant-in-Aid for COE Research "Studies for the
          Conservation and Recreation of Objective Cultural Resources" (<a
            href="https://kaken.nii.ac.jp/en/grant/KAKENHI-PROJECT-11CE2001/"
            >https://kaken.nii.ac.jp/en/grant/KAKENHI-PROJECT-11CE2001/</a
          >), and uses images provided by
          <a href="https://iiif.dl.itc.u-tokyo.ac.jp/repo/s/piranesi/page/home"
            >https://iiif.dl.itc.u-tokyo.ac.jp/repo/s/piranesi/page/home</a
          >.
        </template>
      </v-alert>

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

      <div v-if="$i18n.locale == 'en'">
        <p>
          This image database contains digital images of Giovanni Battista
          Piranesi's original etchings from
          <i
            >Opere di Giovanni Battista Piranesi, Francesco Piranesi e
            d'altri</i
          >
          (published by Firmin Didot Freres, Paris, 1835-1839), which are
          preserved in the University of Tokyo Library's
          <i>Kamei Collection.</i>
          <br />These digital images have been processed from negatives of the
          <i>Opere</i>, produced specifically for research objectives. All 1,440
          works of the 29 volumes can be browsed and searched on this website.
        </p>
        <p>
          <i>Opere</i> contains 940 etchings created by Giovanni Battista
          Piranesi (1720-1778), a famous Italian architect and etcher, 269
          etchings by his son, Francesco Piranesi (1758-1810), and 231 works by
          other artists.
        </p>
      </div>
      <div v-else>
        <p>
          このデータベースは，東京大学附属図書館（総合図書館）所蔵
          の亀井文庫『ピラネージ版画集
          <i>
            Opere di Giovanni Battista Piranesi, Francesco Piranesi e d'altri
          </i>
          』（1835 ～ 39年，パリ，フィルマン・
          ディド兄弟出版社刊）全29巻に収録されたオリジナル版画1,440点をデータベース化したものです。亀井文庫『ピラネージ版画集』全作品の閲覧と作品情報の検索が可能です。
        </p>
        <p>
          『ピラネージ版画集』には，18世紀イタリアの著名な建築家・版画家ジョヴァ
          ンニ・バッティスタ・ピラネージ（Giovanni Battista Piranesi,1720
          ～1778年）が制作した銅版画940点，息子のフランチェスコ・ピラネージ（Francesco
          Piranesi,
          1758～1810年）が制作した版画269点，その他の作家による作品231点が収録されています。
        </p>
      </div>

      <div v-if="$i18n.locale == 'ja'">
        <v-row class="mb-5">
          <v-col cols="12" sm="6">
            <h2 class="mt-5">協力者</h2>
            <div class="mt-4">
              本サイトの構築にあたり、以下の方々にご協力いただきました。（敬称略）
            </div>
            <ul>
              <li>青柳正規（東京大学名誉教授）</li>
              <li>飯塚隆（国立西洋美術館）</li>
              <li>日下芝（国立西洋美術館）</li>
              <li>藤岡洋（東京大学東洋文化研究所）</li>
            </ul>
          </v-col>
          <v-col cols="12" sm="6">
            <h2 class="mt-5">お知らせ</h2>
            <ul class="mt-4">
              <li>2020-07-XX: システムを公開しました。</li>
            </ul>
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <v-row class="mb-5">
          <v-col cols="12" sm="6">
            <h2 class="mt-5">Collaborators</h2>
            <ul class="mt-4">
              <li>
                Masanori Aoyagi (Professor Emeritus, The University of Tokyo)
              </li>
              <li>Takashi Iizuka (The National Museum of Western Art)</li>
              <li>Reishi Kusaka (The National Museum of Western Art)</li>
              <li>Hirosi Huzioka (Institute for Advanced Studies on Asia）</li>
            </ul>
          </v-col>
          <v-col cols="12" sm="6">
            <h2 class="mt-5">News</h2>
            <ul class="mt-4">
              <li>2020-07-XX: The system was opened to the public.</li>
            </ul>
          </v-col>
        </v-row>
      </div>
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
