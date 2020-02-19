import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { Route } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import ResponsoveDrawer from "./responsiveDrawer";
import ChartBar from "../Components/chartBar";
import Chat from "../Components/chat";
import Task from "../Components/task";
import Form from "../Components/form";
import ComposeChart from '../Components/composed-chart';




let res;
let queryRes;


const MainWindow = props => {

    // const [allTasks, setAllTasks] = React.useState([])

<<<<<<< HEAD
    const [allUsersTasks, setAllUsersTasks] = React.useState([])

    useEffect(() => {
    
        async function fetchChatDetails() {
    
    
            try {
                res = await fetch('http://localhost:3000/Help4U/task/user/305171159').then(res => res.json())
                // queryRes = React.createContext(res);
                console.log('res MAIN WINDOW\n', res);
            }
            catch (e) {
                console.log(e);
            }

    
            if (res.status == 200 && res.data != null ) {
    
                // let tasks = res.data;
                setAllUsersTasks(res.data)
    
            }
        }
    
        fetchChatDetails();
        // console.log('useEffect of mainWIndow!');
        
    
    }, []);
=======
    
>>>>>>> upstream/master

    return (
        <div >
            <ResponsoveDrawer>
<<<<<<< HEAD
                <Grid container spacing={2}>
                    <Grid item xs={8}   >
                    {/* <Chat allTasks={allUsersTasks} /> */}
                    {/* <Task allTasks = {allUsersTasks} /> */}
                    
                        <Route exact path="/home"  > <Task allTasks = {allUsersTasks} /> </Route>
                        <Route path="/home/chat"  > <Chat allTasks={allUsersTasks} /> </Route>
                        <Route path="/home/Send email"  > <Form/> </Route>
                        {/* another option to show chart from Bit */}
                        {/* <Route exact path="/" component={ComposeChart}  /> */}

                    </Grid>
                    <Grid item xs={4}>
                        {/* another option to show chart from Bit */}
                        <ComposeChart />
                    </Grid>
                </Grid>
=======

>>>>>>> upstream/master

            </ResponsoveDrawer>
        </div>
    )
}

//  <Grid container spacing={2}>
// <Grid item xs={8}   >
// <Chat allTasks={allUsersTasks} />
// <Task allTasks = {allUsersTasks} />

//     <Route exact path="/home"  > <Task allTasks = {allUsersTasks} /> </Route>
//     <Route path="/home/chat"  > <Chat allTasks={allUsersTasks} /> </Route>
//     another option to show chart from Bit
//     <Route exact path="/" component={ComposeChart}  />

// </Grid>
// <Grid item xs={4}>
//     another option to show chart from Bit
//     <ComposeChart />
// </Grid> 
//  </Grid>



export default MainWindow;