<template>
  <div>
    <v-expansion-panels :value="0" dense>
      <v-expansion-panel>
        <v-expansion-panel-header class="grey lighten-2">{{
          label
        }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list>
            <!-- 
              <v-list-item
                v-for="(bucket, index) in buckets"
                :key="'bucket_' + index"
              >
                <v-list-item-action>
                  <v-checkbox
                    v-model="bucket.value"
                    color="primary"
                    @change="change('fc-' + term, bucket.key)"
                  ></v-checkbox>
                </v-list-item-action>

                <v-list-item-content>
                  {{ bucket.key }}
                </v-list-item-content>

                <v-list-item-action>
                  <v-chip>{{ bucket.doc_count }}</v-chip>
                </v-list-item-action>
              </v-list-item>
            -->

            <template v-for="(bucket, index) in buckets">
              <v-list-item
                v-if="index < thres || flag"
                :key="'bucket_' + index"
                dense
              >
                <v-list-item-action>
                  <v-checkbox
                    v-model="bucket.value"
                    color="primary"
                    @change="change('fc-' + term, bucket.key)"
                  ></v-checkbox>
                </v-list-item-action>

                <v-list-item-content class="mr-5">
                  {{ bucket.key }}
                </v-list-item-content>

                <v-list-item-action>
                  {{ bucket.doc_count }}
                </v-list-item-action>

                <v-list-item-action>
                  <v-btn
                    v-show="!bucket.value"
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

            <!-- NOT -->

            <template v-for="(bucket, index) in getArray('-')">
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
                  <v-icon color="red darken-3">mdi-checkbox-blank</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  {{ bucket }}
                </v-list-item-content>
              </v-list-item>

              <v-divider :key="`divider-not-${index}`"></v-divider>
            </template>

            <v-list-item>
              <v-list-item-action>
                <!-- small  -->
                <v-btn color="primary" @click="updateQuery()">{{
                  $t('update')
                }}</v-btn>
              </v-list-item-action>

              <v-list-item-content></v-list-item-content>

              <v-list-item-action>
                {{
                  !flag && buckets.length > thres
                    ? $i18n.locale == 'ja'
                      ? '残りの' + (buckets.length - thres) + '件を表示'
                      : 'Show Remaing ' + (buckets.length - thres)
                    : ''
                }}
              </v-list-item-action>

              <v-list-item-action>
                <v-btn
                  v-show="!flag && buckets.length > thres"
                  icon
                  @click="flag = !flag"
                >
                  <v-icon color="grey lighten-1">
                    {{
                      !flag && buckets.length > thres
                        ? 'mdi-chevron-down'
                        : 'mdi-chevron-up'
                    }}
                  </v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <!-- 注意 -->
    <!-- <v-btn icon>{{ bucket.doc_count }}</v-btn> -->
    <!-- 
    <v-expansion-panels :value="0" class="mt-10">
      <v-expansion-panel>
        <v-expansion-panel-header class="grey lighten-2">{{
          label
        }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <div style="max-height: 400px; overflow-y: auto;" class="my2-5">
            
            <v-list-item-group multiple>
              <v-list-item
                v-for="(bucket, index) in buckets"
                :key="'bucket_' + index"
              >
                <v-list-item-action>
                  <v-checkbox
                    v-model="bucket.value"
                    color="primary"
                    @change="change('fc-' + term, bucket.key)"
                  ></v-checkbox>
                </v-list-item-action>

                <v-list-item-content>
                  {{ bucket.key }}
                </v-list-item-content>

                <v-list-item-action>
                  <v-chip>{{ bucket.doc_count }}</v-chip>
                  
                </v-list-item-action>
              </v-list-item>
            </v-list-item-group>
          </div>

          <v-divider />

          <v-btn small color="primary" @click="updateQuery()">{{
            $t('update')
          }}</v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    -->
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Watch, Component } from 'nuxt-property-decorator'
import { queryStore, dataStore } from '~/store'

@Component
export default class facetoption extends Vue {
  thres: number = 10
  flag: boolean = false

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
    default() {
      return {}
    },
  })
  tmp!: any

  buckets: any[] = []
  query: any = null

  created() {
    this.main()
  }

  @Watch('tmp')
  watchTmp() {
    this.main()
  }

  main() {
    if (dataStore) {
      this.buckets = dataStore.data.all.result.aggregations[this.term].buckets

      // 選択済みの値設定
      for (let i = 0; i < this.buckets.length; i++) {
        const bucket = this.buckets[i]
        bucket.value = this.checked('fc-' + this.term, bucket.key)
      }
      this.query = dataStore.data.all.query
    }
  }

  openFlag: boolean = /*
    this.query && this.query.facetsFlag[this.label]
      ? this.query.facetsFlag[this.label]
      : false */ true

  /*
  setFacetsFlag() {
    queryStore.setFacetsFlag({ label: this.label, value: !this.openFlag })
    this.openFlag = !this.openFlag
  }
  */

  getArray(type: string): string[] {
    const term = 'fc-' + this.term
    if (!queryStore.query.advanced.fc) {
      return []
    }
    if (queryStore.query.advanced.fc[term]) {
      return queryStore.query.advanced.fc[term][type]
    } else {
      return []
    }
  }

  // 完成
  change(term: string, value: string) {
    const obj = queryStore.query.advanced.fc[term]
    if (obj && obj['+'].includes(value)) {
      queryStore.removeAdvanced({
        label: term,
        values: [value],
        type: 'fc',
      })
    } else {
      queryStore.setAdvanced({
        label: term,
        values: [value],
        type: 'fc',
      })
    }
  }

  remove(data: { [keyword: string]: string }) {
    queryStore.setAdvanced(data)
    this.updateQuery()
  }

  add(data: { [keyword: string]: string }) {
    queryStore.removeAdvanced(data)
    this.updateQuery()
  }

  updateQuery() {
    const query = this.$utils.getSearchQueryFromQueryStore(queryStore.query)
    this.$router.push(
      this.localePath({
        name: 'search',
        query,
      }),
      () => {},
      () => {}
    )
  }

  checked(term: string, value: string): boolean {
    const obj = queryStore.query.advanced.fc[term]
    if (obj && obj['+'].includes(value)) {
      return true
    } else {
      return false
    }
  }
}
</script>
<style>
.v-expansion-panel-content__wrap {
  padding: 0;
}
</style>
