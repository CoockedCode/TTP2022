import WorkTable from "../WorkTable";
import { Box, FormControl, IconButton, List, ListItem, ListItemText, Menu, MenuItem, TextField, Grid } from "@mui/material";
import "../../styles/pages/Home.css";
import React, { useState } from "react";
import { rows } from "../WorkTableData";

// TODO
// vastavalt options valikule (0 v 1) kuvada õigeid projekte
// otsingu funktsioon korda teha, hetkel läheb katki

const data = rows;

const options = [
  "Arhiveeritud projektid", // index 0
  "Aktiivsed projektid" // index 1
];

// TODO fix this, kuna data nested objektid ss vaja enne mappida?
// const filterData = (query, data) => {
//   if(!query){
//     return data;
//   } else {
//     return data.filter((d) => d.toLowerCase().includes(query));
//   }
// };

const MainPage = () => {
  // dropdown algus
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const open = Boolean(anchorEl);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    console.log(index); // see on valiku väärtus
    setAnchorEl(null);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }
  //dropdown lopp

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
              <Box sx={{display: "inline-flex", flexGrow: "3", mx: 0, p: 0, marginRight: "2%" ,alignItems: "center"}}>
                <FormControl fullWidth >
                  <TextField id="filled-basic" label="Otsi..." variant="outlined" size="small" />
                </FormControl>
              </Box>
              <Box sx={{flexGrow: "1", maxWidth: "50%"}}>
                <FormControl>
                <List
                  // component="nav"
                  aria-label="project-select"
                  sx={{p: 0}}
                >
                  <ListItem
                    button
                    id="project-select"
                    aria-haspopup="listbox"
                    aria-controls="lock-menu"
                    aria-label="Aktiivsed projektid"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClickListItem}
                  >
                    <ListItemText
                      primary="Milliseid projekte kuvada?"
                      secondary={options[selectedIndex]}
                    />
                  </ListItem>
                </List>
                <Menu
                  id="project-select"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "project-select",
                    role: "listbox",
                  }}
                >
                  {options.map((option, index) => (
                    <MenuItem
                      key={index}
                      //disabled={index == 0}
                      selected={index == selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
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
