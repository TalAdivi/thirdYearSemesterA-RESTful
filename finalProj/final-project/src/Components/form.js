import React from 'react';
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
import { blue } from '@material-ui/core/colors';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import Subln from './__showSubInFormJustToRemmber'
import Alert from '@material-ui/lab/Alert';




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
        width: '20%',
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
export default function Form() {

    async function addTask(title, company, description) {
        try {

            const response = await fetch(`http://localhost:3000/Help4U/task/add`, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
                mode: 'cors',
                body: JSON.stringify({
                    "userID": 305171159,
                    "userName": "tomertest",
                    "companyID": company,
                    "title": title,
                    "selectedSubject": "response.googleId",
                    "chat": [{ "from": "tomertest", "message": description }],
                })
            }).then(response => response.json());
            if (response.status == 200 && response.data != null) {
                console.log("response\n", response);
                // setalrt
                // return(<Alert severity="success">This is a success alert — check it out!</Alert>)
              }
// localStorage.getItem
//user
          
        }
        catch (e) {
            console.log('inside catch', e.message);
            return e.message;
        }
    }

    const [titleValue, changeTitleValue] = React.useState('');
    const [descValue, changeDescValue] = React.useState('');
    const [companyValue, changecCompanyValue] = React.useState('');
    const classes = useStyles();

    return (
        <div >
            <Paper variant="outlined" className={classes.root} >
                <Grid container spacing={0}>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid xs={12} >
                            <Grid container justify="space-between" spacing={0} >
                                <Grid item>
                                    <Typography style={{ margin: "15px" }}> <TextField
                                        required
                                        id="Title"
                                        name="Title"
                                        label="Title"
                                        fullWidth
                                        onChange={e => {
                                            changeTitleValue(e.target.value);
                                        }}
                                    /> </Typography>

                                </Grid>
                                <Grid item>
                                    <Typography style={{ margin: "15px", fontSize: "20px" }}>Company</Typography>
                                    <Typography style={{ margin: "15px" }}><Subln parentCallback={changecCompanyValue} /></Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <div style={{ margin: "15px" }}>
                    {
                        <TextField
                            id="filled-multiline-static"
                            label="Description"
                            multiline
                            rows="10"
                            variant="filled"
                            fullWidth
                            onChange={e => {
                                changeDescValue(e.target.value);
                            }}
                        />
                    }
                </div>

                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Button variant="contained"
                        className={classes.button}
                        onClick={() => {
                            addTask(titleValue, companyValue, descValue);
                          
                        }}
                    >
                        SUBMIT
                    </Button>

                </Grid>
            </Paper>
        </div>
    )
}