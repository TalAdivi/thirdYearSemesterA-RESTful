import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/paper';
import Box from '@material-ui/core/box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import amber from '@material-ui/core/colors/amber';
import { get } from 'mongoose';
import { Chip, List, ListItem } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import Grow from '@material-ui/core/Grow';
export let queryRes = React.createContext();
let res;



// the show the user only y/m/d
function formatDate(date) {
    date = date.slice(0, 10);
    return date;

}


const useStyles = makeStyles(theme => ({
    card: {
        minWidth: '100%',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    Active: {
        backgroundColor: '#ffca28',
        float: "right",
        marginBottom: "8px"
    },
    Complete: {
        backgroundColor: '#66bb6a',
        float: "right",
        marginBottom: "8px"

    },
    navLinks: {
        textDecorationLine: 'none',
        // padding: 20
    },
    list: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    box: {
        margin: theme.spacing(3)
    },
    paper : {
        minHeight: '626px' 
    }
}));

export default function OutlinedCard(props) {

    const {
        allTasks
    } = props;

    const classes = useStyles();
    // here we have to send the userID and create cards for each one

    return (
        <queryRes.Provider >
            {/* {console.log('res inside TASK\n',res) */}

            <Paper variant="outlined" className={classes.paper} >

                {/* <List className={classes.list}> */}
                <Typography>  </Typography>

                {
                    allTasks.map((task, i) => (
                        <Grow in={true}>

<<<<<<< HEAD
                        
                        <ListItem dense="true" key={i}>

                            <NavLink exact to={"/home/chat/" + task.taskID} className={classes.navLinks}>
=======


                            {/* <ListItem dense="true" key={i}> */}
                            <Box  mx="auto" className={classes.box}>

                                <NavLink exact to={"/home/chat/" + task.taskID} className={classes.navLinks}>

                                    <Card className={classes.card} key={i}>
>>>>>>> upstream/master

                                        <CardContent>

                                            <Typography variant="h5" component="h2">
                                                {task.title}

                                            </Typography>
                                            <Typography className={classes.pos} color="textSecondary">
                                                Due date: {formatDate(task.datesend)}
                                            </Typography>
                                            <Chip className={task.status === "Active" ? classes.Active : classes.Complete} label={task.status} />



                                        </CardContent>

                                    </Card>
                                </NavLink>

<<<<<<< HEAD
                        </ListItem>
=======
                            </Box>
                            {/* </ListItem> */}
>>>>>>> upstream/master
                        </Grow>
                    ))


                }
                {/* </List> */}
            </Paper>

        </queryRes.Provider>

    );
}