import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

class Header extends Component {

    active = {
        backgroundColor: "#212F3D",
        color: "white",
        fontWeight: "bold"
    };

    header = {
        listStyle: "none",
        display: "flex",
        justifyContent: "space-evenly"
    };

    defaultStyle = {
        backgroundColor: "green",
        color: "blue",
        fontWeight: "bold"
    }

    render() {
        return (
            <div style={this.header}>
                <NavLink exact to="/" activeStyle={this.active}>Home</NavLink>
                <NavLink to="/MyIdeas" activeStyle={this.active}>My Ideas</NavLink>
            </div>
        )
    }
}


export default Header;