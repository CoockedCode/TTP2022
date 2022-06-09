import React, {useState, useEffect} from 'react';
import WorkerJobsList from '../WorkerJobsList';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useDispatch } from "react-redux";
import { Box } from '@mui/material';
import axios from 'axios';
import { setSnackbar } from "../../redux/ducks/snackbar";
import { data } from 'jquery';
import FormControl from '@mui/material/FormControl';

const endpoint = "https://elektrimasinad.digifi.eu/api";

export default function AddWorker(){

	//snackbar
	const dispatch = useDispatch();

	//1. Töötaja eesnimi
	const [valueEmpFname, setValueEmpFname] = useState();
	const [errorEmpFname, setErrorEmpFname] = useState(false);
	//1. Töötaja eesnimi
	const [valueEmpSname, setValueEmpSname] = useState();
	const [errorEmpSname, setErrorEmpSname] = useState(false);
	//2. Töötaja meil
	const [valueEmpMail, setValueEmpMail] = useState();
	const [errorEmpMail, setErrorEmpMail] = useState(false);
	//4. Töötaja number
	const [valueEmpNumber, setValueEmpNumber] = useState();
	const [errorEmpNumber, setErrorEmpNumber] = useState(false);
	//5. Töötaja roll
	const [valueEmpActive, setValueEmpActive] = useState();
	const [errorEmpActive, setErrorEmpActive] = useState(false);

	useEffect(() => {
		if(valueEmpFname){setErrorEmpFname(false);}
		if(valueEmpSname){setErrorEmpSname(false);}
		if(valueEmpMail){setErrorEmpMail(false);}
		if(valueEmpNumber){setErrorEmpNumber(false);}
		if(valueEmpActive){setErrorEmpActive(false);}
	}, [valueEmpFname, valueEmpSname, valueEmpMail, valueEmpNumber, valueEmpActive])

	// info salvestamine php kaudu
	const saveData = (dataToSave) => {
		axios.post(endpoint+"/employee/fnc_add_employee.php", dataToSave)
		.then(function (response) {
			console.log(response);
			if(response.status === 200){
				dispatch(setSnackbar(true,"success","Projekt edukalt lisatud!"));
			}
		})
		.catch(function (err) {
			console.log(err);
			dispatch(setSnackbar(true,"error","Salvestamisel tekkis viga!"))
		});

	};


	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		//console.log(formData);
		if(formData.get("employeeFname") && formData.get("employeeSname") && formData.get("employeeMail") && formData.get("employeeNumber") && formData.get("employeeActive")){
			console.log("väljad täidetud")
			const dataToSave = {
				employeeFname: formData.get("employeeFname"),
				employeeSname: formData.get("employeeSname"),
				employeeMail: formData.get("employeeMail"),
				employeeNumber: formData.get("employeeNumber"),
				employeeActive: formData.get("employeeActive"),

			};
			//Kasutajanime loomine ees- ja perekonnanime järgi
			const employeeFname = formData.get("employeeFname");
			const employeeSname =  formData.get("employeeSname");
			const employeeUsername = employeeFname.concat(employeeSname);
			const employeePassword = employeeFname
			console.log(employeeUsername);
			console.log(employeePassword);
			saveData(dataToSave);

		} else {
			console.log("viga")
			if(!formData.get("employeeFname")){
				setErrorEmpFname(true);
			}else{
				setValueEmpFname(formData.get("employeeFname"));
			}
			if(!formData.get("employeeSname")){
				setErrorEmpSname(true);
			}else{
				setValueEmpSname(formData.get("employeeSname"));
			}
			if(!formData.get("employeeMail")){
				setErrorEmpMail(true);
			}else{
				setValueEmpMail(formData.get("employeeMail"));
			}
			if(!formData.get("employeePhone")){
				setErrorEmpNumber(true);
			}else{
				setValueEmpNumber(formData.get("employeeNumber"));
			}
			if(!formData.get("employeeActive")){
				setErrorEmpActive(true);
			}else{
				setValueEmpActive(formData.get("employeeActive"));
			}

		}
	}
	
	//dispatch(setSnackbar(true,"success","Klient edukalt lisatud!"));
	return(
		<>
		<main>
			<section>
				 
				<div id="header-wrapper">
					<h3>Lisa uus Töötaja:</h3>
				</div>
				
				<Box component = "form" noValidate autoComplete="off" onSubmit={handleSubmit}>
					<FormControl sx={{width: "100%"}}>
						<TextField
							required
							fullWidth
							error={!!errorEmpFname}
							autoFocus
							id="employeeFname"
							label="Töötaja nimi"
							name="employeeFname"
							autoComplete="none"
							type="text"
							margin="dense"
							size="small"
							/>
						<TextField
							required
							fullWidth
							error={!!errorEmpSname}
							autoFocus
							id="employeeSname"
							label="Töötaja perekonnanimi"
							name="employeeSname"
							autoComplete="none"
							type="text"
							margin="dense"
							size="small"
							/>
						
						<TextField
							required
							fullWidth
							error={!!errorEmpMail}
							id="employeeMail"
							label="Töötaja meiliaadress"
							name="employeeMail"
							autoComplete="none"
							type="text"
							margin="dense"
							size="small"
							/>
						<TextField
							required
							fullWidth
							error={!!errorEmpNumber}
							// sx={{ width: 'auto'}}
							id="employeeNumber"
							label="Töötaja telefoninumber"
							name="employeeNumber"
							autoComplete="none"
							type="text"
							margin="dense"
							size="small"
							/>
						<TextField
							required
							fullWidth
							error={!!errorEmpActive}
							autoFocus
							id="employeeActive"
							label="Töötaja staatus"
							name="employeeActive"
							autoComplete="none"
							type="number"
							margin="dense"
							size="small"
							/>

						<Button
							type="submit"

							variant="contained"
							sx={{ mt: 2, mb: 2, bgcolor: 'main', width: 'auto' }}
							margin="dense"
							//onClick={handleSubmit}
							>
							Lisa töötaja
						</Button>
						{/* <FormHelperText>{helperText}</FormHelperText> */}
					</FormControl>
				</Box>
				
			</section>
		</main>
		</>
	);
}