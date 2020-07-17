<template>
  <v-row>
    <v-col cols="12" sm="3" class="mb-4">
      <nuxt-link :to="localePath(item.path)">
        <v-img
          :src="item.image"
          contain
          style="height: 200px;"
          class="grey lighten-2"
        ></v-img>
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
            <ResultOption :item="item" />
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'
import ResultOption from '~/components/display/ResultOption.vue'

@Component({
  components: {
    ResultOption,
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
