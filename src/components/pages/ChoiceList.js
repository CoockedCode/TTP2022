import { FormControl } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState, useEffect } from 'react';
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

const ClientList = () => {
  const endpoint = "https://elektrimasinad.digifi.eu/api";
      // seadme liik
      const [deviceID, setDeviceID] = useState("");
      const handleDeviceChange = (e) => {
          setDeviceID(e.target.value);
      }
      // võimsus
      const [powerID, setPowerID] = useState("");
      const handlePowerChange = (e) => {
          setPowerID(e.target.value);
      }
      // p/min
      const [rotPerMin, setRotPerMin] = useState("");
      const handleRotPerMinChange = (e) => {
          setRotPerMin(e.target.value);
      }
      // tootja
      const [manufacturer, setManufacturer] = useState("");
      const handleManufacturerChange = (e) => {
          setManufacturer(e.target.value);
      }
      // võlli kõrgus
      const [shaftHeight, setShaftHeight] = useState("");
      const handleShaftHeightChange = (e) => {
          setShaftHeight(e.target.value);
      }
      // toite liik
      const [powerSupply, setPowerSupply] = useState("");
      const handlePowerSupplyChange = (e) => {
          setPowerSupply(e.target.value);
      }
      // sagedus Hz
      const [frequency, setFrequency] = useState("");
      const handleFrequencyChange = (e) => {
          setFrequency(e.target.value);
      }
      // Isol. klass
      const [isolationClass, setIsolationClass] = useState("");
      const handleIsolationClassChange = (e) => {
          setIsolationClass(e.target.value);
      }
      // IP klass
      const [IPClass, setIPClass] = useState("");
      const handleIPClassChange = (e) => {
          setIPClass(e.target.value);
      }
      // transport firma
      const [transportCompany, setTransportCompany]= useState("");
      const HandleTransportChange = (e) =>{
        setTransportCompany(e.target.value);
      }// tunnihind
      const [hourlyPrice, setHourlyPrice]= useState("");
      const HandlePriceChange = (e) =>{
        setHourlyPrice(e.target.value);
      }// resictanse
      const [resitanceUnit, setResistanceUnit]= useState("");
      const HandleResistanceChange = (e) =>{
        setResistanceUnit(e.target.value);
      }
      //Pingeteim
      const [tensionUnit, setTensionUnit]= useState("");
      const HandleTensionChnage = (e) =>{
        setTensionUnit(e.target.value);
      }
      const [tensioTestUnit, setTensionTestUnit]= useState("");
      const HandleTensionTestChnage = (e) =>{
        setTensionTestUnit(e.target.value);
      }
      //ühendus
      const [connection, setConnection]= useState("");
      const HandleConnectionChange = (e) =>{
        setConnection(e.target.value);
      }
      const [testing, setTesting]= useState("");
      const handleTestingChange = (e) =>{
        setTesting(e.target.value);
      }



      const [typeOptions, setTypeOptions] = useState([]);
      const [powerOptions, setPowerOptions] = useState([]);
      const [rotPerMinOptions, setRotPerMinOptions] = useState([]);
      const [manufacturerOptions, setManufacturerOptions] = useState([]);
      const [shaftHeightOptions, setShaftHeightOptions] = useState([]);
      const [powerSupplyOptions, setPowerSupplyOptions] = useState([]);
      const [frequencyOptions, setFrequencyOptions] = useState([]);
      const [isolationClassOptions, setIsolationClassOptions] = useState([]);
      const [IPClassOptions, setIPClassOptions] = useState([]);
      const [transportCompanyOptions, setTransportCompanyOptions] = useState([]);
      const [hourlyPriceOptions, setHourlyPriceOptions ] = useState([]);
      const [resitanceUnitOptions, setResistanceUnitOptions ] = useState([]);
      const [tensionOptions, setTensionOptions ] = useState([]);
      const [tensionTestOptions, setTensionTestOptions ] = useState([]);
      const [connectionOptions, setConnectionOptions ] = useState([]);
      const [testingOptions, setTestingOptions ] = useState([]);


  const getAllChoiceOptions = async() => {
    const response = await axios.get(endpoint+'/choice/fnc_select_choices.php');
    console.log(response);
    setTypeOptions([]);
    setPowerOptions([]);
    setManufacturerOptions([]);
    setShaftHeightOptions([]);
    setPowerSupplyOptions([]);
    setFrequencyOptions([]);
    setIsolationClassOptions([]);
    setIPClassOptions([]);
    setHourlyPriceOptions([]);
    setResistanceUnitOptions([]);
    setTensionOptions([]);
    setConnectionOptions([]);
    setTestingOptions([]);
    response.data.forEach(element => {
        switch(element.attribute){
            case 1:
                setTypeOptions(oldArray => [...oldArray, element]);
                break;
            case 2:
                setPowerOptions(oldArray => [...oldArray, element]);
                break;
            case 3:
                setRotPerMinOptions(oldArray => [...oldArray, element]);
                break;
            case 4:
                setManufacturerOptions(oldArray => [...oldArray, element]);
                break;
            case 5:
                setShaftHeightOptions(oldArray => [...oldArray, element]);
                break;
            case 6:
                setPowerSupplyOptions(oldArray => [...oldArray, element]);;
                break;
            case 7:
                setFrequencyOptions(oldArray => [...oldArray, element]);
                break;
            case 8:
                setIsolationClassOptions(oldArray => [...oldArray, element]);
                break;
            case 9:
                setIPClassOptions(oldArray => [...oldArray, element]);
                break;
            case 10:
                setHourlyPriceOptions(oldArray=>[...oldArray, element]);
                break;
            case 11:
                setResistanceUnitOptions(oldArray=>[...oldArray, element]);
                break;
            case 12:
                setTensionOptions(oldArray=>[...oldArray, element]);
                break;
            case 13:
                setTensionTestOptions(oldArray=>[...oldArray, element]);
                break;
            case 14:
                setConnectionOptions(oldArray=>[...oldArray, element]);
                break;
            case 15:
                setTestingOptions(oldArray=>[...oldArray, element]);
                break;
        }
    });
}
  useEffect(() => {
    getAllChoiceOptions();
  }, []);
    const getTransportOptions = async() =>{
      const response = await axios.get(endpoint+'/choice/fnc_select_transport.php');
      console.log(response);
      setTransportCompanyOptions([]);
      response.data.forEach(element=>{
        setTransportCompanyOptions(oldArray => [...oldArray, element]);
      })
    }
    useEffect(() => {
      getTransportOptions();
    }, []);
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
    
    const handleClose = () => {
      setOpen(false);
    };

    const [choiceOptions, setChoiceOptions] = useState([]);
    const getChoiceOptions = async() => {
        const response = await axios.get(endpoint+'/choice/fnc_get_all_choice_info.php');
        console.log(response);
        setChoiceOptions([]);
        response.data.forEach(element => {
            setChoiceOptions(oldArray => [...oldArray, element]);
          })
      }
      useEffect(() => {
        getChoiceOptions();
      }, []);
  
    const [choiceID, setChoiceID] = useState("");
    const handleChoiceChange = (e) => {
        setChoiceID(e.target.value);
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      // const formData = new FormData(e.currentTarget);
      const toSave={
        choiceID: choiceID,
        name: nameValue,
        unit: unitValue,
        comment: addInfValue
      }
      handleAddition(toSave);
    }

    const handleAddition=(toSave)=>{
      console.log(toSave);
      axios.post(endpoint+"/choice/fnc_add_choice.php", toSave)
        .then(function (response) {
          console.log(response);
          if(response.status === 200){
          }
        })
        .catch(function (err) {
        });

	};
  const [nameValue, setNameValue] = useState("")
  const handleValueChange=(e)=>{
    setNameValue(e.target.value);
    //console.log(valueValue);
  }
  const [unitValue, setUnitValue] = useState("")
  const handleUnitChange=(e)=>{
    setUnitValue(e.target.value);
    //console.log(valueValue);
  }
  const [addInfValue, setAddInfValue] = useState("")
  const handleAddInfChange=(e)=>{
    setAddInfValue(e.target.value);
    //console.log(valueValue);
  }

  return (
    <>
      <main>
        <section style={{ width: "100%", padding: "0 5%" }}>
          <div id="header-wrapper">
            <div id="page-header">
              <h3>Kliendid</h3>
            </div>
          </div>
          <Box component="form" noValidate autoComplete="off">
          <Button
							type="button"
							variant="contained"
							sx={{ mt: 2, mb: 2, bgcolor: 'main', width: 'auto' }}
							onClick={handleClickOpen}
							>
							Lisa
						</Button>
            <FormControl sc={{width: "100%"}}>
              <DropDown
                name="Seadme liik" ID="choiceName" 
                value={deviceID} label="Seadme liik"
                onChange={handleDeviceChange}
                options={typeOptions}
                />
              <DropDown
                name="Võimsus KW" ID="choiceName" 
                value={powerID} label="Võimsus KW"
                onChange={handlePowerChange}
                options={powerOptions}
                />
              <DropDown
                name="p/min" ID="choiceName" 
                value={rotPerMin} label="p/min"
                onChange={handleRotPerMinChange}
                options={rotPerMinOptions}
                />
              <DropDown
                name="Tootja" ID="choiceName" 
                value={manufacturer} label="Tootja"
                onChange={handleManufacturerChange}
                options={manufacturerOptions}
                />
              <DropDown
                name="Võlli kõrgus" ID="choiceName" 
                value={shaftHeight} label="Võlli kõrgus"
                onChange={handleShaftHeightChange}
                options={shaftHeightOptions}
                />
              <DropDown
                name="Toite liik" ID="choiceName" 
                value={powerSupply} label="Toite liik"
                onChange={handlePowerSupplyChange}
                options={powerSupplyOptions}
                />
              <DropDown
                name="Sagedus HZ" ID="choiceName" 
                value={frequency} label="Sagedus HZ"
                onChange={handleFrequencyChange}
                options={frequencyOptions}
                />
              <DropDown
                name="Isol.Klass" ID="choiceName" 
                value={isolationClass} label="Isol.Klass"
                onChange={handleIsolationClassChange}
                options={isolationClassOptions}
                />
              <DropDown
                name="IP klass" ID="choiceName" 
                value={IPClass} label="IP Klass"
                onChange={handleIPClassChange}
                options={IPClassOptions}
                />
              <DropDown
                name="Transpordi firma" ID="choiceName" 
                value={transportCompany} label="Transpordi firma"
                onChange={HandleTransportChange}
                options={transportCompanyOptions}
                />
              <DropDown
                name="Tunni hind" ID="choiceName" 
                value={hourlyPrice} label="Tunni hind"
                onChange={HandlePriceChange}
                options={hourlyPriceOptions}
                />
              <DropDown
                name="Takistuse ühik" ID="choiceName" 
                value={resitanceUnit} label="Takistuse ühik"
                onChange={HandleResistanceChange}
                options={resitanceUnitOptions}
                />
              <DropDown
                name="Pingeteim" ID="choiceName" 
                value={tensionUnit} label="Pingeteim"
                onChange={HandleTensionChnage}
                options={tensionOptions}
                />
              <DropDown
                name="Katsetuse pinge" ID="choiceName" 
                value={tensioTestUnit} label="Katsetuse pinge"
                onChange={HandleTensionTestChnage}
                options={tensionTestOptions}
                />
              <DropDown
                name="Ühendus" ID="choiceName" 
                value={connection} label="Ühendus"
                onChange={HandleConnectionChange}
                options={connectionOptions}
                />
              <DropDown
                name="Katsetatud" ID="choiceName" 
                value={testing} label="Katsetatud"
                onChange={handleTestingChange}
                options={testingOptions}
                />
            </FormControl>
          </Box>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
            {"Kustuta klient?"}
            </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Andmete lisamine
                </DialogContentText>
                <Box component = "form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                  
                    <FormControl sc={{width: "100%"}}>
                                <DropDown
                                name="Valik nimi" ID="choiceName" 
                                value={choiceID} label="Valiku nimetus"
                                onChange={handleChoiceChange}
                                options={choiceOptions}
                                />
                                <TextField
                                    required
                                    fullWidth
                                    id="choiceValue"
                                    label="Sisesta valik mida tahad lisada"
                                    name="choiceValue"
                                    autoComplete="none"
                                    onChange={handleValueChange}
                                    type="text"
                                    margin="dense"
                                    size="small" />
                                <TextField
                                    fullWidth
                                    id="choiceUnit"
                                    label="Sisesta valiku mõõtühikut(Kui on)"
                                    name="choiceUnit"
                                    autoComplete="none"
                                    onChange={handleUnitChange}
                                    type="text"
                                    margin="dense"
                                    size="small" />
                                <TextField
                                    fullWidth
                                    id="choiceAddInfo"
                                    label="Sisesta märkus(Kui on)"
                                    name="choiceAddInfo"
                                    autoComplete="none"
                                    onChange={handleAddInfChange}
                                    type="text"
                                    margin="dense"
                                    size="small" />
                    </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                <Button 
                    variant="contained"
                    sx={{ mt: 2, mb: 2, bgcolor: 'main', 
                    width: 'auto' }}
                    margin="dense"
                    onClick={handleClose}>
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 2, mb: 2, bgcolor: 'main', width: 'auto' }} 
                    onClick={handleSubmit} 
                    autoFocus>
                    Lisa!
                </Button>
                </DialogActions>
            </Dialog>
        </section>
      </main>
    </>
  );
};

export default ClientList;