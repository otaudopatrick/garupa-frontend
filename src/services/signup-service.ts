import { SignupFormValues } from "../pages/signup/SignupForm/SignupForm";
import { AppHttpClient } from "./http-client";

interface SignupServiceResponse {
  accessToken: string
  id: number
}
export class SignupService {
  public static async handle(signupFormValues: SignupFormValues):Promise<SignupServiceResponse | undefined> {
      const response = await AppHttpClient.post<any,any>('/signup',signupFormValues)  
      return response
  }
}