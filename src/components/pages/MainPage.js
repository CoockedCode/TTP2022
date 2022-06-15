import WorkTable from "../WorkTable";
import { Box, FormControl, IconButton, List, ListItem, ListItemText, Menu, MenuItem, TextField, Grid } from "@mui/material";
import "../../styles/pages/Home.css";
import React, { useState } from "react";
import { rows } from "../WorkTableData";
import { MenuItem, Select } from "@mui/material";

// TODO
// vastavalt options valikule (0 v 1) kuvada õigeid projekte
// otsingu funktsioon korda teha, hetkel läheb katki

const data = rows;

const options = [
  { id: 0 , name: "Arhiveeritud projektid"},
  { id: 1 , name: "Aktiivsed projektid"},
]

// TODO fix this, kuna data nested objektid ss vaja enne mappida?
// const filterData = (query, data) => {
//   if(!query){
//     return data;
//   } else {
//     return data.filter((d) => d.toLowerCase().includes(query));
//   }
// };

const MainPage = () => {

  const [queryOption, setQueryOption] = useState(0);

  const handleChange = (event) => {
    setQueryOption(event.target.value);
  };


  // searchbar
  const [searchQuery, setSearchQuery] = useState();
  //const dataFiltered = filterData(searchQuery, data);

  return (
    <>
      <main>
        <section style={{ width: "100%", padding: "0 5%" }}>
          <div id="header-wrapper">
            <div id="page-header">
              <h3 style={{marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0}} >Aktiivsed Projektid</h3>
            </div>
            <div id="srch-bar" style={{width: "100%"}}>
              <Box sx={{display: "inline-flex", flexGrow: "5", mx: 0, p: 0, alignItems: "center"}}>
                <FormControl fullWidth sx={{ m: 1/2, minWidth: "80%" }} size="small">
                  <TextField label="Otsi..." variant="outlined" size="small" />
                </FormControl>
              </Box>
              <Box sx={{flexGrow: "1", maxWidth: "50%"}}>
              <FormControl fullWidth sx={{ m: 1/2, minWidth: "10%"}} size="small">
                <Select id={0} value={queryOption} label="" sx={{mr: "0.25rem"}} onChange={handleChange} >
                  <MenuItem key={0} value={0} placeholder={0} >
                      {"Aktiivsed projektid"}
                  </MenuItem>
                  <MenuItem key={1} value={1} placeholder={1} >
                      {"Arhiveeritud projektid"}
                  </MenuItem>
                </Select>
              </FormControl>

              </Box>
            </div>
          </div>
          <WorkTable />


        </section>
      </main>
    </>
  );
};

export default MainPage;
