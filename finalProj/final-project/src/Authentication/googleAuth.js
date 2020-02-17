import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import Typography from '@material-ui/core/Typography';
// import { createBrowserHistory } from 'history';
import history from './history'


const successGoogle = (response) => {

    // need to understand if user is admin or client and the continue !!!!!!
    console.log("response\n\n", response);

    setSession(response);
    // history.replace('/homePage')
    history.replace('/home');
}

const setSession = response => {

    // session is available for 1h
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((response.tokenObj.expires_in * 1000) + new Date().getTime());
    console.log("response.tokenObj.expires_in\n", response.tokenObj.expires_in);


    // let expiresAt = JSON.stringify(10000 + new Date().getTime());

    localStorage.setItem('access_token', response.tokenObj.access_token);
    localStorage.setItem('id_token', response.tokenObj.id_token);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route

}

const logout = () => {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
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

    return (
<>
        <Typography component="h5" variant="h6" style={{ marginBottom: "50px" }}>
            Loging 
    
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
    GoogleOut
}