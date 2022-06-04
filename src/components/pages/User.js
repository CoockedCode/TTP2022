import { useSelector } from "react-redux";
import axios from 'axios';
const endpoint = "https://elektrimasinad.digifi.eu/api";

import { useEffect, useState } from "react";

export default function User() {

    const usrNam = useSelector(state => state.userSession.userName);

    const [user, setUser] = useState([]);
	const FetchUser = async ()=>{
		const resp = await axios.get(endpoint + "/user/fnc_user.php?usr=" + usrNam);
		setUser([]);
		resp.data.forEach(element => {
			setUser(oldArray => [...oldArray, element])
		});
        // console.log(user);
	};

    useEffect(() => {
		FetchUser();
  	}, []);

    return(
        <>
        <main>
            <section style={{ width: "50%"}}>
            <div id="header-wrapper">
                <div id="page-header">
                <h3>Kasutaja sätted</h3>
                </div>
            </div>
            <div id="content-wrapper">
                {user.map((user) => (
                    <div
                        key={user}
                        id={user.id}
                    >
                        <p>ID: {user.id}</p>
                        <p>Eesnimi: {user.first_name}</p>
                        <p>Perekonnanimi: {user.last_name}</p>
                        <p>Kasutajanimi: {user.user_name}</p>
                        <p>Parool: {user.password}</p>
                        <p>palgal: {user.on_pay}</p>
                    </div>
                ))}
            </div>
            </section>
        </main>
        </>
    );
}