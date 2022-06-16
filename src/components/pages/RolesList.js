import React from "react";
import EmployeeListTable from "../EmployeeListTable";
import { FormControl, TextField } from "@mui/material";
import "../../styles/pages/Home.css";

const EmployeeList = () => {
  return (
    <>
      <main>
        <section style={{ width: "100%", padding: "0 5%" }}>
          <div id="header-wrapper">
            <div id="page-header">
              <h3>Töörollid</h3>
            </div>
            <div id="srch-bar">
              <FormControl fullWidth>
                <TextField id="filled-basic" label="Otsi..." variant="outlined" size="small" />
              </FormControl>
            </div>
          </div>
          <EmployeeListTable />

        </section>
      </main>
    </>
  );
};

export default EmployeeList;