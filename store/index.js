function convert2arr(value) {
  let values = []
  if (!Array.isArray(value)) {
    values = [value]
  } else {
    values = value
  }
  return values
}

export const state = () => ({
  sort: '_score:desc',
  size: 24,

  from: 0,

  after: '',
  before: '',
  id: [],
  image: [],
  keyword: [],
  advanced: {
    q: {},
    fc: {},
  },

  currentPage: 1,
  layout: 'list',
  col: 4,
  facetFlag: true,
  // facetsFlag: {},

  facetFlags: {},

  facetLabels: {},

  fullPath: '',
  result: {},

  mode: '',

  index: null, // 転置インデックス
  data: null, // 全データ
  query: {}, // クエリ

  result4print: null,

  // piranesi

  collection: null,

  index4Photo: null, // 転置インデックス
  data4Photo: null, // 全データ
})

export const mutations = {
  init(state) {
    state.sort = '_score:desc'
    state.size = 24
    state.from = 0
    state.currentPage = 1
    state.keyword = []
    state.advanced = {
      q: {},
      fc: {},
    }
    state.id = []
    state.image = []
    state.after = ''
    state.before = ''
  },
  setLayout(state, layout) {
    state.layout = layout
  },
  setCol(state, value) {
    state.col = value
  },
  setResult(state, value) {
    state.result = value
  },
  setFacetLabels(state, value) {
    state.facetLabels = value
  },
  setFacetFlags(state, flags) {
    for (let i = 0; i < flags.length; i++) {
      const field = flags[i]
      state.facetFlags[field] = true
    }
  },

  setSize(state, value) {
    state.size = value
  },
  setSort(state, value) {
    state.sort = value
  },
  setCurrentPage(state, value) {
    state.currentPage = value
  },
  setFrom(state, value) {
    state.from = value
  },
  setFacetFlag(state, value) {
    state.facetFlag = value
  },
  setId(state, value) {
    state.id = convert2arr(value)
  },
  setImage(state, value) {
    state.image = convert2arr(value)
  },

  setAfter(state, value) {
    state.after = convert2arr(value)
  },

  setBefore(state, value) {
    state.before = convert2arr(value)
  },

  setKeyword(state, value) {
    state.keyword = convert2arr(value)
  },
  setAdvanced2(state, value) {
    state.advanced = value
  },
  setAdvanced(state, value) {
    const label = value.label
    let values = value.values
    values = convert2arr(values)

    const type = value.type

    const advanced = state.advanced[type]
    if (!advanced[label]) {
      advanced[label] = {
        '+': [],
        '-': [],
      }
    }
    const obj = advanced[label]

    for (let i = 0; i < values.length; i++) {
      const value = values[i]
      if (value.startsWith('-')) {
        obj['-'].push(value.slice(1))
      } else {
        obj['+'].push(value)
      }
    }
  },
  setFullPath(state, value) {
    state.fullPath = value
  },
  setMode(state, value) {
    state.mode = value
  },
  setFc(state, data) {
    // console.log('setFc', data.label, data.values)
    const label = data.label
    let values = data.values
    values = convert2arr(values)

    const advanced = state.advanced
    if (!advanced[label]) {
      advanced[label] = {
        '+': [],
        '-': [],
      }
    }
    const obj = advanced[label]

    for (let i = 0; i < values.length; i++) {
      let value = values[i]
      let arr
      if (value.startsWith('-')) {
        arr = obj['-']
        value = value.slice(1)
        // obj['-'].push()
      } else {
        // obj['+'].push(value)
        arr = obj['+']
      }
      if (!arr.includes(value)) {
        arr.push(value)
      }
    }

    state.advanced[label] = obj
  },
  removeFc(state, data) {
    const label = data.label
    const values = data.values
    const advanced = state.advanced
    for (let i = 0; i < values.length; i++) {
      let value = values[i]
      let type = '+'
      if (value.startsWith('-')) {
        value = value.slice(1)
        type = '-'
      }
      const arr = advanced[label][type]
      advanced[label][type] = arr.filter((item) => item !== value)
    }
  },
  removeAdvanced(state, data) {
    const label = data.label
    const values = data.values
    const type = data.type
    const advanced = state.advanced[type]
    for (let i = 0; i < values.length; i++) {
      let value = values[i]
      let method = '+'
      if (value.startsWith('-')) {
        value = value.slice(1)
        method = '-'
      }
      const arr = advanced[label][method]
      advanced[label][method] = arr.filter((item) => item !== value)
    }
  },
  // changeかセットか
  changeFacetFlags(state, data) {
    state.facetFlags[data.label] = data.value
  },
  removeKeyword(state, value) {
    const array = state.keyword
    const newArray = array.filter((n) => !value.includes(n))
    state.keyword = newArray
  },

  // ゆくゆくは統合予定
  removeKey(state, data) {
    const array = state[data.label]
    const newArray = array.filter((n) => !data.value.includes(n))
    state[data.label] = newArray
  },
  removeId(state, value) {
    const array = state.id
    const newArray = array.filter((n) => !value.includes(n))
    state.id = newArray
  },
  removeImage(state, value) {
    const array = state.image
    const newArray = array.filter((n) => !value.includes(n))
    state.image = newArray
  },

  // -------------

  setResult4Print(state, value) {
    state.result4print = value
  },

  setData(state, value) {
    state.data = value
  },

  setIndex(state, value) {
    state.index = value
  },

  setQuery(state, value) {
    state.query = value
  },

  // piranesi

  setCollection(state, value) {
    state.collection = value
  },

  setIndex4Photo(state, value) {
    state.index4Photo = value
  },

  setData4Photo(state, value) {
    state.data4Photo = value
  },
}
