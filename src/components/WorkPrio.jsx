import 'reactjs-popup/dist/index.css';
import ButtonBase from '@mui/material/ButtonBase';

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

export default function WorkPrio({prio}) {
	const dispatch = useDispatch();
	//popup modal
	const [open, setOpen] = useState(false);
	const handleOpen = () => {setOpen(true)};
	const handleClose = (e, buttonVar) => {
		e.preventDefault();
		if(buttonVar === 1){
			dispatch(setSnackbar(true,"success","Edukalt PT muudetud!"));
			setOpen(false);
		}else{
			setOpen(false);
		}
	};

		//console.log(a.workName)
		let workColor = '';
		let name = '';
		if(prio === 1){
			workColor = "#F77F7F";
			name = "K" 					// * Kiire
		}else if(prio === 2){
			workColor = "#FEDD00";
			name = "T" 					// * Tähtajaline
		}else if(prio === 3){
			workColor = "#2A86CE";
			name = "M" 					// * Määramata
		}else{
			workColor = "#CEE741";
		}

	return(
		<div className='work-box-wrap' key={prio}>
			<ButtonBase onClick={handleOpen} className="work-box" style={{backgroundColor: workColor, color: 'black'}}>{name}</ButtonBase>

				<Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
				<Box sx={style}>

						<h3>Prioteedi muutmine: </h3>
						<Button variant="outlined" sx={{ml: 1}} onClick={(e)=>handleClose(e, 0)} >Tühista</Button>
						<Button variant="contained" sx={{ml: 1}} onClick={(e)=>handleClose(e, 1)} >Muuda PT</Button>


				</Box>
			</Modal>
		</div>

	)

}
