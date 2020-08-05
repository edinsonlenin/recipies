import React from "react";
import MealList from "../components/MealList";

import { CATEGORIES, MEALS } from "../data/dummy-data";

const CategoryMealScreen = (props) => {
  const { categoryId } = props.route.params;
  const selectedCategory = CATEGORIES.find((item) => item.id === categoryId);

  props.navigation.setOptions({
    title: selectedCategory.title,
  });

  const displayedMeals = MEALS.filter(
    (item) => item.categoryIds.indexOf(categoryId) >= 0
  );

  return <MealList data={displayedMeals} navigation={props.navigation} />;
};

export default CategoryMealScreen;
