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
              <FormControl fullWidth>
                <TextField id="filled-basic" label="Otsi..." variant="outlined" size="small" />
              </FormControl>
            </div>
          </div>
          <ClientListTable />
        </section>
      </main>
    </>
  );
};

export default ClientList;
