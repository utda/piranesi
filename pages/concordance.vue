<template>
  <div class="mt-5">
    <v-container>
      <h2 class="my-5">
        {{ $t('concordance') }}
      </h2>

      <v-card class="mt-5">
        <v-card-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            :label="$t('search')"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="arr"
          :search="search"
          :items-per-page="50"
          locale="ja-jp"
        >
          <!-- :locale="'ja-jp' /*$i18n.locale == 'ja' ? 'ja_JP' : 'en_US'*/" -->
          <template v-slot:item.Kamei_no="{ item }">
            <router-link
              :to="
                localePath({ name: 'item-id', params: { id: item.file_no } })
              "
              >{{ item.Kamei_no }}</router-link
            >
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class Volumes extends Vue {
  search: string = ''
  headers: any[] = []

  arr: any[] = []

  async created() {
    this.headers = [
      { text: this.$t('kamei_no'), value: 'Kamei_no' },
      { text: 'F.D', value: 'FD_no' },
      { text: 'C', value: 'Calco_tav_no' },
      { text: 'W.E', value: 'WE_no' },
      { text: 'T', value: 'Taschen_no' },
      { text: 'H.F', value: 'HF_no' },
      { text: this.$t('kanagawa'), value: 'Kanagawa_no' },
      { text: this.$t('machida'), value: 'Machida_no' },
    ]

    const result = await this.$searchUtils.createIndexFromIIIFCollection(
      'https://raw.githubusercontent.com/nakamura196/piranesi/master/docs/print/iiif/top.json'
    )

    const dataAll = result.data

    const arr = []
    const headers = this.headers

    for (let i = 0; i < dataAll.length; i++) {
      const obj = dataAll[i]._source

      const obj2: any = {}

      for (let i = 0; i < headers.length; i++) {
        const key = headers[i].value
        let value = obj[key]
        if (value != null) {
          value = value[0]
        }
        if ((key === 'Kamei_no' || key === 'FD_no') && obj.constellation) {
          value += '.' + obj.constellation[0].replace('.', '')
        }
        obj2[key] = value
      }

      obj2.file_no = obj.file_no[0]

      arr.push(obj2)
    }
    this.arr = arr
  }
}
</script>
