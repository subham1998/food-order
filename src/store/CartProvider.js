import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
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
    const totalAmount =
      state.totalAmount + action.val.price * action.val.amount;
    return { items: updatedCartItems, totalAmount: totalAmount };
  } else if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.val
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedCartItem;
    let updatedCartItems;
    if (existingCartItem) {
      updatedCartItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedCartItems = [...state.items];
      if (updatedCartItem.amount !== 0) {
        updatedCartItems[existingCartItemIndex] = updatedCartItem;
      } else {
        updatedCartItems.splice(existingCartItemIndex, 1);
      }
    }
    const totalAmount = state.totalAmount - updatedCartItem.price * 1;
    return { items: updatedCartItems, totalAmount: totalAmount };
  } else if (action.type === "CLEAR") {
    return defaultCartState;
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

  const removeItemFromCart = (id) => {
    dispatchCartState({ type: "REMOVE", val: id });
  };

  const clearCart = (id) => {
    dispatchCartState({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
    clearCart,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
