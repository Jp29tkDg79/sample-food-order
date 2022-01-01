import { Fragment } from "react";

import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

import classes from "./styles/HeaderUserButton.module.css";

const HeaderUserButton = () => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <button
        className={classes.button}
        onClick={() => navigate("/profile", { replace: true })}
      >
        <FaUserCircle width={20} size={40} />
      </button>
    </Fragment>
  );
};

export default HeaderUserButton;
