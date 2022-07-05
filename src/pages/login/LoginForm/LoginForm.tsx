import React, { useCallback, useEffect, useState } from "react";

import { BsEnvelopeFill, BsLockFill } from "react-icons/bs";
import Input from "../../../components/input";
import { EmailValidation } from "../../../validators/email-validaiton";
import { RequiredFieldValidation } from "../../../validators/required-field-validation";

export interface LoginFormValues {
  email: string
  password: string
}
export interface LoginFormState {
  isFormInvalid: boolean,
  email: string,
  password: string,
  emailError: string | null
  passwordError: string | null
}

export interface LoginFormProps {
  onSubmit: (loginValeu:LoginFormValues)=> Promise<void>
  submiting: boolean
}

const LoginForm = ({onSubmit}:LoginFormProps) => {
  const [loginState, setLoginState] = useState<LoginFormState>({
    isFormInvalid: false,
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
  })

  useEffect(() => {
    const harError = [loginState.emailError,loginState.passwordError].every((error) => error === null)
    setLoginState(old => ({ ...old, 'isFormInvalid': !harError }))
  }, [loginState.emailError, loginState.passwordError])

  useEffect(() => {
    const requiredFieldValidation = new RequiredFieldValidation()
    setLoginState(old => ({ ...old, 'emailError': requiredFieldValidation.validate(loginState.email) }))
    const emailValidation = new EmailValidation()
    setLoginState(old => ({ ...old, 'emailError': emailValidation.validate(loginState.email) }))
  }, [loginState.email])


  useEffect(() => {
    const requiredFieldValidation = new RequiredFieldValidation()
    setLoginState(old => ({ ...old, 'passwordError': requiredFieldValidation.validate(loginState.password) }))
  }, [loginState.password])
  
  const handleChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    setLoginState({
      ...loginState,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }, [loginState])
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!loginState.isFormInvalid) {

      const { passwordError,emailError, isFormInvalid, ...rest } = loginState
      await onSubmit({ ...rest } as LoginFormValues)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <Input placeholder="Email" name="email" value={loginState.email} hasError={loginState.emailError} onChange={handleChange}>
        <BsEnvelopeFill color="#666666" />
      </Input>
      <Input placeholder="Senha" name="password" type="password" value={loginState.password} hasError={loginState.passwordError} onChange={handleChange}>
        <BsLockFill color="#666666" />
      </Input>
      <button type="submit" className="login-button">login</button>
    </form>
  )
}

export default LoginForm