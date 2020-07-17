<template>
  <v-expansion-panels
    v-if="buckets.length > 0 || getArray('-').length > 0"
    :value="openFlag ? 0 : null"
  >
    <v-expansion-panel>
      <v-expansion-panel-header class="grey lighten-2"
        ><h3>
          <!-- {{ label.startsWith('_') ? $t(label.slice(1)) : $t(label) }} -->
          {{ label.startsWith('_') ? $t(label.slice(1)) : $t(label) }}
          <small>({{ message }})</small>
        </h3></v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-list dense>
          <div style="max-height: 400px;" class="overflow-y-auto">
            <template v-for="(bucket, index) in buckets">
              <v-list-item :key="'bucket_' + index">
                <v-list-item-content
                  class="my-0 py-0"
                  style="word-break: break-word;"
                >
                  <v-checkbox
                    v-model="values[index]"
                    class="mb-0 mt-1 ml-1 py-0"
                    align="center"
                    dense
                    x-small
                    color="primary"
                    :label="term == 'jp' ? $t(bucket.key) : bucket.key"
                    @change="change('fc-' + term, bucket.key)"
                  ></v-checkbox>
                </v-list-item-content>

                <v-list-item-action class="my-0 py-0">{{
                  bucket.doc_count.toLocaleString()
                }}</v-list-item-action>

                <v-list-item-action class="my-0 py-0">
                  <v-btn
                    v-show="!values[index]"
                    icon
                    x-small
                    @click="
                      remove({
                        label: 'fc-' + term,
                        values: ['-' + bucket.key],
                        type: 'fc',
                      })
                    "
                  >
                    <v-icon color="grey lighten-1">mdi-close-circle</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>

              <v-divider :key="`divider-${index}`"></v-divider>
            </template>
          </div>

          <!-- NOT -->

          <template v-for="(bucket, index) in getArray('-')">
            <v-divider :key="`divider-not-${index}`"></v-divider>
            <v-list-item
              :key="index"
              @click="
                add({
                  label: 'fc-' + term,
                  values: ['-' + bucket],
                  type: 'fc',
                })
              "
            >
              <v-list-item-action>
                <v-icon color="red darken-3">mdi-minus-box</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                {{ term == 'jp' ? $t(bucket) : bucket }}
              </v-list-item-content>
            </v-list-item>

            <v-divider :key="`divider-not2-${index}`"></v-divider>
          </template>

          <v-list-item>
            <v-list-item-action>
              <!-- small  -->
              <v-btn color="primary" @click="updateQuery()">{{
                $t('update')
              }}</v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { Vue, Prop, Watch, Component } from 'nuxt-property-decorator'

@Component
export default class FacetOption extends Vue {
  @Prop({
    default: '',
    required: true,
  })
  label!: string

  @Prop({
    default: '',
    required: true,
  })
  term!: string

  @Prop({
    required: true,
    default() {
      return []
    },
  })
  buckets: any

  created() {
    this.main()
  }

  @Watch('buckets')
  watchBuckets() {
    this.main()
  }

  values: boolean[] = []

  main() {
    const values: boolean[] = []
    // 選択済みの値設定
    for (let i = 0; i < this.buckets.length; i++) {
      const bucket = this.buckets[i]
      values.push(this.checked('fc-' + this.term, bucket.key))
    }

    this.values = values
  }

  openFlag: boolean = !!(
    this.$store.state.facetFlags[this.term] ||
    this.getArray('-').length > 0 ||
    this.getArray('+').length > 0
  )

  get facetFlags() {
    return this.$store.state.facetFlags
  }

  changeFacetFlags() {
    this.$store.commit('changeFacetFlags', {
      label: this.term,
      value: !this.openFlag,
    })
    this.openFlag = !this.openFlag
  }

  getArray(type: string): string[] {
    const label = 'fc-' + this.term
    if (!this.$store.state.advanced.fc) {
      return []
    }
    if (this.$store.state.advanced.fc[label]) {
      return this.$store.state.advanced.fc[label][type]
    } else {
      return []
    }
  }

  // 完成
  change(label: string, value: string) {
    const obj = this.$store.state.advanced.fc[label]
    if (obj && obj['+'].includes(value)) {
      this.$store.commit('removeAdvanced', {
        label,
        values: [value],
        type: 'fc',
      })
    } else {
      this.$store.commit('setAdvanced', {
        label,
        values: [value],
        type: 'fc',
      })
    }
  }

  remove(data: { [keyword: string]: string }) {
    this.$store.commit('setAdvanced', data)
    this.updateQuery()
  }

  add(data: { [keyword: string]: string }) {
    this.$store.commit('removeAdvanced', data)
    this.updateQuery()
  }

  updateQuery() {
    const query = this.$utils.getSearchQueryFromQueryStore(this.$store.state)
    query.from = 0
    this.$router.push(
      this.localePath({
        name: 'search',
        query,
      }),
      () => {},
      () => {}
    )
  }

  checked(label: string, value: string) {
    const obj = this.$store.state.advanced.fc[label]
    if (obj && obj['+'].includes(value)) {
      return true
    } else {
      return false
    }
  }

  get message() {
    const size: number = this.buckets.length
    let prefix: string = ''
    const suffix: string = this.$i18n.locale === 'ja' ? '件' : ''
    if (size === 50) {
      prefix = this.$i18n.locale === 'ja' ? '上位' : 'Top '
    }
    return prefix + size.toLocaleString() + suffix
  }
}
</script>
<style>
.v-expansion-panel-content__wrap {
  padding: 0 !important;
}
</style>
