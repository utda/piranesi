<template>
  <div>
    <v-container>
      <h2 class="my-5">{{ $t('subject_search') }}</h2>

      <v-row>
        <v-col
          v-for="(obj, index) in [items.slice(0, 1), items.slice(1)]"
          :key="index"
          cols="12"
          sm="6"
        >
          <v-treeview :items="obj" :search="search" :filter="filter" open-all>
            <template v-slot:label="{ item }">
              <component
                :is="getComp(item)"
                :class="getComp(item) == 'v-sheet' ? 'pa-4 my-2' : ''"
                :color="getComp(item) == 'v-sheet' ? 'grey lighten-3' : ''"
              >
                <template v-if="item.link">
                  <router-link
                    :to="
                      localePath({
                        name: 'search',
                        query: item.query,
                      })
                    "
                  >
                    {{ getName(item) }}
                  </router-link>

                  <v-btn v-if="item.uri" target="_blank" :href="item.uri" icon>
                    <v-icon>mdi-wikipedia</v-icon></v-btn
                  >
                </template>
                <template v-else>
                  {{ getName(item) }}
                  <!-- 
                  <template v-if="item.lv == 1">
                    <v-sheet class="pa-4 my-2" color="grey lighten-3">
                      {{ getName(item) }}
                    </v-sheet>
                  </template>
                  <template v-else>
                    <span :style="item.lv == 2 ? 'font-weight: bold;' : ''">{{
                      getName(item)
                    }}</span>
                  </template>
                  -->
                </template>
                <v-chip v-if="item.n" class="mx-2">
                  {{ $t(item.n) }}
                </v-chip>
              </component>
            </template>
          </v-treeview>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import axios from 'axios'
@Component
export default class Volumes extends Vue {
  baseUrl: any = process.env.BASE_URL
  head() {
    return {
      titleTemplate: null,
      title: this.$t('subject_search'),
    }
  }

  items: any[] = []

  dialogFlag: boolean = false

  uri: string = ''

  data: any = {}

  search: string = ''
  caseSensitive: boolean = false

  getComp(item: any) {
    if (item.lv === 1) {
      return 'v-sheet'
    } else if (item.lv === 2) {
      return 'b'
    } else {
      return 'span'
    }
  }

  created() {
    const self = this
    axios.get(this.baseUrl + '/json/subject.json').then((response) => {
      self.items = response.data
    })
  }

  getValue(item: any) {
    if (item.term) {
      return item.term
    } else {
      return item.name
    }
  }

  getName(item: any) {
    if (this.$i18n.locale === 'ja' && item.name_ja) {
      return item.name + ' (' + item.name_ja + ')'
    } else {
      return item.name
    }
  }

  get filter() {
    return this.caseSensitive
      ? (item: any, search: string, textKey: string) =>
          item[textKey].includes(search)
      : undefined
  }
}
</script>
