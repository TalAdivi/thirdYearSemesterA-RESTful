import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import HomeIcon from '@material-ui/icons/Home'
import ViewListIcon from '@material-ui/icons/ViewList'
import ContactsIcon from '@material-ui/icons/Contacts'
import Avatar from '@material-ui/core/Avatar'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListAltIcon from '@material-ui/icons/ListAlt'
import Box from '@material-ui/core/box'
import MailIcon from '@material-ui/icons/Mail'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { NavLink, Route } from 'react-router-dom'
import Chat from '../Components/chat'
import Task from '../Components/task'
import ComposeChart from '../Components/composed-chart'
import Grid from '@material-ui/core/Grid'
// import MyPieChart from './myPieChart'

import Form from '../Components/form'
import Store from './store'
import Dashboard from './dashboard'
import Contacts from './contacts'
import MySideBar from './mySideBar'
import Profile from './profile'
import Logout from './logout'
import MyPieChart from './myPieChart'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },

  navLinks: {
    textDecorationLine: 'none',
    color: 'unset'
    // padding: 20
  },
  avatar: {
    margin: 'auto'
  }
}))


// send to db evrey  chat message 
function ResponsiveDrawer (props) {
  const { container } = props
  let res
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [allUsersTasks, setAllUsersTasks] = React.useState(null)
  // is state loaded...

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  // what to show to client if fail
  useEffect(() => {
    const errorHandling = (res) => {
      
      if (res.status == 200 && res.data !== null) {
        console.log('be4 setAllusersTasks')

        setAllUsersTasks(res.data)
      }

      if (res.status == 200 && res.data === null) {
        console.log('be4 setAllusersTasks')
        setAllUsersTasks([])
      }

      if (res.status == 500) {
        // maybe DB error, reload and try again
        alert('something went work, page refreshing...')
        setInterval(() => {
          window.location.reload()
        }, 4000)
      }

    }

    async function fetchUserTasks () {
      try {
        res = await fetch(`http://localhost:3000/Help4U/task/user/${sessionStorage.getItem('user_id')}`)
          .then(res => res.json())
        // queryRes = React.createContext(res);
        console.log('res MAIN WINDOW USER\n', res)
        errorHandling(res)
      } catch (e) {
        // if fetch fail, reload and try again
        alert('something went work, page refreshing...')
        // setInterval(() => {
        //   window.location.reload()
        // }, 4000)
      }
    }

    async function fetchCompanyTasks () {
      try {
        res = await fetch(`http://localhost:3000/Help4U/task/company/${sessionStorage.getItem('company_name')}`, {
          method: 'POST',
          mode: 'cors',
          headers: new Headers({
            'Content-Type': 'application/json; charset=utf-8'
          }),
          body: JSON.stringify({
            google_id: sessionStorage.getItem('user_id'),
            access_token: sessionStorage.getItem('access_token')
          })
        })
          .then(res => res.json())
        console.log('res MAIN WINDOW ADMIN\n', res)
        await errorHandling(res)
      } catch (e) {
        // if fetch fail, reload and try again
        alert('something went work, page refreshing...')
        // setInterval(() => {
        //   window.location.reload()
        // }, 4000)
      }
    }
    JSON.parse(sessionStorage.getItem('isAdmin')) ? fetchCompanyTasks() : fetchUserTasks()

    console.log("sessionStorage.getItem('isAdmin')\n", typeof sessionStorage.getItem('isAdmin'))
  }, [])

  if (allUsersTasks == null) {
    return <div> loading</div>
  } else {
    return (

      <div className={classes.root}>

        <CssBaseline />
        <Box width='15%'>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>

              <Grid container direction="row" justify="space-between" alignItems="center">
                <Grid>
                  <Typography variant="h6" noWrap> Here4U POC </Typography>
                </Grid>
                <Grid >
                  <Logout/>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <nav className={classes.drawer} aria-label="mailbox folders">

            <Hidden smUp implementation="css">

              <Drawer
                container={container}
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper
                }}
                ModalProps={{
                  keepMounted: true // Better open performance on mobile.
                }}
              >
                <Profile/>

                <MySideBar/>
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper
                }}
                variant="permanent"
                open
              >
                <Profile/>
                <MySideBar/>
              </Drawer>
            </Hidden>
          </nav>

        </Box>
        <main className={classes.content}>
          <Box width='85%'>

            <div className={classes.toolbar} />

            <Grid container spacing={2}>
              <Grid item md={8} >
                <Route exact path="/home" > <Task allTasks={allUsersTasks} activeOnly={true} /> </Route>
                <Route path="/home/chat" > <Chat allTasks={allUsersTasks} /> </Route>
                <Route path="/home/tasks" > <Task allTasks={allUsersTasks} activeOnly={false} /> </Route>
                <Route path="/home/contacts" > <Contacts allTasks={allUsersTasks} /> </Route>
                <Route path="/home/create" > <Form /> </Route>
              </Grid>
              <Grid item md={4}>

                <ComposeChart allTasks={allUsersTasks} />
                {/* <Route path="/home"> */}

                <MyPieChart allTasks={allUsersTasks} ></MyPieChart>

                {/* </Route> */}
                {/* <ComposeChart allTasks={allUsersTasks} /> */}
                {/* <PieSeries/> */}
                {/* <PieChart></PieChart> */}

              </Grid>
            </Grid>

            {/* {props.children} */}

          </Box>
        </main>
      </div>

    )
  }
}

ResponsiveDrawer.propTypes = {
  container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element)
}

export default ResponsiveDrawer
