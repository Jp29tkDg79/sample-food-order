import React, { Fragment, useRef, useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import useRequest from "../../hooks/useRequest";
import { userActions } from "../../store/slices/user-slice";
import { useSelector, RootDispatch } from "../../store";

import classes from "./styles/ProfileForm.module.css";

type ProfileFormProps = {
  id: string;
  name: string;
  email: string;
  postal: number;
  street: string;
  city: string;
  onClose: () => void;
};

const ProfileForm = (props: ProfileFormProps) => {
  const nameRef = useRef<HTMLInputElement>(null!);
  const emailRef = useRef<HTMLInputElement>(null!);
  const streetRef = useRef<HTMLInputElement>(null!);
  const [postal, setPostal] = useState<string>(props.postal.toString());
  const cityRef = useRef<HTMLInputElement>(null!);
  const isAdmin = useSelector((state) => state.user.curUser.isAdmin);
  const dispatch = useDispatch<RootDispatch>();
  const navigate = useNavigate();

  const { doRequest, httpNotification } = useRequest({
    url: `/profile/update/${props.id}`,
    method: "post",
    onSuccess: ({ name, email }) => {
      dispatch(userActions.setUserState({ name, email, isAdmin }));
      alert("success");
      navigate("/", { replace: true });
    },
  });

  const submitHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const street = streetRef.current.value;
    const city = cityRef.current.value;

    await doRequest({
      body: {
        name,
        email,
        street,
        postal,
        city,
      },
    });
  };

  return (
    <Fragment>
      <div className={classes.auth}>
        <div className={classes.control}>
          <label htmlFor="name">User Name</label>
          <input
            type="text"
            id="name"
            defaultValue={props.name}
            ref={nameRef}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            defaultValue={props.email}
            ref={emailRef}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="street">Your street</label>
          <input
            type="text"
            id="street"
            defaultValue={props.street}
            ref={streetRef}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="postal">Your postal</label>
          <input
            type="number"
            id="postal"
            maxLength={5}
            value={postal}
            onChange={(e) => {
              if (e.target.value.length <= 5) {
                setPostal(e.target.value);
              }
            }}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="city">Your city</label>
          <input
            type="text"
            id="city"
            defaultValue={props.city}
            ref={cityRef}
            required
          />
        </div>
        {httpNotification}
      </div>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
        <button onClick={submitHandler}>Update</button>
      </div>
    </Fragment>
  );
};

export default ProfileForm;
