import React from "react";
import "./core/assets/styles/custom.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./app.scss";
import Routes from "./Routes";

const App = () => {
  return (
    <>
      <Routes />
      <ToastContainer 
      position={"top-center"}/>
    </>
  );
};

export default App;