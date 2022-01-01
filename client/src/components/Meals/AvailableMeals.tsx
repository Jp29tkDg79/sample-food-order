import { useEffect, useState } from "react";

import Card from "../UI/Card";
import useRequest from "../../hooks/useRequest";

import MealItem, { MealItemProps } from "./MealItem/MealItem";

import classes from "./styles/AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState<MealItemProps[]>([]);
  const [isInitial, setIsInitial] = useState<boolean>(true);

  const { doRequest } = useRequest({
    url: "/items/all",
    method: "get",
    onSuccess: ({ items }) => {
      setMeals(
        items.map((item: any) => {
          return { itemId: item.id, ...item };
        })
      );
    },
  });

  useEffect(() => {
    if (isInitial) {
      (async () => {
        await doRequest({});
      })();
      setIsInitial(false);
    }
  }, [doRequest, isInitial, setIsInitial]);

  const mealsList = meals.map((meal: MealItemProps) => {
    return <MealItem key={meal.itemId} {...meal} />;
  });

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
