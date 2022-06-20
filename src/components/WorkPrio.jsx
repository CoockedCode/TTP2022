import 'reactjs-popup/dist/index.css';
import { ButtonBase, FormControl, Select, MenuItem } from '@mui/material/';
import 'reactjs-popup/dist/index.css';
import { useState, useEffect } from 'react';
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
		border: '1px solid #000',
		boxShadow: 24,
		px: 4,
		pb: 4,
		pt: 2,
	};

export default function WorkPrio({prio}) {
	const dispatch = useDispatch();
	const [queryOption, setQueryOption] = useState(0);
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

	useEffect(() => {
		if(prio === 4){
			setQueryOption(0);
		}else{
			setQueryOption(prio);
		}
	}, [prio])


	const handleChange = (event) => {
		setQueryOption(event.target.value);
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
			workColor = "#2F9B61";
		}

	return(
		<div className='work-box-wrap' key={prio}>
			<ButtonBase onClick={handleOpen} className="work-box" style={{backgroundColor: workColor, color: 'black' }}>{name}</ButtonBase>

				<Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
				<Box sx={style}>
						<h3>PT muutmine: </h3>
					<div style={{marginLeft: "-0.5rem"}}>
						<div style={{marginBottom: "1rem", marginLeft: "0.5rem"}} >
							<FormControl fullWidth size="small" >
								<Select id={0} value={ queryOption } label="" variant="outlined" onChange={handleChange}>
								<MenuItem key={0} value={0} placeholder={0} >
									{"Puudub"}
								</MenuItem>
								<MenuItem key={1} value={1} placeholder={1} >
									{"Kiire"}
								</MenuItem>
								<MenuItem key={2} value={2} placeholder={2} >
									{"Tähtajaline"}
								</MenuItem>
								<MenuItem key={3} value={3} placeholder={3} >
									{"Määramata"}
								</MenuItem>
								</Select>
							</FormControl>
						</div>
						<div style={{display: "flex", width: "100%"}}>
							<Button variant="outlined" sx={{ml: 1}} onClick={(e)=>handleClose(e, 0)} >Tühista</Button>
							<Button variant="contained" sx={{ml: 1}} onClick={(e)=>handleClose(e, 1)} >Muuda PT</Button>
						</div>
					</div>
				</Box>
			</Modal>
		</div>
	)
}