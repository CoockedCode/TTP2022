// import "../styles/TerminalBlockConnection.css";
import React, { useState } from "react";
import { Box } from "@mui/system";
import {  FormControlLabel } from "@mui/material";
import { Box, Checkbox } from "@mui/material";

const boxes = [
    {
        id: 1,
        hide: false
    },
    {
        id: 2,
        hide: false
    },
    {
        id: 3,
        hide: false
    },
    {
        id: 4,
        hide: true
    },
    {
        id: 5,
        hide: false
    },
    {
        id: 6,
        hide: false
    },
    {
        id: 7,
        hide: false
    },
    {
        id: 8,
        hide: false
    },
    {
        id: 9,
        hide: false
    },
    {
        id: 10,
        hide: false
    },
    {
        id: 11,
        hide: false
    },
    {
        id: 12,
        hide: true
    },
    {
        id: 13,
        hide: true
    },
    {
        id: 14,
        hide: false
    },
    {
        id: 15,
        hide: true
    },
    {
        id: 16,
        hide: true
    }
]

export default function TerminalBlockConnection(){

    const [checkedState, setCheckedState] = useState(
        new Array(boxes.length).fill(false)
    );

    const handleChange = (e) => {
        console.log(e)
        const updatedCheckedState = checkedState.map((item, index) => 
            index === e ? !item : item
        );

        setCheckedState(updatedCheckedState);
    };

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
                    value={element.label}
                    control={
                            <Checkbox 
                                sx={{ color: "black", "&.Mui-checked": {color: "black"}, "&.Mui-disabled": {color: "white"}, borderRadius: "35px" }}
                                checked={checkedState[index]}
                                disabled={element.hide}
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