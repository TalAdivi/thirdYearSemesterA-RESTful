import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Item from './item';


export default function MyList(props) {
    const { classes, post, setPost } = props;

    const deleteItem = id => {
        setPost(prevPost => prevPost.filter(post => post.id !== id))

        async function deleteResource() {

            await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: 'DELETE'
            })
        }

        try {
            deleteResource()
        } catch (e) {
            console.log(e.message);

        }

    }

    const changeItem = (newTitle, i) => {
        setPost(prevState => prevState.map(p => p.id !== i ? p : { ...p, title: newTitle }))

        async function updateResource() {
            await fetch(`https://jsonplaceholder.typicode.com/posts/${i}`, {
                method: 'PUT',
                body: JSON.stringify({
                    id: { i },
                    title: { newTitle },
                    body: 'bar',
                    userId: 1
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
        }

        try {
            updateResource();

        } catch (e) {
            console.log(e.message);

        }
    }

    const generate = (element, i) => {
        return (

            <ListItem key={element.id}>
                <Item
                    i={element.id}
                    onDelete={deleteItem}
                    onChange={changeItem}
                    element={element}
                />

            </ListItem>
        );
    };


    return (
        <Paper className={classes.paper}>
            <List
                dense={false}
                style={{
                    width: '100%',
                    overflow: 'auto',
                    maxHeight: 362,
                }}
                subheader={<li />}
            >
                <li >
                    <ul>
                        {post.map(generate)}
                    </ul>
                </li>

            </List>

        </Paper>
    )
}


