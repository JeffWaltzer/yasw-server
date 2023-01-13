import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Gameboard from './Gameboard';
import reportWebVitals from './reportWebVitals';

console.log("in index.js");

const root = ReactDOM.createRoot(document.getElementById('root'));

let exampleSocket;
try {
  exampleSocket = new WebSocket(`ws://${window.location.host}/engine.io/?EIO=3&transport=websocket`);

  //DEBUG
  console.log(`exampleSocket:${exampleSocket}`);

  exampleSocket.onopen = (event) => {
    console.log(`onopen: event: ${event}`);

    // exampleSocket.on("message", (the_message) => {
    //   console.log(`the_message: ${the_message}`);
    // })
    exampleSocket.onmessage =  (the_message) => {
      root.render(
        <React.StrictMode>
          <Gameboard gameboard={the_message}/>
        </React.StrictMode>
      );
      // console.log(`the_message: ${the_message}`);
    };

    exampleSocket.onerror = (error) => {
      console.log(`error: ${error}`);
    };
  }
}
catch (e) {
  console.log(`error: ${e}`);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
