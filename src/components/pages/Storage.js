import StorageTable from "../StorageTable";
import { FormControl, TextField, Box } from "@mui/material";
import "../../styles/pages/Home.css";
import TextField from '@mui/material/TextField';
import React, { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useDispatch } from "react-redux";
import axios from 'axios';
import { endpoint } from "../../endpoint";
import DropDown from "../DropDown";
import React, { useState, useEffect } from 'react';
import { setSnackbar } from "../../redux/ducks/snackbar";

const ClientList = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQuery = (e) =>{
    setSearchQuery(e.target.value);
  }
  const [openAddition, setOpenAddition] = useState(false);
  const handleAdditionOpen = () => {
    setOpenAddition(true);
  };

  const handleAdditionClose = () => {
    setOpenAddition(false);
  };
  const [openTaking, setOpenTaking] = useState(false);
  const handleTakingOpen = () => {
    setOpenTaking(true);
  };

  const handleTakingClose = () => {
    setOpenTaking(false);
  };
  const [nameValue, setNameValue] = useState("")
  const handleValueChange=(e)=>{
    setNameValue(e.target.value);
  }
  const [unitType, setUnitType] = useState("")
  const handleTypeChange=(e)=>{
    setUnitType(e.target.value);
  }
  const [priceValue, setPriceValue] = useState("")
  const handlePriceChange=(e)=>{
    setPriceValue(e.target.value);
  }
  const addToStorage = () => {
    const toSave ={
      name: nameValue,
      type: unitType,
      price: priceValue
    }
    axios.post(endpoint+"/view/storage/fnc_add_to_storage.php", toSave)
		.then(function (response) {
			console.log(response);
			if(response.status === 200){
				dispatch(setSnackbar(true,"success","Materjal edukalt lisatud!"));
			}
		})
		.catch(function (err) {
			console.log(err);
			dispatch(setSnackbar(true,"error","Salvestamisel tekkis viga!"))
		});
    handleAdditionClose();
  }
  const [materialID, setMaterialID] = useState("")
  const handleOptionChange=(e)=>{
    setMaterialID(e.target.value);
  }
  const [materialOptions, setMaterialOption ] = useState([]);
  const getMaterialOptions = async() =>{
    const response = await axios.get(endpoint + '/view/storage/fnc_select_material.php?material');
    setMaterialOption([]);
    response.data.forEach(element=>{
      setMaterialOption(oldArray => [...oldArray, element]);
    })
  }
  useEffect(() => {
    getMaterialOptions();
  }, []);
  const deleteMaterial = () => {
    const toDelete={
      materialID: materialID
    }
    axios.post(endpoint+"/view/storage/fnc_delete_from_storage.php", toDelete)
		.then(function (response) {
			console.log(response);
			if(response.status === 200){
				dispatch(setSnackbar(true,"success","Materjal edukalt kustutatud!"));
			}
		})
		.catch(function (err) {
			console.log(err);
			dispatch(setSnackbar(true,"error","Kustutamisel tekkis viga!"))
		});
    handleAdditionClose();
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
                <FormControl sx={{minWidth: "9rem", mx: 1}}>
                  <Button
                      type="button"
                      variant="outlined"
                      sx={{ my: 2 }}
                      onClick={handleAdditionOpen}
                      >
                      Lisa uusi materjale lattu
                  </Button>
                </FormControl>
                <FormControl sx={{minWidth: "9rem", mx: 1}}>
                  <Button
                      type="button"
                      variant="outlined"
                      sx={{ my: 2 }}
                      onClick={handleTakingOpen}
                      >
                      Kustuta materjale laost
                  </Button>
                </FormControl>
              </Box>
            </div>
          </div>
          <StorageTable searchQuery={searchQuery} />
        </section>
        <Dialog
            open={openAddition}
            onClose={handleAdditionClose}
              maxWidth="xs"
              fullWidth
                PaperProps={{
                  sx: {
                    p: 6,
                    pt: 1.5,
                  }
                }}
            >
            <DialogTitle>
            Lisa materjal
            </DialogTitle>
                    <FormControl noValidate >
                                <TextField
                                    required
                                    fullWidth
                                    id="materialName"
                                    label="Sisesta materjali nimetus"
                                    name="materialName"
                                    autoComplete="none"
                                    onChange={handleValueChange}
                                    type="text"
                                    margin="dense"
                                    size="small"
                                    />
                                <TextField
                                    fullWidth
                                    id="materialType"
                                    label="Materjali tüüp"
                                    name="materialType"
                                    autoComplete="none"
                                    onChange={handleTypeChange}
                                    type="text"
                                    margin="dense"
                                    size="small"

                                    />
                                <TextField
                                    fullWidth
                                    id="materialPrice"
                                    label="Materjali hind"
                                    name="materialPrice"
                                    autoComplete="none"
                                    onChange={handlePriceChange}
                                    type="text"
                                    margin="dense"
                                    size="small"

                                    />
                    </FormControl>
                    <FormControl fullWidth sx={{display: "flex", flexDirection: "row", justifyContent: "center", mt: 2}} >
                        <Button
                            variant="outlined"
                            color="info"
                             size="medium"
                            onClick={handleAdditionClose}
                            sx={{mr: 1, width: "100%"}}

                            >
                            Tühista
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={addToStorage}
                            size="medium"
                            sx={{ml: 1, width: "100%"}}
                            >
                            Lisa
                        </Button>
                      </FormControl>
            </Dialog>
            <Dialog
            open={openTaking}
            onClose={handleTakingClose}
              maxWidth="xs"
              fullWidth
                PaperProps={{
                  sx: {
                    p: 6,
                    pt: 1.5,
                  }
                }}
            >
            <DialogTitle>
            Kustuta materjal
            </DialogTitle>
                    <FormControl noValidate >
                    <DropDown
                      name="Materjal" ID="materialOption"
                      value={materialID} label="Materjal"
                      onChange={handleOptionChange}
                      options={materialOptions}
                      />
                    </FormControl>
                    <FormControl fullWidth sx={{display: "flex", flexDirection: "row", justifyContent: "center", mt: 2}} >
                        <Button
                            variant="outlined"
                            color="info"
                             size="medium"
                            onClick={handleTakingClose}
                            sx={{mr: 1, width: "100%"}}

                            >
                            Tühista
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={deleteMaterial}
                            size="medium"
                            sx={{ml: 1, width: "100%"}}
                            >
                            Kustuta
                        </Button>
                      </FormControl>
            </Dialog>
      </main>
    </>
  );
};

export default ClientList;
