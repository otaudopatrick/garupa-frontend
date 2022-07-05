import React, { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { SignupService } from "../../services/signup-service";

import "./signup-styles.css"

import SignupForm from "./SignupForm";
import { SignupFormValues } from "./SignupForm/SignupForm";
import { notifyError } from "../../utils/toast";

export interface SignupErrorResponse {
  error: string;
};
export const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = async (signupState: SignupFormValues) => {
    try {
      await SignupService.handle(signupState)
      navigate('/')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = (error.response?.data as SignupErrorResponse).error
        notifyError(message)
      }
    }
  }
  return (
    <div className="page">
      <div className="container">
        <div className="wrapper-container">
          <h1 className="page-title">Criar conta</h1>
          <SignupForm onSubmit={handleSubmit} submiting={false} />
          <ToastContainer />
        </div>
      </div>
    </div>
  )
}

export default Signup