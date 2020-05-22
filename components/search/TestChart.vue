<!-- Template Tag can not be merged... -->

<script lang="ts">
import { Component, Prop, Watch, mixins } from 'nuxt-property-decorator'
// import Chart from 'chart.js'
import VueChart from 'vue-chartjs'
// 棒グラフの場合は、Barを使う
// eslint-disable-next-line
const Bar = VueChart.Bar

@Component
// mixinsもBarに変更
export default class ChartLine extends mixins(Bar) {
  @Prop({ default: [] }) buckets!: any[]

  @Watch('buckets', { deep: true })
  watchTmp() {
    this.main()
  }

  mounted() {
    this.main()
  }

  main() {
    const buckets: any[] = this.buckets

    const labels: string[] = []
    const dataset: number[] = []

    for (let i = 0; i < buckets.length; i++) {
      const obj: any = buckets[i]
      labels.push(obj.key)
      dataset.push(obj.doc_count)
    }

    const chartData: any = {
      labels,
      datasets: [{ data: dataset, label: '' }],
    }

    const chartOption: any = {
      // アスペクト比を固定しないように変更
      maintainAspectRatio: false,
    }

    this.renderChart(chartData, chartOption)
  }
}
</script>
