import React, { useCallback, useEffect, useState } from "react";
import Input from "../../../components/input";
import { CompareFieldsValidation } from "../../../validators/compare-fields-validation";
import { EmailValidation } from "../../../validators/email-validaiton";
import { RequiredFieldValidation } from "../../../validators/required-field-validation";

export interface SignupFormValues {
  email: string
  firstName: string
  lastName: string
  password: string
  passwordConfirmation: string
}
export interface SignupFormState {
  isFormInvalid: boolean,
  firstName: string
  lastName: string
  email: string,
  password: string,
  passwordConfirmation: string
  firstNameError: string | null
  lastNameError: string | null
  emailError: string | null
  passwordError: string | null
  passwordConfirmationError: string | null
}
export interface SignupFormProps {
  onSubmit: (signupValues: SignupFormValues) => Promise<void>
  submiting: boolean
}
const SignupForm = ({ onSubmit }: SignupFormProps) => {
  const [signupState, setSignupState] = useState<SignupFormState>({
    isFormInvalid: false,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: "",
    passwordConfirmationError: "",
  })

  useEffect(() => {
    const harError = [signupState.firstNameError, signupState.lastNameError, signupState.passwordError, signupState.passwordConfirmationError].every((error) => error === null)
    setSignupState(old => ({ ...old, 'isFormInvalid': !harError }))
  }, [signupState.firstNameError, signupState.lastNameError, signupState.passwordConfirmationError, signupState.passwordError])

  useEffect(() => {
    const requiredFieldValidation = new RequiredFieldValidation()
    setSignupState(old => ({ ...old, 'firstNameError': requiredFieldValidation.validate(signupState.firstName) }))
  }, [signupState.firstName])

  useEffect(() => {
    const requiredFieldValidation = new RequiredFieldValidation()
    setSignupState(old => ({ ...old, 'lastNameError': requiredFieldValidation.validate(signupState.lastName) }))
  }, [signupState.lastName])

  useEffect(() => {
    const requiredFieldValidation = new RequiredFieldValidation()
    setSignupState(old => ({ ...old, 'emailError': requiredFieldValidation.validate(signupState.email) }))
    const emailValidation = new EmailValidation()
    setSignupState(old => ({ ...old, 'emailError': emailValidation.validate(signupState.email) }))
  }, [signupState.email])

  useEffect(() => {
    const requiredFieldValidation = new RequiredFieldValidation()
    setSignupState(old => ({ ...old, 'passwordError': requiredFieldValidation.validate(signupState.password) }))
    const compareFieldsValidation = new CompareFieldsValidation()
    setSignupState(old => ({ ...old, 'passwordError': compareFieldsValidation.validate(signupState.password, signupState.passwordConfirmation) }))
  }, [signupState.password, signupState.passwordConfirmation])

  useEffect(() => {
    const requiredFieldValidation = new RequiredFieldValidation()
    setSignupState(old => ({ ...old, 'passwordConfirmationError': requiredFieldValidation.validate(signupState.passwordConfirmation) }))
    const compareFieldsValidation = new CompareFieldsValidation()
    setSignupState(old => ({ ...old, 'passwordConfirmationError': compareFieldsValidation.validate(signupState.password, signupState.passwordConfirmation) }))
  }, [signupState.password, signupState.passwordConfirmation])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!signupState.isFormInvalid) {

      const { passwordError, lastNameError, firstNameError, emailError, passwordConfirmationError, isFormInvalid, ...rest } = signupState
      onSubmit({ ...rest } as SignupFormState)
    }
  }
  const handleChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    setSignupState({
      ...signupState,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }, [signupState])
  return (
    <form onSubmit={handleSubmit} >
      <Input placeholder="Nome" name="firstName" value={signupState.firstName} hasError={signupState.firstNameError} onChange={handleChange} />
      <Input placeholder="Sobrenome" name="lastName" value={signupState.lastName} hasError={signupState.lastNameError} onChange={handleChange} />
      <Input placeholder="Email" name="email" value={signupState.email} hasError={signupState.emailError} onChange={handleChange} />
      <Input placeholder="Senha" name="password" type="password" value={signupState.password} hasError={signupState.passwordError} onChange={handleChange} />
      <Input placeholder="Confirmação de senha" name="passwordConfirmation" type="password" value={signupState.passwordConfirmation} hasError={signupState.passwordConfirmationError} onChange={handleChange} />
      <button className="login-button">Criar Conta</button>
    </form>
  )
}

export default SignupForm