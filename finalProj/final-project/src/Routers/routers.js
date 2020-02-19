import React from 'react';
import { Route, Router } from "react-router-dom";
import Chat from "../Components/chat";
import MainWindow from "../Components/mainWindow";
import ResponsiveDrawer from "../Components/responsiveDrawer";
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
            <Route exact path="/" component={() => <Home message={"Please login"}/>} />
            {/* <Route path="/home" render={(props) => <Home />} /> */}

            {/* <Route path="/callback" render={(props) => {
                handleAuthentication(props);
                return <Loading {...props} />
            }} /> */}

            {/* here every route need to check fire if isAuth.... */}

            <Route path ="/home" component={() => isAuthenticated() ? <ResponsiveDrawer/> : <Home message={"Not authenticated, Please login again"} newUser={false}/> } />
            <Route path ="/error" component={() =>  <Home message={"Error occur, please try again"} newUser={false}/> } />
            <Route path ="/signup" component={() =>  <Home message={"Please signup first"} newUser={true}/> } />


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