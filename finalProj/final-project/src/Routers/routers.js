import React from 'react';
import { Route } from "react-router-dom";
import Chat from "../Components/chat";
import MainWindow from "../Components/mainWindow";
// import ChartBar from "../Components/chartBar";

const ReactRouter = () => {
    return (
           
        <React.Fragment>
            <MainWindow>
            {/* <Route path="/chat" component={Chat}/> */}

            </MainWindow>

            {/* <Route path="/MyIdeas" component={MyIdeas}/> */}
        </React.Fragment>
    )
}

export default ReactRouter;