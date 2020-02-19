import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    formControl: {
<<<<<<< HEAD
        margin: theme.spacing(1),
        minWidth: 120,
=======
        margin: theme.spacing(0),
        minWidth: 140,
>>>>>>> upstream/master
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function StatusSelect() {
    const classes = useStyles();
    const [status, setStatus] = React.useState('Active');



    const handleChange = event => {        
        setStatus(event.target.value);
    };

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
<<<<<<< HEAD
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={"Active"}>Active</MenuItem>
                <MenuItem value={"Complete"}>Complete</MenuItem>
            </Select>
            <FormHelperText>Label + placeholder</FormHelperText>
=======

                <MenuItem value={"Active"}>Active</MenuItem>
                <MenuItem value={"Complete"}>Complete</MenuItem>
            </Select>
            {/* <FormHelperText>choose to change status</FormHelperText> */}
>>>>>>> upstream/master
        </FormControl>
    );
}
