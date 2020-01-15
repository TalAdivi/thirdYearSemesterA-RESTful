import React from 'react';
import logo from './logo.svg';
import './App.css';

const {GoogleAuth} = require('google-auth-library');
 
/**
 * Instead of specifying the type of client you'd like to use (JWT, OAuth2, etc)
 * this library will automatically choose the right client based on the environment.
 */
async function main() {
  const auth = new GoogleAuth({
    scopes: 'https://www.googleapis.com/auth/cloud-platform'
  });
  const client = await auth.getClient();
  const projectId = await auth.getProjectId();
  const url = `https://dns.googleapis.com/dns/v1/projects/${projectId}`;
  const res = await client.request({ url });
  console.log(res.data);
}
 
main().catch(console.error);

function App() {
  
  return (
    <div className="App">

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Sample App.</h2>

        {getContent()}
      </header>
    BLABLABLA
    </div>
  );
}


export default App;
