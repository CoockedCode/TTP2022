import ClientListTable from "../ClientListTable";
import { FormControl, TextField, Box} from "@mui/material";
import "../../styles/pages/Home.css";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ClientList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQuery = (e) =>{
    setSearchQuery(e.target.value);
  }

  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/lisa-klient");
  }

  const handleChangeClick = () => {
    navigate("/uuenda-klient");
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
              <Box sx={{display: "inline-flex", flexGrow: "2", mx: 0, py: "0.55rem"}} >
                <FormControl fullWidth size="small" sx={{ alignSelf: "center"}}>
                  <TextField label="Otsi..." variant="outlined" size="small"
                    onInputCapture={(e)=>{handleSearchQuery(e)}}
                  />
                </FormControl>
                <FormControl size="small" sx={{display: "flex", flexDirection: "row", minWidth: "max-content"}} >
                  <Button
                    onClick={handleChangeClick}
                    variant="outlined"
                    size="small"
                    sx={{px: 2, ml: 1}}
                  >
                    Muuda klienti
                  </Button>
                  <Button
                    onClick={handleAddClick}
                    variant="contained"
                    size="small"
                    sx={{px: 2, ml: 1}}
                  >
                    Lisa klient
                  </Button>
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
