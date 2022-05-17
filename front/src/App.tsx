import React, { Fragment, ReactElement, useState } from "react";
import "./App.css";
import AddEmployeeModal from "./modals/addEmployeeModal";
import { useDispatch } from "react-redux";
import { previewModalActions } from "./store";
import { EmployeeCards } from "./components/employee-cards";
import { Header } from "./components/header";
import PlusIcon from "./components/common/icons/plus";

function App(): ReactElement {
  const dispatch = useDispatch();

  const [openFormModal, setOpenFormModal] = useState(false);

  function openAddEmployeeModal(): void {
    setOpenFormModal(true);
    dispatch(previewModalActions.toggleModal(true));
  }
  return (
    <Fragment>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex justify-content-end py-3">
            <button
              type="button"
              className="btn btn-info text-light"
              onClick={openAddEmployeeModal}
            >
              Add Employee <PlusIcon />
            </button>
          </div>
          <div className="col-12 d-flex  flex-wrap align-content-around mb-5">
            <EmployeeCards />
          </div>
        </div>
        {openFormModal && <AddEmployeeModal />}
      </div>
    </Fragment>
  );
}

export default App;
