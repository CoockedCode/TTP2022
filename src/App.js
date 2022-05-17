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
          <Route path="/dev/" element={<LogIn />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/dev/main" element={<MainPage />} />
            <Route path="/dev/addNewProject" element={<AddNewProject />} />
            <Route path="/dev/addClient" element={<AddClient />} />
            <Route path="/dev/archivedProjects" element={<ArchivedProjects />} />
            <Route path="/dev/addWorker" element={<AddWorker />} />
            <Route path="/dev/TestAb" element={<TestAB />} />
            <Route path="/dev/TestAb2" element={<TestAB2 />} />
            <Route path="/dev/T" element={<Test />} />
          </Route>
        </Routes>
      <SnackBar />
      <Footer />
    </>
  );
};
export default App;