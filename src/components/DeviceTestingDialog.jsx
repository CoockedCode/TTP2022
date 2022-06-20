import React, { useState } from "react";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { FormControlLabel, Radio, RadioGroup, TableCell, TableContainer, TableRow } from '@mui/material';
import { Paper, TableContainer, TableCell, TableHead, TableRow, TableBody } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import et from 'dayjs/locale/et';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DropDown from "./DropDown";
import { useState, useEffect } from "react";
import axios from "axios";

// TODO
// mähiste takistuste väärtuste saamine PHPs
// info salvestamine ABsse ja sellega seonduv andmete saamine vormidest

const endpoint = "https://elektrimasinad.digifi.eu/api/view";

export default function DeviceTestingDialog({resistanceOptions, voltageTestOptions, testingVoltageOptions, connectionOptions, testMethodOptions, passTestingData}){

    const [open, setOpen] = useState(false);

    const form = [
        {
            functionalTest: "", // kuidas raadionuppu saada/määrata?
            isolationResistance: "", // selectedAmount ka juurde
            isolationSuitability: "", // raadionupp
            voltageTestSuitability: "", // raadionupp
            functionalTestNotes: "",
            functionalTestSuitability: "", // raadionupp
            current1: "",
            current2: "",
            current3: "",
            HMms1: "",
            HgE1: "",
            VMms1: "",
            VgE1: "",
            HMms2: "",
            HgE2: "",
            VMms2: "",
            VgE2: "",
            AMms2: "",
            AgE2: "",
            audioNotes: "",
            otherNotes: "",
            resistanceU: "",
            resistanceV: "",
            resistanceW: ""
        }
    ]

    const [formValue, setFormValue] = useState(form);

    const handleChange = (e) => {
        const {value, name} = e.target;
        const newValue = {
            ...formValue,
            [name]: value
        };
        setFormValue(newValue);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        // console.log(formValue)
    };

    // katsetaja dropdown
    const [testerID, setTesterID] = useState("");
    const handleTesterChange = (e) => {
        setTesterID(e.target.value);
    }
    const [testerOptions, setTesterOptions] = useState([]);

    const getTesterOptions = async() => {
        const response = await axios.get(`${endpoint}/project/fnc_get_tester.php?tester`);
        setTesterOptions([]);
		response.data.forEach(element => {
			setTesterOptions(oldTesterArray => [...oldTesterArray, element]);
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

    useEffect(() => {
        getTesterOptions();
    }, []);


    const handleSave = (e) => {
        e.preventDefault();

        const deviceTestingData = [
            {
                tester: testerID,
                testingDate: `${selectedTestingDate.$y}-${selectedTestingDate.$M + 1}-${selectedTestingDate.$D}`,
                functionalTest: formValue.functionalTest, 
                isolationResistance: formValue.isolationResistance,
                isolationResistanceUnit: selectedIsolationResistance,
                isolationSuitability: formValue.isolationSuitability, 
                voltageTest: selectedVoltageTest,
                voltageTestSuitability: formValue.voltageTestSuitability,
                functionalTestNotes: formValue.functionalTestNotes,
                functionalTestSuitability: formValue.functionalTestSuitability,
                testingVoltage: selectedTestingVoltage,
                connectionType: selectedConnectionType,
                testingMethod: selectedTestMethod,
                currents:
                {
                    current1: formValue.current1,
                    current2: formValue.current2,
                    current3: formValue.current3
                },
                tableDataHV:
                {
                    HMms: formValue.HMms1,
                    HgE: formValue.HgE1,
                    VMms: formValue.VMms1,
                    VgE: formValue.VgE1
                },
                tableDataHVA:
                {
                    HMms: formValue.HMms2,
                    HgE: formValue.HgE2,
                    VMms: formValue.VMms2,
                    VgE: formValue.VgE2,
                    AMms: formValue.AMms2,
                    AgE: formValue.AgE2
                },
                audioNotes: formValue.audioNotes,
                otherNotes: formValue.otherNotes,
                windingResistance:
                {
                    resistanceU: formValue.resistanceU,
                    resistanceUunit: selectedWindingResistanceU,
                    resistanceV: formValue.resistanceV,
                    resistanceVunit: selectedWindingResistanceV,
                    resistanceW: formValue.resistanceW,
                    resistanceWunit: selectedWindingResistanceW
                }
            }
        ]
        
        // console.log(deviceTestingData);
        passTestingData(deviceTestingData);
        setOpen(false);
    }
    
    return(
        <>
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
                        id='functionalTest'
                        label="Talitluskatse"
                        name='functionalTest'
                        value={formValue.functionalTest}
                        onChange={(e) => handleChange(e)}
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
                        id="isolationResistance"
                        value={formValue.isolationResistance}
                        onChange={(e) => handleChange(e)}
                        label="Takistuse nr"
                        name="isolationResistance"
                        autoComplete="none"
                        type="text"
                        margin="dense"
                        size="small"
                    />

                    <DropDown
                    name="" ID="isolationResistanceUnit"
                    value={selectedIsolationResistance} label="Ühik"
                    onChange={(e) => selectResistanceHandler(e.target.value)}
                    options={resistanceOptions}
                    />

                    <RadioGroup
                        required
                        id='isolationSuitability'
                        value={formValue.isolationSuitability}
                        label="Isolatsiooni takistus"
                        name='isolationSuitability'
                        onChange={(e) => handleChange(e)}
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
                        id='voltageTestSuitability'
                        value={formValue.voltageTestSuitability}
                        label="Pinge teim"
                        name='voltageTestSuitability'
                        onChange={(e) => handleChange(e)}
                        row
                    >
                        <FormControlLabel value="1" control={<Radio />} label="Sobiv" />
                        <FormControlLabel value="2" control={<Radio />} label="Läbilöök" />
                    </RadioGroup>

                    <h4>Talitluskatse märkused:</h4>
                    <TextField
                        
                        id="functionalTestNotes"
                        value={formValue.functionalTestNotes}
                        onChange={(e) => handleChange(e)}
                        label="Märkused"
                        name="functionalTestNotes"
                        autoComplete="none"
                        type="text"
                        margin="dense"
                        size="small"
                    />

                    <RadioGroup
                        required
                        id='functionalTestSuitability'
                        value={formValue.functionalTestSuitability}
                        label="Talitluskatse"
                        name='functionalTestSuitability'
                        onChange={(e) => handleChange(e)}
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
                    <TextField
                        required
                        autoFocus
                        id="current1"
                        label="1 - lv"
                        value={formValue.current1}
                        onChange={(e) => handleChange(e)}
                        name="current1"
                        autoComplete="none"
                        type="text"
                        margin="dense"
                        size="small"
                    />

                    <TextField
                        required
                        autoFocus
                        id="current2"
                        label="1 - lv"
                        value={formValue.current2}
                        onChange={(e) => handleChange(e)}
                        name="current2"
                        autoComplete="none"
                        type="text"
                        margin="dense"
                        size="small"
                    />

                    <TextField
                        required
                        autoFocus
                        id="current3"
                        label="1 - lv"
                        name="current3"
                        value={formValue.current3}
                        onChange={(e) => handleChange(e)}
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
                                        name="HMms1"
                                        id="HMms1"
                                        value={formValue.HMms1}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <TextField
                                        name="HgE1"
                                        id="HgE1"
                                        value={formValue.HgE1}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right">V</TableCell>
                                <TableCell align="right">
                                    <TextField
                                        name="VMms1"
                                        id="VMms1"
                                        value={formValue.VMms1}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <TextField
                                        name="VgE1"
                                        id="VgE1"
                                        value={formValue.VgE1}
                                        onChange={(e) => handleChange(e)}
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
                                        name="HMms2"
                                        id="HMms2"
                                        value={formValue.HMms2}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <TextField
                                        name="HgE2"
                                        id="HgE2"
                                        value={formValue.HgE2}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right">V</TableCell>
                                <TableCell align="right">
                                    <TextField
                                        name="VMms2"
                                        id="VMms2"
                                        value={formValue.VMms2}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <TextField
                                        name="VgE2"
                                        id="VgE2"
                                        value={formValue.VgE2}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right">A</TableCell>
                                <TableCell align="right">
                                    <TextField
                                        name="AMms2"
                                        id="AMms2"
                                        value={formValue.AMms2}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <TextField
                                        name="AgE2"
                                        id="AgE2"
                                        value={formValue.AgE2}
                                        onChange={(e) => handleChange(e)}
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
                        value={formValue.audioNotes}
                        onChange={(e) => handleChange(e)}
                        name="audioNotes"
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
                        value={formValue.otherNotes}
                        onChange={(e) => handleChange(e)}
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
                        id="resistanceU"
                        label=""
                        value={formValue.resistanceU}
                        onChange={(e) => handleChange(e)}
                        name="resistanceU"
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
                        id="resistanceV"
                        label=""
                        value={formValue.resistanceV}
                        onChange={(e) => handleChange(e)}
                        name="resistanceV"
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
                        id="resistanceW"
                        label=""
                        value={formValue.resistanceW}
                        onChange={(e) => handleChange(e)}
                        name="resistanceW"
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