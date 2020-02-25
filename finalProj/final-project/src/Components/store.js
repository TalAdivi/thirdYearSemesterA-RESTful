// import React, { useEffect } from 'react'
// import Loader from './loader'
// import io from 'socket.io-client'
// export const CTX = React.createContext()

// // will have socket number when server init connection
// let socket

// export default function Store (props) {
//   const { allTasks, setAllUsersTasks } = props
//   let oneTask = null
//   // let disconnected = false
//   const [chat, setChat] = React.useState(null)
//   // const [toTask, setToTask] = React.useState(false)
//   const [currTask, setCurrTask] = React.useState(null)

//   function sendChatAction (value, currTaskChat) {
//     socket.emit('chat message', value.message, value.from, currTask.taskID, chat)
//     console.log('18 currTask = ', currTask)
//     console.log('18 chat = ', chat)
//   }

//   useEffect(() => {
//     function getCurrTask () {
//       // taking the index of the chat the user click on
//       const currTaskId = window.location.pathname.split('/')[3]
//       oneTask = allTasks.find(task => {
//         if (currTaskId == task.taskID) { return task }
//       })

//       if (oneTask !== undefined) {
//         // we send to server the current task of the chat, to update the chat when user disconnected
//         // socket.emit('update task', oneTask)
//         setCurrTask(oneTask)
//         setChat(oneTask.chat)
//       } else {
//       }
//     }

//     getCurrTask()
//   })

//   useEffect(() => {
//     return () => {
//       console.log('unmount!')
//     }
//   })

//   if (!socket) {
//     socket = io('https://mern-finalproj-api.herokuapp.com/', {
//       transports: ['websocket']
//     })
//     socket.on('chat message', function (message, from) {
//       // oneTask.chat.push({
//       //   from: from,
//       //   message: message
//       // })

//       // setCurrTask(prevTask => ({ ...prevTask, chat: prevTask.chat.push({ from: from, message: message }) }))
//       setChat(prevChats => ([
//         ...prevChats, {
//           from: from,
//           message: message
//         }])
//       )
//     })
//   }

//   if (currTask === null) {
//     return <Loader/>
//   } else {
//     return (
//       <CTX.Provider value={{ chat, sendChatAction, currTask ,allTasks,setAllUsersTasks}}>
//         {props.children}
//       </CTX.Provider>
//     )
//   }
// }

import React, { useEffect } from 'react'
import Loader from './loader'
import io from 'socket.io-client'
export const CTX = React.createContext()

// will have socket number when server init connection

//useRef
let socket
// h
export default function Store(props) {

  const { allTasks, setAllUsersTasks } = props
  let oneTask = null
  // let disconnected = false
  const [chat, setChat] = React.useState(null)
  // const [toTask, setToTask] = React.useState(false)
  const [currTask, setCurrTask] = React.useState(null)

  function sendChatAction(value, currTaskChat) {
    socket.emit('chat message', value.message, value.from, currTask.taskID, chat)
    console.log('18 currTask = ', currTask)
    console.log('18 chat = ', chat)
  }

  useEffect(() => {
    function getCurrTask() {
      // taking the index of the chat the user click on
      const currTaskId = window.location.pathname.split('/')[3]
      oneTask = allTasks.find(task => {
        if (currTaskId == task.taskID) { return task }
      })

      if (oneTask !== undefined) {
        // we send to server the current task of the chat, to update the chat when user disconnected
        // socket.emit('update task', oneTask)
        setCurrTask(oneTask)
        setChat(oneTask.chat)
      } else {
      }
    }

    socket = io('https://mern-finalproj-api.herokuapp.com/', {
      transports: ['websocket']
    })

    getCurrTask()
    socket.on('chat message', function (message, from) {
      setChat((prevChats) => {
        const AAA = 5
        console.log(AAA)
        console.log(prevChats)
        const f = [
          ...prevChats, {
            from: from,
            message: message
          }]
        return f
      })
    })





    // setChat(prevChats => ([
    //   ...prevChats, {
    //     from: from,
    //     message: message
    //   }])
    // )


    return () => {
      socket.off('chat message')
    }
  }, [])

  if (currTask === null) {
    return <Loader />
  } else {
    return (
      <CTX.Provider value={{ chat, sendChatAction, currTask, allTasks, setAllUsersTasks }}>
        {props.children}
      </CTX.Provider>
    )
  }
}
