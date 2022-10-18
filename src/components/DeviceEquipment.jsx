import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Checkbox } from "@mui/material";
import { FormControl, FormGroup, FormControlLabel } from "@mui/material";
import { equipment } from "./EquipmentData";
import TerminalBlockConnection from "./TerminalBlockConnection";
import TerminalBlockPosition from "./TerminalBlockPosition";
import Canvas from "./Canvas";
import "../styles/TerminalBlockConnection.css";


    // TODO
    // skeemi joonistamise canvas breakpoints + kustutamise funktsionaalsus
    // ABsse salvestamine kui kõik väljad täidetud

export default function DeviceEquipment(props){

    const [open, setOpen] = useState(false);

    // klemmliistu ühenduse andmete saamine
    const [blockConnectionData, setBlockConnectionData] = useState("");

    const passBlockConnectionData = (data) => {
        setBlockConnectionData(data);
    }

    // klemmkarbi asendi info saamine
    const [blockPositionData, setBlockPositionData] = useState("");

    const passBlockPositionData = (data) => {
        setBlockPositionData(data);
    }

    const form = [
        {
            deviceEquipmentNotes: "",
            devicePinAmount: ""
        }
    ]

    const [formValue, setFormValue] = useState(form);

    const handleFormChange = (e) => {
        const {value, name} = e.target;
        const newValue = {
            ...formValue,
            [name]: value
        };
        setFormValue(newValue);
    }

    const [checkedState, setCheckedState] = useState(
        new Array(equipment.length).fill(false)
    );

    const handleChange = (e) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === e ? !item : item
        );

        setCheckedState(updatedCheckedState);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = (e) => {
        e.preventDefault();

        const deviceEquipmentData = [
            {
                equipment: checkedState,
                equipmentNotes: formValue.deviceEquipmentNotes,
                terminalBlockConnection: blockConnectionData,
                devicePinAmount: formValue.devicePinAmount,
                terminalBlockPosition: blockPositionData,
                // schema:

            }
        ]
        // console.log(deviceEquipmentData);
        props.passEquipmentData(deviceEquipmentData);
        setOpen(false);
    }

    return(
        <>
        <FormControl size="small" sx={{display: "inline-flex", flexDirection: "row", flexWrap: "wrap", mr: 1, mt: 1.5}} >
            <Button variant="outlined" onClick={handleClickOpen}>
                Seadme varustus
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Seadme varustus</DialogTitle>
                <DialogContent>

                    {/* <div style={{ position: "relative", width: "500px", height: "500px"}}>
                    <h4>Skeem</h4>
                        <Canvas />

                    </div> */}
                    {/* <Button variant="outlined" onClick={(e) => handleClickOpen(e)}>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Skeem</DialogTitle>
                            <DialogContent>
                                <h4>Skeem</h4>
                                <Canvas />
                            </DialogContent>

                        </Dialog>
                    </Button> */}

                    <FormControl component="fieldset">
                        <Box sx={{ display: "grid", gap: 1, gridTemplateColumns: "repeat(3, 1fr)" }}>
                            <FormGroup>
                            {equipment.map((element, index) => (
                                <FormControlLabel
                                    value={element.label}
                                    control={<Checkbox checked={checkedState[index]} />}
                                    label={element.label}
                                    labelPlacement="start"
                                    onChange={() => handleChange(index)}
                                />
                            ))}
                            </FormGroup>
                        </Box>


                        <h5>Muud varustuse märkused</h5>
                        <TextField
                            id="deviceEquipmentNotes"
                            value={formValue.deviceEquipmentNotes}
                            onChange={(e) => handleFormChange(e)}
                            label="Tekstina"
                            name="deviceEquipmentNotes"
                            autoComplete="none"
                            type="text"
                            margin="dense"
                            size="small"
                        />

                        <h4>Klemmliistu ühendus</h4>
                        <TerminalBlockConnection passBlockConnectionData={passBlockConnectionData}/>

                        <h5>Väljaviike: </h5>
                        <TextField
                            id="devicePinAmount"
                            value={formValue.devicePinAmount}
                            onChange={(e) => handleFormChange(e)}
                            label="Trüki arv"
                            name="devicePinAmount"
                            autoComplete="none"
                            type="text"
                            margin="dense"
                            size="small"
                        />

                        <h4>Klemmkarbi asend</h4>
                        <TerminalBlockPosition passBlockPositionData={passBlockPositionData}/>

                        {/* <h4>Skeem</h4>
                        <Canvas /> */}
                    </FormControl>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Katkesta</Button>
                    <Button onClick={handleSave}>Salvesta</Button>
                </DialogActions>

            </Dialog>
        </FormControl>
        </>
    );
}