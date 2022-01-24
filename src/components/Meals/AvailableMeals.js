import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealIteam/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  const fetchMeals = async () => {
    const response = await fetch(
      "https://react-http-f118c-default-rtdb.firebaseio.com/meals.json"
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const responseData = await response.json();

    const fetchedMeals = [];

    for (const meal in responseData) {
      const obj = {
        id: meal,
        name: responseData[meal].name,
        desc: responseData[meal].desc,
        price: responseData[meal].price,
      };
      fetchedMeals.push(obj);
    }
    console.log(fetchedMeals);
    setMeals(fetchedMeals);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.mealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealList = meals.map((meal) => {
    return (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        desc={meal.desc}
        price={meal.price}
      ></MealItem>
    );
  });

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
