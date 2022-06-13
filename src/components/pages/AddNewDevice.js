import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { FormControl, MenuItem } from "@mui/material";
import { Box, Select } from "@mui/material";
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
        const response = await axios.get(`${endpoint}/project/fnc_get_device_type.php?device`);
        console.log(response);
        setDeviceOptions([]);
        response.data.forEach(element => {
            setDeviceOptions(oldArray => [...oldArray, element]);
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
                    <h4>Seadme liik</h4>
						<Select
							id="deviceType"
							value={deviceID}
							label="Seadme liik"
							onChange={handleDeviceChange}
						>
							{deviceOptions.map((deviceOptions, index) => (
								<MenuItem
									key={index}
									value={deviceOptions.id}
									placeholder={deviceOptions.name}
								>
									{deviceOptions.name}
								</MenuItem>
							))}
						</Select>
                    </FormControl>
                </Box>

            </section>
        </main>
        </>
    );

}