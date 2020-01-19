import React from 'react';
import Store from "./store";
import Deshboard from "./deshboard";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import  {queryRes}  from "./task";


const useStyles = makeStyles(theme => ({
    chatStyle: {
        height: '1%',
    }
}));

const Chat = () => {
    const res = React.useContext(queryRes);
    console.log('x!!',res);
    
    return (
        // <React.Fragment>
        <div className={useStyles.chatStyle}>
            <Store >
                <Deshboard />
            </Store>
        </div>
        // </React.Fragment>
    )
}

export default Chat;