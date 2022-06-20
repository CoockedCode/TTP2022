import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Paper, TableContainer, TableCell, TableHead, TableRow, TableBody, Input } from '@mui/material';


export default function WindingDialog(props){

    const rows = [
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
    ];

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        // console.log(props)
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [state, setState] = useState(rows)

    const handleChange = (e, i) => {
        const { value, name } = e.target;
        //console.log(value)

        const newState = [...state];
        newState[i] = {
            ...newState[i],
            [name]: value
        };

        setState(newState);
    }

    // saatmine hüpikaknast väljapoole
    const handleSave = () => {
        props.passWindingData(state);
        setOpen(false);
    }

    return(
        <>
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Mähise andmed
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Mähise andmed</DialogTitle>
                <DialogContent>
                    <TableContainer component={Paper}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right"></TableCell>
                                <TableCell align="left">Staator</TableCell>
                                <TableCell align="left">Rootor</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {state.map(({ name, statorValue, rotorValue }, index) => {
                                return(
                                    <TableRow
                                        key={index}
                                    >
                                        <TableCell>
                                            {name}
                                            {": "}
                                        </TableCell>
                                        <TableCell align="left">
                                            <TextField
                                                name="statorValue"
                                                value={statorValue}
                                                onChange={(e) => handleChange(e, index)}
                                            />
                                        </TableCell>
                                        <TableCell align="left">
                                            <TextField
                                                name="rotorValue"
                                                value={rotorValue}
                                                onChange={(e) => handleChange(e, index)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </TableContainer>
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