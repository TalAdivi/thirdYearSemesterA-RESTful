import React from "react";
import io from "socket.io-client"

export const CTX = React.createContext();

/**
 * 
 * 
 * msg  {
 *          from: 'user'
 *          msg: 'hi'
 *          topic: 'general' // specific chat
 *      }
 * 
 * 
 * state {
 *      
 *      general: [
 *              {msg}, {msg}, {msg}
 *              ]
 * 
 *      topic2: [
 *              {msg}, {msg}, {msg}
 *              ]
 *          .
 *          .
 *          .
 * 
 *       }
 */

const initState = {
    general: [
        { from: 'Adivi', msg: 'prevMsg' },
        { from: 'Adivi', msg: 'prevMsg2' },
        { from: 'Adivi', msg: 'prevMsg3' }
    ],

    topic2: [
        { from: 'Tomer', msg: 'prevMsg' },
        { from: 'Tomer', msg: 'prevMsg2' },
        { from: 'Tomer', msg: 'prevMsg3' }
    ]

}

function reducer(state, action) {

    const { from, msg, topic } = action.payload;

    console.log('from',from);
    console.log('msg',msg);
    console.log('topic',topic);
    

    switch (action.type) {
        case 'RECEIVE_MESSAGE':
            return {
                ...state,
                [topic]: [
                    ...state[topic],
                    {
                        from,
                        msg
                    }
                ]
            }

        default:
            return state;
    }
}


let socket;

function sendChatAction(value) {

    socket.emit('chat message', value.msg, value.from, value.topic);
    // socket.emit('chat message', value.from);

}

// need to bring the name if the sender... 
const user = "Adivi" + Math.random(100).toFixed(2) * 100;

export default function Store(props) {

    const [allChats, dispatch] = React.useReducer(reducer, initState);

    if (!socket) {
        socket = io(':3001');
        socket.on('chat message', function(msg, from, topic) {
            // sending veluse to reduce func above
            dispatch({type: 'RECEIVE_MESSAGE', payload: { msg: msg, from: from, topic: topic } })
            console.log(allChats);
            
        });
    }


    // console.log( reducerHook);\

    return (
        <CTX.Provider value={{ user, allChats, sendChatAction }}>
            {props.children}
            {console.log(props.children)}
        </CTX.Provider>
    )
}