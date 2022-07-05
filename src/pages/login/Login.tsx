import React, { useState } from "react";
import "./login-styles.css"
import {BsEnvelopeFill,BsExclamationCircleFill, BsLockFill, BsArrowRight} from "react-icons/bs"

export const Login = () => {

  const handleFormSubmit = (event:React.FormEvent<HTMLFormElement> ):void => {
    event.preventDefault()
  } 
  return (
    <div className="page">
        <div className="container">
          <div className="wrapper-container">
            <h1 className="page-title">Login</h1>
            <form onSubmit={handleFormSubmit}>
              <div className="form-input-text">
                <BsEnvelopeFill color="#666666"/>
                <input type="text" placeholder="Email" />
                <BsExclamationCircleFill color="#c80000"/>
              </div>
              <div className="form-input-text">
                <BsLockFill color="#666666"/>
                <input type="password" placeholder="Senha"/>
                <BsExclamationCircleFill color="#c80000"/>
              </div>
              <button type="submit" className="login-button">login</button>
            </form>
            <a href="#" className="login-link">Criar conta <BsArrowRight/></a>
          </div>
        </div>
    </div>
  )
}

export default Login