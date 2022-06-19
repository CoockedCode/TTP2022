// import "../styles/TerminalBlockConnection.css";
import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import {  FormControlLabel } from "@mui/material";
import { Box, Checkbox } from "@mui/material";
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import { boxes } from "./BoxesData";

export default function TerminalBlockConnection(props){

    const [checkedState, setCheckedState] = useState(
        new Array(boxes.length).fill(false)
    );

    const handleChange = (e) => {
        const updatedCheckedState = checkedState.map((item, index) => 
            index === e ? !item : item
        );

        setCheckedState(updatedCheckedState);
    };

    useEffect(() => {props.passBlockConnectionData(checkedState)})

    return(
        <>
        <div style={{ width:"100%" }}>
            <Box 
                sx={{
                    display: "grid",
                    gap: 0.5,
                    gridTemplateColumns: "repeat(4, 1fr)"
                }}
            >
               
            {boxes.map((element, index) => (
                
                <FormControlLabel 
                    value={element.id}
                    control={
                            <Checkbox 
                                sx={{ color: "black", "&.Mui-checked": {color: "black"}, "&.Mui-disabled": {color: "white"} }}
                                checked={checkedState[index]}
                                disabled={element.hide}
                                icon={<CircleOutlinedIcon/>}
                                checkedIcon={<CircleIcon sx={{color: "black"}}/>}
                            />
                            }
                    label={element.label}
                    labelPlacement="top"
                    onChange={() => handleChange(index)}
                />
            ))}
                
            </Box>
        </div>
        </>
    );
}