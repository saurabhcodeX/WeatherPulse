import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useWeather } from '../context/WeatherContext'
import { temperatureUnit } from '../utils/weatherUtils'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler)

const WeatherChart = () => {
  const { forecast, units } = useWeather()
  if (!forecast?.list?.length) return null
  const dataPoints = forecast.list.slice(0, 8)
  const data = {
    labels: dataPoints.map((item) => new Date(item.dt * 1000).toLocaleTimeString([], { hour: 'numeric' })),
    datasets: [{
      data: dataPoints.map((item) => item.main.temp),
      borderColor: '#67e8f9',
      backgroundColor: 'rgba(103, 232, 249, 0.12)',
      fill: true,
      tension: 0.4,
      pointRadius: 3,
      pointBackgroundColor: '#67e8f9',
    }],
  }
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx) => `${Math.round(ctx.raw)}${temperatureUnit(units)}` } } },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#7f8ca5' } },
      y: { grid: { color: 'rgba(148,163,184,.08)' }, ticks: { color: '#7f8ca5' } },
    },
  }
  return <section className="panel chart-panel"><div className="section-heading"><div><span className="eyebrow">TEMPERATURE</span><h2>Trend line</h2></div></div><div className="chart-area"><Line data={data} options={options} /></div></section>
}
export default WeatherChart
