import ChoiceTabel from "../ChoiceTabel";
import SecondaryChoiceTable from "../SecondaryChoiceTable";
import { FormControl, FormHelperText } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';
import { setSnackbar } from "../../redux/ducks/snackbar";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';;
import "../../styles/pages/Home.css";

const ClientList = () => {
  return (
    <>
      <main>
        <section style={{ width: "100%", padding: "0 5%" }}>
          <div id="header-wrapper">
            <div id="page-header">
              <h3>Kliendid</h3>
            </div>
            <div id="srch-bar">
              <FormControl fullWidth>
                <TextField id="filled-basic" label="Otsi..." variant="outlined" size="small" />
              </FormControl>
            </div>
          </div>
          <ChoiceTabel />
          <SecondaryChoiceTable />
        </section>
      </main>
    </>
  );
};

export default ClientList;
