import {useDispatch} from 'react-redux';

import { RootDispatch } from '../../store';
import { cartActions, Item } from '../../store/slices/cart-slice';

import classes from './styles/CartItem.module.css';

export type CartItemProps = {
  item: Item
}

const CartItem = ({item}: CartItemProps) => {
  const dispatch = useDispatch<RootDispatch>();

  const cartItemRemoveHandler = (itemId: string) => {
    dispatch(cartActions.removeItemFormCart(itemId))
  }

  const cartItemAddHandler = (item: Item) => {
    dispatch(cartActions.addItemToCart({...item, quantity : 1}))
  }

  return(
    <li className={classes['cart-item']}>
      <div>
        <h2>{item.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>単価 : {item.price}</span>
          <span className={classes.quantity}>数量 : {item.quantity}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={() => cartItemRemoveHandler(item.itemId)}>-</button>
        <button onClick={() => cartItemAddHandler(item)}>+</button>
      </div>
    </li>
  )
}

export default CartItem;