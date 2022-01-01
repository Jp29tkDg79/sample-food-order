import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import Modal from "../UI/Modal";
import useRequest from "../../hooks/useRequest";
import { MealItemProps } from "../Meals/MealItem/MealItem";
import DeleteMealItemForm from './ActionForm/DeleteMealItemForm';

const DeleteMealItem = () => {
  const {itemId} = useParams()
  const navigate = useNavigate();
  const [meal, setMeal] = useState<MealItemProps>(null!);
  const [isInital, setIsInital] = useState<boolean>(true);

  const { doRequest } = useRequest({
    url: "/items/all",
    method: "get",
    onSuccess: ({ items }) => {
      const meal = items.find((item: any) => item.id === itemId);
      setMeal({ itemId: meal.id, ...meal });
    },
  });

  const toHome = () => {
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (isInital) {
      (async () => await doRequest({}))()
    }
    setIsInital(false);
  }, [isInital, setIsInital, doRequest])

  return (
    <Modal onClose={toHome}>
      <DeleteMealItemForm {...meal} toHome={toHome} />
    </Modal>
  )
}

export default DeleteMealItem;