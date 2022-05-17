import React, { ReactElement } from "react";

export const Header = (): ReactElement => {
  return (
    <div className="container-fluid header-container">
      <div className="row">
        <div className="col-12 text-center my-4">
          <h4>Simple Employee Management</h4>
        </div>
      </div>
    </div>
  );
};
