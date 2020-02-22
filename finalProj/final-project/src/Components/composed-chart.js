// import * as React from 'react'
// import Paper from '@material-ui/core/Paper'
// import {
//   Chart,
//   BarSeries,
//   ArgumentAxis,
//   ValueAxis
// } from '@devexpress/dx-react-chart-material-ui'
// import { EventTracker, HoverState } from '@devexpress/dx-react-chart'

// const data = [
//   { year: '1950', population: 2.525 },
//   { year: '1960', population: 3.018 },
//   { year: '1970', population: 3.682 },
//   { year: '1980', population: 4.440 },
//   { year: '1990', population: 5.310 },
//   { year: '2000', population: 6.127 },
//   { year: '2010', population: 6.930 }
// ]

// export default class Demo extends React.PureComponent {
//   constructor (props) {
//     super(props)

//     this.state = {
//       data
//     }
//   }

//   render () {
//     const { data: chartData } = this.state

//     return (
//       <Paper>
//         <Chart
//           data={chartData}
//         >
//           <ArgumentAxis />
//           <ValueAxis />

//           <BarSeries
//             valueField="population"
//             argumentField="year"
//           />
//           <EventTracker />
//           <HoverState />
//         </Chart>
//       </Paper>
//     )
//   }
// }

import React, { useEffect, useState } from 'react'
// import Paper from '@material-ui/core/Paper'
// import {
//   Chart,
//   BarSeries,
//   Title,
//   ArgumentAxis,
//   ValueAxis,
//   Tooltip
// } from '@devexpress/dx-react-chart-material-ui'
// import { EventTracker } from '@devexpress/dx-react-chart'

// const data = [
//   { year: '1950', population: 2.525 },
//   { year: '1960', population: 3.018 },
//   { year: '1970', population: 3.682 },
//   { year: '1980', population: 4.440 },
//   { year: '1990', population: 5.310 },
//   { year: '2000', population: 6.127 },
//   { year: '2010', population: 6.930 }
// ]

// const d = [
//   { sub: '', amount: 0 }
// ]

// export default function ComposedChart (props) {
//   const [chartData, setChartData] = useState(data)
//   //   constructor (props) {
//   // super(props)

//   // this.state = {
//   //   data
//   //   targetItem: undefined
//   // }

//   // this.changeTargetItem = targetItem => this.setState({ targetItem })
//   //   }

//   //   render () {
//   //     const { data: chartData, targetItem } = this.state

//   return (
//     <Paper>
//       <Chart
//         data={chartData}
//       >
//         <ArgumentAxis />
//         <ValueAxis />

//         <BarSeries
//           valueField="population"
//           argumentField="year"
//         />
// 		        <BarSeries
//           valueField="population"
//           argumentField="year"
//         />
//         <Title
//           text="World population (billion)"
//         />
//         <EventTracker />
//         <Tooltip />
//       </Chart>
//     </Paper>
//   )
// //   }
// }

import Paper from '@material-ui/core/Paper'
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Legend,
  Title
} from '@devexpress/dx-react-chart-material-ui'
import { withStyles } from '@material-ui/core/styles'

import { Stack } from '@devexpress/dx-react-chart'

// import { ageStructure } from '../../../demo-data/data-vizualization';

const ageStructure = [
  { a: '1950', state: 2.525 },
  { a: '1960', state: 3.018 },
  { a: '1970', state: 3.682 },
  { a: '1980', state: 4.440 },
  { a: '1990', state: 5.310 },
  { a: '2000', state: 6.127 },
  { a: '2010', state: 6.930 }
]

const styles = {
  titleText: {
    textAlign: 'left'
  }
}

const TextComponent = withStyles(styles)(({ classes, ...restProps }) => (
  <Title.Text {...restProps} className={classes.titleText} />
))

const stacks = [
  { series: ['📒 Active', '✅ Completed'] }
]

export default class Demo extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      data: ageStructure
    }
  }

  render () {
    const { data: chartData } = this.state

    return (
      <Paper>
        <Chart
		  data={chartData}
		  //   width={460}

        >
          <ArgumentAxis />
          <ValueAxis />
          <BarSeries
            name="✅ Completed"
            valueField="a"
            argumentField="state"
            color='#2ed47a'
          />
          <BarSeries
            name="📒 Active"
            valueField="a"
            argumentField="state"
            color='#ffb946'

          />
          <Stack
            stacks={stacks}
          />
          <Title text="📋 All Tasks" textComponent={TextComponent}/>
          <Legend position='bottom' />
        </Chart>
      </Paper>
    )
  }
}
