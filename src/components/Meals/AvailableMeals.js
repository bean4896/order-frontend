import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';

const AvailableMeals = () => {
  
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(undefined);

     useEffect(() => {
      const fetchMeals = async () => {
         const response = await fetch('https://oct31order.herokuapp.com/record');
         const responseData = await response.json();
        
         if (!response.ok) {
            throw new Error('Something went wrong!');
         }

         const loadedMeals = [];
            
         for(const key in responseData) {
             loadedMeals.push({
                 id: key,
                 name: responseData[key].name,
                 description: responseData[key].description ,
                 price: responseData[key].price
             });
         }
          setMeals(loadedMeals);
          setIsLoading(false);
      };

      // fetch data here
        fetchMeals().catch(error => {
          setIsLoading(false);
          setHttpError(error.message);
        });

     }, []);

     //loading text
  if (isLoading) {
      return <section className={classes.MealsLoading}>
        <p>Is Loading...</p>
      </section>
  }

      
  if (httpError) {
    return <section className={classes.MealsError}>
      <p>{httpError}</p>
    </section>
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
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
