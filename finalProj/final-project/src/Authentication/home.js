import React from 'react';
import App from "../App";
import {GoogleAuth, isAuthenticated, GoogleOut} from '../Authentication/googleAuth'
import MainWindow from '../Components/mainWindow'
import ReactRouter from '../Routers/routers';
import SignInSide from '../Components/login';


const Home = (props) => {
    // const { auth, isAuthenticated } = props;
    // const { isAuthenticated } = auth;
    // const login = () => {
    //     // auth.login();
    //     return <GoogleAuth/>
    // }

    const logout = () => {
        // auth.logout();
    }


    return (
        <div>
            {
                isAuthenticated() &&
                <div className="container column">
                    <h5>
                        You are logged in!{' '}
                        <a
                            // style={{ cursor: 'pointer' }}
                            
                        >
                            Log Out
                </a>.

              </h5>
                    {/* <App /> */}
                    {/* <MainWindow /> */}
                    {/* <ReactRouter/> */}
                    <SignInSide/>

                </div>
            }
            {
                !isAuthenticated() && (
                //     <div className="container column">
                //         <h5>ReactiveSearch Auth0 Example</h5>
                //         <h5>
                //             You are not logged in! Please{' '}
                //             {/* <a
                //                 // style={{ cursor: 'pointer' }}
                //                 onClick={login}
                //             >
                //                 Log In
                //   </a> */}
                //         <GoogleAuth/>
                //             {' '}to continue.
                // </h5>
                //         <h6>This is the default <b><code>Home</code></b> component. The <b><code>App</code></b> component will only be visible once you authenticate.</h6>
                //     </div>

                <SignInSide/>

                )
            }
        </div>
    );





}


export default Home;