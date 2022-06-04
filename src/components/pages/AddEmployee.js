import WorkerJobsList from '../WorkerJobsList'

export default function AddWorker(){
	return(
		<>
		<main>
			<section>
				 
				<div id="header-wrapper">
					<h3>Lisa uus Töötaja:</h3>
				</div>
				
				<div id="content-wrapper">
					<label htmlFor="1">Töötaja nimi: </label>
						<input type="text" />
						<br />
					<label htmlFor="2">Töötaja e-mail: </label>
						<input type="text" />
						<br />
					<label htmlFor="3">Töötaja telefoni nr: </label>
						<input type="text" />
						<br />
					<label htmlFor="4"></label>
						<WorkerJobsList />
						<br />
					<button>Lisa töötaja</button>
				</div>
				
			</section>
		</main>
		</>
	);
}