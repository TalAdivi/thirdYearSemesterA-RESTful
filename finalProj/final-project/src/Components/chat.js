import React from 'react';
import Store from "./store";
import Deshboard from "./deshboard";
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    chatStyle: {
        height: '1%',
    }
}));

const Chat = () => {

    return (
        // <React.Fragment>
        <div className={useStyles.chatStyle}>
            <Store>
                <Deshboard />
            </Store>
        </div>
        // </React.Fragment>
    )
}

export default Chat;