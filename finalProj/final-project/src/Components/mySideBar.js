import React, { useEffect, useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import { NavLink } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'
import ViewListIcon from '@material-ui/icons/ViewList'
import ContactsIcon from '@material-ui/icons/Contacts'
import ListAltIcon from '@material-ui/icons/ListAlt'

const userLinksArr = [
  { name: 'Home', icon: <HomeIcon /> },
  { name: 'Tasks', icon: <ViewListIcon /> },
  { name: 'Create', icon: <ListAltIcon /> }
  // { 'name': 'Task Chat', 'icon': <MailIcon /> },
]

const adminLinksArr = [
  { name: 'Home', icon: <HomeIcon /> },
  { name: 'Tasks', icon: <ViewListIcon /> },
  { name: 'Contacts', icon: <ContactsIcon /> }
  // { 'name': 'Chat', 'icon': <InboxIcon /> },
]

const useStyles = makeStyles(theme => ({

  navLinks: {
    textDecorationLine: 'none',
    color: 'unset'
  }

}))

export default function MySideBar () {
  const classes = useStyles()
  const [navLink, setNavLink] = useState([])

  useEffect(() => {
    JSON.parse(sessionStorage.getItem('isAdmin')) ? setNavLink(adminLinksArr) : setNavLink(userLinksArr)
  }, [])

  return (
    <div>
      <Divider />
      <List>
        {navLink.map((obj, index) => (
          <NavLink key={obj.name} exact to={obj.name.toLowerCase() === 'home' ? '/home' : `/home/${obj.name.toLowerCase()}`} className={classes.navLinks}>
            <ListItem button  >
              {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />} </ListItemIcon> */}
              <ListItemIcon> {obj.icon} </ListItemIcon>
              {/* <NavLink exact to={`/home/${obj.name.toLowerCase()}`} className={classes.navLinks}> */}

              <ListItemText primary={obj.name} />

            </ListItem>
          </NavLink>
        ))}
      </List>
    </div>
  )
}
