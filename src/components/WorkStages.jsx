import React from 'react';
import { useState, useEffect } from 'react';
import { FormControl } from '@mui/material';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl } from '@mui/material';;
import "../styles/pages/Home.css";
import { useDispatch } from "react-redux";
import DropDown from './DropDown';

const WorkStages = () => {
  // const dispatch = useDispatch();

  const endpoint = "https://elektrimasinad.digifi.eu/api";


   const stages = [
     {stageHard:'Hooldus'},
     {stageHard:'Remont'},
     {stageHard:'Müük'},
     {stageHard:'Defekteerimine'},
     {stageHard:'Garantii'},
     {stageHard:'Välitöö/Diagnostika'},
     {stageHard:'Välitöö/Laagrite vahetus'},
     {stageHard:'Välitöö/Remont'},
     {stageHard:'Välitöö/Tasakaalustus'},
     {stageHard:'Välitöö/Joondamine'},
     {stageHard:'Välitöö/Seadme vahetus'},
     {stageHard:'Välitöö/Joondamine'},
     {stageHard:'Grundfosi garant. käsitlemine'}
  ]

    const parts = [
      {partHard:'Defekteerimine'},
      {partHard:'Lahtivõtmine'},
      {partHard:'Mähkimine'},
      {partHard:'Valgustus'},
      {partHard:'Tasakaalustamine'},
      {partHard:'Laagrite vahetus'},
      {partHard:'Kokkupanek'},
      {partHard:'Katsetamine'},
      {partHard:'Värvimine'}

    ]

    // Tööliigi ID hook
    const [stageName, setStageName] = useState("");
    const handleStageNameChange = (e) => {
      setStageType(e.target.value);}
    
    // Tööliigi võimaluste hook
    const [stageOptions, setStageOptions]=useState([]);
    const getStageOptions = async() =>{
    const response = await axios.get(endpoint+'/choice/fnc_select_transport.php');// Back-end tegemata
    console.log(response);
    setStageOptions([]);
    response.data.forEach(element=>{
      setStageOptions(oldArray => [...oldArray, element]);
      })
    }

    // Tööetapi ID hook
    const [partName, setPartName] = useState("");
    const handlePartNameChange = (e) => {
      setStageType(e.target.value);}

    // Tööliigi võimaluste hook
    const [partOptions, setPartOptions]=useState([]);
    const getPartOptions = async() =>{
    const response = await axios.get(endpoint+'/choice/fnc_select_transport.php');// Back-end tegemata
    console.log(response);
    setPartOptions([]);
    response.data.forEach(element=>{
      setPartOptions(oldArray => [...oldArray, element]);
      })
    }
 
    useEffect(() => {
      getStageOptions();
    }, []);

    useEffect(() => {
      getPartOptions();
    }, []);


  return (
  <>
    <main>
      <section style={{ width: "100%", padding: "0 5%" }}>
        <div id="header-wrapper">
          <div id="page-header">
            <h3>Valikute seaded</h3>
          </div>
        </div>
      <Button
        type="button"
        variant="contained"
        sx={{ mt: 2, mb: 2, bgcolor: 'main', width: 'auto' }}
        // onClick={handleClickOpen}
        >
      Lisa
      </Button>
    <Box component="form" noValidate autoComplete="off">
    <FormControl sc={{width: "100%"}}>
      <DropDown
        name="Tööliigid"
        ID="workStage" 
        value={stageName}
        label="Tööliigid"
        options={stages}
        // onChange={handleDeviceChange}
        />
      <Button
        type="button"
        variant="contained"
        label="Kustuta"
        sx={{ mt: 2, mb: 2, bgcolor: 'red', width: 'auto' }}
        // onClick={handleDeletionOpen}
        >
			</Button>
      <DropDown
        name="Tööetapid" 
        ID="workPart"
        value={partName}
        label="Tööetapid"
        options={parts}
        // onChange={handlePartCHange}
      ></DropDown>
      </FormControl>
      </Box>
      </section>
    </main>
  </>
   );
};

export default WorkStages;