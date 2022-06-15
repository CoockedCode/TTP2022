import React, {useState, useEffect} from 'react';
import WorkerJobsList from '../WorkerJobsList';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Select } from '@mui/material';
import { useDispatch } from "react-redux";
import { Box } from '@mui/material';
import axios from 'axios';
import { setSnackbar } from "../../redux/ducks/snackbar";
import { data } from 'jquery';
import FormControl from '@mui/material/FormControl';
import EmployeeRolesList from '../EmployeeRolesList';
import DropDown from '../DropDown';

export default function AddWorker(){
	const endpoint = "https://elektrimasinad.digifi.eu/api";

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
	//5. Töötaja staatus
	const [valueEmpActive, setValueEmpActive] = useState();
	const [errorEmpActive, setErrorEmpActive] = useState(false);
	//6. Töötaja roll
	const [valueEmpRole, setValueEmpRole] = useState();
	const [errorEmpRole, setErrorEmpRole] = useState(false);

	useEffect(() => {
		if(valueEmpFname){setErrorEmpFname(false);}
		if(valueEmpSname){setErrorEmpSname(false);}
		if(valueEmpMail){setErrorEmpMail(false);}
		if(valueEmpNumber){setErrorEmpNumber(false);}
		if(valueEmpActive){setErrorEmpActive(false);}
		if(valueEmpRole){setErrorEmpRole(false);}
	}, [valueEmpFname, valueEmpSname, valueEmpMail, valueEmpNumber, valueEmpActive, valueEmpRole])

	// info salvestamine php kaudu
	const saveData = (dataToSave) => {
		axios.post(endpoint+"/employee/fnc_add_employee.php", dataToSave)
		.then(function (response) {
			console.log(response.data);
			if(response.status === 200){
				dispatch(setSnackbar(true,"success","Projekt edukalt lisatud!"));
			}
		})
		.catch(function (err) {
			console.log(err);
			dispatch(setSnackbar(true,"error","Salvestamisel tekkis viga!"))
		});

	};
	const [roleName, setRoleName] = useState("");
	const handleRoleChange = (e) => {
		setRoleName(e.target.value);
	  }
	const [roleNameOptions, setRoleNameOptions] = useState([]);
	const getRoleOptions = async() =>{
		const response = await axios.get(`${endpoint}/employee/fnc_employee_role.php?role`);
		// console.log(response)
		setRoleNameOptions([]);
		response.data.forEach(element=>{
			setRoleNameOptions(oldArray=>[...oldArray, element]);
		})
		// console.log(roleNameOptions)
	}

	useEffect(() => {
		getRoleOptions();
	}, []);


	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		//console.log(formData);
		if(formData.get("employeeFname") && formData.get("employeeSname") && formData.get("employeeMail") && formData.get("employeeNumber") && formData.get("employeeActive")){
			// console.log("väljad täidetud")

			//Kasutajanime loomine ees- ja perekonnanime järgi
			const employeeFname = formData.get("employeeFname");
			const employeeSname =  formData.get("employeeSname");
			const employeeUsername = employeeFname.concat(employeeSname);
			const employeePassword = employeeFname
			console.log(employeeUsername);
			console.log(employeePassword);
			const dataToSave = {
				employeeFname: formData.get("employeeFname"),
				employeeSname: formData.get("employeeSname"),
				employeeMail: formData.get("employeeMail"),
				employeeNumber: formData.get("employeeNumber"),
				employeeActive: formData.get("employeeActive"),
				employeeRoleID: roleName,
				employeeUsername: employeeUsername,
				employeePassword: employeePassword

			};
			// console.log(WorkerJobsList);
			// console.log(employeeRoleID);

			saveData(dataToSave);
			console.log(dataToSave);

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
			if(!formData.get("employeeNumber")){
				setErrorEmpNumber(true);
			}else{
				setValueEmpNumber(formData.get("employeeNumber"));
			}
			if(!formData.get("employeeActive")){
				setErrorEmpActive(true);
			}else{
				setValueEmpActive(formData.get("employeeActive"));
			}
			if(!roleName){
				setErrorEmpRole(true);
			}else{
				setValueEmpRole(roleName);
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
					<FormControl sx={{width: "100%", py: '20px'}}>
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
						<DropDown
							required
							fullWidth
							error={!!errorEmpRole}
							autoFocus
							id="roleName" 
							label="Tööroll"
							value={roleName}
							onChange={handleRoleChange}
							options={roleNameOptions}
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