import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import MealItemForm from "./MealItemForm";

import { cartActions } from "../../../store/slices/cart-slice";
import { RootDispatch, useSelector } from "../../../store";
import useRequest from "../../../hooks/useRequest";

import classes from "./styles/MealItem.module.css";
import { Link } from "react-router-dom";

export type MealItemProps = {
  itemId: string;
  name: string;
  price: number;
  summary: string;
};

const MealItem = (props: MealItemProps) => {
  const dispatch = useDispatch<RootDispatch>();
  const cart = useSelector((state) => state.cart);
  const isAdmin = useSelector((state) => state.user.curUser.isAdmin);
  const [cartChanged, setCartChanged] = useState<boolean>(false);

  const { doRequest } = useRequest({
    url: "/carts/update",
    method: "post",
    onSuccess: () => {},
  });

  useEffect(() => {
    if (cartChanged) {
      (async () => await doRequest({ body: { cart } }))();
      setCartChanged(false);
    }
  }, [cartChanged, setCartChanged, cart, doRequest]);

  const addToCartHandler = (quantity: number) => {
    dispatch(
      cartActions.addItemToCart({
        itemId: props.itemId,
        price: props.price,
        name: props.name,
        quantity,
      })
    );
    setCartChanged(true);
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.summary}>{props.summary}</div>
        <div className={classes.price}>{props.price}</div>
      </div>
      {!isAdmin && (
        <div>
          <MealItemForm itemId={props.itemId} onAddToCart={addToCartHandler} />
        </div>
      )}
      <div className={classes.anchor}>
        {isAdmin && (
          <>
            <Link to={`/meal/update/${props.itemId}`}>編集</Link>
          </>
        )}
        {isAdmin && (
          <>
            <Link to={`/meal/delete/${props.itemId}`}>削除</Link>
          </>
        )}
      </div>
    </li>
  );
};

export default MealItem;
