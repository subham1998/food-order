import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  debugger;
  if (action.type === "ADD") {
    const existingCartItem = state.items.find(
      (item) => item.id === action.val.id
    );
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.val.id
    );
    let updatedCartItem;
    let updatedCartItems;
    if (existingCartItem) {
      updatedCartItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.val.amount,
      };
      updatedCartItems = [...state.items];
      updatedCartItems[existingCartItemIndex] = updatedCartItem;
    } else {
      updatedCartItem = { ...action.val };
      updatedCartItems = state.items.concat(updatedCartItem);
    }
    // const arr = state.items.concat(action.val);
    const totalAmount =
      state.totalAmount + action.val.price * action.val.amount;
    return { items: updatedCartItems, totalAmount: totalAmount };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartState] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCart = (item) => {
    dispatchCartState({ type: "ADD", val: item });
  };

  const removeItemFromCart = (id) => {};

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
