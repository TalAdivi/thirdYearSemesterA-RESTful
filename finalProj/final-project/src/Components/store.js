import React, { useEffect } from "react";
import io from "socket.io-client"




export const CTX = React.createContext();

// async function fetchChatDetails() {
//     let res;

//     try {

//         res = await fetch('http://localhost:3000/Help4U/task/getTasksByUID?userID=305171159').then(res => res.json())


//         console.log('res\n', res.data[0].chat[0]);



//     }
//     catch (e) {

//         console.log(e);

//     }

//     return res.data[0].chat[0];

// }


// const initState = {
//     general: [
//         // { from: 'Adivi', msg: 'prevMsg' },
//         // { from: 'Adivi', msg: 'prevMsg2' },
//         // { from: 'Adivi', msg: 'prevMsg3' },
//         // {_id: "5e19af8666cff380482167b2", from: "Tomer Bar", message: "Hello, my TV doesn't work, i need technician ASAP."}
//     ],



//     // topic2: [
//     //     { from: 'Tomer', msg: 'prevMsg' },
//     //     { from: 'Tomer', msg: 'prevMsg2' },
//     //     { from: 'Tomer', msg: 'prevMsg3' }
//     // ]

// }

// function reducer(state, action) {

//     console.log('reducer State!\n', state);

//     const { from, msg, topic } = action.payload;

//     console.log('from', from);
//     console.log('msg', msg);
//     console.log('topic', topic);


//     switch (action.type) {
//         case 'RECEIVE_MESSAGE':
//             return {
//                 ...state,
//                 [topic]: [
//                     ...state[topic],
//                     {
//                         from,
//                         msg
//                     }
//                 ]
//             }

//         default:
//             return state;
//     }
// }


let socket;

function sendChatAction(value, chats) {

    socket.emit('chat message', value.msg, value.from, value.topic, chats);
    // socket.emit('chat message', value.from);

}

// async function loadPrevMessages() {

//     fetchChatDetails().then((val) => {
//         console.log('val inside load prev', val);

//         return val
//     })
// }


// need to bring the name if the sender... 
const user = "Adivi" + Math.random(100).toFixed(2) * 100;

export default function Store(props) {



    //maybe here we can send the new chats to DB
    // console.log('checkReturnVal\n', loadPrevMessages());




    const [chats, setChats] = React.useState([])


    useEffect(() => {
        async function fetchChatDetails() {

            // taking the index of the chat the user click on
            let currChatIndex = window.location.pathname.split("/")[2];

            console.log('props.result!\n', props.result);



            // try {


            //     console.log('res!!!!!!\n', res);
            // }
            // catch (e) {
            //     console.log(e);
            // }

            // if (res.data != null) {

            //     let messages = res.data[0].chat.map(item => ({ from: item.from, msg: item.message }))
            //     // console.log('messagessss\n', messages);

            //     setChats(messages);
            //     // return res;
            // }




        }

        // window.addEventListener("beforeunload", (ev) => {
        //     ev.preventDefault();
        //     return ev.returnValue = 'Are you sure you want to close?';
        // });

        fetchChatDetails();



    }, [])


    //every time chats state chages, we send to the serever the updated state, when user disconnect the updated state of chat will be at the server
    useEffect(() => {
        console.log('chat been changed\n');
        socket.emit('update chat', chats);

    }, [chats])



    console.log('chatssss\n', chats)
    // const [allChats, dispatch] = React.useReducer(reducer, chats);
    // console.log('ALLCHATSSS\n',allChats)


    if (!socket) {
        socket = io(':3000');
        socket.on('chat message', function (msg, from, topic) {
            setChats(prevChats => ([
                ...prevChats, {
                    from: from,
                    msg: msg
                }])

            )
        });




    }



    // console.log( reducerHook);\

    return (

        <CTX.Provider value={{ user, chats, sendChatAction }}>
            {props.children}

            {/* {console.log('props.children',props.children)} */}
        </CTX.Provider>
    )
}