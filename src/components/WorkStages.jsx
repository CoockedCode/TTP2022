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
import "../../styles/pages/Home.css";
import DropDown from "../DropDown";
import { useDispatch } from "react-redux";


const WorkStage = () => {
  // const dispatch = useDispatch();

  const endpoint = "https://elektrimasinad.digifi.eu/api";


  const rows = [
    {stageName:'Hooldus'},
    {stageName:'Remont'},
    {stageName:'Müük'},
    {stageName:'Defekteerimine'},
    {stageName:'Garantii'},
    {stageName:'Välitöö/Diagnostika'},
    {stageName:'Välitöö/Laagrite vahetus'},
    {stageName:'Välitöö/Remont'},
    {stageName:'Välitöö/Tasakaalustus'},
    {stageName:'Välitöö/Joondamine'},
    {stageName:'Välitöö/Seadme vahetus'},
    {stageName:'Välitöö/Joondamine'},
    {stageName:'Grundfosi garant. käsitlemine'}
  ]

  const [stageName, setStageName] = useState("");
  const handleStageNameChange = (e) => {
    setStageType(e.target.value);}
    const [stageOptions, setStageOptions]=useState([]);
    const getStageOptions = async() =>{
      const response = await axios.get(endpoint+'/choice/fnc_select_transport.php');
      console.log(response);
      setStageOptions([]);
      response.data.forEach(element=>{
        setStageOptions(oldArray => [...oldArray, element]);
      })
    }
    useEffect(() => {
      getStageOptions();
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
        onClick={handleClickOpen}
        >
      Lisa
      </Button>
    <Box component="form" noValidate autoComplete="off">
    <FormControl sc={{width: "100%"}}>
      <DropDown
        name="Seadme liik" ID="choiceType" 
        value={deviceID} label="Seadme liik"
        onChange={handleDeviceChange}
        options={typeOptions}
        />
      <Button
        type="button"
        variant="contained"
        sx={{ mt: 2, mb: 2, bgcolor: 'red', width: 'auto' }}
        onClick={handleDeletionOpen}
        >
                Kustuta
						  </Button>
      </FormControl>
      </Box>
      </section>
    </main>
  </>
   );
};

export default WorkStage;