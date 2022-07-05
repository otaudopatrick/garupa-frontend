import React from "react";

import "./login-styles.css"

import { BsArrowRight } from "react-icons/bs"
import LoginForm from "./LoginForm";
import { LoginFormValues } from "./LoginForm/LoginForm";
import { LoginService } from "../../services/login-service";
import axios from "axios";
import { notifyError } from "../../utils/toast";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";


export interface LoginErrorResponse {
  error: string;
};
export const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = async (loginValues:LoginFormValues) => {
    console.log(loginValues)
    try {
      await LoginService.handle(loginValues)
      navigate('/')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = (error.response?.data as LoginErrorResponse).error
        notifyError(message)
      }
    }
  }

  return (
    <div className="page">
      <div className="container">
        <div className="wrapper-container">
          <h1 className="page-title">Login</h1>
          <LoginForm onSubmit={handleSubmit} submiting={false}/>
          <ToastContainer/>
          <a  className="login-link" onClick={()=> navigate("/criar-conta")}>Criar conta <BsArrowRight /></a>
        </div>
      </div>
    </div>
  )
}

export default Login