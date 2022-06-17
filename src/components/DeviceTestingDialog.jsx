import React, { useState } from "react";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { FormControl, FormControlLabel, Radio, RadioGroup, TableCell, TableContainer, TableRow } from '@mui/material';
import { Paper, TableContainer, TableCell, TableHead, TableRow, TableBody } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Box from "@mui/material";
import et from 'dayjs/locale/et';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from "@mui/material";
import DropDown from "./DropDown";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRef } from "react";

// TODO
// mähiste takistuste väärtuste saamine
// info salvestamine ABsse ja sellega seonduv andmete saamine vormidest
// tabeli ülevaatamine - kas saab andmed kätte?

const endpoint = "https://elektrimasinad.digifi.eu/api";

export default function DeviceTestingDialog({resistanceOptions, voltageTestOptions, testingVoltageOptions, connectionOptions, testMethodOptions, props}){

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // katsetaja dropdown
    const [testerID, setTesterID] = useState("");
    const handleTesterChange = (e) => {
        setTesterID(e.target.value);
    }
    const [testerOptions, setTesterOptions] = useState([]);

    const getTesterOptions = async() => {
        const response = await axios.get(`${endpoint}/project/fnc_get_tester.php?tester`);
        // console.log(response.data);
        setTesterOptions([]);
		response.data.forEach(element => {
			setTesterOptions(oldFirmArray => [...oldFirmArray, element]);
		});
    }

    // kuupäeva valik
    const [selectedTestingDate, setTestingDate] = useState(new Date());
	const handleDateChange = (newDate) => {
		setTestingDate(newDate);
	}

    // isolatsiooni takistus
    const [selectedIsolationResistance, setSelectedIsolationResistance] = useState("");
    const selectResistanceHandler = (value) => setSelectedIsolationResistance(value);

    // pinge teim
    const [selectedVoltageTest, setSelectedVoltageTest] = useState("");
    const selectVoltageTestHandler = (value) => setSelectedVoltageTest(value);

    // katsetuse pinge
    const [selectedTestingVoltage, setSelectedTestingVoltage] = useState("");
    const selectTestingVoltageHandler = (value) => setSelectedTestingVoltage(value);

    // ühendus
    const [selectedConnectionType, setSelectedConnectionType] = useState("");
    const selectConnectionHandler = (value) => setSelectedConnectionType(value);

    // katsetatud
    const [selectedTestMethod, setSelectedTestMethod] = useState("");
    const selectTestMethod = (value) => setSelectedTestMethod(value);

    // mähiste takistused u1-u2
    const [selectedWindingResistanceU, setSelectedWindingResistanceU] = useState("");
    const selectWindingResistanceU = (value) => setSelectedWindingResistanceU(value);

    // mähiste takistused v1-v2
    const [selectedWindingResistanceV, setSelectedWindingResistanceV] = useState("");
    const selectWindingResistanceV = (value) => setSelectedWindingResistanceV(value);

    //mähiste takistused w1-w2
    const [selectedWindingResistanceW, setSelectedWindingResistanceW] = useState("");
    const selectWindingResistanceW = (value) => setSelectedWindingResistanceW(value);

    const ref = useRef(null);

    useEffect(() => {
        getTesterOptions();
        // const el = ref.current;
        // console.log(el);
    }, []);


    const handleSave = (e) => {
        e.preventDefault();
        console.log(e);
        const formData = new FormData();
        const deviceTestingData = {
                tester: testerID,
                testingDate: `${selectedTestingDate.$y}-${selectedTestingDate.$M + 1}-${selectedTestingDate.$D}`,
                functionalTest: formData.get("deviceFunctionalTest"),
                isolationResistance: `${formData.get("deviceIsolationAmount")} ${selectedIsolationResistance}`,
                isolationSuitability: formData.get("deviceIsolation"),
                voltageTest: selectedVoltageTest,
                voltageTestSuitability: formData.get("deviceVoltageTest"),
                functionalTestNotes: formData.get("deviceFunctionalTestNotes"),
                functionalTestSuitability: formData.get("deviceFunctionalTestSuitability"),
                testingVoltage: selectedTestingVoltage,
                connectionType: selectedConnectionType,
                testingMethod: selectedTestMethod,
                currents:
                {
                    current1: formData.get("current-1"),
                    current2: formData.get("current-2"),
                    current3: formData.get("current-3")
                },
                tableDataHV:
                {
                    HMms: formData.get("nde1-mms-h"),
                    HgE: formData.get("nde1-ge-h"),
                    VMms: formData.get("nde1-mms-v"),
                    VgE: formData.get("nde1-ge-v")
                },
                tableDataHVA:
                {
                    HMms: formData.get("nde2-mms-h"),
                    HgE: formData.get("nde2-ge-h"),
                    VMms: formData.get("nde2-mms-v"),
                    VgE: formData.get("nde2-ge-v"),
                    AMms: formData.get("nde2-mms-a"),
                    AgE: formData.get("nde2-ge-a")
                },
                audioNotes: formData.get("audioNotes"),
                otherNotes: formData.get("otherNotes"),
                windingResistance:
                {
                    resistanceU: `${formData.get("winding-u1-u2")} ${selectedWindingResistanceU}`,
                    resistanceV: `${formData.get("winding-v1-v2")} ${selectedWindingResistanceV}`,
                    resistanceW: `${formData.get("winding-w1-w2")} ${selectedWindingResistanceW}`
                }
            }
        console.log(deviceTestingData);
        setOpen(false);
    }
    
    return(
        <>
        {/* <div ref={ref} id="device-testing-dialog"> */}
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Seadme katsetus
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Seadme katsetus</DialogTitle>
                <DialogContent component="form">
                    <DropDown
                    name="Katsetaja" ID="tester"
                    value={testerID} label="Katsetaja"
                    onChange={handleTesterChange}
                    options={testerOptions}
                    />

                    <h4>Kuupäev: </h4>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={et}>
                            <DatePicker
                                id="deviceTestingDate"
                                name="deviceTestingDate"
                                label="Testimise kuupäev"
                                invalidDateMessage="Viga kuupäeva sisestamisel"
                                // error={formValues.testDate.error && formValues.testDate.errorMessage}
                                inputFormat="DD.MM.YYYY"
                                // error={!!errorPlannedEnd}
                                value={selectedTestingDate}
                                onChange={testDate => handleDateChange(testDate)}
                                renderInput={(params) => <TextField {...params} />}
                            />
                    </LocalizationProvider>

                    <h4>Talitluskatse: </h4>
                    <RadioGroup
                        required
                        id='deviceFunctionalTest'
                        label="Talitluskatse"
                        name='deviceFunctionalTest'
                        row
                    >
                        <FormControlLabel value="1" control={<Radio />} label="Seade tunnistatud kontrolli põhjal ohutuks" />
                        <FormControlLabel value="2" control={<Radio />} label="Seade tunnistatud kontrolli põhjal puudulikuks" />
                        <FormControlLabel value="3" control={<Radio />} label="Seade tunnistatud remondiks mittekõlbulikuks" />
                    </RadioGroup>
                    
                    <h4>Isolatsiooni takistus: </h4>
                    <TextField
                        required
                        autoFocus
                        id="deviceIsolationAmount"
                        label="Takistuse nr"
                        name="deviceIsolationAmount"
                        autoComplete="none"
                        type="text"
                        margin="dense"
                        size="small"
                    />

                    <DropDown
                    name="" ID="isolationResistance"
                    value={selectedIsolationResistance} label="Ühik"
                    onChange={(e) => selectResistanceHandler(e.target.value)}
                    options={resistanceOptions}
                    />

                    <RadioGroup
                        required
                        id='deviceIsolation'
                        label="Isolatsiooni takistus"
                        name='deviceisolation'
                        row
                    >
                        <FormControlLabel value="1" control={<Radio />} label="Sobiv" />
                        <FormControlLabel value="2" control={<Radio />} label="Puudulik" />
                    </RadioGroup>

                    <h4>Pinge teim kV: </h4>
                    <DropDown
                    name="" ID="voltageTest"
                    value={selectedVoltageTest} label="kV"
                    onChange={(e) => selectVoltageTestHandler(e.target.value)}
                    options={voltageTestOptions}
                    />

                    <RadioGroup
                        required
                        id='deviceVoltageTest'
                        label="Pinge teim"
                        name='deviceVoltageTest'
                        row
                    >
                        <FormControlLabel value="1" control={<Radio />} label="Sobiv" />
                        <FormControlLabel value="2" control={<Radio />} label="Läbilöök" />
                    </RadioGroup>

                    <h4>Talitluskatse märkused:</h4>
                    <TextField
                        
                        id="deviceFunctionalTestNotes"
                        label="Märkused"
                        name="deviceFunctionalTestNotes"
                        autoComplete="none"
                        type="text"
                        margin="dense"
                        size="small"
                    />

                    <RadioGroup
                        required
                        id='deviceFunctionalTestSuitability'
                        label="Talitluskatse"
                        name='deviceFunctionalTestSuitability'
                        row
                    >
                        <FormControlLabel value="1" control={<Radio />} label="Sobiv" />
                        <FormControlLabel value="2" control={<Radio />} label="Puudulik" />
                    </RadioGroup>

                    <h4>Katsetuse pinge V: </h4>
                    <DropDown
                    name="" ID="testingVoltage"
                    value={selectedTestingVoltage} label="kV"
                    onChange={(e) => selectTestingVoltageHandler(e.target.value)}
                    options={testingVoltageOptions}
                    />

                    <h4>Ühendus:</h4>
                    <DropDown
                    name="" ID="connectionType"
                    value={selectedConnectionType} label="tüüp"
                    onChange={(e) => selectConnectionHandler(e.target.value)}
                    options={connectionOptions}
                    />

                    <h4>Katsetatud:</h4>
                    <DropDown
                    name="" ID="testingMethod"
                    value={selectedTestMethod} label="meetod"
                    onChange={(e) => selectTestMethod(e.target.value)}
                    options={testMethodOptions}
                    />

                    <h4>Voolud:</h4>
                    {/* 3 korda 1-lv textfield */}
                    <TextField
                        required
                        autoFocus
                        id="current-1"
                        label="1 - lv"
                        name="current-1"
                        autoComplete="none"
                        type="text"
                        margin="dense"
                        size="small"
                    />

                    <TextField
                        required
                        autoFocus
                        id="current-2"
                        label="1 - lv"
                        name="current-2"
                        autoComplete="none"
                        type="text"
                        margin="dense"
                        size="small"
                    />

                    <TextField
                        required
                        autoFocus
                        id="current-3"
                        label="1 - lv"
                        name="current-3"
                        autoComplete="none"
                        type="text"
                        margin="dense"
                        size="small"
                    />

                    <h4>Vibratsioonid mm/s, gE ja kuulamine</h4>
                    <TableContainer component={Paper}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">NDE</TableCell>
                                <TableCell align="right">mm/s</TableCell>
                                <TableCell align="right">gE</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="right">H</TableCell>
                                <TableCell align="right">
                                    <TextField
                                        name="nde1-mms-h"
                                        id="nde1-mms-h"
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <TextField
                                        name="nde1-ge-h"
                                        id="nde1-ge-h"
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right">V</TableCell>
                                <TableCell align="right">
                                    <TextField
                                        name="nde1-mms-v"
                                        id="nde1-mms-v"
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <TextField
                                        name="nde1-ge-v"
                                        id="nde1-ge-v"
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </TableContainer>
                    <br />
                    <TableContainer component={Paper}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">NDE</TableCell>
                                <TableCell align="right">mm/s</TableCell>
                                <TableCell align="right">gE</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="right">H</TableCell>
                                <TableCell align="right">
                                    <TextField
                                        name="nde2-mms-h"
                                        id="nde2-mms-h"
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <TextField
                                        name="nde2-ge-h"
                                        id="nde2-ge-h"
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right">V</TableCell>
                                <TableCell align="right">
                                    <TextField
                                        name="nde2-mms-v"
                                        id="nde2-mms-v"
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <TextField
                                        name="nde2-ge-v"
                                        id="nde2-ge-v"
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right">A</TableCell>
                                <TableCell align="right">
                                    <TextField
                                        name="nde2-mms-a"
                                        id="nde2-mms-a"
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <TextField
                                        name="nde2-ge-a"
                                        id="nde2-ge-a"
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </TableContainer>

                    <h4>Audio</h4>
                    <TextField
                        
                        autoFocus
                        id="audioNotes"
                        label="Tekstina"
                        name="audtioNotes"
                        autoComplete="none"
                        type="text"
                        margin="dense"
                        size="small"
                    />

                    <h4>Muud märkused</h4>
                    <TextField
                        autoFocus
                        id="otherNotes"
                        label="Tekstina"
                        name="otherNotes"
                        autoComplete="none"
                        type="text"
                        margin="dense"
                        size="small"
                    />

                    <h4>Mähiste takistused</h4>
                    <h4>U1-U2</h4>
                    <TextField
                        required
                        autoFocus
                        id="winding-u1-u2"
                        label=""
                        name="winding-u1-u2"
                        autoComplete="none"
                        type="text"
                        margin="dense"
                        size="small"
                    />

                    <DropDown
                    name="" ID="windingResistanceU"
                    value={selectedWindingResistanceU} label="Ühik"
                    onChange={(e) => selectWindingResistanceU(e.target.value)}
                    options={resistanceOptions}
                    />

                    <h4>V1-V2</h4>
                    <TextField
                        required
                        autoFocus
                        id="winding-v1-v2"
                        label=""
                        name="winding-v1-v2"
                        autoComplete="none"
                        type="text"
                        margin="dense"
                        size="small"
                    />

                    <DropDown
                    name="" ID="windingResistanceV"
                    value={selectedWindingResistanceV} label="Ühik"
                    onChange={(e) => selectWindingResistanceV(e.target.value)}
                    options={resistanceOptions}
                    />

                    <h4>W1-W2</h4>
                    <TextField
                        required
                        autoFocus
                        id="winding-w1-w2"
                        label=""
                        name="winding-w1-w1"
                        autoComplete="none"
                        type="text"
                        margin="dense"
                        size="small"
                    />

                    <DropDown
                    name="" ID="windingResistanceW"
                    value={selectedWindingResistanceW} label="Ühik"
                    onChange={(e) => selectWindingResistanceW(e.target.value)}
                    options={resistanceOptions}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Katkesta</Button>
                    <Button onClick={handleSave}>Salvesta</Button>
                </DialogActions>
            </Dialog>
        </div>
        </>
    )
}