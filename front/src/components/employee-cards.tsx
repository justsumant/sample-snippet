import React, { Fragment, ReactElement, useEffect, useState } from "react";
import { fetchEmployees, deleteEmployee } from "../service/app.service";
import maleEmployee from "../assets/images/user-male.jpeg";
import { useMutation, useQuery } from "react-query";
import { employee } from "../models/emplyee";
import TrashIcon from "./common/icons/trash";

export const EmployeeCards = (): ReactElement => {
  const { isLoading, data, isError } = useQuery("employees", fetchEmployees);
  const { mutate } = useMutation(deleteEmployee, {
    onSuccess: (result: any) => {
      alert("employee deleted successfully");
    },
    onError: () => {
      console.error("error while deleting employee..");
    },
  });
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    setEmployees(data?.data?.employees);
  }, [data]);

  function gotoDeleteEmployee(employeeId: number): void {
    mutate(employeeId);
  }

  if (isLoading) {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h5>loading employees!!!</h5>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-12 text-danger text-center">
              <h6>Error while loading employee list!!</h6>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <Fragment>
      {employees?.map((employee: employee, index: number) => {
        return (
          <div className="card m-2" style={{ width: "14rem" }} key={index}>
            <img src={maleEmployee} className="card-img-top" alt="employeeee" />
            <div className="card-body text-center">
              <h5 className="card-title">{employee.name}</h5>
              <p className="card-text">{employee.email}</p>
              <button
                className="btn btn-danger  btn-sm"
                onClick={() => {
                  gotoDeleteEmployee(employee.id as number);
                }}
              >
                <TrashIcon /> Delete
              </button>
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};
