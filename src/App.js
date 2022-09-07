import { useState } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartContextProvider from "./store/CartContextProvider";
import Checkout from "./components/Checkout/Checkout";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [checkoutIsShown, setCheckoutIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const showCheckoutHandler = () => {
    setCheckoutIsShown(true);
  };

  const hideCheckoutHandler = () => {
    setCartIsShown(true);
    setCheckoutIsShown(false);
  };

  return (
    <CartContextProvider>
      {checkoutIsShown && (
        <Checkout
          onHideCheckout={hideCheckoutHandler}
          onHideCart={hideCartHandler}
        />
      )}
      {cartIsShown && (
        <Cart
          onHideCart={hideCartHandler}
          onShowCheckout={showCheckoutHandler}
        />
      )}
      <Header onShowCart={showCartHandler} />
      <Meals />
    </CartContextProvider>
  );
}

export default App;
