import { Fragment, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import { RootDispatch, useSelector } from "../../store";
import { cartActions } from "../../store/slices/cart-slice";
import useRequest from "../../hooks/useRequest";

import classes from "./styles/Cart.module.css";

const Cart = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [didSubmit, setDidSubmit] = useState<boolean>(false);
  const dispatch = useDispatch<RootDispatch>();
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const { doRequest } = useRequest({
    url: "/orders/create",
    method: "post",
    onSuccess: () => {
      setIsSubmitting(false);
      setDidSubmit(true);
    },
  });

  const toHome = () => {
    navigate("/", {replace: true})
  }

  const submitOrderHandler = async () => {
    setIsSubmitting(true);

    await doRequest({
      body: {
        items: cart.items,
        totalPrice: cart.totalPrice,
        totalQuantity: cart.totalQuantity,
      },
    });

    setIsSubmitting(false);
    setDidSubmit(true);
    dispatch(cartActions.clearCart());
  };

  const cartModalContent = (
    <Fragment>
      <ul className={classes["cart-items"]}>
        {cart.items.map((item) => (
          <CartItem key={item.itemId} item={item} />
        ))}
      </ul>
      <div className={classes.total}>
        <span>合計金額:</span>
        <span>{cart.totalPrice} 円</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={toHome}>
          Close
        </button>
        {cart.items.length > 0 && (
          <button onClick={submitOrderHandler}>Order</button>
        )}
      </div>
    </Fragment>
  );

  const didSubmitModalContent = (
    <Fragment>
      <div className={classes.actions}>
        <p>Successfully!</p>
        <button className={classes.button} onClick={toHome}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onClose={toHome}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
