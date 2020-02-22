import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import CompanyTab from './companyList'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import Box from '@material-ui/core/box'
import { Redirect } from 'react-router-dom'

function Alert (props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      padding: theme.spacing(3, 2)
    }
<<<<<<< HEAD

}));


export default function Form() {
    const [titleValue, changeTitleValue] = React.useState('');
    const [descValue, changeDescValue] = React.useState('');
    const [companyValue, changecCompanyValue] = React.useState('');
    const [taskIdValue, changecTaskIdValue] = React.useState('');
    const [openSucsses, setOpenSucsses] = React.useState(false);
    const [openNotSucsses, setOpenNotSucsses] = React.useState(false);
    const [eventButton, setEvent] = React.useState(false);
    const classes = useStyles();

    async function addTask(title, company, description) {
        try {

            const response = await fetch(`http://localhost:3000/Help4U/task/add`, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
                mode: 'cors',
                body: JSON.stringify({
                    "userID": sessionStorage.getItem('user_id'),
                    "userName": sessionStorage.getItem('user_name'),
                    "companyID": company,
                    "title": title,
                    "chat": [{ "from": sessionStorage.getItem('user_name'), "message": description }],
                })
            }).then(response => response.json());
            if (response.status == 200 && response.data != null) {
                console.log("data", response.data.taskID);
                changecTaskIdValue(response.data.taskID);
                handleClickSucsses();

            }
            else {
                handleClickNotSucsses();
            }
        }
        catch (e) {
            console.log('inside catch', e.message);
            return e.message;
        }
=======
  },
  button: {
    width: '20%',
    marginTop: '14px',
    backgroundColor: '#4caf50'
  },
  padding: {
    paddingLeft: '8px'
  },
  title: {
    margin: '10px',
    width: '200px'
  },
  company: {
    marginBottom: '10px'
  }

}))

export default function Form () {
  const [titleValue, changeTitleValue] = React.useState('')
  const [descValue, changeDescValue] = React.useState('')
  const [companyValue, changecCompanyValue] = React.useState('')
  const [taskIdValue, changecTaskIdValue] = React.useState('')
  const [openSucsses, setOpenSucsses] = React.useState(false)
  const [openNotSucsses, setOpenNotSucsses] = React.useState(false)
  const [eventButton, setEvent] = React.useState(false)
  const classes = useStyles()

  async function addTask (title, company, description) {
    try {
      const response = await fetch('https://mern-finalproj-api.herokuapp.com/Help4U/task/add', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        mode: 'cors',
        body: JSON.stringify({
          userID: localStorage.getItem('user_id'),
          userName: localStorage.getItem('user_name'),
          companyID: company,
          title: title,
          selectedSubject: 'response.googleId',
          chat: [{ from: localStorage.getItem('user_name'), message: description }]
        })
      }).then(response => response.json())
      if (response.status == 200 && response.data != null) {
        console.log('data', response.data.taskID)
        changecTaskIdValue(response.data.taskID)
        handleClickSucsses()
      } else {
        handleClickNotSucsses()
      }
    } catch (e) {
      console.log('inside catch', e.message)
      return e.message
>>>>>>> upstream/master
    }
  }

  const handleClickSucsses = () => {
    setOpenSucsses(true)
  }

  const handleClickNotSucsses = () => {
    setOpenNotSucsses(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSucsses(false)
    setEvent(true)
  }
  const handleNotSucssesClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenNotSucsses(false)
  }

  return (
    <div >

      <Paper variant="outlined" className={classes.root} >
        {/* <Grid container spacing={0}> */}
        {/* <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    > */}
        {/* <Grid xs={12} > */}
        {/* <Grid container justify="space-between" spacing={0} > */}
        {/* <Grid item> */}
        <Typography className={classes.title}>
          <TextField
            required
            id="Title"
            name="Title"
            label="Title"
            fullWidth
            onChange={e => {
              changeTitleValue(e.target.value)
            }}
          />
        </Typography>

        {/* </Grid> */}

        <Box mx="auto" >
          <Typography align='center' className={classes.company} >Company</Typography>
          <CompanyTab parentCallback={changecCompanyValue} />
        </Box>

        {/* </Grid> */}
        {/* </Grid> */}
        {/* </Grid> */}
        {/* </Grid> */}
        <div style={{ margin: '15px' }}>
          {
            <TextField
              id="filled-multiline-static"
              label="Description"
              multiline
              rows="10"
              variant="outlined"
              fullWidth
              onChange={e => {
                changeDescValue(e.target.value)
              }}
              // color='primary'
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
              addTask(titleValue, companyValue, descValue)
            }
            }
          >
                        SUBMIT
          </Button>
          <div className={classes.root}>
            <Snackbar open={openSucsses} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                                Your task has been successfully added !</Alert>
<<<<<<< HEAD
                        </Snackbar>
                        <Snackbar open={openNotSucsses} onClose={handleNotSucssesClose}>
                            <Alert onClose={handleNotSucssesClose} severity="error">There is a problem , Try again and fill all the fields !</Alert>
                        </Snackbar>
                    </div>
                </Grid>
            </Paper>

            {   //+taskIdValue
                eventButton ? <Redirect to={"/home"} /> : ""
            }
        </div>
    )
}
=======
            </Snackbar>
            <Snackbar open={openNotSucsses} onClose={handleNotSucssesClose}>
              <Alert onClose={handleNotSucssesClose} severity="error">There is a problem , Try again and fill all the fields !</Alert>
            </Snackbar>
          </div>
        </Grid>
      </Paper>

      { // +taskIdValue
        eventButton ? <Redirect to={'/home/'} /> : ''
      }
    </div>
  )
}
>>>>>>> upstream/master
