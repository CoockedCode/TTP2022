// import "../styles/TerminalBlockConnection.css";
import React, { useState } from "react";
import { Box } from "@mui/system";
import {  FormControlLabel } from "@mui/material";
import { Box, Checkbox } from "@mui/material";
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined';

const boxes = [
    {
        id: 1,
        icon: "box"
    },
    {
        id: 2,
        icon: "box"
    },
    {
        id: 3,
        icon: "box"
    },
    {
        id: 4,
        icon: "arrowDown"
    },
    {
        id: 5,
        icon: "arrowDown"
    },
    {
        id: 6,
        icon: "arrowDown"
    },
    {
        id: 7,
        icon: "box"
    },
    {
        id: 8,
        icon: "box"
    },
    {
        id: 9,
        icon: "box"
    },
    {
        id: 10,
        icon:  "arrowUp"
    },
    {
        id: 11,
        icon:  "arrowUp"
    },
    {
        id: 12,
        icon:  "arrowUp"
    },
    {
        id: 13,
        icon: "box"
    },
    {
        id: 14,
        icon: "box"
    },
    {
        id: 15,
        icon: "box"
    }
]

const Icons = {
    box: RectangleOutlinedIcon,
    arrowDown: ArrowDownwardOutlinedIcon,
    arrowUp: ArrowUpwardOutlinedIcon
}

const GenerateIcon = ( variant, props = {}) => {
    const IconName = Icons[variant];
    return <IconName {...props} />;
}

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
        <div style={{ width:"100%", display: "flex", justifyContent: "center", position: "relative" }}>
            <div style={{ position: "absolute", top: "45%", left: "10%" }}>DE</div>
            <div style={{ border: "1px solid black", width: "50px", height: "20px", position: "absolute", top: "45%", left: "16.5%" }}></div>
            <div style={{ border: "1px solid black", width: "200px", height: "165px", position: "absolute", top: "30px" }}></div>
            <Box 
                sx={{
                    display: "grid",
                    gap: 0.5,
                    gridTemplateColumns: "repeat(3, 0fr)",
                    justifyContent: "center"
                }}
            >
               
            {boxes.map((element, index) => (
                
                <FormControlLabel
                    value={element.id}
                    control={
                            <Checkbox 
                                sx={{ color: "black", "&.Mui-checked": {color: "black"}, "&.Mui-disabled": {color: "white"} }}
                                checked={checkedState[index]}
                                icon={GenerateIcon(element.icon)}
                            />
                            }
                    label={element.label}
                    labelPlacement="top"
                    onChange={() => handleChange(index)}
                />
            ))}
                
            </Box>
            <div style={{ position: "absolute", top: "45%", right: "15%" }}>NDE</div>
        </div>
        </>
    );
}