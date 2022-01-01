import { useRef } from "react";

import useRequest from "../../../hooks/useRequest";
import { MealItemProps } from "../../Meals/MealItem/MealItem";

import classes from "./styles/UpdateMealItemForm.module.css";

interface UpdateMealItemFormProps extends MealItemProps {
  toHome: () => void;
}

const UpdateMealItemForm = (props: UpdateMealItemFormProps) => {
  const nameRef = useRef<HTMLInputElement>(null!);
  const priceRef = useRef<HTMLInputElement>(null!);
  const summaryRef = useRef<HTMLInputElement>(null!);

  const { doRequest, httpNotification } = useRequest({
    url: `/items/update/${props.itemId}`,
    method: "post",
    onSuccess: () => {
      alert("success");
      props.toHome();
    },
  });

  const onSubmitHandler = async (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const price = priceRef.current.value;
    const summary = summaryRef.current.value;

    await doRequest({
      body: {
        id: props.itemId,
        name,
        price,
        summary,
      },
    });
  };

  return (
    <div className={classes.form}>
      <h3>更新画面</h3>
      <form onSubmit={onSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="name">名前</label>
          <input
            type="text"
            id="name"
            defaultValue={props.name}
            ref={nameRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="price">金額</label>
          <input
            type="number"
            id="price"
            defaultValue={props.price}
            ref={priceRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="summary">概要</label>
          <input
            type="text"
            id="summay"
            defaultValue={props.summary}
            ref={summaryRef}
          />
        </div>
        {httpNotification}
        <div className={classes.actions}>
          <button className={classes.button} onClick={props.toHome}>
            キャンセル
          </button>
          <button type="submit">更新</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMealItemForm;
