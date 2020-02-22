import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { Route } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import ResponsoveDrawer from './responsiveDrawer'
import ChartBar from '../Components/chartBar'
import Chat from '../Components/chat'
import Task from '../Components/task'
import Form from '../Components/form'
import ComposeChart from '../Components/composed-chart'
const MainWindow = props => {
  // const [allTasks, setAllTasks] = React.useState([])

  return (
    <div >
      <ResponsoveDrawer>

      </ResponsoveDrawer>
    </div>
  )
}

//  <Grid container spacing={2}>
// <Grid item xs={8}   >
// <Chat allTasks={allUsersTasks} />
// <Task allTasks = {allUsersTasks} />

//     <Route exact path="/home"  > <Task allTasks = {allUsersTasks} /> </Route>
//     <Route path="/home/chat"  > <Chat allTasks={allUsersTasks} /> </Route>
//     another option to show chart from Bit
//     <Route exact path="/" component={ComposeChart}  />

// </Grid>
// <Grid item xs={4}>
//     another option to show chart from Bit
//     <ComposeChart />
// </Grid>
//  </Grid>

export default MainWindow
