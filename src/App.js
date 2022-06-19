import "./index.module.css";
import { Route, Routes } from "react-router-dom";
import LogIn from "./components/pages/LogIn";
import MainPage from "./components/pages/MainPage";
import AddNewProject from "./components/pages/AddNewProject";
import AddNewDevice from "./components/pages/AddNewDevice";
import AddClient from "./components/pages/AddClient";
import UpdateClient from "./components/pages/UpdateClient";
import AddEmployee from "./components/pages/AddEmployee";
import SnackBar from "./components/Snackbar";
import ClientList from "./components/pages/ClientList";
import React, { useState } from "react";
import ProtectedRoutes from "./ProtectedRoutes";
import NavBar from "./components/NavBar";
import { useSelector } from "react-redux";
import EmployeeList from "./components/pages/EmployeeList";
import NotFound from "./components/pages/NotFound";
import User from "./components/pages/User";
import DigiDokk from "./components/pages/DigiDokk";
import ChoiceList from "./components/pages/ChoiceList";
import WorkHours from "./components/pages/WorkHours";
import WorkStages from "./components/WorkStages";

const App = () => {

  const [open, setOpen] = useState(location.openSnackbar);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const NavBarProtect = () => {
    // console.log(location.pathname);
    if(useSelector(state => state.userSession.userSession)){
      return <NavBar />
    }
  };


  return (
    <>
      <NavBarProtect />
        <Routes>
        <Route path='*' element={<NotFound />} />
          <Route path="/" element={<LogIn />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/avaleht" element={<MainPage />} />
            <Route path="/lisa-projekt" element={<AddNewProject />} />
            <Route path="/lisa-klient" element={<AddClient />} />
            <Route path="/uuenda-klient" element={<UpdateClient />} />
            <Route path="/kliendid" element={<ClientList />} />
            <Route path="/valikud" element={<ChoiceList />} />
            <Route path="/lisa-tootaja" element={<AddEmployee />} />
            <Route path="/too-tunnid" element={<WorkHours />} />
            <Route path="/tootajad" element={<EmployeeList />} />
            <Route path="/kasutaja-satted" element={<User />} />
            <Route path="/digidokk" element={<DigiDokk />} />
            <Route path="/seadme-tehniline-info" element={<AddNewDevice />} />
            <Route path="/toonimetused" element={<WorkStages />} />
          </Route>
        </Routes>
      <SnackBar />
    </>
  );
};
export default App;