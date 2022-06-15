import 'reactjs-popup/dist/index.css';
import ButtonBase from '@mui/material/ButtonBase';


export default function WorkPrio({prio}) {


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
			<ButtonBase className="work-box" style={{backgroundColor: workColor, color: 'black'}}>{name}</ButtonBase>
		</div>

	)

}
