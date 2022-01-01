import { useRef, useState } from "react";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootDispatch } from "../../store";
import { userActions } from "../../store/slices/user-slice";
import useRequest from "../../hooks/useRequest";

import classes from "./styles/AuthForm.module.css";

const Signin = () => {
  const nameRef = useRef<HTMLInputElement>(null!);
  const emailRef = useRef<HTMLInputElement>(null!);
  const confirmEmailRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);
  const streetRef = useRef<HTMLInputElement>(null!);
  const [postal, setPostal] = useState<string>("");
  const cityRef = useRef<HTMLInputElement>(null!);
  const dispatch = useDispatch<RootDispatch>();
  const navigate = useNavigate();

  const { doRequest, httpNotification } = useRequest({
    url: "/signup",
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
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const confirmEmail = confirmEmailRef.current.value;
    const password = passwordRef.current.value;
    const street = streetRef.current.value;
    const city = cityRef.current.value;

    await doRequest({
      body: {
        name,
        email,
        confirmEmail,
        password,
        street,
        postal,
        city,
      },
    });
  };

  return (
    <section className={classes.auth}>
      <h1>Sign Up</h1>
      <form onSubmit={onSubmit}>
        <div className={classes.control}>
          <label htmlFor="name">ユーザ名</label>
          <input type="text" name="name" id="name" ref={nameRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="email">メール</label>
          <input type="email" name="email" id="email" ref={emailRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="confirmEmail">メール確認</label>
          <input
            type="email"
            name="confirmEmail"
            id="confirmEmail"
            ref={confirmEmailRef}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            name="password"
            id="password"
            ref={passwordRef}
            minLength={6}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="street">市区町村</label>
          <input
            type="text"
            name="street"
            id="street"
            ref={streetRef}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="postal">郵便番号</label>
          <input
            type="number"
            name="postal"
            id="postal"
            maxLength={5}
            value={postal}
            onChange={e => {
              if (e.target.value.length <= 5) {
                setPostal(e.target.value);
              }
            }}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="city">都市</label>
          <input type="text" name="city" id="city" ref={cityRef} required />
        </div>
        {httpNotification}
        <div className={classes.action}>
          <button type="submit">Sign In</button>
        </div>
      </form>
      <Link className={classes.toggle} to="/login">
        Login
      </Link>
    </section>
  );
};

export default Signin;
