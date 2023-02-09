import { useLocation, Navigate, Outlet } from "react-router-dom";

const CheckAuth = () => {

  const location = useLocation();
  return  localStorage.getItem("jwt") ? (
    <Navigate to="/app/chats" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};
export default CheckAuth;