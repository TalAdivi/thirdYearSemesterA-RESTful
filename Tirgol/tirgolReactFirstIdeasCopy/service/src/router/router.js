import Header from "../Components/Header";
import { Route } from "react-router-dom";
import IdeaList from "../Components/ideasList";
import MyIdeas from "../Components/myIdeas";
import React from 'react';

const ReactRouter = () => {
    return (
           
        <React.Fragment>
            <Header>
            </Header>
            <Route exact path="/" component={IdeaList}/>
            <Route path="/MyIdeas" component={MyIdeas}/>
        </React.Fragment>
    )
}

export default ReactRouter;