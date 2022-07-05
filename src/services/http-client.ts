import axios from "axios";

export const AppHttpClient = axios.create({
  baseURL: 'http://localhost:5050/api/',
  timeout: 1000,
})

export const PunkApiHttpClient = axios.create({
  baseURL: 'https://api.punkapi.com/v2/',
  timeout: 1000,
})