import React, { useRef } from "react";

import Input from "../../UI/Input";

import classes from "./styles/MealItemForm.module.css";

type MealItemProps = {
  itemId: string;
  onAddToCart: (quantity: number) => void;
};

const MealItemForm = (props: MealItemProps) => {
  const quantityInputRef = useRef<HTMLInputElement>(null!);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const enteredQuantityNumber = +quantityInputRef.current.value;

    props.onAddToCart(enteredQuantityNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={quantityInputRef}
        label="数量"
        input={{
          id: props.itemId,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>追加</button>
    </form>
  );
};

export default MealItemForm;
