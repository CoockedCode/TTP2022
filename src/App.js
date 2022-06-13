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
import NavBarMain from "./components/NavBarMain";
import { useSelector } from "react-redux";
import EmployeeList from "./components/pages/EmployeeList";
import NotFound from "./components/pages/NotFound";
import User from "./components/pages/User";


const App = () => {

  const [open, setOpen] = useState(location.openSnackbar);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const NavBar = () => {
    // console.log(location.pathname);
    if(useSelector(state => state.userSession.userSession)){
      return <NavBarMain />
    }
  };

  return (
    <>
      <NavBar />
        <Routes>
        <Route path='*' element={<NotFound />} />
          <Route path="/" element={<LogIn />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/avaleht" element={<MainPage />} />
            <Route path="/lisa-projekt" element={<AddNewProject />} />
            <Route path="/lisa-klient" element={<AddClient />} />
            <Route path="/uuenda-klient" element={<UpdateClient />} />
            <Route path="/kliendid" element={<ClientList />} />
            <Route path="/lisa-tootaja" element={<AddEmployee />} />
            <Route path="/tootajad" element={<EmployeeList />} />
            <Route path="/kasutaja-satted" element={<User />} />
            <Route path="/seadme-tehniline-info" element={<AddNewDevice />} />
          </Route>
        </Routes>
      <SnackBar />
    </>
  );
};
export default App;