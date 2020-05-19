// /plugins/logger.ts
export class Utils {
  getPrintData(response: any): any {
    const result = response.data

    const data: any = {}
    const index: any = {}

    const manifests = result.manifests
    for (let i = 0; i < manifests.length; i++) {
      const obj = manifests[i]
      const metadata = obj.metadata

      const map: any = {}
      for (let j = 0; j < metadata.length; j++) {
        const m = metadata[j]
        const label = m.label
        const value = m.value
        if (!index[label]) {
          index[label] = {}
        }
        if (!index[label][value]) {
          index[label][value] = []
        }
        index[label][value].push(obj['@id'])

        map[label] = value
      }

      data[obj['@id']] = map

      map.thumbnail = obj.thumbnail
      map.manifest = obj['@id']
    }

    return {
      data,
      index,
    }
  }

  getPhotoData(response: any): any {
    const result = response.data

    const data: any = {}
    const index: any = {}

    const manifests = result.manifests
    for (let i = 0; i < manifests.length; i++) {
      const obj = manifests[i]
      const metadata = obj.metadata

      const map: any = {}
      for (let j = 0; j < metadata.length; j++) {
        const m = metadata[j]
        const label = m.label
        const value = m.value
        if (!index[label]) {
          index[label] = {}
        }
        if (!index[label][value]) {
          index[label][value] = []
        }
        index[label][value].push(obj['@id'])

        map[label] = value
      }

      data[obj['@id']] = map

      map.manifest = obj['@id']
    }

    return {
      data,
      index,
    }
  }

  getTitle(metadata: any, lang: string): any {
    if (metadata.title_mt && metadata.title_mt.length > 0 && lang === 'ja') {
      return (
        this.formatArrayValue(metadata.title_mt) +
        " <i class='mdi mdi-google-translate' data-toggle='tooltip' title='Google翻訳を使用したタイトルです。'></i>"
      )
    } else {
      return this.formatArrayValue(metadata._title)
    }
  }

  getOriginalTitle(metadata: any, lang: string): any {
    if (metadata.title_mt.length > 0 && lang === 'ja') {
      return '翻訳前タイトル: ' + this.formatArrayValue(metadata._title)
    } else {
      return null
    }
  }

  formatArrayValue(arr: string[], delimiter: string = ', '): any {
    if (arr == null) {
      return ''
    }
    if (arr.length === 1) {
      return arr[0]
    } else {
      const value: string = arr.join(delimiter)
      return value
    }
  }

  indexedQuery(query: any, index: number): any {
    const obj: any = {}
    for (const key in query) {
      obj[key] = query[key]
    }
    const from = query.from ? query.from : 0
    obj.index = index + Number(from)
    return obj
  }

  item2CardItem(
    item: any,
    // query: any = null,
    // index: number = -1,
    type: string = ''
    // lang: string = 'ja'
  ) {
    if (!item) {
      return item
    }
    const _source = item._source

    const id = _source.file_no[0]

    const path: any = {
      name: 'item-id',
      params: {
        id,
      },
    }

    /*
    if (query !== null) {
      path.query = this.indexedQuery(query, index)
    }
    */
    // console.log(query, index, lang)

    // {{ obj2.volume }}巻

    const cardItem: any = {
      path,
      label:
        '第' +
        this.formatArrayValue(item._source.volume) +
        '巻 第' +
        this.formatArrayValue(item._source.plate) +
        '葉',
      id,
      url:
        process.env.BASE_URL +
        '/item/' +
        this.formatArrayValue(item._source.file_no), // this.formatArrayValue(_source._url),
      _source,
    }

    if (_source._image) {
      cardItem.image = this.formatArrayValue(_source._image)
    }

    cardItem.manifest = item._id // 要注意

    if (_source.access) {
      cardItem.access = this.formatArrayValue(_source.access)
    }

    if (_source.source) {
      cardItem.source = this.formatArrayValue(_source.source)
    }

    if (type) {
      cardItem.type = type
    }

    ///

    if (_source.agential) {
      cardItem.agential = this.formatArrayValue(_source.agential)
    }

    if (_source.temporal) {
      cardItem.temporal = this.formatArrayValue(_source.temporal)
    }

    if (_source.description) {
      cardItem.description = this.formatArrayValue(_source.description)
    }

    ///

    if (_source._url) {
      cardItem._url = this.formatArrayValue(_source._url)
    }

    return cardItem
  }

  getProjectFooter(lang: string) {
    const value =
      lang === 'ja' ? process.env.projectFooterJa : process.env.projectFooterEn
    return value
  }

  getProjectName(lang: string) {
    const value =
      lang === 'ja' ? process.env.projectNameJa : process.env.projectNameEn
    return value
  }

  getProjectDescription(lang: string) {
    const value =
      lang === 'ja'
        ? process.env.projectDescriptionJa
        : process.env.projectDescriptionEn
    return value
  }

  splitKeyword(keyword: string): string[] {
    // 全角を半角に変換
    // 空の配列を削除
    // eslint-disable-next-line
    return keyword.replace(/　/g, ' ').split(' ').filter(item => item !== "")
  }

  createFacetQuery(arr: any[]): { [key: string]: string } {
    const result: { [key: string]: string } = {}
    for (let i = 0; i < arr.length; i++) {
      const obj = arr[i]
      result[obj.field] = obj.value
    }
    return result
  }

  truncate(str: string, length: number): string {
    return str.length <= length ? str : str.substr(0, length) + '...'
  }

  convert2arr(value: any) {
    let values: string[] = []
    if (!Array.isArray(value)) {
      value = value.trim()
      if (value !== '') {
        values = [value]
      }
    } else {
      values = value
    }
    return values
  }

  getSearchQueryFromQueryStore(query: any): any {
    const params: any = {
      sort: query.sort,
      size: query.size,
      from: (query.currentPage - 1) * query.size,
    }

    if (query.before !== '') {
      params.before = query.before
    }

    if (query.after !== '') {
      params.after = query.after
    }

    if (query.keyword.length > 0) {
      params.keyword = query.keyword
    }

    if (query.id.length > 0) {
      params.id = query.id
    }

    if (query.image.length > 0) {
      params.image = query.image
    }

    const advanced = query.advanced
    const types = ['fc', 'q']
    for (let t = 0; t < types.length; t++) {
      const type = types[t]
      for (const label in advanced[type]) {
        const values = []
        const obj = advanced[type][label]
        for (const method in obj) {
          const arr = obj[method]
          for (let i = 0; i < arr.length; i++) {
            const value = arr[i]
            values.push(method === '+' ? value : '-' + value)
          }
        }
        params[label] = values
      }
    }

    // params.after = query.after ? query.after : null
    // params.before = query.before ? query.before : null
    // params.id = query.id ? query.id : null

    return params
  }

  getHibunUrl(id: string) {
    return process.env.BASE_URL + '/img/CIL_list/img/' + id + '.jpg'
  }

  getHibunImageUrl(id: string) {
    return process.env.BASE_URL + '/img/CIL_list/hibun/' + id + '.jpg'
  }
}

export default (_: any, inject: any) => {
  inject('utils', new Utils())
}
