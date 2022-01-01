import { Fragment, useEffect, useState } from "react";

import axios from "axios";
import { Routes, Route, useLocation } from "react-router-dom";

import MainHeader from "./components/Layout/MainHeader";
import Cart from "./components/Cart/Cart";
import Profile from "./components/Profile/Profile";
import Meals from "./components/Meals/Meals";
import Login from "./components/Auth/Login";
import Signin from "./components/Auth/Signin";
import CreateMealItem from "./components/Admin/CreateMealItem";
import EditMealItem from "./components/Admin/EditMealItem";
import DeleteMealItem from "./components/Admin/DeleteMealItem";

import AuthRoutes from "./components/Routes/AuthRoute";
import AdminRoutes from "./components/Routes/AdminRoute";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:5000";

const App = () => {
  const location = useLocation();
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (location.pathname !== url) {
      (async () => {
        const { data } = await axios.get("/csrf-Token");
        axios.defaults.headers.post["X-CSRF-Token"] = data.csrfToken;
        console.log("csrf:" + data.csrfToken);
      })();
      setUrl(location.pathname);
    }
  }, [location, url, setUrl]);

  return (
    <Fragment>
      <MainHeader />
      <main>
        <Routes>
          <Route path="/" element={<Meals />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route element={<AuthRoutes />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route element={<AdminRoutes />}>
              <Route path="/meal/create" element={<CreateMealItem />} />
              <Route path="/meal/update/:itemId" element={<EditMealItem />} />
              <Route path="/meal/delete/:itemId" element={<DeleteMealItem />} />
            </Route>
          </Route>
        </Routes>
      </main>
    </Fragment>
  );
};

export default App;
