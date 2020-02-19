import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { CTX } from "./store"
import { blue } from '@material-ui/core/colors';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import StatusSelect from './select';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            padding: theme.spacing(3, 2)
        },
    },

    flex: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px'
    },
    topicWindow: {
        width: '30%',
        height: '300px',
        borderRight: '1px solid grey'
    },
    chatWindow: {
        width: '70%',
        height: '300px',
        padding: "20px"
    },
    chatBox: {
        width: '100%'
    },
    button: {
        width: '110%',
        marginTop: "14px",
        backgroundColor: "#4caf50"
    },
    padding: {
        paddingLeft: "8px"
    },
    textBubble: {
        minWidth: "100%",
        minHeight: "7ex",
        borderRadius: "15px"
    },
    divider: {
        padding: "1px 16px"
    },
}));




// every time we type, we change the state via ChangeTextValue, and because of that we reRender the component and will see all things be4 the return ? ? 
export default function Dashboard() {


    const classes = useStyles();
    // CTX store
    const { user, chats, sendChatAction, task } = React.useContext(CTX);
    const [textValue, changeTextValue] = React.useState('');
    const [taskStatus, setTaskStatus] = React.useState('Active')
    let taskDate = "" + task.datesend
    taskDate = taskDate.substring(0, 10)
    // const [activeTopic, chageActiveTopic] = React.useState(topics[0]);

    useEffect(() => {
        console.log('blalba');

    }, [taskStatus])


    return (
        <div >
            {/* {task.status === 'Completed' ? setTaskStatus('Completed') : setTaskStatus('Active') } */}
            {console.log('task.status\n', task.status)
            }
            <Paper variant="outlined" className={classes.root} >
                <Grid container spacing={0} style={{ backgroundColor: "#F5F8FA" }}>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        {/* <Typography variant="h4" component="h4">Chat app </Typography> */}
                        {/* <Grid xs={12} > */}

                        <Grid container spacing={2} >
                            <Grid item lg={4}>
                                <Typography variant="h5" component="h6" gutterBottom style={{ margin: "15px" }}> {task.title} </Typography>
                                <Typography variant="body2" gutterBottom style={{ margin: "15px" }}> {`${task.selectedSubject}`} </Typography>
                            </Grid>
                            <Grid item lg={4}>

                                <Typography variant='h6' align='center' gutterBottom style={{ margin: "15px", paddingTop: "15px" }}> {`Talking with:${sessionStorage.getItem("isAdmin") ? task.userName : task.companyID}`} </Typography>
                            </Grid>
                            <Grid item lg={4}>
                            </Grid>
                        </Grid>

                        <Grid container justify="space-between" spacing={2} >
                            <Grid item lg={4}>

                                <Typography variant='body1' gutterBottom style={{ margin: "15px" }}> Open at: {taskDate} </Typography>
                            </Grid>
                            <Grid item lg={4}>
                            </Grid>
                            <Grid item lg={4} >
                                <Typography align='center'>
                                    { task.status == 'Active' && <StatusSelect taskID={task.taskID} />}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Divider className={classes.divider} />

                <div className={classes.flex}>
                    <div className={classes.chatWindow}>
                        {
                            chats.map((chat, i) => (
                                <div className={classes.flex} key={i}>
                                    <Chip label={chat.from} style={{ marginRight: "10px" }} />
                                    <Paper className={classes.textBubble} variant="elevation" style={chat.from === user ? { backgroundColor: '#5c6bc0' } : { backgroundColor: '#7e57c2' }}>
                                        <Typography variant='body1' gutterBottom style={{ margin: "15px", maxWidth: "100%" }}> {chat.message} </Typography>
                                    </Paper>
                                </div>
                            ))
                        }
                    </div>
                </div>

                    {/* show text input and send button only for Active status, Completed doesn't need. */}
                {
                task.status == 'Active' && <Grid container justify="space-between" spacing={0} >
                    <Grid item xs={9}>

                        <TextField
                            label="replay.."
                            className={classes.chatBox}
                            // helperText="👨‍💻"
                            value={textValue}
                            onChange={e => {
                                changeTextValue(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item >

                        <Button variant="contained"
                            className={classes.button}
                            onClick={() => {
                                sendChatAction({ from: user, message: textValue }, chats)
                                changeTextValue('');
                            }}
                        >
                            SEND
                    </Button>
                    </Grid>

                </Grid>
                }




                {/* </div> */}
            </Paper>

        </div>

    )
}