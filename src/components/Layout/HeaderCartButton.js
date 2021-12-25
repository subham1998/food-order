import classes from "./HeaderCartButton.module.css";

import CartIcon from "../Cart/CartIcon";
import { useContext } from "react";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const ctx = useContext(CartContext);
  return (
    <button className={classes.button} onClick={props.onclick}>
      <span className={classes.icon}>
        <CartIcon></CartIcon>
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>
        {ctx.items.reduce((curNumber, item) => {
          debugger;
          return curNumber + item.amount;
        }, 0)}
      </span>
    </button>
  );
};

export default HeaderCartButton;
