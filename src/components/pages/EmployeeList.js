import React, { useState } from "react";
import EmployeeListTable from "../EmployeeListTable";
import { FormControl, TextField, Box } from "@mui/material";
import "../../styles/pages/Home.css";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import EmployeeRolesList from "../EmployeeRolesList";

// TODO
// search

const EmployeeList = () => {

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  }

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/lisa-tootaja");
  }

  return (
    <>
      <main>
        <section style={{ width: "100%", padding: "0 5%" }}>
          <div id="header-wrapper">
            <div id="page-header">
              <h3>Töötajad</h3>
            </div>
            <div id="srch-bar">
              <Box sx={{display: "inline-flex", flexGrow: "5", mx: 0, py: "0.55rem"}} >
                <FormControl fullWidth size="small" sx={{ alignSelf: "center"}}>
                  <TextField label="Otsi..." variant="outlined" size="small"
                   onInputCapture={(e) => {handleSearchQuery(e)}}
                  />
                </FormControl>
                <Button
                    onClick={handleClick}
                    variant="contained"
                    sx={{ mt: 2, mb: 2, bgcolor: 'main', width: 'auto'}}
                    // margin="dense"
                  >
                    Lisa töötaja
                  </Button>
              </Box>
            </div>
          </div>
          <EmployeeListTable searchQuery={searchQuery}/>

        </section>
      </main>
    </>
  );
};

export default EmployeeList;