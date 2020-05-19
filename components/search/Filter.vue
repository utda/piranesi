<template>
  <div v-if="filterShowFlag && query">
    <v-divider />

    <v-container>
      <span class="mr-2">{{ $t('filter') }}</span>

      <template v-if="query.keyword">
        <v-btn
          v-for="(keyword, index) in query.keyword"
          :key="index"
          color="primary"
          class="ma-1"
          size="sm"
          @click="removeKeyword(keyword)"
        >
          <span>{{ $t('keyword') }}: </span>
          <b class="mr-2">{{ keyword }}</b>
          <span aria-hidden="true">&times;</span>
        </v-btn>
      </template>

      <template v-for="(type, t) in ['fc', 'q']">
        <template v-for="(agg, label) in query.advanced[type]">
          <span :key="t + '-' + label">
            <template v-for="method in ['+', '-']">
              <v-btn
                v-for="(value, m) in agg[method]"
                :key="m"
                color="primary"
                class="ma-1"
                size="sm"
                @click="
                  removeAdvanced(
                    label,
                    [method === '+' ? value : '-' + value],
                    type
                  )
                "
              >
                {{ getLabel(label) }}:
                <b class="mr-2">
                  {{ method === '+' ? value : '-' + value }}
                </b>
                <span aria-hidden="true">&times;</span>
              </v-btn>
            </template>
          </span>
        </template>
      </template>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { queryStore } from '~/store'

@Component
export default class searchfilter extends Vue {
  query: any = null

  created() {
    this.query = queryStore.query
  }

  removeKeyword(value: string) {
    queryStore.removeKeywords([value])
    this.$router.push(
      this.localePath({
        name: 'search',
        query: this.$utils.getSearchQueryFromQueryStore(queryStore.query),
      }),
      () => {},
      () => {}
    )
  }

  removeAdvanced(label: string, values: string[], type: string) {
    queryStore.removeAdvanced({
      label,
      values,
      type,
    })

    // push 処理
    const query: any = this.$utils.getSearchQueryFromQueryStore(
      queryStore.query
    )

    this.$router.push(
      this.localePath({
        name: 'search',
        query,
      }),
      () => {},
      () => {}
    )
  }

  get filterShowFlag(): boolean {
    let flag = false
    const query = this.query
    if (!query) {
      return flag
    }
    if (
      query.keyword.length > 0 ||
      Object.keys(query.advanced.fc).length > 0 ||
      Object.keys(query.advanced.q).length > 0
    ) {
      flag = true
    }
    return flag
  }

  getLabel(term: string): string {
    const termLabels = queryStore.query.termLabels
    const types: any = {
      'fc-': this.$t('facet'),
      'q-': this.$t('advanced'),
    }

    let result: string = ''

    for (const type in types) {
      if (term.startsWith(type)) {
        const label = term.replace(type, '')

        result =
          types[type] +
          '-' +
          (termLabels && termLabels[label] ? termLabels[label] : label)

        break
      }
    }

    return result
  }
}
</script>
