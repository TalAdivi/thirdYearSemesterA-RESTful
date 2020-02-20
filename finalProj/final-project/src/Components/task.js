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
    paper: {
        minHeight: '800px'
    },
    header : {
        margin: '15px'
    }
}));




export default function OutlinedCard(props) {

    const {
        allTasks,
        activeOnly
    } = props;

    const classes = useStyles();


    const renderTasks = () => {

        console.log('inRender\n');
        allTasks.map((task, i) => {
            console.log('inMap\n');


            if (activeOnly && task.status == 'Active') {
                console.log('inActive\n');
                return (<Grow in={true}>
                    <Box mx="auto" className={classes.box}>

                        <NavLink to={"/home/chat/" + task.taskID} className={classes.navLinks}>

                            <Card className={classes.card} key={i}>

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

                    </Box>
                </Grow>)

            } else {
                console.log('inElse\n');
                return (<Grow in={true}>
                    <Box mx="auto" className={classes.box}>

                        <NavLink exact to={"/home/chat/" + task.taskID} className={classes.navLinks}>

                            <Card className={classes.card} key={i}>

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

                    </Box>
                </Grow>)
            }

        }
        )


    }

    const createTask = (task, i) => {
       return  (
            <Grow in={true}>
                <Box mx="auto" className={classes.box}>
                    <NavLink exact to={"/home/chat/" + task.taskID} className={classes.navLinks}>
                        <Card className={classes.card} key={i}>
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
                </Box>
            </Grow>
        )
    }





    // here we have to send the userID and create cards for each one

    return (
        <queryRes.Provider >
            {/* {console.log('res inside TASK\n',res) */}

            <Paper variant="outlined" className={classes.paper} >

              
                <Typography align='center' variant="h4" className={classes.header}> {activeOnly ? "Active Tasks" : "All Tasks"} </Typography>

                {

                    allTasks.map((task, i) => {
                        if (activeOnly && task.status === 'Active') {
                            return createTask(task, i)
                        } 
                        if(!activeOnly) {
                            return createTask(task,i)
                        }
                    })
                }
               
            </Paper>

        </queryRes.Provider>

    );
}
