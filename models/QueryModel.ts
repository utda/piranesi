export interface QueryModel {
  sort: string
  size: number
  layout: string
  col: number
  currentPage: number
  after: string
  before: string
  keyword: string[]
  id: string[]
  image: string[]
  // これら以外はkey=valueの形でかける
  advanced: { [key: string]: any }

  // qs: { [key: string]: any }

  facetFlag: boolean
  // facetsFlag: { [key: string]: boolean }
  facetLabels: any
  termLabels: any
}
