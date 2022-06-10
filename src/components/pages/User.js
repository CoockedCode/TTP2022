import { useSelector } from "react-redux";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, TextField, Box } from "@mui/material/";

import { FormControl } from '@mui/material'

import axios from 'axios';
const endpoint = "https://elektrimasinad.digifi.eu/api";

import { useEffect, useState } from "react";

export default function User() {

    const usrNam = useSelector(state => state.userSession.userName);

    const [user, setUser] = useState([]);
	const FetchUser = async ()=>{
		const resp = await axios.get(endpoint + "/user/User.php?usr=" + usrNam);
        // console.log(resp.data);
		setUser([]);
		resp.data.forEach( element => {
			setUser(oldArray => [...oldArray, element])
		});
	};

    useEffect(() => {
		FetchUser();
  	}, []);


	const ChangePassword = async (usrNam, oldPassword, newPassword)=>{
		const resp = await axios.get(endpoint + "/user/User.php?changePwdUsr=" + usrNam + "&changePwdOld=" + oldPassword + "&changePwdNew=" + newPassword);
		console.log(resp.data);
		console.log(resp.status);
	};

    // ChangePassword(1, 1, 2);


    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //siise logimine kontroll
    const handleSubmit = (e) => {
        e.preventDefault();
		const formData = new FormData(e.currentTarget);
        const usrNam = formData.get("name");
        const oldPassword = formData.get("old");
        const newPassword = formData.get("new");

        ChangePassword(usrNam, oldPassword, newPassword);
    };

    return(
        <>
        <main>
            <section style={{ width: "50%"}}>
            <div id="header-wrapper">
                <div id="page-header">
                <h3>Kasutaja sätted</h3>
                </div>
            </div>
            <div id="content-wrapper">
                {user.map((user) => (
                    <div
                        key={user}
                        id={user.id}
                    >
                        <p>ID: {user.id}</p>
                        <p>Eesnimi: {user.first_name}</p>
                        <p>Perekonnanimi: {user.last_name}</p>
                        <p>Kasutajanimi: {user.user_name}</p>
                        <p>Email: {user.email}</p>
                    </div>
                ))}


                <Button variant="outlined">Muuda kasutajanimi</Button>
                {/* Sama popup, msi avalehel ja saab muuta kas parooli või kasutajanime... */}
                {/* TODO: !1!!!! */}

                 <div>

                        <Button variant="contained" onClick={handleClickOpen}>
                            Muuda parool
                        </Button>
                        <Dialog open={open} onClose={handleClose}>

                            <DialogTitle>Parooli muutmine:</DialogTitle>
                            <DialogContent>
                            <DialogContentText>
                                Parooli muutmine on võimalik kui oled sisse loginud.
                            </DialogContentText>
                            <Box  component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
					        <FormControl sx={{width: "100%"}} >
                                <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                name="name"
                                label="Kasutajanimi"
                                type="text"
                                fullWidth
                                variant="outlined"
                                required
                                autoComplete="none"
                            />
                            <TextField
                                margin="dense"
                                id="old"
                                name="old"
                                label="Vana parool"
                                type="password"
                                fullWidth
                                variant="outlined"
                                required
                                autoComplete="none"
                            />
                            <TextField
                                margin="dense"
                                id="new"
                                name="new"
                                label="Uus parool"
                                type="password"
                                fullWidth
                                variant="outlined"
                                required
                                autoComplete="none"
                            />
                            <Box sx={{display: "flex", justifyContent: "space-evenly", my: "1.2rem", mx: "2.5rem"}}>
                                <Button variant="outlined" onClick={handleClose}>tühista</Button>
                                <Button type="submit" variant="contained" onClick={handleClose}>muuda parool</Button>
                            </Box>
                            </FormControl>
				            </Box>

                            </DialogContent>


                            </Dialog>

                </div>


            </div>
            </section>
        </main>
        </>
    );
}