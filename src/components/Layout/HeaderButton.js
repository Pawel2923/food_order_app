import classes from "./HeaderButton.module.css";

const HeaderButton = () => {
    return (
        <button className={classes.button}>
            <span><i className="fa-solid fa-cart-shopping"></i></span>
            <span>Your Cart</span>
            <span className={classes.badge}>0</span>
        </button>
    );
};

export default HeaderButton;