// import "../styles/TerminalBlockConnection.css";
import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import {  FormControlLabel } from "@mui/material";
import { Box, Checkbox } from "@mui/material";
import ArrowCircleDownRoundedIcon from '@mui/icons-material/ArrowCircleDownRounded';
import ArrowCircleUpRoundedIcon from '@mui/icons-material/ArrowCircleUpRounded';
import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined';
import RectangleRoundedIcon from '@mui/icons-material/RectangleRounded';
import ArrowCircleDownTwoToneIcon from '@mui/icons-material/ArrowCircleDownTwoTone';
import ArrowCircleUpTwoToneIcon from '@mui/icons-material/ArrowCircleUpTwoTone';
import { boxes } from "./BoxesData";

const Icons = {
    box: RectangleOutlinedIcon,
    checkedBox: RectangleRoundedIcon,
    arrowDown: ArrowCircleDownRoundedIcon,
    checkedArrowDown: ArrowCircleDownTwoToneIcon,
    arrowUp: ArrowCircleUpRoundedIcon,
    checkedArrowUp: ArrowCircleUpTwoToneIcon
}

const GenerateIcon = ( variant, props = {}) => {
    const IconName = Icons[variant];
    return <IconName {...props} />;
}

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

    useEffect(() => {props.passBlockPositionData(checkedState)})

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
                                sx={{ color: "black", "&.Mui-checked": {color: "black"} }}
                                checked={checkedState[index]}
                                icon={GenerateIcon(element.icon)}
                                checkedIcon={GenerateIcon(element.checkedIcon)}
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