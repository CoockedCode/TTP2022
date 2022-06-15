// import "../styles/TerminalBlockConnection.css";
import React, { useState } from "react";
import { styled } from "@mui/system";
import { Box } from "@mui/system";
import { Grid, Paper } from "@mui/material";



export default function TerminalBlockConnection(){

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

      function FormRow() {
        return (
          <>
            <Grid item xs={4}>
              <Item>Kast</Item>
            </Grid>
            <Grid item xs={4}>
              <Item>Kast</Item>
            </Grid>
            <Grid item xs={4}>
              <Item>Kast</Item>
            </Grid>
          </>
        );
      }

    return(
        <>
        <Box sx={{ flexGrow: 2 }}>
            <Grid container spacing={1}>
                <Grid container item spacing={3}>
                    <Grid item xs={4}>
                        <Item>Kast1</Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>Kast2</Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>Kast3</Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>Tühi</Item>
                    </Grid>
                </Grid>
                <Grid container item spacing={3}>
                    <Grid item xs={4}>
                        <Item>Kast1</Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>Kast2</Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>Kast3</Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>Kast4</Item>
                    </Grid>
                </Grid>
                <Grid container item spacing={3}>
                    <Grid item xs={4}>
                        <Item>Kast1</Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>Kast2</Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>Kast3</Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>Tühi</Item>
                    </Grid>
                </Grid>
                <Grid container item spacing={3}>
                    <Grid item xs={4}>
                        <Item>Tühi</Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>Kast1</Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>Tühi</Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>Tühi</Item>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
        </>
    );
}