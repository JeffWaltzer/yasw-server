import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

let exampleSocket;
try {
  exampleSocket = new WebSocket(`ws://${window.location.host}/engine.io/?EIO=3&transport=websocket`);
  exampleSocket.onopen = (event) => {
    console.log(`onopen: event: ${event}`);

    exampleSocket.send("ferd is a ferd");
  };
}
catch (e) {
  console.log(`error: ${e}`);
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
