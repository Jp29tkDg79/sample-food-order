import React, { Fragment } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import useRequest from "../../hooks/useRequest";
import { RootDispatch } from "../../store";
import { userActions } from "../../store/slices/user-slice";

type LogoutProps = {
  onClose: () => void;
};

const Logout = (props: LogoutProps) => {
  const dispatch = useDispatch<RootDispatch>();
  const navigate = useNavigate();

  const { doRequest } = useRequest({
    url: "/logout",
    method: "post",
    onSuccess: () => {
      dispatch(userActions.clearUserState());
      props.onClose();
      navigate("/", {replace: true})
    },
  });

  const onSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    await doRequest({});
  };

  return (
    <Fragment>
      <button onClick={onSubmit}>Logout</button>
    </Fragment>
  );
};

export default Logout;
