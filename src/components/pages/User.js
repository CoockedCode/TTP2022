import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Dialog, DialogContent, DialogTitle, DialogContentText, TextField, Box } from "@mui/material/";
import { FormControl } from '@mui/material'
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/ducks/snackbar";
import { setUserSession } from "../../redux/ducks/userSession";
import axios from 'axios';

const endpoint = "https://elektrimasinad.digifi.eu/api";

export default function User() {
    const dispatch = useDispatch();
    const usrNam = useSelector(state => state.userSession.userName);

    const [openPassword, setOpenPassword] = useState(false);
    const handleClickOpenPassword = () => {setOpenPassword(true);};
    const handleClosePassword = () => {setOpenPassword(false);};

    const [openName, setOpenName] = useState(false);
    const handleClickOpenName = () => {setOpenName(true);};
    const handleCloseName = () => {setOpenName(false);};

    const [user, setUser] = useState([]);
	const FetchUser = async ()=>{
		const resp = await axios.get(endpoint + "/user/User.php?usr=" + usrNam);
        // console.log(resp.data);
		setUser([]);
		resp.data.forEach( element => {
			setUser(oldArray => [...oldArray, element])
		});
	};

    useEffect(() => {FetchUser();}, []);

	const ChangePassword = async (usrNam, oldPassword, newPassword) =>{
		const resp = await axios.get(endpoint + "/user/User.php?changePwdUsr=" + usrNam + "&changePwdOld=" + oldPassword + "&changePwdNew=" + newPassword);
		dispatch(setSnackbar(true, resp.data[0].type, resp.data[0].notice));
	};

    const ChangeUserName = async (oldName, newName, password) =>{
		const resp = await axios.get(endpoint + "/user/User.php?changeNameOld=" + oldName + "&changeNameNew=" + newName + "&changeNamePwd=" + password);
		console.log(resp.data.notice);
        dispatch(setSnackbar(true, resp.data[0].type, resp.data[0].notice));
	};

    const handleSubmitPassword = (e) => {
        e.preventDefault();
		const formData = new FormData(e.currentTarget);
        const usrNam = formData.get("name");
        const oldPassword = formData.get("old");
        const newPassword = formData.get("new");
        ChangePassword(usrNam, oldPassword, newPassword);
    };
    const handleSubmitUsername = (e) => {
        e.preventDefault();
		const formData = new FormData(e.currentTarget);
        const oldName = formData.get("oldName");
        const newName = formData.get("newName");
        const password = formData.get("password");
        // console.log(oldName, newName, password);
        ChangeUserName(oldName, newName, password);
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

                <div>
                    <Button variant="contained" onClick={handleClickOpenPassword}>
                        Muuda parool
                    </Button>
                    <Dialog open={openPassword} onClose={handleClosePassword}>
                        <DialogTitle>Parooli muutmine:</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Parooli muutmine on võimalik kui oled sisse loginud.
                            </DialogContentText>
                            <Box  component="form" noValidate autoComplete="off" onSubmit={handleSubmitPassword}>
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
                                        <Button variant="outlined" onClick={handleClosePassword}>tühista</Button>
                                        <Button type="submit" variant="contained" onClick={handleClosePassword}>muuda parool</Button>
                                    </Box>
                                </FormControl>
                            </Box>
                        </DialogContent>
                    </Dialog>
                </div>

                <div>
                    <Button variant="outlined" onClick={handleClickOpenName}>
                        Muuda kasutajanimi
                    </Button>
                    <Dialog open={openName} onClose={handleCloseName}>
                        <DialogTitle>Kasutajanime muutmine:</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Kasutajanime muutmine on võimalik kui oled sisse loginud.
                            </DialogContentText>
                            <Box  component="form" noValidate autoComplete="off" onSubmit={handleSubmitUsername}>
                                <FormControl sx={{width: "100%"}} >
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="oldName"
                                        name="oldName"
                                        label="Vana kasutajnimi"
                                        type="text"
                                        fullWidth
                                        variant="outlined"
                                        required
                                        autoComplete="none"
                                    />
                                    <TextField
                                        margin="dense"
                                        id="newName"
                                        name="newName"
                                        label="Uus kasutajnimi"
                                        type="text"
                                        fullWidth
                                        variant="outlined"
                                        required
                                        autoComplete="none"
                                    />
                                    <TextField
                                        margin="dense"
                                        id="password"
                                        name="password"
                                        label="parool"
                                        type="password"
                                        fullWidth
                                        variant="outlined"
                                        required
                                        autoComplete="none"
                                    />
                                    <Box sx={{display: "flex", justifyContent: "space-evenly", my: "1.2rem", mx: "2.5rem"}}>
                                        <Button variant="outlined" onClick={handleCloseName}>tühista</Button>
                                        <Button type="submit" variant="contained" onClick={handleCloseName}>muuda kasutajanimi</Button>
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