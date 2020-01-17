import React from 'react';
import { ListItemText, Typography, ListItem, List, Grid } from '@material-ui/core';
import { Home, Book, AccountBox } from '@material-ui/icons';

const NavBar = () => {
  return (
    <Grid container item xs={8} direction="row" justify="space-evenly">
      <List component="nav">
        <ListItem component="div">
          <ListItemText inset>
            <Typography color="inherit" variant="subtitle1">
          Home <Home />
            </Typography>
          </ListItemText>
          <ListItemText inset>
            <Typography color="inherit" variant="subtitle1">
          Posts <Book />
            </Typography>
          </ListItemText>
          <ListItemText inset>
            <Typography color="inherit" variant="subtitle1">
          Contact <AccountBox />
            </Typography>
          </ListItemText>
        </ListItem >
      </List>
    </Grid>
  );
};

export default NavBar;
