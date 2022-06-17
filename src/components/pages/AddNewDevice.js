import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { FormControl, MenuItem, TextField, Button } from "@mui/material";
import { Box, Select } from "@mui/material";
import DropDown from "../DropDown";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import WindingDialog from "../WindingDialog";
import DeviceTestingDialog from "../DeviceTestingDialog";
import DeviceEquipment from "../DeviceEquipment";

// TODO
// kui väljad täidetud, siis projekti kuvasse naasemine
// Fotode ja failide lisamine/vaatamine
// form validation
// testkasutaja id on vaja andmebaasis nimena salvestada

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
    const [typeOptions, setTypeOptions] = useState([]);

    // võimsus
    const [powerID, setPowerID] = useState("");
    const handlePowerChange = (e) => {
        setPowerID(e.target.value);
    }
    const [powerOptions, setPowerOptions] = useState([]);

    // p/min
    const [rotPerMin, setRotPerMin] = useState("");
    const handleRotPerMinChange = (e) => {
        setRotPerMin(e.target.value);
    }
    const [rotPerMinOptions, setRotPerMinOptions] = useState([]);

    // tootja
    const [manufacturer, setManufacturer] = useState("");
    const handleManufacturerChange = (e) => {
        setManufacturer(e.target.value);
    }
    const [manufacturerOptions, setManufacturerOptions] = useState([]);

    // võlli kõrgus
    const [shaftHeight, setShaftHeight] = useState("");
    const handleShaftHeightChange = (e) => {
        setShaftHeight(e.target.value);
    }
    const [shaftHeightOptions, setShaftHeightOptions] = useState([]);

    // toite liik
    const [powerSupply, setPowerSupply] = useState("");
    const handlePowerSupplyChange = (e) => {
        setPowerSupply(e.target.value);
    }
    const [powerSupplyOptions, setPowerSupplyOptions] = useState([]);

    // sagedus Hz
    const [frequency, setFrequency] = useState("");
    const handleFrequencyChange = (e) => {
        setFrequency(e.target.value);
    }
    const [frequencyOptions, setFrequencyOptions] = useState([]);

    // Isol. klass
    const [isolationClass, setIsolationClass] = useState("");
    const handleIsolationClassChange = (e) => {
        setIsolationClass(e.target.value);
    }
    const [isolationClassOptions, setIsolationClassOptions] = useState([]);

    // IP klass
    const [IPClass, setIPClass] = useState("");
    const handleIPClassChange = (e) => {
        setIPClass(e.target.value);
    }
    const [IPClassOptions, setIPClassOptions] = useState([]);

    // tunnihind
    // takistuse ühik
    const [resistanceArr, setResistanceArr] = useState([]);

    // pingeteim
    const [voltageTestArr, setVoltageTestArr] = useState([]);

    // katsetuse pinge(V)
    const [testingVoltageArr, setTestingVoltageArr] = useState([]);

    // ühendus
    const [connectionArr, setConnectionArr] = useState([]);

    // katsetatud
    const [testMethodArr, setTestMethodArr] = useState([]);


    // mähise andmete saamine
    const [windingData, setWindingData] = useState(
        [
            {
                name: "Pooluste arv",
                statorValue: "",
                rotorValue: ""
            },
            {
                name: "Mähise liik",
                statorValue: "",
                rotorValue: ""
            },
            {
                name: "Ühendusviis",
                statorValue: "",
                rotorValue: ""
            },
            {
                name: "Mähise samm",
                statorValue: "",
                rotorValue: ""
            },
            {
                name: "Uurete arv",
                statorValue: "",
                rotorValue: ""
            },
            {
                name:"Keerdude arv",
                statorValue: "",
                rotorValue: ""
            },
            {
                name: "Raua mõõdud",
                statorValue: "",
                rotorValue: ""
            },
            {
                name: "Traatide arv keerus",
                statorValue: "",
                rotorValue: ""
            },
            {
                name: "Traadi mõõdud",
                statorValue: "",
                rotorValue: ""
            }
        ]
        
    );

    const passWindingData = (data) => {
        setWindingData(data);
        console.log(data)
    }

    // seadme katsetuse andmete saamine
    const [deviceTestingData, setDeviceTestingData] = useState(
        [
            {
                tester: "",
                testingDate: "",
                functionalTest: "",
                isolationResistance: "",
                isolationResistanceUnit: "",
                isolationSuitability: "",
                voltageTest: "",
                voltageTestSuitability: "",
                functionalTestNotes: "",
                functionalTestSuitability: "",
                testingVoltage: "",
                connectionType: "",
                testingMethod: "",
                currents:
                {
                    current1: "",
                    current2: "",
                    current3: ""
                },
                tableDataHV:
                {
                    HMms: "",
                    HgE: "",
                    VMms: "",
                    VgE: ""
                },
                tableDataHVA:
                {
                    HMms: "",
                    HgE: "",
                    VMms: "",
                    VgE: "",
                    AMms: "",
                    AgE: ""
                },
                audioNotes: "",
                otherNotes: "",
                windingResistance: 
                {
                    resistanceU: "",
                    resistanceUunit: "",
                    resistanceV: "",
                    resistanceVunit: "",
                    resistanceW: "",
                    resistanceWunit: ""
                }
            }
        ]
    );

    const passTestingData = (data) => {
        setDeviceTestingData(data);
        console.log(data);
    }


    const getDeviceOptions = async() => {
        const response = await axios.get(`${endpoint}/project/fnc_get_device_info.php`);
        //console.log(response.data);
        setTypeOptions([]);
        setPowerOptions([]);
        setManufacturerOptions([]);
        setShaftHeightOptions([]);
        setPowerSupplyOptions([]);
        setFrequencyOptions([]);
        setIsolationClassOptions([]);
        setIPClassOptions([]);
        setResistanceArr([]);
        setVoltageTestArr([]);
        setTestingVoltageArr([]);
        setConnectionArr([]);
        setTestMethodArr([]);
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
                    setPowerSupplyOptions(oldArray => [...oldArray, element]);
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
                case 11:
                    setResistanceArr(oldArray => [...oldArray, element]);
                    break;
                case 12:
                    setVoltageTestArr(oldArray => [...oldArray, element]);
                    break;
                case 13:
                    setTestingVoltageArr(oldArray => [...oldArray, element]);
                    break;
                case 14:
                    setConnectionArr(oldArray => [...oldArray, element]);
                    break;
                case 15:
                    setTestMethodArr(oldArray => [...oldArray, element]);
            }
        });
    }

    useEffect(() => {
        getDeviceOptions();
    }, []);

    // submit vajutus
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const dataToSave = {
            projectId: projectNum,
            deviceType: deviceID,
            power: powerID,
            rotPerMin: rotPerMin,
            typeNr: formData.get("type"),
            manufacturer: manufacturer,
            shaftHeight: shaftHeight,
            powerSupply: powerSupply,
            frequency: frequency,
            isolationClass: isolationClass,
            IPClass: IPClass,
            factoryNr: formData.get("factoryNr"),
            mode: formData.get("mode"),
            EXMarking: formData.get("EXMarking"),
            bearingDE: formData.get("bearingDE"),
            bearingNDE: formData.get("bearingNDE"),
            additionalInfo: formData.get("additionalInfo"),
            windingData: windingData,
            deviceTestingData: deviceTestingData
        }

        console.log(dataToSave);
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

            	        <h4>Tüüp</h4>
                        <TextField
                            required
                            id="type"
                            label="Tüüp"
                            name="type"
                            autoComplete="none"
                            type="text"
                            margin="dense"
                            size="small"
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

                        <WindingDialog passWindingData={passWindingData}/>

                        <DeviceTestingDialog
                         resistanceOptions={resistanceArr}
                         voltageTestOptions={voltageTestArr}
                         testingVoltageOptions={testingVoltageArr}
                         connectionOptions={connectionArr}
                         testMethodOptions={testMethodArr}
                         passTestingData={passTestingData}
                        />

                        <DeviceEquipment />

                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 2, mb: 2, bgcolor: "main", width: "auto" }}
                            margin="dense"
                        >
                            Salvesta
                        </Button>

                    </FormControl>
                </Box>

            </section>
        </main>
        </>
    );

}