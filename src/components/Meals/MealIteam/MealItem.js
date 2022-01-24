import { useContext } from "react";
import CartContext from "../../../store/cart-context";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
  const ctx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;

  const onAddToCartForm = (enteredAmount) => {
    ctx.addItem({
      id: props.id,
      name: props.name,
      amount: enteredAmount,
      price: props.price,
    });
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.desc}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm
          id={props.id}
          onAddToCart={onAddToCartForm}
        ></MealItemForm>
      </div>
    </li>
  );
};

export default MealItem;
