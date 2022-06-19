import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
//import { FormControlLabel, Checkbox } from "@mui/material/";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/ducks/snackbar";
import { setUserSession } from "../../redux/ducks/userSession";
import axios from "axios";
import { useEffect } from "react";
import { endpoint } from "../../endpoint";

export default function SignIn() {
  //snackbar/usrSession
  const dispatch = useDispatch();

  //navigeermine
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(endpoint + "/auth/session/session.php?query_sess=true")
    .then(function(response){
      if(response.status === 200 && response.data[0].status == "true"){
        dispatch(setSnackbar(true, "success", "Automaatselt sisse logitud!"));
        dispatch(setUserSession(true, response.data[0].user_name));
        navigate("/avaleht");
      }else{
        dispatch(setUserSession(false, ""));
        console.log('Küpsised puudvad!');
      }
    })
  })

  const fetchUsr = async (usrNam, passWrd) => {
      const {status, data} = await axios.get(endpoint + "/auth/user/user_auth.php?user_name=" + usrNam + "&password=" + passWrd);
      if (status === 200){
        if (data.length > 0){
          // console.log(data);
          if (data[0].user_name == usrNam && data[0].signIn == "true") {
            dispatch(setSnackbar(true, "success", "Edukalt sisse loginud!"));
            dispatch(setUserSession(true, data[0].user_name));
            navigate("/avaleht");
          }
          if(data[0].error){
            dispatch(setSnackbar(true, "error", "Kasutaja on blokeeritud!"));
          }
        }else{
          dispatch(setSnackbar(true, "error", "Sisse logimine ebaõnnestus!"));
        }
      }
    };

  //siise logimine kontroll
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if ("" === formData.get("usrNam") || "" === formData.get("passwd")) {
      dispatch(setSnackbar(true, "warning", "Täida kõik väljad!"));
    } else {
      fetchUsr(formData.get("usrNam"), formData.get("passwd"));
    }
  };

  return (
    <main>
      <section>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Avatar sx={{ m: 1, bgcolor: "white", color: "black" }}></Avatar>
            <h1 style={{ margin: 0, padding: 0 }}>Logi Sisse</h1>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="usrNam"
                label="Kasutaja nimi"
                name="usrNam"
                autoComplete="none"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="passwd"
                label="Parool"
                type="password"
                id="passwd"
                // autoComplete="current-password"
                autoComplete="none"
              />
              {/*<FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Jäta mind meelde" />*/}
              <Button type="submit" fullWidth variant="contained" size="large" sx={{ my: 2 }}>
                Logi sisse
              </Button>
            </Box>
          </Box>
        </Container>
      </section>
    </main>
  );
}
