import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { FormControl, MenuItem } from "@mui/material";
import { Box, Select } from "@mui/material";
import DropDown from "../DropDown";
import axios from "axios";

const endpoint = "https://elektrimasinad.digifi.eu/api";

export default function AddNewProject(){

    //snackbar
    const dispatch = useDispatch();

    // seadme liigi dropdown
    const [deviceID, setDeviceID] = useState("");
    const handleDeviceChange = (e) => {
        setDeviceID(e.target.value);
    }
    const [deviceOptions, setDeviceOptions] = useState([]);
    const getDeviceOptions = async() => {
        const response = await axios.get(`${endpoint}/view/project/fnc_get_device_info.php`);
        console.log(response);
        setDeviceOptions([]);
        response.data.forEach(element => {
            setDeviceOptions(oldArray => [...oldArray, element]);
        })
    }

    // võimsus kW dropdown
    const [powerID, setPowerID] = useState("");
    const handlePowerChange = (e) => {
        setPowerID(e.target.value);
    }
    const [powerOptions, setPowerOptions] = useState([]);
    const getPowerOptions = async() => {
        const response = await axios.get(`${endpoint}/view/project/fnc_get_device_info.php`);
        setPowerOptions([]);
        response.forEach(element => {
            setPowerOptions(oldArray => [...oldArray, element]);
        })
    }

    useEffect(() => {
        getDeviceOptions();
    }, []);

    // submit vajutus
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return(
        <>
        <main>
            <section style={{width: "50%"}}>
                <br />
                <div id="header-wrapper">
					<h3 style={{margin: '0', marginBottom: '0.5rem'}}>Seadme tehniline info</h3>
				</div>
                <div>
                    <p>Projekti nr: 123</p>
                </div>
                <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <FormControl sc={{width: "100%"}}>
                        <DropDown
                         name="Seadme liik" ID="deviceType"
                         value={deviceID} label="Seadme liik"
                         onChange={handleDeviceChange}
                         options={deviceOptions}
                        />

                        <DropDown
                         name="Võimsus kW" ID="powerID"
                         value={powerID} label="Võimsus kW"
                         onChange={handlePowerChange}
                         options={powerOptions}
                        />
                    </FormControl>
                </Box>

            </section>
        </main>
        </>
    );

}