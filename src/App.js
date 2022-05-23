import "./index.module.css";
import { Route, Routes } from "react-router-dom";
import LogIn from "./components/pages/LogIn";
import MainPage from "./components/pages/MainPage";
import AddNewProject from "./components/pages/AddNewProject";
import AddClient from "./components/pages/AddClient";
import AddWorker from "./components/pages/AddWorker";
import ArchivedProjects from "./components/pages/ArchivedProjects";
import TestAB from "./components/pages/TestAB";
import TestAB2 from "./components/pages/TestAB2";
import Test from "./components/pages/Test";
import SnackBar from "./components/Snackbar";
import ClientList from "./components/pages/ClientList";
import React, { useState } from "react";
import ProtectedRoutes from "./ProtectedRoutes";
import NavBarMain from "./components/NavBarMain";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";

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
          <Route path="/" element={<LogIn />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/main" element={<MainPage />} />
            <Route path="/addNewProject" element={<AddNewProject />} />
            <Route path="/addClient" element={<AddClient />} />
            <Route path="/ClientList" element={<ClientList />} />
            <Route path="/archivedProjects" element={<ArchivedProjects />} />
            <Route path="/addWorker" element={<AddWorker />} />
            <Route path="/TestAb" element={<TestAB />} />
            <Route path="/TestAb2" element={<TestAB2 />} />
            <Route path="/T" element={<Test />} />
          </Route>
        </Routes>
      <SnackBar />
      <Footer />
    </>
  );
};
export default App;