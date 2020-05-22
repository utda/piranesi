<template>
  <v-row>
    <v-col cols="12" sm="3">
      <nuxt-link class="mv-4" :to="localePath(item.path)">
        <v-img
          :src="item.image"
          contain
          style="height: 200px;"
          class="grey lighten-2"
        ></v-img>
        <!-- 
        <div
          style="height: 150px; display: flex; background-color: lightgray;"
        ></div>
        -->
      </nuxt-link>
    </v-col>
    <v-col cols="12" sm="9">
      <v-row>
        <v-col cols="12">
          <div class="mb-2">
            <router-link :to="localePath(item.path)">
              <template v-if="$i18n.locale == 'en'">
                <small
                  >Vol. {{ $utils.formatArrayValue(obj.volume) }}
                  {{ $utils.formatArrayValue(obj.series) }}</small
                >
                <br />
                Page. {{ plate }}
                <br />
                {{ $utils.formatArrayValue(obj.title) }}
              </template>
              <template v-else>
                <small
                  >{{ $utils.formatArrayValue(obj.volume) }}巻
                  {{ $utils.formatArrayValue(obj.series_JP) }}</small
                >
                <br />
                {{ plate }}葉
                {{ $utils.formatArrayValue(obj.title_JP) }}
                <br />
                {{ $utils.formatArrayValue(obj.title) }}
              </template>
            </router-link>
          </div>
          <div v-if="obj.Edificio_IL">
            <b>{{ $t('Edificio') }}</b
            >: {{ $utils.formatArrayValue(obj.Edificio_IL) }}
          </div>
          <div v-if="obj.conservazione">
            <b>{{ $t('conservazione') }}</b
            >: {{ $utils.formatArrayValue(obj.conservazione) }}
          </div>

          <div class="text-right mt-2">
            <v-btn v-if="item.manifest" icon>
              <a :href="item.manifest">
                <img
                  contain
                  height="24px"
                  :src="baseUrl + '/img/iiif-logo.svg'"
                />
              </a>
            </v-btn>
            <v-btn icon>
              <v-menu open-on-hover top offset-y>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">mdi-share-variant</v-icon>
                </template>

                <ShareButtons :url="item.url" :title="item.label" />
              </v-menu>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'
import ResultOption from '~/components/display/ResultOption.vue'
import ShareButtons from '~/components/common/ShareButtons.vue'

@Component({
  components: {
    ResultOption,
    ShareButtons,
  },
})
export default class ListItem extends Vue {
  baseUrl: any = process.env.BASE_URL

  @Prop()
  item!: any

  get obj() {
    return this.item._source
  }

  get plate() {
    return (
      (this.$utils.formatArrayValue(this.obj.plate)
        ? this.$utils.formatArrayValue(this.obj.plate)
        : 0) + this.$utils.formatArrayValue(this.obj.constellation)
    )
  }
}
</script>
