import React, { useRef } from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootDispatch } from "../../store";
import { userActions } from "../../store/slices/user-slice";
import useRequest from "../../hooks/useRequest";

import classes from "./styles/AuthForm.module.css";

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);
  const dispatch = useDispatch<RootDispatch>();
  const navigate = useNavigate();

  const { doRequest, httpNotification } = useRequest({
    url: "/login",
    method: "post",
    onSuccess: ({ name, email, isAdmin }) => {
      dispatch(
        userActions.setUserState({
          name,
          email,
          isAdmin,
        })
      );
      navigate("/", { replace: true });
    },
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    await doRequest({
      body: {
        email,
        password
      },
    });
  };

  return (
    <section className={classes.auth}>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <div className={classes.control}>
          <label htmlFor="email">メール</label>
          <input type="text" name="email" id="email" ref={emailRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            name="password"
            id="password"
            ref={passwordRef}
            required
          />
        </div>
        {httpNotification}
        <div className={classes.action}>
          <button type="submit">Login</button>
        </div>
      </form>
      <Link className={classes.toggle} to="/signin">
        Create new account
      </Link>
    </section>
  );
};

export default Login;
