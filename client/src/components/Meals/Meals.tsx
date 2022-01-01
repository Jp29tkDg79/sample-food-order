import { Fragment, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";
import { RootDispatch, useSelector } from "../../store";
import { userActions } from "../../store/slices/user-slice";
import useRequest from "../../hooks/useRequest";

import classes from "./styles/Meals.module.css";

const Meals = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch<RootDispatch>();
  const [isInital, setIsinitial] = useState<boolean>(true);

  const { doRequest } = useRequest({
    url: "/check/cookie",
    method: "get",
    onSuccess: ({ name, email, isAdmin }) =>
      dispatch(
        userActions.setUserState({
          name,
          email,
          isAdmin,
        })
      ),
  });

  useEffect(() => {
    if (isInital) {
      (async () => await doRequest({}))();
    }
    setIsinitial(false);
  }, [isInital, setIsinitial, doRequest]);

  return (
    <Fragment>
      <MealsSummary />
      {user.isLogin && user.curUser.isAdmin && (
        <div className={classes.anchor}>
          <Link to="/meal/create">作成</Link>
        </div>
      )}
      {user.isLogin && <AvailableMeals />}
      {!user.isLogin && (
        <div className={classes.control}>
          <Link to="/login">Login</Link>
          <Link to="/signin">Signin</Link>
        </div>
      )}
    </Fragment>
  );
};

export default Meals;
