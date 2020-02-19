import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import SocialImg from '../Images/successfully-network-event-001.jpg'
<<<<<<< HEAD
import {GoogleAuth, GoogleOut, isAuthenticated} from '../Authentication/googleAuth';
=======
import {GoogleAuth, GoogleOut, isAuthenticated, Here4uSigunup} from '../Authentication/googleAuth';
import history from '../Authentication/history';
>>>>>>> upstream/master

// function Copyright() {
//     return (
//         <Typography variant="body2" color="textSecondary" align="center">
//             {'Copyright © '}
//             <Link color="inherit" href="https://material-ui.com/">
//                 Your Website
//       </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: `url(${SocialImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    spaceBottom: {
        marginBottom: theme.spacing(9)
    }

}));
<<<<<<< HEAD

export default function SignInSide() {
    const classes = useStyles();

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Box display="flex">
                    <Typography component="h1" variant="h2" className={classes.spaceBottom}>

                        Here4U
          </Typography>
                    </Box>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" className={classes.spaceBottom}>
                        Sign in via Google
          </Typography>

          {
              isAuthenticated() ?  <GoogleOut/> :  <GoogleAuth/>
          }
=======

export default function SignInSide(props) {
    const classes = useStyles();

    const { message, newUser } = props;
    // console.log('pathh\n',path);
    

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Box display="flex">
                    <Typography component="h1" variant="h2" className={classes.spaceBottom}>

                        Here4U
          </Typography>
                    </Box>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" className={classes.spaceBottom}>
                        Sign in via Google
          </Typography>

          {
                isAuthenticated() ?  <GoogleOut message={message}/> :  newUser == true ? <Here4uSigunup message={message} /> : <GoogleAuth message={message}/>
              // isAuthenticated() ?   history.replace(path) :  <GoogleAuth/>
          }

>>>>>>> upstream/master
          
                </div>
            </Grid>
        </Grid>
    );
}