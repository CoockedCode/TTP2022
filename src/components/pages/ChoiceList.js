import { FormControl } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState, useEffect } from 'react';
//import { Box } from '@mui/material';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
//import DialogActions from '@mui/material/DialogActions';
//import DialogContent from '@mui/material/DialogContent';
//import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl } from '@mui/material';;
import "../../styles/pages/Home.css";
import DropDown from "../DropDown";
import { useDispatch } from "react-redux";
import { endpoint } from "../../endpoint";

const ChoiceList = () => {
  const dispatch = useDispatch();
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
    const response = await axios.get(endpoint + '/view/choice/fnc_select_choices.php');
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
      const response = await axios.get(endpoint + '/view/choice/fnc_select_transport.php');
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
        const response = await axios.get(endpoint + '/view/choice/fnc_get_all_choice_info.php');
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
        handleClose();
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

  const [deletionOpen, setDeletionOpen] = useState(false);
  const handleDeletionOpen= ()=>{
    setDeletionOpen(true);
  }
  const handleDeletionClose = () => {
    setDeletionOpen(false);
  };
  const handleDeletion=()=>{
    let toDelete={
      deletedID: ""
    }
    switch(deviceID||powerID||rotPerMin||manufacturer||shaftHeight||powerSupply||frequency||isolationClass||IPClass||hourlyPrice||resitanceUnit||tensionUnit||tensioTestUnit||connection||testing){
      case deviceID:
        toDelete ={
          deletedID: deviceID
        }
        break;
      case powerID:
        toDelete={
          deletedID: powerID
        }
        break;
      case rotPerMin:
        toDelete={
          deletedID: rotPerMin
        }
        break;
      case manufacturer:
        toDelete={
          deletedID: manufacturer
        }
        break;
      case shaftHeight:
        toDelete={
          deletedID: shaftHeight
        }
        break;
      case powerSupply:
        toDelete = {
          deletedID: powerSupply
        }
        break;
      case frequency:
        toDelete={
          deletedID: frequency
        }
        break;
      case isolationClass:
        toDelete={
          deletedID: isolationClass
        }
        break;
      case IPClass:
        toDelete={
          deletedID: IPClass
        }
        break;
      case hourlyPrice:
        toDelete={
          deletedID: hourlyPrice
        }
        break;
      case resitanceUnit:
        toDelete={
          deletedID: resitanceUnit
        }
        break;
      case tensionUnit:
        toDelete={
          deletedID: tensionUnit
        }
        break;
      case tensioTestUnit:
        toDelete={
          deletedID: tensioTestUnit
        }
        break;
      case connection:
        toDelete={
          deletedID: connection
        }
        break;
      case testing:
        toDelete={
          deletedID: testing
        }
        break;
    }
    console.log(toDelete);
    deleteChoice(toDelete);
  }

  const deleteChoice=(toDelete)=>{
    axios.post(endpoint+"/choice/fnc_delete_choice.php", toDelete)
		.then(function (response) {
			console.log(response);
			if(response.status === 200){
				// dispatch(setSnackbar(true,"success","Valik edukalt kustutatud!"));
			}
		})
		.catch(function (err) {
			// dispatch(setSnackbar(true,"error","Kustutamisel tekkis viga!"))
		});
		handleClose();

  }

  return (
    <>
      <main>
         <section style={{ width: "98%", margin: "0 5%"}}>
          <div id="header-wrapper" style={{justifyContent: "center", marginBottom: "1.5rem"}}>
                <h3 id="page-header">Valikute seaded</h3>
                <FormControl sx={{minWidth: "9rem"}}>
                  <Button
                      type="button"
                      variant="outlined"
                      sx={{ my: 2 }}
                      onClick={handleClickOpen}
                      >
                      Lisa uus valik
                  </Button>
                </FormControl>

          </div>
          <FormControl fullWidth noValidate autoComplete="off" sx={{display: "flex", flexWrap: "wrap", flexDirection: "row", justifyContent: "center"}}>
            <FormControl sx={{minWidth: "10rem", width: "14%", mx: 2, mb: 5}}>
              <DropDown
                name="Seadme liik"
                ID="choiceType"
                value={deviceID}
                label=""
                onChange={handleDeviceChange}
                options={typeOptions}
                />
              <Button
                type="button"
                variant="contained"
                color="info"
                sx={{my: 2}}
                onClick={handleDeletionOpen}
                >
                Kustuta
						  </Button>
             </FormControl>

            <FormControl sx={{minWidth: "10rem", width: "14%", mx: 2, mb: 5}}>
              <DropDown
                name="Võimsus KW" ID="choicePower"
                value={powerID} label="Võimsus KW"
                onChange={handlePowerChange}
                options={powerOptions}
                />
               <Button
                type="button"
                variant="contained"
                color="info"
                sx={{my: 2}}
                onClick={handleDeletionOpen}
                >
                Kustuta
						  </Button>
            </FormControl>

            <FormControl sx={{minWidth: "10rem", width: "14%", mx: 2, mb: 5}}>
              <DropDown
                name="p/min" ID="choiceRotPerMin"
                value={rotPerMin} label="p/min"
                onChange={handleRotPerMinChange}
                options={rotPerMinOptions}
                />
              <Button
                type="button"
                variant="contained"
                color="info"
                sx={{my: 2}}
                onClick={handleDeletionOpen}
                >
                Kustuta
						  </Button>
            </FormControl>

            <FormControl sx={{minWidth: "10rem", width: "14%", mx: 2, mb: 5}}>
              <DropDown
                name="Tootja" ID="choiceManufacturer"
                value={manufacturer} label="Tootja"
                onChange={handleManufacturerChange}
                options={manufacturerOptions}
                />
              <Button
                type="button"
                variant="contained"
                color="info"
                sx={{my: 2}}
                onClick={handleDeletionOpen}
                >
                Kustuta
						  </Button>
            </FormControl>

            <FormControl sx={{minWidth: "10rem", width: "14%", mx: 2, mb: 5}}>
              <DropDown
                name="Võlli kõrgus" ID="choiceShaft"
                value={shaftHeight} label="Võlli kõrgus"
                onChange={handleShaftHeightChange}
                options={shaftHeightOptions}
                />
              <Button
                type="button"
                variant="contained"
                color="info"
                sx={{my: 2}}
                onClick={handleDeletionOpen}
                >
                Kustuta
						  </Button>
            </FormControl>

            <FormControl sx={{minWidth: "10rem", width: "14%", mx: 2, mb: 5}}>
              <DropDown
                name="Toite liik" ID="choicePowerSupply"
                value={powerSupply} label="Toite liik"
                onChange={handlePowerSupplyChange}
                options={powerSupplyOptions}
                />
              <Button
                type="button"
                variant="contained"
                color="info"
                sx={{my: 2}}
                onClick={handleDeletionOpen}
                >
                Kustuta
						  </Button>
            </FormControl>

            <FormControl sx={{minWidth: "10rem", width: "14%", mx: 2, mb: 5}}>
              <DropDown
                name="Sagedus HZ" ID="choiceFrequency"
                value={frequency} label="Sagedus HZ"
                onChange={handleFrequencyChange}
                options={frequencyOptions}
                />
              <Button
                type="button"
                variant="contained"
                color="info"
                sx={{my: 2}}
                onClick={handleDeletionOpen}
                >
                Kustuta
						  </Button>
            </FormControl>

            <FormControl sx={{minWidth: "10rem", width: "14%", mx: 2, mb: 5}}>
              <DropDown
                name="Isol.Klass" ID="choiceIsolation"
                value={isolationClass} label="Isol.Klass"
                onChange={handleIsolationClassChange}
                options={isolationClassOptions}
                />
              <Button
                type="button"
                variant="contained"
                color="info"
                sx={{my: 2}}
                onClick={handleDeletionOpen}
                >
                Kustuta
						  </Button>
            </FormControl>

            <FormControl sx={{minWidth: "10rem", width: "14%", mx: 2, mb: 5}}>
              <DropDown
                name="IP klass" ID="choiceIPClass"
                value={IPClass} label="IP Klass"
                onChange={handleIPClassChange}
                options={IPClassOptions}
                />
              <Button
                type="button"
                variant="contained"
                color="info"
                sx={{my: 2}}
                onClick={handleDeletionOpen}
                >
                Kustuta
						  </Button>
            </FormControl>

            <FormControl sx={{minWidth: "10rem", width: "14%", mx: 2, mb: 5}}>
              <DropDown
                name="Transpordi firma" ID="choiceTransport"
                value={transportCompany} label="Transpordi firma"
                onChange={HandleTransportChange}
                options={transportCompanyOptions}
                />
              <Button
                type="button"
                variant="contained"
                color="info"
                sx={{my: 2}}
                onClick={handleDeletionOpen}
                >
                Kustuta
						  </Button>
            </FormControl>

            <FormControl sx={{minWidth: "10rem", width: "14%", mx: 2, mb: 5}}>
              <DropDown
                name="Tunni hind" ID="choiceHourlyPrice"
                value={hourlyPrice} label="Tunni hind"
                onChange={HandlePriceChange}
                options={hourlyPriceOptions}
                />
              <Button
                type="button"
                variant="contained"
                color="info"
                sx={{my: 2}}
                onClick={handleDeletionOpen}
                >
                Kustuta
						  </Button>
            </FormControl>

            <FormControl sx={{minWidth: "10rem", width: "14%", mx: 2, mb: 5}}>
              <DropDown
                name="Takistuse ühik" ID="choiceRecistance"
                value={resitanceUnit} label="Takistuse ühik"
                onChange={HandleResistanceChange}
                options={resitanceUnitOptions}
                />
              <Button
                type="button"
                variant="contained"
                color="info"
                sx={{my: 2}}
                onClick={handleDeletionOpen}
                >
                Kustuta
						  </Button>
            </FormControl>

            <FormControl sx={{minWidth: "10rem", width: "14%", mx: 2, mb: 5}}>
              <DropDown
                name="Pingeteim" ID="choiceTension"
                value={tensionUnit} label="Pingeteim"
                onChange={HandleTensionChnage}
                options={tensionOptions}
                />
              <Button
                type="button"
                variant="contained"
                color="info"
                sx={{my: 2}}
                onClick={handleDeletionOpen}
                >
                Kustuta
						  </Button>
            </FormControl>

            <FormControl sx={{minWidth: "10rem", width: "14%", mx: 2, mb: 5}}>
              <DropDown
                name="Katsetuse pinge" ID="choiceTensionUnit"
                value={tensioTestUnit} label="Katsetuse pinge"
                onChange={HandleTensionTestChnage}
                options={tensionTestOptions}
                />
              <Button
                type="button"
                variant="contained"
                color="info"
                sx={{my: 2}}
                onClick={handleDeletionOpen}
                >
                Kustuta
						  </Button>
            </FormControl>

            <FormControl sx={{minWidth: "10rem", width: "14%", mx: 2, mb: 5}}>
              <DropDown
                name="Ühendus" ID="choiceConnection"
                value={connection} label="Ühendus"
                onChange={HandleConnectionChange}
                options={connectionOptions}
                />
              <Button
                type="button"
                variant="contained"
                color="info"
                sx={{my: 2}}
                onClick={handleDeletionOpen}
                >
                Kustuta
						  </Button>
            </FormControl>

            <FormControl sx={{minWidth: "10rem", width: "14%", mx: 2, mb: 5}}>
              <DropDown
                name="Katsetatud" ID="choiceTestin"
                value={testing} label="Katsetatud"
                onChange={handleTestingChange}
                options={testingOptions}
                />
              <Button
                type="button"
                variant="contained"
                color="info"
                sx={{my: 2}}
                onClick={handleDeletionOpen}
                >
                Kustuta
						  </Button>
            </FormControl>
          </FormControl>

          {/* POPUP hakkab siit pihta */}
          <Dialog
            open={open}
            onClose={handleClose}
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
            Lisa uus valik
            </DialogTitle>
                    <FormControl noValidate onSubmit={handleSubmit} >
                                <DropDown
                                name="Valik nimi" ID="choiceName"
                                value={choiceID} label="Valiku nimetus"
                                onChange={handleChoiceChange}
                                options={choiceOptions}
                                margin="dense"
                                size="small"
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
                                    size="small"
                                    />
                                <TextField
                                    fullWidth
                                    id="choiceUnit"
                                    label="Sisesta valiku mõõtühikut(Kui on)"
                                    name="choiceUnit"
                                    autoComplete="none"
                                    onChange={handleUnitChange}
                                    type="text"
                                    margin="dense"
                                    size="small"

                                    />
                                <TextField
                                    fullWidth
                                    id="choiceAddInfo"
                                    label="Sisesta märkus(Kui on)"
                                    name="choiceAddInfo"
                                    autoComplete="none"
                                    onChange={handleAddInfChange}
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
                            onClick={handleClose}
                            sx={{mr: 1, width: "100%"}}

                            >
                            Tühista
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            size="medium"
                            sx={{ml: 1, width: "100%"}}


                            >
                            Lisa
                        </Button>
                      </FormControl>


            </Dialog>
            <Dialog
              open={deletionOpen}
              onClose={handleDeletionClose}
              maxWidth="xs"
               sx={{
                  "& .MuiDialog-container": {
                    justifyContent: "center",
                    alignItems: "center",
                  }
                }}
                PaperProps={{
                  sx: {
                    m: 0,
                    justifyContent: "center",
                    alignItems: "center",
                    px: 4,
                    pt: 1.5,
                    pb: 2.3,
                  }
                }}
							>
								<DialogTitle>
								  Kustuta valik
								</DialogTitle>
                  <FormControl fullWidth>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleDeletionClose}>
                      Tühista
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{my: 2}}
                      onClick={handleDeletion} autoFocus>
                      Kustuta
                    </Button>
                  </FormControl>
							</Dialog>
        </section>
      </main>
    </>
  );
};

export default ChoiceList;
