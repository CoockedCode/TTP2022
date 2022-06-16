import WorkTable from "../WorkTable";
import { Box, FormControl, IconButton, SearchIcon, TextField, InputAdornment } from "@mui/material";
import "../../styles/pages/Home.css";
import React, { useState } from "react";
import { MenuItem, Select } from "@mui/material";

import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';



const MainPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [queryOption, setQueryOption] = useState(0);
  const [search, setSearch] = useState("");
  const [search2, setSearch2] = useState("");

  const handleChange = (event) => {
    setQueryOption(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(searchQuery);
    setSearch2(queryOption);
    console.log(search)
    console.log(search2)
  };





  return (
    <>
      <main>
        <section style={{ width: "100%", padding: "0 5%" }}>
          <div id="header-wrapper">
            <div id="page-header">
              <h3 style={{marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0}} >Aktiivsed Projektid</h3>
            </div>
            <div id="srch-bar" style={{width: "100%"}}>
              <Box sx={{display: "inline-flex", flexGrow: "5", mx: 0, py: "0.4rem"}} >
                <FormControl fullWidth size="small">

                  <TextField label="Otsi..." variant="outlined" size="small"
                    onInput={(e)=>{setSearchQuery(e.target.value)}}
                    InputProps={{
                      endAdornment: (
                        <>
                        <InputAdornment position="end">
                          <FormControl fullWidth  size="small">
                            <Select id={0} value={queryOption} label="" onChange={handleChange} variant="standard" disableUnderline={true}>
                              <MenuItem key={0} value={0} placeholder={0} >
                                  {"Aktiivsed projektid"}
                              </MenuItem>
                              <MenuItem key={1} value={1} placeholder={1} >
                                  {"Arhiveeritud projektid"}
                              </MenuItem>
                            </Select>
                          </FormControl>
                          <IconButton edge="end" color="primary" onClick={(e) => { handleSubmit(e) }} >
                            <SearchIcon />
                          </IconButton>

                        </InputAdornment>
                          </>
                      ),
                    }}
                  />
                </FormControl>
              </Box>
            </div>
          </div>
            <WorkTable srchQuery={"1"} srchOption={"1"} />


        </section>
      </main>
    </>
  );
};

export default MainPage;
