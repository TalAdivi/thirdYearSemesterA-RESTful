import React from 'react'
import App from '../App'
import { GoogleAuth, isAuthenticated, GoogleOut } from '../Authentication/googleAuth'
import MainWindow from '../Components/mainWindow'
import ReactRouter from '../Routers/routers'
import SignInSide from '../Components/login'

const Home = (props) => {
  const { message, newUser } = props
  console.log('newUser\n', newUser)

  return (
    <div>

      {isAuthenticated() && <SignInSide message = {'please reconnect again'} newUser={newUser}/>}

      {!isAuthenticated() && <SignInSide message = {message} newUser={newUser}/>}

    </div>
  )
}

export default Home
