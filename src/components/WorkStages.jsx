import { useState, useEffect } from 'react';
import { FormControl } from '@mui/material';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import axios from 'axios';
import { Dialog } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { FormControl } from '@mui/material';;
import "../styles/pages/Home.css";
//import { useDispatch } from "react-redux";
import DropDown from './DropDown';
import { TextField } from '@mui/material';
import { endpoint } from "../endpoint";

const WorkStages = () => {
  // const dispatch = useDispatch();

  //  const stages = [
  //    {name:'Hooldus'},
  //    {name:'Remont'},
  //    {name:'Müük'},
  //    {name:'Defekteerimine'},
  //    {name:'Garantii'},
  //    {name:'Välitöö/Diagnostika'},
  //    {name:'Välitöö/Laagrite vahetus'},
  //    {name:'Välitöö/Remont'},
  //    {name:'Välitöö/Tasakaalustus'},
  //    {name:'Välitöö/Joondamine'},
  //    {name:'Välitöö/Seadme vahetus'},
  //    {name:'Välitöö/Joondamine'},
  //    {name:'Grundfosi garant. käsitlemine'}
  // ]

    // const parts = [
    //   {name:'Defekteerimine'},
    //   {name:'Lahtivõtmine'},
    //   {name:'Mähkimine'},
    //   {name:'Valgustus'},
    //   {name:'Tasakaalustamine'},
    //   {name:'Laagrite vahetus'},
    //   {name:'Kokkupanek'},
    //   {name:'Katsetamine'},
    //   {name:'Värvimine'}

    // ]

    // Tööliigi ID hook
    const [stageName, setStageName] = useState("");
    const handleStageChange = (e) => {
      setStageName(e.target.value);}

    // Tööliigi võimaluste hook
    const [stageOptions, setStageOptions]=useState([]);
    const getStageOptions = async() =>{
    const response = await axios.get(endpoint+'/view/workstages/fnc_read_workstages.php?work_stages');
    console.log(response);
    setStageOptions([]);
    response.data.forEach(element=>{
      setStageOptions(oldArray => [...oldArray, element]);
      })
    }

    // Tööetapi ID hook
    const [partName, setPartName] = useState("");
    const handlePartChange = (e) => {
      setPartName(e.target.value);}

    // Tööliigi võimaluste hook
    const [partOptions, setPartOptions]=useState([]);
    const getPartOptions = async() =>{
    const response = await axios.get(endpoint+'/view/workstages/fnc_read_workstages.php?work_levels');
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

    const [openStages, setOpenStages] = useState(false)
    const handleClickStages = () => {
      setOpenStages(true);
    };
    const handleCloseStages = () => {
      setOpenStages(false);
    };

    const [openLevels, setOpenLevels] = useState(false)
    const handleClickLevels = () => {
      setOpenLevels(true);
    };
    const handleCloseLevels = () => {
      setOpenLevels(false);
    };


    const toSave={
      stageID: stageName,
      stageName: stageOptions,
    }
    // handleAddition(toSave);

  // const handleAddition=(toSave)=>{
  //   axios.post(endpoint+"/choice/fnc_add_worklevels.php", toSave)
  //     .then(function (response) {
  //       console.log(response);
  //       if(response.status === 200){
  //       }
  //     })
  //     .catch(function (err) {
  //     });
  //     handleClose();
  //   };


  return (
  <>
    <main>
      <section style={{ width: "100%", padding: "0 5%" }}>
        <div id="header-wrapper">
          <div id="page-header">
            <h3>Tööde nimetused ja etapid</h3>
          </div>
        </div>
      <Box component="form" noValidate autoComplete="off">
        <FormControl sc={{width: "100%"}}>
          <DropDown
            name="Tööliigid"
            ID="workStage"
            value={stageName}
            label="Tööliigid"
            options={stageOptions}
            onChange={handleStageChange}
          />
          <Button
            type="button"
            variant="contained"
            sx={{ mt: 2, mb: 2, bgcolor: 'main', width: 'auto' }}
            onClick={handleClickStages}
          >            Lisa tööliigi
          </Button>
          <Button
            type="button"
            variant="contained"
            sx={{ mt: 2, mb: 2, bgcolor: 'red', width: 'auto' }}
            onClick={handlePartChange}
          >
            Kustuta valitud tööliigi
          </Button>
        <Dialog
          open={openStages}
          onClose={handleCloseStages}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <TextField
                required
                fullWidth
                id="choiceValue"
                label="Sisesta uue tööliigi"
                name="choiceValue"
                autoComplete="none"
                // onChange={handleValueChange}
                type="text"
                margin="dense"
                size="small" />
          </DialogContentText>
          <Button
            type="button"
            variant="contained"
            sx={{ mt: 2, mb: 2, mr: 2, bgcolor: 'main', width: 'auto' }}
            onClose={handleCloseStages}
          >
            Tühista
          </Button>
          <Button
            type="button"
            variant="contained"
            sx={{ mt: 2, mb: 2, bgcolor: 'main', width: 'auto' }}
          >
            Lisa andmebaasi
          </Button>
        </DialogContent>
        </Dialog>
        </FormControl>
      </Box>
      <Box component="form" noValidate autoComplete="off">
        <FormControl sc={{width: "100%"}}>
          <DropDown
            name="Tööetapid"
            ID="workPart"
            value={partName}
            label="Tööetapid"
            options={partOptions}
            onChange={handlePartChange}
          >
          </DropDown>
          <Button
            type="button"
            variant="contained"
            sx={{ mt: 2, mb: 2, bgcolor: 'main', width: 'auto' }}
            onClick={handleClickLevels}
          >
            Lisa tööetapp
          </Button>
          <Button
            type="button"
            variant="contained"
            sx={{ mt: 2, mb: 2, bgcolor: 'red', width: 'auto' }}
            // onClick={handlePartChange}
            >
            Kustuta valitud tööetapi
          </Button>
          <Dialog
          open={openStages}
          onClose={handleCloseLevels}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <TextField
                required
                fullWidth
                id="levelValue"
                label="Sisesta uue tööetapi"
                name="levelValue"
                autoComplete="none"
                // onChange={handleValueChange}
                type="text"
                margin="dense"
                size="small" />
          </DialogContentText>
          <Button
            type="button"
            variant="contained"
            sx={{ mt: 2, mb: 2, mr: 2, bgcolor: 'main', width: 'auto' }}
            onClick={handleCloseLevels}
          >
            Tühista
          </Button>
          <Button
            type="button"
            variant="contained"
            sx={{ mt: 2, mb: 2, bgcolor: 'main', width: 'auto' }}
          >
            Lisa andmebaasi
          </Button>
        </DialogContent>
        </Dialog>
          {/* /* <Dialog
           open={open}
           onClose={handleCloseLevels}
           aria-labelledby="alert-dialog-title"
           aria-describedby="alert-dialog-description"
        >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Tööetapi lisamine
        </DialogContentText>
        </DialogContent>
        </Dialog> */}
        </FormControl>

        </Box>
      </section>
    </main>
  </>
  );
};

export default WorkStages;