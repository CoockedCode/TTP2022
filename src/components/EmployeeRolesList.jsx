import { FormControl } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';
import { FormControl } from '@mui/material';;
import "../styles/pages/Home.css";
import DropDown from './DropDown';

const EmployeeRolesList = () => {
    const endpoint = "https://elektrimasinad.digifi.eu/api";

      const [roleName, setRoleName] = useState("");
      const handleRoleChange = (e) => {
          setRoleName(e.target.value);
        }
    const [roleNameOptions, setRoleNameOptions] = useState([]);

    const getRoleOptions = async() =>{
        const response = await axios.get(endpoint+'/employee/fnc_employee_role.php');
        console.log(response);
        setRoleNameOptions([]);
        response.data.forEach(element=>{
            setRoleNameOptions(oldArray => [...oldArray, element]);
        })
        }

    useEffect(() => {
        getRoleOptions();
    }, []);

  return (
    <>
      <main>
        <section style={{ width: "100%", padding: "0 5%" }}>
          <div id="header-wrapper">
            <div id="page-header">
            </div>
          </div>
          <Box component="form" noValidate autoComplete="off">
            <FormControl sc={{width: "100%"}}>
              <DropDown
                name="Tööroll" ID="roleName" 
                value={roleName} label="Tööroll"
                onChange={handleRoleChange}
                options={roleNameOptions}
                />
            </FormControl>
          </Box>
        </section>
      </main>
    </>
  );
};

export default EmployeeRolesList;