import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { FormControl, MenuItem, TextField } from "@mui/material";
import { Box, Select } from "@mui/material";
import DropDown from "../DropDown";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import WindingDialog from "../WindingDialog";

// TODO
// Fotode ja failide lisamine/vaatamine
// Mähise andmed dialog box
// Seadme katsetus
// Seadme varustus
// form validation

const endpoint = "https://elektrimasinad.digifi.eu/api";

export default function AddNewProject(){

    //snackbar
    const dispatch = useDispatch();
    // projekti nr saamine
    const { state } = useLocation();
    const projectNum = state.nr;

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
    // tunnihind
    // takistuse ühik
    // pingeteim
    // katsetuse pinge(V)
    // ühendus
    // katsetatud
    const [typeOptions, setTypeOptions] = useState([]);
    const [powerOptions, setPowerOptions] = useState([]);
    const [rotPerMinOptions, setRotPerMinOptions] = useState([]);
    const [manufacturerOptions, setManufacturerOptions] = useState([]);
    const [shaftHeightOptions, setShaftHeightOptions] = useState([]);
    const [powerSupplyOptions, setPowerSupplyOptions] = useState([]);
    const [frequencyOptions, setFrequencyOptions] = useState([]);
    const [isolationClassOptions, setIsolationClassOptions] = useState([]);
    const [IPClassOptions, setIPClassOptions] = useState([]);

    const getDeviceOptions = async() => {
        const response = await axios.get(`${endpoint}/project/fnc_get_device_info.php`);
        console.log(response.data);
        setTypeOptions([]);
        setPowerOptions([]);
        setManufacturerOptions([]);
        setShaftHeightOptions([]);
        setPowerSupplyOptions([]);
        setFrequencyOptions([]);
        setIsolationClassOptions([]);
        setIPClassOptions([]);
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
            }
        });
    }

    useEffect(() => {
        getDeviceOptions();
    }, []);

    // submit vajutus
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return(
        <>
        <main>
            <section style={{width: "50%"}}>
                <br />
                <div id="header-wrapper">
					<h3 style={{margin: '0', marginBottom: '0.5rem'}}>Seadme tehniline info</h3>
				</div>
                <div>
                    <p>Projekti nr: {projectNum}</p>
                </div>
                <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <FormControl sc={{width: "100%"}}>
                        <DropDown
                         name="Seadme liik" ID="deviceType" 
                         value={deviceID} label="Seadme liik"
                         onChange={handleDeviceChange}
                         options={typeOptions}
                        />

                        <DropDown
                         name="Võimsus kW" ID="powerID"
                         value={powerID} label="Võimsus kW"
                         onChange={handlePowerChange}
                         options={powerOptions}
                        />

                        <DropDown
                         name="p/min" ID="rotPerMin"
                         value={rotPerMin} label="p/min"
                         onChange={handleRotPerMinChange}
                         options={rotPerMinOptions}
                        />

                        <DropDown
                         name="Tootja" ID="manufacturer"
                         value={manufacturer} label="Tootja"
                         onChange={handleManufacturerChange}
                         options={manufacturerOptions}
                        />

                        <DropDown 
                         name="Võlli kõrgus" ID="shaftHeight"
                         value={shaftHeight} label="Võlli kõrgus"
                         onChange={handleShaftHeightChange}
                         options={shaftHeightOptions} 
                        />

                        <DropDown 
                         name="Toite liik" ID="powerSupply"
                         value={powerSupply} label="Toite liik"
                         onChange={handlePowerSupplyChange}
                         options={powerSupplyOptions} 
                        />

                        <DropDown 
                         name="Sagedus Hz" ID="frequency"
                         value={frequency} label="Sagedus"
                         onChange={handleFrequencyChange}
                         options={frequencyOptions} 
                        />

                        <DropDown 
                         name="Isol. klass" ID="isolationClass"
                         value={isolationClass} label="Isol. klass"
                         onChange={handleIsolationClassChange}
                         options={isolationClassOptions} 
                        />

                        <DropDown 
                         name="IP klass" ID="IPClass"
                         value={IPClass} label="IP klass"
                         onChange={handleIPClassChange}
                         options={IPClassOptions} 
                        />

                        <TextField
                            required
                            id="factoryNr"
                            label="Tehase nr"
                            name="factoryNr"
                            autoComplete="none"
                            type="text"
                            margin="dense"
                            size="small"
                        />

                        <TextField
                            required
                            id="mode"
                            label="Režiim"
                            name="mode"
                            autoComplete="none"
                            type="text"
                            margin="dense"
                            size="small"
                        />

                        <TextField
                            required
                            id="EXMarking"
                            label="Ex märgistus"
                            name="EXMarking"
                            autoComplete="none"
                            type="text"
                            margin="dense"
                            size="small"
                        />

                        <TextField
                            required
                            id="bearingDE"
                            label="Laager DE"
                            name="bearingDE"
                            autoComplete="none"
                            type="text"
                            margin="dense"
                            size="small"
                        />

                        <TextField
                            required
                            id="bearingNDE"
                            label="Laager NDE"
                            name="bearingNDE"
                            autoComplete="none"
                            type="text"
                            margin="dense"
                            size="small"
                        />

                        <WindingDialog />

                        <TextField
                            required
                            id="additionalInfo"
                            label="Märkused"
                            name="additionalInfo"
                            autoComplete="none"
                            type="text"
                            margin="dense"
                            size="small"
                        />
                    </FormControl>
                </Box>

            </section>
        </main>
        </>
    );

}