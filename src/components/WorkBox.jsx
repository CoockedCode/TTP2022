import 'reactjs-popup/dist/index.css';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { ButtonBase } from '@mui/material';
import { useDispatch } from "react-redux";
import { setSnackbar } from "../redux/ducks/snackbar";

//popup modal
	const style = {
		position: 'absolute',
		top: '25%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 'max-content',
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4,
	};

export default function WorkBox(props) {
	//Päris andmete kätte saamine ja kasti selle sisestus
	let a = JSON.parse(JSON.stringify(props))
	// const ListItems = a.workName.map((e) => {
	// 	//console.log(typeof(e))
	// return(
	// 	<div className="work-box" style={{backgroundColor: e.color}}>{e.work}</div>
	// )
	// });
	const ListItems = a.workName.map((e) => {
		//console.log(a.workName)
		let workColor = '';
		if(e.workProg === '1'){
			workColor = "#F77F7F";
		}else if(e.workProg === '2'){
			workColor = "#FEDD00";
		}else if(e.workProg === '3'){
			workColor = "#2F9B61";
		}else{
			workColor = "white";
		}

	//popup modal
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);


	//snackbar
	const dispatch = useDispatch();

	//tööga alustamine, lõpetamine
	const handleWorkOpen = () => {
		dispatch(setSnackbar(true,"success","Edukalt töö alustatud!"));
		setOpen(false);
	};
	const handleWorkClose = () => {
		dispatch(setSnackbar(true,"success","Edukalt töö lõpetatud!"));
		setOpen(false);
	};


	return(
		<div className='work-box-wrap' key={e.pos}>
			{/* <ButtonBase ><div onClick={handleOpen} className="work-box" style={{backgroundColor: workColor, color: 'black'}}>{e.work}</div></ButtonBase> */}
			<ButtonBase onClick={handleOpen} className="work-box" style={{backgroundColor: workColor, color: 'black'}}>{e.work}</ButtonBase>

			<Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
				<Box sx={style}>
					<div id="popup-modal-inline">
						<h3>Tööga alustamine: </h3>
						<Button id='start-work' variant="contained" sx={{ml: 1}} onClick={handleWorkOpen} >Alusta</Button>
					</div>
					<hr/>
					<div id="popup-modal-inline">
						<h3>Tööga lõpetamine: </h3>
						<Button id='stop-work' variant="contained" sx={{ml: 1}} onClick={handleWorkClose} >Lõpeta</Button>
					</div>

					{/* <hr/>
					<div style={{paddingLeft: "7.5rem", margin: "0rem 1rem 0.5rem 0rem"}}>
						<Button id='save-button' variant="contained" type="submit">Salvesta</Button>
					</div>						 */}
				</Box>
			</Modal>
		</div>

	)
	});

	return (<>{ListItems}</>);
}
