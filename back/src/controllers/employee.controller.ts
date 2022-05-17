import { RequestHandler } from "express";
import {
  EMPLOYEE_CREATD,
  EMPLOYEE_DELETED,
  EMPLOYEE_NOT_FOUND,
} from "../constants/globalConstants";
import { employee } from "../models/employee";

const EMPLOYEES: employee[] = [
  {
    id: 153,
    name: "sumant gupta",
    email: "me@mail.com",
    role: "admin",
  },
  {
    id: 321,
    name: "sumant gupta",
    email: "me2@mail.com",
    role: "admin",
  },
];
export const createEmployee: RequestHandler = (req, res, next) => {
  const newEmployee: employee = {
    id: new Date().getMilliseconds(),
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  EMPLOYEES.push(newEmployee);
  res.status(201).json({ message: EMPLOYEE_CREATD, employee: newEmployee });
};

export const getEmployees: RequestHandler = (req, res, next) => {
  res.status(201).json({ employees: EMPLOYEES });
};

export const udpateEmployee: RequestHandler<{ id: number }> = (
  req,
  res,
  next
) => {
  const employeeId: number = req.params.id as number;
  const udpatedEmployee: employee = {
    name: req.body.name as string,
    email: req.body.email as string,
    role: req.body.role as string,
  };
  const employeeIndex = EMPLOYEES.findIndex(
    (employee) => employeeId == employee.id
  );
  if (employeeIndex < 0) {
    throw new Error(EMPLOYEE_NOT_FOUND);
  }
  EMPLOYEES[employeeIndex] = udpatedEmployee;
  res.status(201).json({
    message: EMPLOYEE_CREATD,
    employee: EMPLOYEES[employeeIndex],
  });
};

export const deleteEmployee: RequestHandler<{ id: number }> = (
  req,
  res,
  next
) => {
  const employeeId: number = (req.params as { id: number }).id;
  const employeeIndex = EMPLOYEES.findIndex((employee) => {
    console.log(employee, typeof employeeId, typeof employee.id);

    return employeeId == employee.id;
  });
  console.log("employee id: ", employeeId, employeeIndex);

  if (employeeIndex < 0) {
    throw new Error(EMPLOYEE_NOT_FOUND);
  }
  EMPLOYEES.splice(employeeIndex, 1);
  res.status(201).json({ message: EMPLOYEE_DELETED });
};
