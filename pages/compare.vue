<template>
  <div>
    <v-container>
      <h2 class="my-5">
        {{ title }} <i>{{ latin }}</i>
      </h2>
      <v-row>
        <v-col cols="12" sm="6">
          <v-card class="mb-10" flat outlined>
            <v-card-title class="headline grey lighten-2" primary-title
              ><span class="mr-5">{{
                $t('Prints and photos from the same angle')
              }}</span></v-card-title
            >
            <div class="pa-5 text-center">
              <template v-for="(obj, key) in fileNoMap">
                <template v-if="obj.photo != null && obj.print != null">
                  <p :key="key" class="mb-5">
                    <v-row>
                      <v-col cols="12" sm="6">
                        <CardItem
                          :item="{
                            path: {
                              name: 'photo-id',
                              params: { id: obj.photo._source.photo_no[0] },
                            },
                            label: obj.photo._source._title[0],
                            image: obj.photo._source._image[0],
                            manifest: obj.photo._id,
                            url:
                              baseUrl + '/photo/' + obj.print._source._title[0],
                          }"
                        />
                      </v-col>

                      <v-col cols="12" sm="6">
                        <CardItem
                          :item="{
                            path: {
                              name: 'item-id',
                              params: { id: obj.print._source.file_no[0] },
                            },
                            label: obj.print._source.title[0],
                            image: obj.print._source._image[0],
                            manifest: obj.print._id,
                            url:
                              baseUrl + '/item/' + obj.print._source._title[0],
                          }"
                        />
                      </v-col>
                    </v-row>

                    <v-btn
                      class="mt-5"
                      color="primary"
                      :href="getUrl(obj)"
                      target="_blank"
                      >Miradorで比較する</v-btn
                    >
                    <v-divider class="my-10" />
                  </p>
                </template>
              </template>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card class="mb-10" flat outlined>
            <v-card-title class="headline grey lighten-2" primary-title
              ><span class="mr-5">{{ $t('Other prints') }}</span></v-card-title
            >

            <div class="pa-5 text-center">
              <v-row>
                <template v-for="(obj, key) in fileNoMap" class="text-center">
                  <template v-if="!obj.photo && obj.print">
                    <v-col :key="key" cols="12" sm="6">
                      <CardItem
                        :item="{
                          path: {
                            name: 'item-id',
                            params: { id: obj.print._source.file_no[0] },
                          },
                          label: obj.print._source.title[0],
                          image: obj.print._source._image[0],
                          manifest: obj.print._id,
                          url: baseUrl + '/item/' + obj.print._source._title[0],
                        }"
                      />
                    </v-col>
                  </template>
                </template>
              </v-row>
            </div>
          </v-card>

          <v-card class="mb-10" flat outlined>
            <v-card-title class="headline grey lighten-2" primary-title
              ><span class="mr-5">{{ $t('Photos') }}</span></v-card-title
            >
            <div class="pa-5 text-center">
              <v-row>
                <template v-for="(obj, key) in fileNoMap" class="text-center">
                  <template v-if="obj.photo && !obj.print">
                    <v-col :key="key" cols="12" sm="6">
                      <CardItem
                        :item="{
                          path: {
                            name: 'photo-id',
                            params: { id: obj.photo._source.photo_no[0] },
                          },
                          label: obj.photo._source._title[0],
                          image: obj.photo._source._image[0],
                          manifest: obj.photo._id,
                          url:
                            baseUrl + '/photo/' + obj.photo._source._title[0],
                        }"
                      />
                    </v-col>
                  </template>
                </template>
              </v-row>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component /*, Watch */ } from 'nuxt-property-decorator'
import axios from 'axios'
// import searchResult from '~/components/ui/searchResult.vue'
import CardItem from '~/components/display/CardItem.vue'

import { dataStore } from '~/store'

@Component({
  components: {
    // searchResult
    CardItem,
  },
})
export default class Volumes extends Vue {
  baseUrl: any = process.env.BASE_URL

  title: string = ''
  latin: string = ''

  fileNoMap: any = {}

  created() {
    this.init()
  }

  async init() {
    const result: any = await axios
      .get(this.baseUrl + '/json/edificio.json')
      .then((response) => {
        const result: any = response.data

        return result
      })

    const EdificioIL: any = this.$route.query.Edificio_IL

    let obj: any = {}
    if (this.$route.query.Edificio_IL) {
      obj = result[EdificioIL]
    } else if (this.$route.query.map_no) {
      for (const key2 in result) {
        if (key2.includes('[' + this.$route.query.map_no + ']')) {
          obj = result[key2]
        }
      }
    } else if (this.$route.query.map_area) {
      for (const key2 in result) {
        if (key2.includes('[' + this.$route.query.map_area + ']')) {
          obj = result[key2]
        }
      }
    }

    this.title = obj.label
    this.latin = obj.i

    this.getPhoto()
  }

  async getPhoto() {
    const result = await this.$searchUtils.createIndexFromIIIFCollection(
      'https://raw.githubusercontent.com/nakamura196/piranesi/master/docs/photo/iiif/top.json'
    )

    const index = result.index
    const dataAll = result.data

    const ids: string[] = []

    const obj = index.Edificio_all
    for (const key in obj) {
      if (key.includes(this.title)) {
        const ids2 = obj[key]
        for (let i = 0; i < ids2.length; i++) {
          const id = ids2[i]
          if (!ids.includes(id)) {
            ids.push(id)
          }
        }
      }
    }

    if (this.title.includes('[') && this.title.includes(']')) {
      const slug: string = '[' + this.title.split('[')[1].split(']')[0] + ']'
      for (const key in obj) {
        if (key.includes(slug)) {
          const ids2 = obj[key]
          for (let i = 0; i < ids2.length; i++) {
            const id = ids2[i]
            if (!ids.includes(id)) {
              ids.push(id)
            }
          }
        }
      }
    }

    const fileNoMap: any = {}

    for (let i = 0; i < ids.length; i++) {
      const data: any = dataAll[ids[i]]

      const metadata = data._source

      let value
      if (metadata.file_n1 && metadata.file_n1.length > 0) {
        value = metadata.file_n1[0]
      } else {
        value = metadata.photo_no[0]
      }

      // 重複していた場合
      if (fileNoMap[value] && fileNoMap[value].photo != null) {
        value = this.$utils.formatArrayValue(metadata.photo_no) // 一意に定まる値
      }

      if (!fileNoMap[value]) {
        fileNoMap[value] = {
          photo: null,
          print: null,
        }
      }
      fileNoMap[value].photo = data
    }

    this.getPrint(fileNoMap)
  }

  async getPrint(fileNoMap: any) {
    if (!dataStore.data.all.data) {
      const result = await this.$searchUtils.createIndexFromIIIFCollection(
        'https://raw.githubusercontent.com/nakamura196/piranesi/master/docs/print/iiif/top.json'
      )
      dataStore.setIndex(result.index)
      dataStore.setData(result.data)
    }

    const result = dataStore.data.all

    const data: any = result.data
    const index: any = result.index

    const ids: string[] = []

    const map = index.Edificio_all
    for (const field in map) {
      if (field.includes(this.title)) {
        const ids2 = map[field]
        for (let i = 0; i < ids2.length; i++) {
          const id = ids2[i]
          if (!ids.includes(id)) {
            ids.push(id)
          }
        }
      }
    }

    if (this.title.includes('[') && this.title.includes(']')) {
      const slug: string = '[' + this.title.split('[')[1].split(']')[0] + ']'
      for (const key in map) {
        if (key.includes(slug)) {
          const ids2 = map[key]
          for (let i = 0; i < ids2.length; i++) {
            const id = ids2[i]
            if (!ids.includes(id)) {
              ids.push(ids2[i])
            }
          }
        }
      }
    }

    for (let i = 0; i < ids.length; i++) {
      const id = ids[i]
      const metadata: any = data[id]._source

      let value = this.$utils.formatArrayValue(metadata.file_no)

      // 重複していた場合
      if (fileNoMap[value] && fileNoMap[value].print != null) {
        value = this.$utils.formatArrayValue(metadata.image_ID) // 一意に定まる値
      }

      if (!fileNoMap[value]) {
        fileNoMap[value] = {
          photo: null,
          print: null,
        }
      }

      fileNoMap[value].print = data[id]
    }

    this.fileNoMap = fileNoMap
  }

  getUrl(obj: any) {
    const params = {
      window: {},
      windows: [
        {
          manifestId: obj.photo._id,
        },
        {
          manifestId: obj.print._id,
        },
      ],
    }

    const url = this.baseUrl + '/mirador/?config=' + JSON.stringify(params)
    return url
  }
}
</script>
