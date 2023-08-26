/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Chart, registerables } from 'chart.js'
import { useQuery } from 'react-query'
import { Bar } from 'react-chartjs-2'
import Container from '@/ui/Container'
import { getChart } from '@/services/extrajudicial/comment.service'
import { useLoloContext } from '@/contexts/LoloProvider'
import Text from '@/ui/Text'

Chart.register(...registerables)

const CommentChart = () => {
  const [data, setData] = useState<number[]>([])
  const {
    customerUser: { user },
  } = useLoloContext()

  const { refetch } = useQuery(
    'query-get-chart',
    async () => {
      return await getChart(user.id)
    },
    {
      onSuccess: ({ data }) => {
        setData(data)
      },
    }
  )

  useEffect(() => {
    refetch()
  }, [])

  const datos = {
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    datasets: [
      {
        label: 'Comentarios realizados',
        data: data,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  }
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <Container display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      <Text.Title color="Primary5" size="s" weight="bold">
        Comentarios realizados esta semana
      </Text.Title>
      <Bar data={datos} options={options} />
    </Container>
  )
}

export default CommentChart
