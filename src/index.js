import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import actionCable from 'actioncable'

const CableApp = {}

// CableApp.cable = actionCable.createConsumer('ws://localhost:3001/cable')
CableApp.cable = actionCable.createConsumer('wss://desolate-sea-05709.herokuapp.com/cable')

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App cableApp={CableApp} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
