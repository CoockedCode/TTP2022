import { NavLink } from "react-router-dom";
import React from 'react';

export default function NavBar(){
	return(
		<nav>
			<div id="nav-container" >
				<div id="site-logo">
					<NavLink className="nav-link" to="/dev">	
						<h1>Haldus</h1>
					</NavLink>
				</div>
			</div>
		</nav>
	);
}