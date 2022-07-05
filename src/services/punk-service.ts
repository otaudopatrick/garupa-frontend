import { PunkApiHttpClient } from "./http-client";

export interface  PunkService{
  page: number
  limit: number
}
export class PunkService {
  public static async handle({page, limit}:PunkService):Promise<any | undefined> {
      const response = await PunkApiHttpClient.get<any,any>(`/beers?page=${page}&per_page=${limit}  `)
      return response
  }
}