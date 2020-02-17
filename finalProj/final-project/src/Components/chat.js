import React from 'react';
import Store from "./store";
import Dashboard from "./dashboard";
import { makeStyles, useTheme } from '@material-ui/core/styles';
// import { queryRes } from "./task";


const useStyles = makeStyles(theme => ({
    chatStyle: {
        height: '1%',

    }
}));

const Chat = (props) => {
    // const res = React.useContext(queryRes);
    // console.log('x!!');

    return (
        <div className={useStyles.chatStyle}>
            <Store tasks = {props.allTasks}>
                <Dashboard/>
            </Store>
        </div>
    )
}

export default Chat;