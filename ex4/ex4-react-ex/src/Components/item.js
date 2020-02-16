import React, { useState } from 'react';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';


export default function Item(props) {

    const {
        i,
        onDelete,
        onChange,
        element
    } = props;

    const [editing, setEditing] = useState(false);
    let idea = {value: ''};

    const deleteItem = () => onDelete(i);
    const editItem = () => setEditing(true);
    const saveItem = (event) => {
        event.preventDefault();
        onChange(idea.value,i);
        setEditing(false);
        
    }

    const ShowItem = () => {

        return (
            <>
                <Grid item xs={9}>

                    <ListItemText
                        primary={element.title}
                    />
                </Grid>
                <Grid item xs={2}>

                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                            <DeleteIcon

                                onClick={deleteItem}

                            />

                        </IconButton>

                        <IconButton edge="end" aria-label="delete">
                            <EditIcon

                                onClick={editItem}

                            />

                        </IconButton>

                    </ListItemSecondaryAction>

                </Grid>
            </>
        )
    }

    const EditItem = () => {
        
        return (
            <>
                <Grid xs={10}>
                    <textarea
                        ref={element => idea = element}
                        cols="30" rows="2" />

                </Grid>
                <Grid xs={2}>

                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                            <DeleteIcon

                                onClick={deleteItem}

                            />

                        </IconButton>

                        <IconButton edge="end" aria-label="delete">
                            <SaveIcon

                                onClick={saveItem}

                            />

                        </IconButton>

                    </ListItemSecondaryAction>

                </Grid>
            </>
        )
    }

    return editing ? <EditItem/> : <ShowItem/> ;

}


