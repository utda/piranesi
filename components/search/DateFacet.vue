<template>
  <b-list-group>
    <b-list-group-item style="background-color: #f9f6f0;">
      <h5 class="my-0">
        {{ $t('temporal') }}
      </h5>
    </b-list-group-item>
    <b-list-group-item style="background-color: #f9f6f0;">
      <div style="max-height: 400px; overflow-y: auto; overflow-x: hidden;">
        <p>
          Between Year
          <b-form-input v-model="after"></b-form-input>
        </p>
        <p>
          and Year
          <b-form-input v-model="before"></b-form-input>
        </p>
      </div>
    </b-list-group-item>
    <b-list-group-item style="background-color: #f9f6f0;">
      <!-- 更新ボタン -->
      <b-button
        type="button"
        class="btn-blue"
        size="sm"
        variant="primary"
        @click="updateDate"
        >{{ $t('update') }}</b-button
      >
    </b-list-group-item>
  </b-list-group>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class facetoption extends Vue {
  after: string = ''

  before: string = ''

  query: any = {}

  openFlag: boolean = true

  change(field: string, value: string) {
    // eslint-disable-next-line
    console.log('change', field, value)
  }

  updateDate() {
    /*
    queryStore.setAfter(this.after)
    queryStore.setBefore(this.before)
    */
  }
}
</script>
