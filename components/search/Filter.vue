<template>
  <div v-show="filterShowFlag">
    <v-divider />
    <v-container fluid>
      <b style="vertical-align: middle;">{{ $t('search_query') }}</b>
      <template v-if="query.keyword">
        <v-chip
          v-for="(value, index) in query.keyword"
          :key="index"
          style="white-space: normal; word-wrap: break-word;"
          class="ma-1"
          close
          :color="!value.startsWith('-') ? 'primary' : 'grey'"
          label
          text-color="white"
          @click:close="removeKey(value, 'keyword')"
        >
          <v-icon v-if="value.startsWith('-')" class="mr-1"
            >mdi-minus-box</v-icon
          >
          {{ $t('keyword') }}:
          {{ !value.startsWith('-') ? value : value.slice(1) }}
        </v-chip>
      </template>

      <template v-for="(type, t) in ['fc', 'q']">
        <template v-for="(agg, label) in query.advanced[type]">
          <span :key="t + '-' + label">
            <template v-for="method in ['+', '-']">
              <v-chip
                v-for="(value, m) in agg[method]"
                :key="m"
                style="white-space: normal; word-wrap: break-word;"
                class="ma-1"
                close
                :color="method === '+' ? 'primary' : 'grey'"
                label
                text-color="white"
                @click:close="
                  removeAdvanced(
                    label,
                    [method === '+' ? value : '-' + value],
                    type
                  )
                "
              >
                <v-icon v-if="method !== '+'" class="mr-1"
                  >mdi-minus-box</v-icon
                >
                {{ getLabel(label) }}:
                {{ value }}
              </v-chip>
            </template>
          </span>
        </template>
      </template>

      <!-- 

      <template v-for="(agg, label) in query.advanced">
        <template v-for="key in ['+', '-']">
          <v-chip
            v-for="(value, index2) in agg[key]"
            :key="label + '-' + index2"
            style="white-space: normal; word-wrap: break-word;"
            class="ma-1"
            close
            color="primary"
            label
            text-color="white"
            @click:close="removeFc(label, [key === '+' ? value : '-' + value])"
          >
            {{ $t(label.replace('fc-', '').replace('q-', '')) }}:
            {{ key === '+' ? value : '-' + value }}
          </v-chip>
        </template>
      </template>

      -->

      <template v-if="query.after">
        <v-chip
          v-for="(value, index) in query.after"
          :key="index"
          style="white-space: normal; word-wrap: break-word;"
          class="ma-1"
          close
          color="primary"
          label
          text-color="white"
          @click:close="removeKey(value, 'after')"
        >
          {{ $t('after') }}: {{ value }}
        </v-chip>
      </template>

      <template v-if="query.before">
        <v-chip
          v-for="(value, index) in query.before"
          :key="index"
          style="white-space: normal; word-wrap: break-word;"
          class="ma-1"
          close
          color="primary"
          label
          text-color="white"
          @click:close="removeKey(value, 'before')"
        >
          {{ $t('before') }}: {{ value }}
        </v-chip>
      </template>

      <v-btn
        small
        text
        :to="localePath({ name: 'search' })"
        class="error--text ma-1"
      >
        <v-icon>mdi-close</v-icon> {{ $t('clear') }}
      </v-btn>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class searchfilter extends Vue {
  query: any = this.$store.state
  // query: any = this.$route.query

  removeKey(value: string, label: string) {
    const data: any = {
      label,
      value: [value],
    }
    this.$store.commit('removeKey', data)
    this.$router.push(
      this.localePath({
        name: 'search',
        query: this.$utils.getSearchQueryFromQueryStore(this.$store.state),
      }),
      () => {},
      () => {}
    )
  }

  /*
  removeFc(label: string, values: string[]) {
    this.$store.commit('removeFc', {
      label,
      values,
    })

    // push 処理
    const query: any = this.$utils.getSearchQueryFromQueryStore(
      this.$store.state
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
  */

  removeAdvanced(label: string, values: string[], type: string) {
    this.$store.commit('removeAdvanced', {
      label,
      values,
      type,
    })

    // push 処理
    const query: any = this.$utils.getSearchQueryFromQueryStore(
      this.$store.state
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
    if (
      query.keyword.length > 0 ||
      query.after.length > 0 ||
      query.before.length > 0 ||
      Object.keys(query.advanced.fc).length > 0 ||
      Object.keys(query.advanced.q).length > 0
    ) {
      flag = true
    }
    return flag
  }

  getLabel(term: string): string {
    const termLabels = null
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
          (termLabels && termLabels[label]
            ? this.$t(termLabels[label])
            : this.$t(label))

        break
      }
    }

    return result
  }
}
</script>
