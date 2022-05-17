import { Router } from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployees,
  udpateEmployee,
} from "../controllers/employee.controller";
const employeeRoutes = Router();

employeeRoutes.post("/", createEmployee);
employeeRoutes.get("/", getEmployees);
employeeRoutes.delete("/:id", deleteEmployee);
employeeRoutes.put("/:id", udpateEmployee);

export default employeeRoutes;
