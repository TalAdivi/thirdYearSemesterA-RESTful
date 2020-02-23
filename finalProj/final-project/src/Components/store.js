import React, { useEffect } from 'react'
import io from 'socket.io-client'
export const CTX = React.createContext()

// will have socket number when server init connection
let socket

export default function Store (props) {
  const { allTasks, setAllUsersTasks } = props
  let oneTask = null
  // let disconnected = false
  const [chat, setChat] = React.useState(null)
  // const [toTask, setToTask] = React.useState(false)
  const [currTask, setCurrTask] = React.useState(null)

  function sendChatAction (value, currTaskChat) {
    socket.emit('chat message', value.message, value.from, currTask.taskID, chat)
    console.log('18 currTask = ', currTask)
    console.log('18 chat = ', chat)
  }

  useEffect(() => {
    function getCurrTask () {
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

    getCurrTask()
  }, [])


  if (!socket) {
    socket = io(':3000')
    socket.on('chat message', function (message, from) {
      setChat(prevChats => ([
        ...prevChats, {
          from: from,
          message: message
        }])
      )
    })
  }

  if (currTask === null) {
    return <div>Loading...</div>
  } else {
    return (
      <CTX.Provider value={{ chat, sendChatAction, currTask }}>
        {props.children}
      </CTX.Provider>
    )
  }
}
