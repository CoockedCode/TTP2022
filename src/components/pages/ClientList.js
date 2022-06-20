import ClientListTable from "../ClientListTable";
import { FormControl, TextField, Box, Select, MenuItem } from "@mui/material";
import "../../styles/pages/Home.css";
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import React, { useState } from "react";

const ClientList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQuery = (e) =>{
    setSearchQuery(e.target.value);
  }

  return (
    <>
      <main>
        <section style={{ width: "100%", padding: "0 5%" }}>
          <div id="header-wrapper">
            <div id="page-header">
              <h3>Kliendid</h3>
            </div>
            <div id="srch-bar">
              <Box sx={{display: "inline-flex", flexGrow: "5", mx: 0, py: "0.55rem"}} >
                <FormControl fullWidth size="small">
                  <TextField label="Otsi..." variant="outlined" size="small"
                    onInputCapture={(e)=>{handleSearchQuery(e)}}
                  />
                </FormControl>
              </Box>
            </div>
          </div>
          <ClientListTable searchQuery={searchQuery} />
        </section>
      </main>
    </>
  );
};

export default ClientList;
