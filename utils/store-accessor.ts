import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Query from '~/store/query'
import Data from '~/store/data'

// eslint-disable-next-line import/no-mutable-exports
let queryStore: Query

// eslint-disable-next-line import/no-mutable-exports
let dataStore: Data

function initializeStores(store: Store<any>): void {
  queryStore = getModule(Query, store)
  dataStore = getModule(Data, store)
}

export { initializeStores, queryStore, dataStore }
