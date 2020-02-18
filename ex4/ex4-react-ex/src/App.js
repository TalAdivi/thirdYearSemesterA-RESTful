import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { useEffect, useState } from 'react';

import Form from './Components/form';
import Pic from "./Components/pic";
import MyList from "./Components/list"


const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 275,
    '& .MuiTextField-root': {
      marginTop: theme.spacing(2),
      backgroundColor: "white"
    },
  },
  media: {
    height: 378,
  },
  fab: {
    margin: theme.spacing(2),
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  paper: {
    maxHeight: 378,
    minHeight: 378,
    width: 362,
    backgroundColor: "#b4d2ff"
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
}));

function App() {
  const classes = useStyles();
  const [post, setPost] = useState([]);

  useEffect(() => {
    async function getResourcePosts() {

      let arrPosts = [];
      try {
        arrPosts = await fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json());

      } catch (e) {
        return e.message;
      }

      const ppostss = arrPosts.map(item => ({ title: item.title, id: item.id }))
      return setPost(ppostss.slice(0, 5));
    }

    getResourcePosts();

  }, [])

  return (
    <>
      <Container maxWidth="xl" style={{ "backgroundColor": "#4e92f7", "minHeight": "900px" }}>
        <Typography component="div">
          <Box fontStyle="normal" textAlign="center" m={1} lineHeight={8}>
            Adivi
          </Box>
        </Typography>
        <Container maxWidth="xl" style={{ "backgroundColor": "#3767af", "minHeight": "700px" }}>
          <Grid container justify="space-evenly" spacing={10}>
            <Grid key={0} item>
              <Form classes={classes} post={post} setPost={setPost} />
            </Grid>
            <div style={{ "paddingBottom": 100 }}>
              <Grid item key={1}  >
                <Pic classes={classes} />
              </Grid>
            </div>
            <Grid key={2} item>
              <MyList classes={classes} post={post} setPost={setPost} />
            </Grid>
          </Grid>
        </Container>
      </Container>

    </>
  )
}

export default App;
