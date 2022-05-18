import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';

//logout
import { useDispatch } from "react-redux";
import { setUserSession } from "../redux/ducks/userSession";
import { setSnackbar } from "../redux/ducks/snackbar";
import { useCookies } from 'react-cookie';

//usrNam
import { useSelector } from "react-redux";
import {Typography} from '@mui/material';
//navigate
import { useNavigate } from "react-router-dom";


const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["Dev"]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  //välja logimine
  const dispatch = useDispatch();
  const handleLogout = () =>{
	dispatch(setUserSession(false,""));
	dispatch(setSnackbar(true,"info","Edukalt välja loginud!"));
  }
  //ursnam
  const usrNam = useSelector(state => state.userSession.userName);
  return (
	<>
		<AppBar position="sticky" sx={{ backgroundColor: "black", display: 'flex', justifyContent: 'center', alignItems: "center", width: "100%" }}>
			<Toolbar variant="dense" disableGutters sx={{ display: 'flex', width: "85%", maxHeight: '2.6rem', minHeight: '2.6rem', justifyContent: "space-between"}} >
				<Box sx={{display: 'inline-flex', minHeight: "2rem", maxHeight: "2rem"}} >
					<IconButton size="small" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
						<MenuIcon />
					</IconButton>
						<Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}} keepMounted	transformOrigin={{vertical: 'top', horizontal: 'center' }} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}	disableScrollLock={true} sx={{ display: "flex" }}>

						<MenuItem className="nav-link-burger" onClick={()=>{handleCloseNavMenu(); navigate("/main")}} >
							Valikute seaded<br/>
						</MenuItem>
						<MenuItem className="nav-link-burger" onClick={()=>{handleCloseNavMenu(); navigate("/main")}}>
							Tööd ja etapid<br/>
						</MenuItem>
						<MenuItem className="nav-link-burger" onClick={()=>{handleCloseNavMenu(); navigate("/addClient")}}>
							Lisa Klient +<br/>
						</MenuItem>
						<MenuItem className="nav-link-burger" onClick={()=>{handleCloseNavMenu(); navigate("/main")}}>
							Kliendid<br/>
						</MenuItem>
						<MenuItem className="nav-link-burger" onClick={()=>{handleCloseNavMenu(); navigate("/addWorker")}}>
							Lisa Töötaja +<br/>
						</MenuItem>
						<MenuItem  className="nav-link-burger" onClick={()=>{handleCloseNavMenu(); navigate("/main")}}>
							Töötajad<br/>
						</MenuItem>
						<MenuItem className="nav-link-burger" onClick={()=>{handleCloseNavMenu(); navigate("/T")}}>
							Test<br/>
						</MenuItem>
						<MenuItem className="nav-link-burger" onClick={()=>{handleCloseNavMenu(); navigate("/TestAb2")}}>
								AB Test 2<br/>
						</MenuItem>
					</Menu>
				</Box>

				<Box sx={{ display: 'inline-flex', minHeight: "2rem", maxHeight: "2rem", justifyContent: "center", flexGrow: 2, mx: 'auto',}}>
					<Button onClick={()=>{handleCloseNavMenu; navigate("/Main")}} sx={{ p: 1, color: 'white' }}>
						<Typography className="nav-link">Avaleht</Typography>
					</Button>
					<Button onClick={()=>{handleCloseNavMenu; navigate("/addNewProject")}} sx={{ p: 1, color: 'white' }}>
						<Typography className="nav-link">Lisa projekt&nbsp;+</Typography>
					</Button>
				</Box>

				<Box sx={{ display: 'inline-flex', minHeight: "2rem", maxHeight: "2rem", justifyContent: "flex-end", flexShrink: 1}}>
					{/* <Tooltip title="ava kasutaja sätted"> */}
					<Button onClick={handleOpenUserMenu} sx={{ p: 1, color: 'white'}}>
						<Box >
							<Box sx={{ display: { xs: 'none', sm: 'inline-flex' }, position: 'absolute', right: "3.2rem", top: "0.45rem" }}>
								<Typography className="nav-link">{usrNam}</Typography>
							</Box>
								<Avatar sx={{ mx: 0.5, bgcolor: 'rgba(0,0,0,0)', color: 'white', }}></Avatar>
						</Box>
					</Button>
					{/* </Tooltip> */}
					<Menu
					// sx={{ mt: '1.5rem' }}
					id="menu-appbar"
					anchorEl={anchorElUser}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right',
					}}
					keepMounted
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					open={Boolean(anchorElUser)}
					disableScrollLock={true}
					onClose={handleCloseUserMenu}>
						<MenuItem className="nav-link-burger" onClick={()=>{handleCloseUserMenu(); handleLogout()}}>
							<LogoutIcon />&nbsp;&nbsp;Logi välja
						</MenuItem>
					</Menu>
				</Box>

			</Toolbar>
		</AppBar>
	</>
  );
};
export default ResponsiveAppBar;
