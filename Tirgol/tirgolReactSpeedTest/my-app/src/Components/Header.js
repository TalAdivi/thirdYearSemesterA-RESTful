import React from 'react';
import { AppBar, Typography, Toolbar } from "@material-ui/core";
import NavBar from "./NavBar";

const Header = () => {

    return (
        <AppBar color="primary" position="static">
            <Toolbar>
                <Typography variant="h2" color="textPrimary">
                    Type Race
   </Typography>
                <NavBar />
            </Toolbar>
        </AppBar>

    )
}


export default Header;