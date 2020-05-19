import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import { DataModel } from '~/models/DataModel'

// stateFactory: true → Vuex をモジュールモードで扱うために指定
@Module({ stateFactory: true, namespaced: true, name: 'data' })
export default class Data extends VuexModule {
  data: DataModel = {
    all: {
      index: null,
    },
    facetFlag: true,

    query: {},
    result: {},
    index: {},
    data: {},
  }

  @Mutation
  setAll(value: any): void {
    this.data.all = value
  }

  @Mutation
  setIndex(value: any): void {
    this.data.all.index = value
  }

  @Mutation
  setData(value: any): void {
    this.data.all.data = value
  }

  @Mutation
  setQuery(value: any): void {
    this.data.all.query = value
  }

  @Mutation
  setResult(value: any): void {
    this.data.all.result = value
  }
}
