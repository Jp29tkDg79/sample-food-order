import { Fragment, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

import Modal from "../UI/Modal";
import ProfileForm from "./ProfileForm";
import Logout from "../Auth/Logout";

import useRequest from "../../hooks/useRequest";

import classes from "./styles/Profile.module.css";

const Profile = () => {
  const [userId, setUserId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [postal, setPostal] = useState<number>(0);
  const [street, setStreet] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const navigate = useNavigate();

  const [profileIsUpdate, setProfileIsUpdate] = useState<boolean>(false);
  const [isInitial, setIsInitial] = useState<boolean>(true);

  const { doRequest } = useRequest({
    url: "/profile/user",
    method: "get",
    onSuccess: ({ user }) => {
      const { address } = user;
      setUserId(user.id);
      setName(user.name);
      setEmail(user.email);
      setPostal(address.postal);
      setStreet(address.street);
      setCity(address.city);
    },
  });

  useEffect(() => {
    if (isInitial) {
      (async () => await doRequest({}))();
    }
    setIsInitial(false);
  }, [setIsInitial, isInitial, doRequest]);

  const showUpdateProfileHandler = () => setProfileIsUpdate(true);

  const hideUpdateProfileHandler = () => setProfileIsUpdate(false);

  const toHome = () => {
    navigate("/", { replace: true });
  };

  return (
    <Modal onClose={toHome}>
      {profileIsUpdate && (
        <ProfileForm
          id={userId}
          name={name}
          email={email}
          postal={postal}
          street={street}
          city={city}
          onClose={hideUpdateProfileHandler}
        />
      )}
      <div className={classes.actions}>
        {!profileIsUpdate && (
          <Fragment>
            <div className={classes.profile}>
              <FaUserCircle size={100} />
              <p>Name : {name}</p>
            </div>
            <button onClick={showUpdateProfileHandler}>Edit Profile</button>
            <Logout onClose={toHome} />
          </Fragment>
        )}
      </div>
    </Modal>
  );
};

export default Profile;
