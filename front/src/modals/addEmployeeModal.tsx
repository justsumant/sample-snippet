import React, { Fragment, ReactElement, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { EMAIL_VALIDATION_REGEX } from "../constants/globalConstants";
import { employee } from "../models/emplyee";
import { addEmployee } from "../service/app.service";
import { previewModalActions } from "../store";

function AddEmployeeModal(): ReactElement {
  const [nameInput, setName] = useState("");
  const [emailInput, setEmail] = useState("");
  const [roleInput, setRole] = useState("admin");
  //   validations
  const [emailIsValid, setEmailValidation] = useState(true);
  const [nameIsValid, setNameValidation] = useState(true);
  //opens add employee modal
  const openModal = useSelector(
    (state: any) => state.previewModalReducer.openModal
  );
  // redux store dispatch
  const dispatch = useDispatch();

  // use mutation to save employee
  const { mutate, isLoading } = useMutation(addEmployee, {
    onSuccess: (data) => {
      console.log(data);
      clearForm();
      dispatch(previewModalActions.toggleModal(false));
    },
    onError: () => {
      console.error("error while saving employee..");
    },
  });

  /**
   * name input field handler, checks on change
   */
  const nameHandler = (event: any) => {
    const name: string = event.target.value;
    setName(name);
    if (name && name.length > 3) {
      setNameValidation(true);
    } else {
      setNameValidation(false);
    }
  };

  /**
   * email input field handler, checks on change
   */
  const emailHandler = (event: any) => {
    const email: string = event.target.value;
    setEmail(email);
    if (email && email.toLowerCase().match(EMAIL_VALIDATION_REGEX)) {
      setEmailValidation(true);
    } else {
      setEmailValidation(false);
    }
  };

  function roleHandler(event: any) {
    setRole(event.target.value);
  }

  /**
   * clears the form and sets to initial
   */
  const clearForm = () => {
    setEmail("");
    setName("");
    setRole("admin");
  };

  function saveEmployee() {
    const employee: employee = {
      email: emailInput,
      role: roleInput,
      name: nameInput,
    };
    mutate(employee);
  }

  return (
    <Fragment>
      <Modal
        size="sm"
        show={openModal}
        onHide={() => dispatch(previewModalActions.toggleModal(false))}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Add New Emloyee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              {isLoading === true ? (
                <div className="col-12">
                  <div className="text-center my-5 py-5">Saving Form...</div>
                </div>
              ) : (
                <div className="col-12">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={nameInput}
                        onChange={nameHandler}
                      />
                      {nameIsValid === false ? (
                        <small className="inputError" style={{ color: "red" }}>
                          Please enter a valid name.
                        </small>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        value={emailInput}
                        onChange={emailHandler}
                      />
                      {emailIsValid === false ? (
                        <small className="inputError" style={{ color: "red" }}>
                          Please enter a valid email ID.
                        </small>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="disabledSelect" className="form-label">
                        Role
                      </label>
                      <select
                        id="role"
                        className="form-select"
                        onChange={roleHandler}
                        value={roleInput}
                      >
                        <option value="admin">Admin</option>
                        <option value="member">Member</option>
                      </select>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={clearForm} className="btn-sm">
            Clear Form
          </Button>

          <Button
            variant="success"
            className="btn-sm"
            onClick={saveEmployee}
            disabled={!(emailIsValid && nameIsValid && nameInput && emailInput)}
          >
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default AddEmployeeModal;
