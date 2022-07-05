import validator from "validator";

export class EmailValidation {
  validate (email:string): string| null {
    return (email !== "") && !validator.isEmail(email) ? "Email inválido" : null 
  }
}