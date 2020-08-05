import React from "react";
import MealList from "../components/MealList";

import { MEALS } from "../data/dummy-data";

const CategoryMealScreen = (props) => {
    const favorites = MEALS.filter((item) => item.id === 'm1' || item.id === 'm2' );

  props.navigation.setOptions({
    title: "My favorite list",
    
  });

  return <MealList data={favorites} navigation={props.navigation} />;
};

export default CategoryMealScreen;
