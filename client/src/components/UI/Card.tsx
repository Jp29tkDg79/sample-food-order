import { ReactNode } from "react";

import classes from './styles/Card.module.css';

type CardProps = {
  children: ReactNode
}

const Card = ({children}: CardProps) => {
  return <div className={classes.card}>{children}</div>
}

export default Card;