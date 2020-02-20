import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import HomeIcon from '@material-ui/icons/Home';
import ViewListIcon from '@material-ui/icons/ViewList';
import ContactsIcon from '@material-ui/icons/Contacts';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListAltIcon from '@material-ui/icons/ListAlt';
import Box from '@material-ui/core/box';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { NavLink, Route } from 'react-router-dom';
import Chat from "../Components/chat";
import Task from "../Components/task";
import ComposeChart from '../Components/composed-chart';
import Grid from '@material-ui/core/Grid';


import Form from "../Components/form"
import Store from "./store";
import Dashboard from "./dashboard";
<<<<<<< HEAD
// import Contacts from "./contacts";
// import MyPieChart from "./myPieChart" ;
=======
>>>>>>> parent of 72b819e... update merge

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },

    navLinks: {
        textDecorationLine: 'none',
        // padding: 20
    }
}));


function ResponsiveDrawer(props) {
    const { container } = props;
    let res;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [linksArr, setLinksArry] = React.useState([]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const [allUsersTasks, setAllUsersTasks] = React.useState([])

    // let linksArr = []
    const userLinksArr = [
        { 'name': 'Home', 'icon': <HomeIcon /> },
        { 'name': 'Create', 'icon': <ListAltIcon /> },
        // { 'name': 'Task Chat', 'icon': <MailIcon /> },
    ];

    const adminLinksArr = [
        { 'name': 'Home', 'icon': <HomeIcon /> },
        { 'name': 'Tasks', 'icon': <ViewListIcon /> },
        { 'name': 'Contacts', 'icon': <ContactsIcon /> },
        // { 'name': 'Chat', 'icon': <InboxIcon /> },
    ];

    const profile = (
        <Box mx="auto" mt='10px'>
            <Avatar alt="Adivi Sharp" src="../images/successfully-network-event-001.jpg" />
        <Typography style={{marginTop:"20px"} }>
            Tal Adivi
        </Typography>
        </Box>
    ) 
    


    useEffect(() => {

        async function fetchChatDetails() {


            try {
                res = await fetch(`http://localhost:3000/Help4U/task/user/${localStorage.getItem('user_id')}`).then(res => res.json())
                // queryRes = React.createContext(res);
                console.log('res MAIN WINDOW\n', res);
            }
            catch (e) {
                console.log(e);
            }

            if (res.status == 200 && res.data != null) {
<<<<<<< HEAD

                // let tasks = res.data;
                setAllUsersTasks(res.data)

=======

                // let tasks = res.data;
                setAllUsersTasks(res.data)

>>>>>>> parent of 72b819e... update merge
            }
        }

        fetchChatDetails();

        console.log("localStorage.getItem('isAdmin')\n", typeof localStorage.getItem('isAdmin'));

        JSON.parse(localStorage.getItem('isAdmin')) ? setLinksArry(adminLinksArr) : setLinksArry(userLinksArr);

    }, []);



    const sideBarCreator = (
        <div>
            {/* {console.log('propsChildren', props.children)} */}
            {/* <div className={classes.toolbar} /> */}
            <Divider />
            <List>
                {linksArr.map((obj, index) => (
                    <ListItem button key={obj.name} >
                        {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />} </ListItemIcon> */}
                        <ListItemIcon> {obj.icon} </ListItemIcon>
                        <NavLink exact to={`/${obj.name.toLowerCase()}`} className={classes.navLinks}>

                            <ListItemText primary={obj.name} />
                        </NavLink>

                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (

        <div className={classes.root}>

            <CssBaseline />

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
                    <Typography variant="h6" noWrap>
                        Here4U POC
          </Typography>
          
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                
                <Hidden smUp implementation="css">
                    
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        blablaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
<<<<<<< HEAD
                        {sideBarCreator}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        


                        {profile}


                        {sideBarCreator}
                    </Drawer>
                </Hidden>
=======
                        {sideBarCreator}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        


                        {profile}


                        {sideBarCreator}
                    </Drawer>
                </Hidden>
>>>>>>> parent of 72b819e... update merge
            </nav>
            <main className={classes.content}>

                <div className={classes.toolbar} />

<<<<<<< HEAD
                    <Grid container spacing={2}>
                        <Grid item xs={8}   >
                            <Route exact path="/home"  > <Task allTasks={allUsersTasks} activeOnly={true} /> </Route>
                            <Route path="/home/chat"  > <Chat allTasks={allUsersTasks} /> </Route>
                            <Route path="/home/tasks"  > <Task allTasks={allUsersTasks} activeOnly={false} /> </Route>
                            {/* <Route path="/home/contacts"  > <Contacts /> </Route> */}
                            <Route path="/home/create"  > <Form /> </Route>
                        </Grid>
                        <Grid item xs={4}>

                        <ComposeChart allTasks={allUsersTasks} />
                        {/* <ComposeChart allTasks={allUsersTasks} /> */}
                        {/* <PieSeries/> */}
                        {/* <PieChart></PieChart> */}
                            
                        </Grid>
                    </Grid>
                {/* </Grid> */}
=======

                <Grid container spacing={2}>
                    <Grid item xs={8}   >
                        <Route exact path="/home"  > <Task allTasks={allUsersTasks} activeOnly={false} /> </Route>
                        <Route path="/home/chat"  > <Chat allTasks={allUsersTasks} /> </Route>
                        <Route path="/home/create"  > <Form /> </Route>
                    </Grid>
                    <Grid item xs={4}>

                        <ComposeChart />
                    </Grid>
                </Grid>
>>>>>>> parent of 72b819e... update merge



                {/* {props.children} */}

            </main>
        </div>


    );


}

ResponsiveDrawer.propTypes = {
    container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
};

export default ResponsiveDrawer;