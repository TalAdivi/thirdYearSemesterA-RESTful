import React from 'react';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

const Pic = props => {
    const { classes } = props;

    return (

        <Paper className={classes.paper} >
            <Card className={classes.root}>
                <CardMedia
                    component="img"
                    className={classes.media}
                    image={require('../images/jumping.jpg')}
                    title="Contemplative Reptile"
                />
            </Card>
        </Paper>

    );
}

export default Pic;
