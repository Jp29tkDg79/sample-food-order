import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "../../store";

const AuthRoutes = () => {
  const user = useSelector(state => state.user);
  return user.isLogin ? <Outlet /> : <Navigate to="/" />;
};

export default AuthRoutes;
