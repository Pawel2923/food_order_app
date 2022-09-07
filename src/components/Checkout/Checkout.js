import { useRef, useContext, useState } from "react";

import Modal from "../UI/Modal";
import classes from "./Checkout.module.css";
import CartContext from "../../store/cart-context";

const isEmpty = (value) => value.trim() === "";
const isLengthInvalid = (value) => value.trim().length !== 5;

const Checkout = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  let itemsAmount = 0;
  cartCtx.items.map((item) => (itemsAmount += item.amount));

  if (itemsAmount > 1) {
    itemsAmount = `${itemsAmount} items`;
  } else {
    itemsAmount = `${itemsAmount} item`;
  }

  cartCtx.items.map((item) => console.log(item));

  const confirmHandler = (ev) => {
    ev.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = !isLengthInvalid(enteredPostal);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postal: enteredPostalIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalIsValid;

    if (!formIsValid) {
      return;
    }
  };

  return (
    <Modal>
      <form onSubmit={confirmHandler}>
        <div className={classes.summary}>
          <span>Ordered {itemsAmount}</span>
          <h3>{totalAmount}</h3>
        </div>
        <div className={classes["user-data"]}>
          <div
            className={`${classes.control} ${
              formInputsValidity.name ? "" : classes.invalid
            }`}
          >
            <label htmlFor="name">Name</label>
            <input type="text" id="name" ref={nameInputRef} />
            {!formInputsValidity.name && (
              <p className={classes.invalid}>Please enter a valid value</p>
            )}
          </div>
          <div
            className={`${classes.control} ${
              formInputsValidity.street ? "" : classes.invalid
            }`}
          >
            <label htmlFor="street">Street</label>
            <input type="text" id="street" ref={streetInputRef} />
            {!formInputsValidity.street && (
              <p className={classes.invalid}>Please enter a valid value</p>
            )}
          </div>
          <div
            className={`${classes.control} ${
              formInputsValidity.postal ? "" : classes.invalid
            }`}
          >
            <label htmlFor="postal">Postal Code</label>
            <input type="text" id="postal" ref={postalInputRef} />
            {!formInputsValidity.postal && (
              <p className={classes.invalid}>Please enter a valid value</p>
            )}
          </div>
          <div
            className={`${classes.control} ${
              formInputsValidity.city ? "" : classes.invalid
            }`}
          >
            <label htmlFor="city">City</label>
            <input type="text" id="city" ref={cityInputRef} />
            {!formInputsValidity.city && (
              <p className={classes.invalid}>Please enter a valid value</p>
            )}
          </div>
        </div>
        <div className={classes.action}>
          <button
            type="button"
            onClick={props.onHideCheckout}
            className={classes.button}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`${classes.button} ${classes["button-alt"]}`}
          >
            Confirm
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default Checkout;
