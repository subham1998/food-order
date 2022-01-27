import { useRef, useState } from "react";
import useValidation from "../../hooks/use-validtaion";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim().length === 0;
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    pin: true,
  });

  //   const { nameInputRef, enteredNameIsValid } = useValidation(isEmpty);

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const pinInputRef = useRef();
  const cityInputRef = useRef();

  const confirmCheckout = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPin = pinInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPinIsValid = isFiveChars(enteredPin);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      pin: enteredPinIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredCityIsValid &&
      enteredStreetIsValid &&
      enteredPinIsValid;

    if (!formIsValid) {
      return;
    }

    if (formIsValid) {
      // Submit
      props.onOrder({
        name: enteredName,
        street: enteredStreet,
        pin: enteredPin,
        city: enteredCity,
      });
    }
  };

  const validationMessage = (field) => <p>Please enter a valid {field}</p>;
  return (
    <form className={classes.form} onSubmit={confirmCheckout}>
      <div
        className={`${classes.control} ${
          formInputsValidity.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef}></input>
        {!formInputsValidity.name && validationMessage("name")}
      </div>
      <div
        className={`${classes.control} ${
          formInputsValidity.street ? "" : classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef}></input>
        {!formInputsValidity.street && validationMessage("street")}
      </div>
      <div
        className={`${classes.control} ${
          formInputsValidity.pin ? "" : classes.invalid
        }`}
      >
        <label htmlFor="postal">PIN</label>
        <input type="text" id="postal" ref={pinInputRef}></input>
        {!formInputsValidity.pin && validationMessage(`pin(5 Characters long)`)}
      </div>
      <div
        className={`${classes.control} ${
          formInputsValidity.city ? "" : classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef}></input>
        {!formInputsValidity.city && validationMessage("city")}
      </div>
      <div className={classes.actions}>
        <button className={classes.submit}>Confirm</button>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Checkout;
