import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import HeaderCartButton from "./HeaderCartButton";
import HeaderUserButton from "./HeaderUserButton";
import { useSelector, RootDispatch } from "../../store";
import { cartActions } from "../../store/slices/cart-slice";
import useRequest from "../../hooks/useRequest";

import classes from "./styles/MainHeader.module.css";

const MainHeader = () => {
  const isLogin = useSelector((state) => state.user.isLogin);
  const isAdmin = useSelector((state) => state.user.curUser.isAdmin);
  const dispatch = useDispatch<RootDispatch>();
  const [isInitial, setIsInitial] = useState<boolean>(true);
  const { doRequest } = useRequest({
    url: "/carts/user",
    method: "post",
    onSuccess: ({ cart }) => dispatch(cartActions.replaceCart(cart)),
  });

  useEffect(() => {
    if (isLogin && isInitial) {
      (async () => await doRequest({}))();
    }
    setIsInitial(false);
  }, [isLogin, isInitial, setIsInitial, doRequest]);

  return (
    <header className={classes.header}>
      <Link to="/">
        <h1>サンプル</h1>
      </Link>
      {isLogin && !isAdmin && <HeaderCartButton />}
      {isLogin && <HeaderUserButton />}
    </header>
  );
};

export default MainHeader;
