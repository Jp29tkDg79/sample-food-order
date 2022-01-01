import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "../../store";

const AdminRoute = () => {
  const isAdmin = useSelector(state => state.user.curUser.isAdmin);
  return isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
