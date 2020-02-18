import React from 'react';
import { Route, Router } from "react-router-dom";
import Chat from "../Components/chat";
import MainWindow from "../Components/mainWindow";
import Home from '../Authentication/home';
import Loading from '../Authentication/loading';
import { GoogleAuth, successGoogle, isAuthenticated } from '../Authentication/googleAuth';
import history from '../Authentication/history'


// import ChartBar from "../Components/chartBar";

// const handleAuthentication = (nextState, replace) => {
//     if (/access_token|id_token|error/.test(nextState.location.hash)) {
//         successGoogle();
//     }
//   }

const ReactRouter = () => {
    return (
    <Router history={history} component={Home}>
        
        <div>
            <Route exact path="/" component={() => <Home />} />
            {/* <Route path="/home" render={(props) => <Home />} /> */}

            {/* <Route path="/callback" render={(props) => {
                handleAuthentication(props);
                return <Loading {...props} />
            }} /> */}

            <Route path ="/home" component={() => isAuthenticated() ? <MainWindow/> : <Home/> } />


            {/* <Route  */}

        </div>
    </Router>
    )

    // return (
    //     <MainWindow>
    //     </MainWindow>
    // )
}

export default ReactRouter;