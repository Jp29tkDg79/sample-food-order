import { useEffect, useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { Badge } from "@mui/material";

import { useSelector } from "../../store";

import classes from "./styles/HeaderCartButton.module.css";

const HeaderCartButton = () => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState<boolean>(false);
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const numberOfCartItems = useMemo(() => {
    return cart.items.reduce((curNumber, item) => {
      return curNumber + item.quantity;
    }, 0);
  }, [cart]);

  useEffect(() => {
    if (cart.items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cart]);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  return (
    <button
      className={btnClasses}
      onClick={() => navigate("/cart", { replace: true })}
    >
      <Badge badgeContent={numberOfCartItems} color="primary">
        <AiOutlineShoppingCart width={20} size={40} />
      </Badge>
    </button>
  );
};

export default HeaderCartButton;
