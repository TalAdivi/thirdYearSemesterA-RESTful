import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Header from './Components/Header';
import TypeRace from './Components/TypeRace';
import Footer from './Components/Footer';
import { Container, Grid, colors } from '@material-ui/core';

const styles = {
 root: {
   backgroundColor: colors.indigo[50],
   minHeight: '100vh',
 },
 content: {
   minHeight: '50vh',
 },
};

const App = props => {
  const { classes } = props;
 
  return (
    <Container maxWidth="lg" className={classes.root}>
      <Header />
      <Grid container
        className={classes.content}
        alignItems="center"
        justify="space-evenly"
      >
        <Grid item lg={6}>
          <TypeRace />
        </Grid>
      </Grid>
      {/* <Footer /> */}
    </Container>
  );
 };
 
 App.propTypes = {
  classes: PropTypes.object.isRequired,
 };
 
 export default withStyles(styles)(App);