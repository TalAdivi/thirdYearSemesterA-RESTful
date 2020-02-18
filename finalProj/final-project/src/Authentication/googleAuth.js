import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import Typography from '@material-ui/core/Typography';
// import { createBrowserHistory } from 'history';
import history from './history'

let isUser = false;

const successGoogle = (response) => {

    // need to understand if user is admin or client and the continue !!!!!!
    console.log("response\n\n", response);

    // check if user is admin or customer
    async function checkIfUserExist() {
        console.log('inside checifuser');


        try {
            setSession(response, true);
            history.replace('/home');

            // const user = await fetch(`http://localhost:3000/Help4U/user/check`, {
            //     method: 'POST',
            //     headers: new Headers({
            //         // 'Content-Type': 'application/json',
            //         // 'Accept': 'application/json',
            //         'Content-Type': 'application/x-www-form-urlencoded',
            //     }),
            //     mode: 'cors',
            //     // credentials: true,
            //     body: JSON.stringify({google_id : response.googleId})


            // }).then(user => user.json());

            // console.log("user\n", user);

            // if (user.status === 200 && user.data !== null) {

            //     console.log('inside if 25');
            //     isUser = true;
            //     setSession(response, user.isAdmin);
            //     history.replace('/home');
            // }

            // if (user.status === 200 && user.data === null) {

            //     console.log('inside if 33');

            //     // setSession(response,user.isAdmin);
            //     history.replace('/home');
            // }


            // history.replace('/homePage')

            // return res

        } catch (e) {
            console.log('inside catch');

            return e.message;
        }

    };

    checkIfUserExist();






}

const setSession = (response, isAdmin) => {

    // session is available for 1h
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((response.tokenObj.expires_in * 1000) + new Date().getTime());
    console.log("response.tokenObj.expires_in\n", response.tokenObj.expires_in);


    // let expiresAt = JSON.stringify(10000 + new Date().getTime());

    localStorage.setItem('access_token', response.tokenObj.access_token);
    localStorage.setItem('id_token', response.tokenObj.id_token);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('isAdmin', isAdmin)
    localStorage.setItem('user_name',response.Rt.Ad)
    // navigate to the home route

}

const logout = () => {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('user_name');
    // navigate to the home route
    history.replace('/');
}

const isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
}




const failGoogle = (response) => {
    console.log('faillllll\n');
    logout()
}

const GoogleAuth = (props) => {
    const message = "Loginnn"

    return (
        <>
            <Typography component="h5" variant="h6" style={{ marginBottom: "50px" }}>
                {message}
            </Typography>
            <GoogleLogin
                clientId="838325310419-ink7dovlmgeoff0urhtdk16boctkqra8.apps.googleusercontent.com"
                // render={renderProps => (
                //     <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
                // )}
                buttonText="Login"
                onSuccess={successGoogle}
                onFailure={failGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </>
    )

}

const GoogleOut = () => {
    return (
        <>
            <Typography component="h5" variant="h6" style={{ marginBottom: "50px" }}>
                you already logged in, please logout to continue

            </Typography>
            <GoogleLogout
                clientId="838325310419-ink7dovlmgeoff0urhtdk16boctkqra8.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={logout}
            >
            </GoogleLogout>
        </>
    )
}




export {
    GoogleAuth,
    successGoogle,
    isAuthenticated,
    logout,
    GoogleOut,
    isUser
}