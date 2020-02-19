import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {Redirect} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(0),
        minWidth: 140,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function StatusSelect(props) {
    const { taskID } = props;
    const classes = useStyles();
    const [status, setStatus] = React.useState('Active');
    const [openSucsses, setOpenSucsses] = React.useState(false);
    const [redirect, setRedirect] = React.useState(false);

    const handleClickSucsses = () => {
        setOpenSucsses(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        console.log("on clost fire!!");
        setOpenSucsses(false);
    };

  


    const handleChange = event => {
        console.log('bla');
        
        setStatus(event.target.value);
        let res
        async function changeStatus() {

            try {
                res = await fetch(`http://localhost:3000/Help4U/task/update/${taskID}`, {
                    method: 'PUT'
                })
                    .then(res => res.json())
                // queryRes = React.createContext(res);
                console.log('res MAIN WINDOW\n', res);

                if (res.status == 200 && res.data !== null) {
                    handleClickSucsses();

                    setInterval(() => {
                        setRedirect(true)
                    }, 2000);

                }
    
                if (res.status == 200 && res.data === null) {
                    // wired bugs can get here
                    setRedirect(true)
                    //message to user no task with this id
                }
    
                if (res.status == 500) {
                    // maybe DB error, reload and try again
                    window.location.reload();
                }
            }
            catch (e) {
                //if fetch fail, reload and try again 
                window.location.reload();
            }

   
        }

        changeStatus()
    };


    /**
     * 
     * 
     * add if complete change status
     * 
     * 
     */

    return (
        <FormControl className={classes.formControl}>
            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                Status
    </InputLabel>
            <Select
                labelId="demo-simple-select-placeholder-label-label"
                id="demo-simple-select-placeholder-label"
                value={status}
                onChange={handleChange}
                displayEmpty
                className={classes.selectEmpty}
            >

                <MenuItem value={"Active"}>Active</MenuItem>
                <MenuItem value={"Complete"}>Complete</MenuItem>
            </Select>
                <Snackbar open={openSucsses} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Your task has been successfully added !</Alert>
                </Snackbar>

            {/* when change the status of a task, go back to home page */}
            {redirect ? <Redirect to="/home"/> : ''}
        </FormControl>
    );
}
