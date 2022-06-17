import WorkTable from "../WorkTable";
import { Box, FormControl, IconButton, SearchIcon, TextField, InputAdornment } from "@mui/material";
import "../../styles/pages/Home.css";
import React, { useState, useEffect } from "react";
import { MenuItem, Select } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

const MainPage = () => {
  const [searchQuery2, setSearchQuery2] = useState("");
  const [queryOption, setQueryOption] = useState(0);

  const handleChange = (e) => {
    setQueryOption(e.target.value);
  };

  const handleSearchQuery = (e) =>{
    setSearchQuery2(e.target.value);
  }

  return (
    <>
      <main>
        <section style={{ width: "98%", margin: "0 5%"}}>
          <div id="header-wrapper">
            <div id="page-header">
              <h3 style={{marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0}} >Projektid</h3>
            </div>
            <div id="srch-bar" style={{width: "100%"}}>
              <Box sx={{display: "inline-flex", flexGrow: "5", mx: 0, py: "0.55rem"}} >
                <FormControl fullWidth size="small">

                  <TextField label="Otsi..." variant="outlined" size="small"
                    onInputCapture={(e)=>{handleSearchQuery(e)}}

                    InputProps={{
                      endAdornment: (
                        <>
                        <InputAdornment position="end">
                          <FormControl fullWidth size="small" >
                            <Select value={queryOption} label="" onChange={handleChange} variant="standard" disableUnderline={true} sx={{mb: "-0.2rem"}}>
                              <MenuItem key={0} value={0} placeholder={0} >
                                  {"Aktiivsed projektid"}
                              </MenuItem>
                              <MenuItem key={1} value={1} placeholder={1} >
                                  {"Arhiveeritud projektid"}
                              </MenuItem>
                            </Select>
                          </FormControl>
                          {/*<IconButton edge="end" color="primary" onClick={(e) => { handleSubmit(e) }} >
                            <SearchIcon />
                          </IconButton>*/}
                        </InputAdornment>
                          </>
                      ),
                    }}
                  />
                </FormControl>
              </Box>
            </div>
          </div>
          <div style={{marginTop: "0.2rem"}}>
            <WorkTable searchQuery={searchQuery2}  queryOption={queryOption} />
          </div>
        </section>
      </main>
    </>
  );
};

export default MainPage;
