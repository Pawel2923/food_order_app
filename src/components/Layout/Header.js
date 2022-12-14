import React from "react";

import classes from "./Header.module.css";
import HeaderButton from "./HeaderButton";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>Meals</h1>
        <HeaderButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={require("../../assets/background.webp")} alt="A table full of delicious food" />
      </div>
    </React.Fragment>
  );
};

export default Header;
