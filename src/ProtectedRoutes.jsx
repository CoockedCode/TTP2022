import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const useAuth = () => {
  const usrSes = useSelector(state => state.userSession.userSession);
  return usrSes;
};

const ProtectedRoutes = () => {
  console.log(useSelector(state => state.userSession.userSession));
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/dev" />;
};

export default ProtectedRoutes; 