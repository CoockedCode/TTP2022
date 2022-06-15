import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Checkbox, FormLabel } from "@mui/material";
import { FormControl, FormGroup, FormControlLabel } from "@mui/material";
import { equipment } from "./EquipmentData";

export default function DeviceEquipment(){

    const [open, setOpen] = useState(false);

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

    return(
        <>
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Seadme varustus
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Seadme varustus</DialogTitle>
                <DialogContent>
                    <FormControl component="fieldset">
                        <FormGroup>
                            {equipment.map((element) => (
                                <FormControlLabel
                                    value={element.label}
                                    control={<Checkbox checked={checkedState} />}
                                    label={element.label}
                                    labelPlacement="start"
                                    onChange={handleChange}
                                />
                            ))}
                        </FormGroup>
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