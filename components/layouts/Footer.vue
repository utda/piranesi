<template>
  <v-footer :dark="true" class="mt-5">
    <v-container>
      <p class="text-center my-5">
        {{ $t('project') }}（{{ $t('library') }}) <br />digital-archive [at]
        lib.u-tokyo.ac.jp
      </p>
    </v-container>
  </v-footer>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class Footer extends Vue {}
</script>
