import { useRef, useContext, useState } from "react";

import Modal from "../UI/Modal";
import classes from "./Checkout.module.css";
import CartContext from "../../store/cart-context";

const isEmpty = (value) => value.trim() === "";
const isLengthInvalid = (value) => value.trim().length !== 5;

const Checkout = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const [httpError, setHttpError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isSucceeded, setIsSucceeded] = useState(false);
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

    let itemsInfo = [];
    cartCtx.items.map((item) => itemsInfo.push(item));

    let body = {
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postal: enteredPostal,
      amount: cartCtx.amount,
      price: cartCtx.totalAmount,
      itemsInfo,
    };

    body = JSON.stringify(body);

    const sendData = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://react-database-course-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
        {
          method: "POST",
          body,
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      setIsSucceeded(true);
      setIsLoading(false);
    };

    sendData().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  };

  const closeHandler = () => {
    props.onHideCheckout();
    if (isSucceeded) {
      props.onHideCart();

      cartCtx.clearCart();
    }
  };

  let modalContent = (
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
  );

  if (httpError) {
    modalContent = <p className={classes.error}>{httpError}</p>;
  }

  if (isLoading) {
    modalContent = <p className={classes.loading}>Loading...</p>;
  }

  if (isSucceeded) {
    modalContent = (
      <p className={classes.loading}>Your order has been placed successfully</p>
    );
  }

  return (
    <Modal onClose={closeHandler}>
      {modalContent}
      {(httpError || isLoading || isSucceeded) && (
        <div className={classes.action}>
          <button
            type="button"
            className={`${classes.button} ${classes["button-alt"]}`}
            onClick={closeHandler}
          >
            Ok
          </button>
        </div>
      )}
    </Modal>
  );
};

export default Checkout;
