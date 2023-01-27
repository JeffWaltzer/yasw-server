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

  exampleSocket.onopen = (event) => {
    exampleSocket.onmessage =  (the_message) => {
      root.render(
        <React.StrictMode>
          <Gameboard gameboard={the_message.data.slice(1)}/>
        </React.StrictMode>
      );
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
