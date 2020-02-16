import React from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add'
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';


const Form = props => {
    const { classes, post, setPost } = props;
    let titleValue = ""

    const nextID = (posts = []) => {
        let max = post.reduce((prev, curr) => prev.id > curr.id ? prev.id : curr.id, 0);

        return ++max;
    };

    const addPost = () => {
        let availableID = nextID(post);
        setPost(prevState => (
            [
                ...prevState, {
                    id: availableID,
                    title: titleValue,
                }])
        );

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: titleValue,
                body: 'bar',
                userId: 1
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

    }

    return (
        <Paper className={classes.paper}>

            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" label="TEMPLATE" fullWidth InputProps={{
                    disableUnderline: true
                }} />

                <TextField id="standard-basic" label="TEMPLATE" fullWidth InputProps={{
                    disableUnderline: true
                }} />

                <TextField id="standard-basic" label="TEMPLATE" fullWidth InputProps={{
                    disableUnderline: true
                }} />

                <TextField
                    label="Content"
                    id="standard-multiline-flexible"
                    multiline
                    fullWidth
                    rowsMax="10"
                    style={{ "minHeight": "151px" }}
                    InputProps={{
                        disableUnderline: true
                    }}
                    onChange={event => titleValue = event.target.value}
                />
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Tooltip title="Add" aria-label="add" placement="bottom" >
                        <Fab color="primary" className={classes.fab}>
                            <AddIcon

                                onClick={addPost}

                            />
                        </Fab>
                    </Tooltip>
                </Grid>
            </form>
        </Paper>
    )
}

export default Form;