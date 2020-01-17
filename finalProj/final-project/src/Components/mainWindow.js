import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Route } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import ResponsoveDrawer from "./responsiveDrawer";
import ChartBar from "../Components/chartBar";
import Chat from "../Components/chat";
import Task from "../Components/task";
import ComposeChart from '../Components/composed-chart';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    chat: {
        height: '1%',
    }
}));

const chat = {
    height: '10px',
    backgroundColor: "#fff"
}


const mainWindow = () => {

    return (
        <div >
            <ResponsoveDrawer>
                <Grid container spacing={2}>
                    <Grid item xs={8}   >
                        <Route path="/chat" component={Chat}  />
                        <Route exact path="/" component={Task}  />
                        {/* another option to show chart from Bit */}
                        {/* <Route exact path="/" component={ComposeChart}  /> */}
                        
                    </Grid>
                    <Grid item xs={4}>
                        {/* another option to show chart from Bit */}
                        <ComposeChart />
                    </Grid>
                </Grid>

            </ResponsoveDrawer>
        </div>
    )
}



export default mainWindow;