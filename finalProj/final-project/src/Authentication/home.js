import React from 'react';
import App from "../App";
import {GoogleAuth, isAuthenticated, GoogleOut} from '../Authentication/googleAuth'
import MainWindow from '../Components/mainWindow'
import ReactRouter from '../Routers/routers';
import SignInSide from '../Components/login';


const Home = (props) => {


    return (
        <div>
            {
                isAuthenticated() &&
                <div className="container column">
                    <SignInSide/>
                </div>
            }
            {
                !isAuthenticated() && (
                <SignInSide/>
                )
            }
        </div>
    );

}


export default Home;