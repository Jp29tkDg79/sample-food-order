import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import Modal from "../UI/Modal";
import useRequest from "../../hooks/useRequest";

import classes from "./styles/CreateMealItem.module.css";

const CreateMealItem = () => {
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null!);
  const priceRef = useRef<HTMLInputElement>(null!);
  const summaryRef = useRef<HTMLInputElement>(null!);

  const toHome = () => {
    navigate("/", { replace: true });
  };

  const { doRequest, httpNotification } = useRequest({
    url: "/items/create",
    method: "post",
    onSuccess: () => {
      alert("Create meal items");
      toHome();
    },
  });

  const onSubmitHandler = async (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const price = priceRef.current.value;
    const summary = summaryRef.current.value;

    await doRequest({
      body: {
        name,
        price,
        summary,
      },
    });
  };

  return (
    <Modal onClose={toHome}>
      <div className={classes.form}>
        <h3>作成画面</h3>
        <form onSubmit={onSubmitHandler}>
          <div className={classes.control}>
            <label htmlFor="name">名前</label>
            <input type="text" id="name" ref={nameRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="price">金額</label>
            <input type="number" id="price" ref={priceRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="summary">概要</label>
            <input type="text" id="summay" ref={summaryRef} />
          </div>
          {httpNotification}
          <div className={classes.actions}>
            <button className={classes.button} onClick={toHome}>
              キャンセル
            </button>
            <button type="submit">作成</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateMealItem;
