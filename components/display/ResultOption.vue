<template>
  <span>
    <v-btn v-if="item.manifest" icon :href="item.manifest">
      <img height="24px" :src="baseUrl + '/img/iiif-logo.svg'" />
    </v-btn>

    <v-btn icon>
      <v-menu top offset-y>
        <template v-slot:activator="{ on }">
          <v-icon v-on="on">mdi-share-variant</v-icon>
        </template>

        <ShareButtons
          :url="item.url"
          :title="item.label"
          :manifest="item.manifest ? item.manifest : ''"
        />
      </v-menu>
    </v-btn>
    <!-- 
    <a v-if="manifest" :href="manifest" target="_blank" style="color: #ca4316;">
      <img
        v-b-tooltip.hover
        :title="$t('manifest')"
        style="cursor: pointer; font-size: 20px;"
        class="mx-2 pb-1 iiif-drag-and-drop-link"
        width="20px"
        :src="$utils.getManifestIcon(manifest)"
      />
    </a>

    <nuxt-link
      v-if="SIMILAR_IMAGES_FLAG"
      :to="localePath({ name: 'search', query: { image: id } })"
      style="color: #ca4316;"
    >
      <img
        v-b-tooltip.hover
        :title="$t('similar_images')"
        style="cursor: pointer; font-size: 20px;"
        class="mx-2 pb-1"
        width="20px"
        src="~/static/img/icons/image-search.png"
      />
    </nuxt-link>

    <nuxt-link
      :to="localePath({ name: 'search', query: { id: id } })"
      style="color: #ca4316;"
    >
      <img
        v-b-tooltip.hover
        :title="$t('more_like_this')"
        style="cursor: pointer; font-size: 20px;"
        class="mx-2 pb-1"
        width="20px"
        src="~/static/img/icons/text-search.png"
      />
    </nuxt-link>

    <ShareButtons class="mx-2" :url="url" :title="title" />

    -->
  </span>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'
import ShareButtons from '~/components/common/ShareButtons.vue'

@Component({
  components: {
    ShareButtons,
  },
})
export default class resultoption extends Vue {
  baseUrl: any = process.env.BASE_URL

  SIMILAR_IMAGES_FLAG: boolean = process.env.SIMILAR_IMAGES_FLAG === 'true'

  /*
  @Prop({ required: true })
  manifest!: string

  @Prop({ required: true })
  id!: string

  @Prop({ required: true })
  title!: string

  @Prop({ required: true })
  path!: any
  */

  @Prop({ required: true })
  item!: any

  /*
  :id="item.id" :path="item.path" :title="item.label"
  */

  get manifest() {
    return this.item.manifest
  }

  get id() {
    return this.item.id
  }

  get title() {
    return this.item.label
  }

  get path() {
    return this.item.path
  }

  get url() {
    return process.env.BASE_URL + '/item/' + this.id
  }
}
</script>
