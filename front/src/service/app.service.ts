import axios, { AxiosResponse } from "axios";
import { employee } from "../models/emplyee";

const BASE_URL = "http://localhost:3004/api";

export function fetchEmployees(): Promise<AxiosResponse<any, any>> {
  return axios.get(BASE_URL);
}

export function addEmployee(
  employee: employee
): Promise<AxiosResponse<any, any>> {
  return axios.post(BASE_URL, employee);
}

export function deleteEmployee(
  employeeId: number
): Promise<AxiosResponse<any, any>> {
  return axios.delete(`${BASE_URL}/${employeeId}`);
}
