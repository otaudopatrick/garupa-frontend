import { LoginFormValues } from "../pages/login/LoginForm/LoginForm";
import { AppHttpClient } from "./http-client";

interface LoginServiceResponse {
  accessToken: string
  id: number
}
export class LoginService {
  public static async handle(loginFormValues: LoginFormValues):Promise<LoginServiceResponse | undefined> {
      const response = await AppHttpClient.post<any,any>('/login',loginFormValues)  
      return response
  }
}