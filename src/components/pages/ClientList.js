import ClientListTable from "../ClientListTable";
import { FormControl, TextField } from "@mui/material";
import "../../styles/pages/Home.css";

const ClientList = () => {
  return (
    <>
      <main>
        <section style={{ width: "100%", padding: "0 5%" }}>
          <div id="header-wrapper">
            <div id="page-header">
              <h3>Kliendid</h3>
            </div>
            <div id="srch-bar">
            <label htmlFor="filterSrc"></label>
					<input type="search" name="filterSrc" id="filterSrc" required placeholder="Otsi..." autoComplete="off" />
            </div>
          </div>
          <ClientListTable />
        </section>
      </main>
    </>
  );
};

export default ClientList;
