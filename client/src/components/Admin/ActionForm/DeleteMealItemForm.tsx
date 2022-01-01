import useRequest from "../../../hooks/useRequest";
import { MealItemProps } from "../../Meals/MealItem/MealItem";

import classes from "./styles/DeleteMealItemForm.module.css";

interface DeleteMealItemFormProps extends MealItemProps {
  toHome: () => void;
}

const DeleteMealItemForm = (props: DeleteMealItemFormProps) => {
  const { doRequest, httpNotification } = useRequest({
    url: `/items/delete/${props.itemId}`,
    method: "post",
    onSuccess: () => {
      alert("success");
      props.toHome();
    },
  });

  const onSubmitHandler = async (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    await doRequest({});
  };

  return (
    <div className={classes.form}>
      <h3>削除画面</h3>
      <form onSubmit={onSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="name">名前</label>
          <input type="text" id="name" defaultValue={props.name} readOnly />
        </div>
        <div className={classes.control}>
          <label htmlFor="price">金額</label>
          <input type="number" id="price" defaultValue={props.price} readOnly />
        </div>
        <div className={classes.control}>
          <label htmlFor="summary">概要</label>
          <input
            type="text"
            id="summay"
            defaultValue={props.summary}
            readOnly
          />
        </div>
        {httpNotification}
        <div className={classes.actions}>
          <button className={classes.button} onClick={props.toHome}>
            キャンセル
          </button>
          <button type="submit">削除</button>
        </div>
      </form>
    </div>
  );
};

export default DeleteMealItemForm;