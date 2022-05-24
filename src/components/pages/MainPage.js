import WorkTable from "../WorkTable";
import { FormControl, IconButton, List, ListItem, ListItemText, Menu, MenuItem, TextField } from "@mui/material";
import "../../styles/pages/Home.css";
import { useState } from "react";
import { rows } from "../WorkTableData";

// TODO
// vastavalt options valikule (0 v 1) kuvada õigeid projekte
// otsingu funktsioon korda teha, hetkel läheb katki

const data = rows;

const options = [
  "Arhiveeritud projektid", // index 0
  "Aktiivsed projektid" // index 1
];

const SearchBar = ({setSearchQuery}) => (
  <form>
    <TextField
      id="search-bar"
      className="text"
      onInput={(e) => {
        setSearchQuery(e.target.value);
      }}
      label="Otsi..."
      variant="outlined"
      size="small"
      />
      <IconButton type="submit" aria-label="search">
        {/* <SearchIcon style={{ fill: "blue"}} /> */}
      </IconButton>
  </form>
);

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
              <h3>Aktiivsed Projektid</h3>
            </div>
            <div id="srch-bar">
              <FormControl fullWidth>
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              </FormControl>
            </div>
            <div>
              <List
                component="nav"
                aria-label="project-select"
                sx={{ bgcolor: "background.paper" }}
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
                    key={option}
                    //disabled={index == 0}
                    selected={index == selectedIndex}
                    onClick={(event) => handleMenuItemClick(event, index)}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </div>
          <WorkTable />
        </section>
      </main>
    </>
  );
};

export default MainPage;
