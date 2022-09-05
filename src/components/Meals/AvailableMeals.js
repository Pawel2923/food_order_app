import { useEffect, useState } from "react";

import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const getData = async () => {
    const response = await fetch(
      "https://react-database-course-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
    );

    if (!response.ok) {
      throw new Error("Couldn't connect to database");
    }

    response
      .json()
      .then((response) => setMeals(response))
      .catch((error) => {
        throw new Error(error);
      });
  };

  useEffect(() => {
    try {
      getData();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
