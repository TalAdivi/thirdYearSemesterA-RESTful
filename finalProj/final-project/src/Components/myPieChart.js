import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import PieChart from 'react-minimal-pie-chart'

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
})
const dataMock = [
  { title: 'Completed', value: 15, color: '#2ED47A' },
  { title: 'Active', value: 3, color: '#FFB946' }, ,
]

const defaultLabelStyle = {
  fontSize: '10px',
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fill: '#121212'
}

export default function MyPieChart (props) {
  const { allTasks } = props

  const [data, setData] = useState([])

  useEffect(() => {
    // setData()
    console.log('allTasks\n', props)
  })

  return (

    <PieChart
      data={dataMock}
      label={({ data, dataIndex }) =>
      // console.log('data\n',data)
      // data[dataIndex].title === "Completed" ? Math.round(data[dataIndex].percentage) + '%' : ''
        Math.round(data[dataIndex].percentage) + '%'
      }
      labelStyle={defaultLabelStyle}
      lengthAngle={-360}
      animate
      lineWidth={10}
    />

  )
}
