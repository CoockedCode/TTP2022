import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Checkbox, FormLabel } from "@mui/material";
import { FormControl, FormGroup, FormControlLabel } from "@mui/material";
import { equipment } from "./EquipmentData";
import TerminalBlockConnection from "./TerminalBlockConnection";
import TerminalBlockPosition from "./TerminalBlockPosition";
import Canvas from "./Canvas";
import "../styles/TerminalBlockConnection.css";


    // TODO
    // skeemi joonistamise canvas breakpoints + kustutamise funktsionaalsus
    // ABsse salvestamine kui kõik väljad täidetud

export default function DeviceEquipment(){

    const [open, setOpen] = useState(false);

    const [checkedState, setCheckedState] = useState(
        new Array(equipment.length).fill(false)
    );

    const handleChange = (e) => {
        console.log(e)
        const updatedCheckedState = checkedState.map((item, index) => 
            index === e ? !item : item
        );

        setCheckedState(updatedCheckedState);
    };

    const handleClickOpen = (e) => {
        setOpen(true);
        console.log(e);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return(
        <>
        <div>
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
                            label="Tekstina"
                            name="deviceEquipmentNotes"
                            autoComplete="none"
                            type="text"
                            margin="dense"
                            size="small"
                        />

                        <h4>Klemmliistu ühendus</h4>
                        <TerminalBlockConnection />

                        <h5>Väljaviike: </h5>
                        <TextField
                            id="devicePinAmount"
                            label="Trüki arv"
                            name="devicePinAmount"
                            autoComplete="none"
                            type="text"
                            margin="dense"
                            size="small"
                        />

                        <h4>Klemmkarbi asend</h4>
                        <TerminalBlockPosition />

                        {/* <h4>Skeem</h4>
                        <Canvas /> */}
                    </FormControl>
                </DialogContent>
                
                <DialogActions>
                    <Button onClick={handleClose}>Katkesta</Button>
                    <Button onClick={handleClose}>Salvesta</Button>
                </DialogActions>

            </Dialog>
        </div>
        </>
    );
}