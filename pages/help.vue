<template>
  <div>
    <v-container>
      <h2 class="my-5">
        {{ $t('help') }}
      </h2>
      <div>
        <template v-if="$i18n.locale == 'ja'">
          <p>
            各画像のサムネールから，基本作品情報，詳細作品情報をご覧頂けます。
          </p>
          <p>
            基本作品情報は，画像の通し番号，作品名（伊・和），著者名，サイズ，亀井文庫の作品番号を掲載しています。
          </p>
          <p>
            詳細作品情報は，版画に銘記されている銘文のテキスト原文と和訳，各種カタログ・レゾネ番号，版画に記載されている実在するラテン碑文の参照番号などを掲載しています。版画銘記の和訳は随時更新中です。
          </p>
          <p>
            その他，版画に記載されている遺構の現在の写真，遺構の場所を示す地図，ラテン碑文の画像をご覧頂けます。
          </p>
        </template>
        <template v-else>
          <v-alert outlined class="mb-5">
            <span>Information on the works</span>
          </v-alert>

          <v-sheet class="pa-2 mb-5" color="grey lighten-3">
            <span>Basic information</span>
          </v-sheet>
          <p>
            Clicking on a thumbnail brings up an enlarged image and basic
            information on the work. The title of the work, author, size of the
            print and the Kamei Collection number are available.
          </p>
          <v-sheet class="pa-2 mb-5" color="grey lighten-3">
            <span>Detailed information</span>
          </v-sheet>
          <p>
            Clicking on the image on the basic information page will bring up a
            further magnified image, the length of which is 1,500 pixels. Other
            links are also available on the page leading to various catalogue
            numbers, numbers of bibliographical references of existing
            historical Latin inscriptions that are depicted, original textual
            captions etched onto the plate, modern photographs taken from angles
            identical to Piranesi's, and other photographs from different
            angles.
          </p>
        </template>
      </div>

      <v-card class="mt-10">
        <v-card-title class="grey lighten-2" primary-title>{{
          $i18n.locale == 'ja'
            ? '以下の4つの方法で版画集の各画像にアクセスできます。'
            : 'Each image, as well as information on the collection of 1440 prints created by Piranesi and other artists, can be accessed in the following'
        }}</v-card-title>
        <div class="pa-5">
          <nuxt-link
            :to="
              localePath({
                name: 'search',
              })
            "
          >
            <h3>
              {{ $t('search') }}
            </h3>
          </nuxt-link>

          <p class="mt-5">
            <template v-if="$i18n.locale == 'ja'">
              <b>簡易検索：</b>
              日本語・イタリア語の作品名，著者名，フリーキーワードで全作品を検索できます。
            </template>
            <template v-else>
              <b>Simple Search：</b>
              All works can be searched by keyword in Italian and Japanese.
              <small class="error--text"
                >(Please enter "*" as a European accent character.)</small
              >
            </template>
          </p>

          <p class="mt-5">
            <template v-if="$i18n.locale == 'ja'">
              <b>詳細検索：</b>
              日本語の作品名，
              <i>Calcografia Nazionale</i> によるイタリア語の作品名，
              <i>J. Wilton Ely</i>
              による英語の作品名，著者名，作品番号，巻ごとの検索，既出版の5種類のレゾネ番号と日本で開催された2つの展覧会のカタログ番号などから全作品を検索できます。
            </template>
            <template v-else>
              <b>Advanced Search：</b>
              All works can be searched in any field as follows:
              <small class="error--text"
                >(Please enter "*" as a European accent character.)</small
              >

              <ul class="mt-5">
                <li>
                  Title of works in Japanese, Italian (by
                  <i><a href="e_hanrei.html#vol">Calcografia Nazionale</a></i
                  >), or English (by
                  <i><a href="e_hanrei.html#raisone">J. Wilton Ely</a></i
                  >)
                </li>
                <li>Author (in his native language)</li>
                <li>Volume, plate,or number of the image</li>
                <li>
                  Complete catalogue number (<i
                    ><a href="e_hanrei.html#vol">Calcografia</a>,
                    <a href="e_hanrei.html#raisone">J. Wilton-Ely,</a>
                    <a href="e_hanrei.html#raisone">H. Focillon</a>,
                    <a href="e_hanrei.html#raisone">Taschen</a></i
                  >)
                </li>
                <li>
                  Exhibition catalogue number (as held in Japan:
                  <a href="e_hanrei.html#catalog"
                    >The Museum of Modern Art, Kamakura in 1977</a
                  >;
                  <a href="e_hanrei.html#catalog"
                    >Machida City Museum of Graphic Arts in 1989</a
                  >)
                </li>
              </ul>
            </template>
          </p>

          <v-divider class="my-5" />

          <nuxt-link
            :to="
              localePath({
                name: 'volume',
              })
            "
          >
            <h3>
              {{ $t('browse') }}
            </h3>
          </nuxt-link>

          <p class="mt-5">
            <template v-if="$i18n.locale == 'ja'">
              全29巻から成る1440作品を，版画集のページ順に巻ごとに閲覧できます。
            </template>
            <template v-else>
              The 1440 works that consist of a total of 29 volumes can be
              browsed by volume, and by page number.
            </template>
          </p>

          <v-divider class="my-5" />

          <nuxt-link
            :to="
              localePath({
                name: 'mapsearch',
              })
            "
          >
            <h3>
              {{ $t('rome_map') }}
            </h3>
          </nuxt-link>

          <p class="mt-5">
            <template v-if="$i18n.locale == 'ja'">
              ローマの古代と現代の地図を重ね合わせ，ジョヴァンニ・バッティスタ・ピラネージとフランチェスコ・ピラネージの版画に記載されている遺構の位置を地図上にマッピングしました。版画と，描かれた遺構を同じ角度から撮影した現在の写真を同時にご覧頂けます。遺構の別角度からの写真も掲載しています。
            </template>
            <template v-else>
              Prints by Giovanni Battista Piranesi and Francesco Piranesi can be
              searched according to the location of Roman remains depicted in
              the work. Sites of ruins depicted by Piranesi are indicated on a
              superimposition of an ancient Roman map onto a modern one. This
              allows Piranesi's perspective to be viewed simultaneously with
              photographs of the present, from the same angle.
            </template>
          </p>

          <v-divider class="my-5" />

          <nuxt-link
            :to="
              localePath({
                name: 'subject',
              })
            "
          >
            <h3>
              {{ $t('subject') }}
            </h3>
          </nuxt-link>

          <p class="mt-5">
            <template v-if="$i18n.locale == 'ja'">
              ジョヴァンニ・バッティスタ・ピラネージとフランチェスコ・ピラネージの版画を描かれた主題によるカテゴリー別リストから検索できます。
            </template>
            <template v-else>
              Prints by Giovanni Battista Piranesi and Francesco Piranesi can be
              searched from the index according to the category of subjects.
            </template>
          </p>
        </div>
      </v-card>

      <v-card class="mt-10">
        <v-card-title class="headline grey lighten-2" primary-title>{{
          $t('other')
        }}</v-card-title>
        <div class="pa-5">
          <nuxt-link
            :to="
              localePath({
                name: 'concordance',
              })
            "
          >
            <h3>
              {{ $t('concordance') }}
            </h3>
          </nuxt-link>

          <p class="mt-5">
            <template v-if="$i18n.locale == 'ja'">
              亀井文庫の作品番号と，これまでに出版されているジョヴァンニ・バッティスタ・ピラネージのカタログレゾネ（
              <i> Calcografia J. Wilton-Ely, H. Focillon, Taschen</i
              >）の番号，および日本で開催された2つの展覧会（
              神奈川県立近代美術館，
              1977年／町田市立国際版画美術館，1989年）のカタログ番号との対応表を掲載しています。
            </template>
            <template v-else>
              The concordance list between the number of images on this database
              and the number of the seven catalogues.
            </template>
          </p>

          <v-divider class="my-5" />

          <a :href="baseUrl + '/sitemap.xml'" target="_blank">
            <h3>
              {{ $t('sitemap') }}
            </h3>
          </a>

          <p class="mt-5">
            <template v-if="$i18n.locale == 'ja'">
              ピラネージ版画データベース全体のサイトマップです。
            </template>
            <template v-else>
              Sitemap of thie site.
            </template>
          </p>
        </div>
      </v-card>
    </v-container>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class Help extends Vue {
  baseUrl: any = process.env.BASE_URL
}
</script>
