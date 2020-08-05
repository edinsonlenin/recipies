import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  Image,
} from "react-native";

import { MEALS } from "../data/dummy-data";
import DefaultText from "../components/DefaultText";

const MealDetailScreen = (props) => {
  const { mealId } = props.route.params;
  const selectedMeal = MEALS.find((item) => item.id === mealId);
  props.navigation.setOptions({
    title: selectedMeal.title,
  });

  const renderItem = (item) => {
    return (
      <View style={styles.itemList} key={item}>
        <DefaultText>{item}</DefaultText>
      </View>
    );
  };

  const ListItem = props => {
    return (
      <View style={styles.itemList}>
        <DefaultText>{props.children}</DefaultText>
      </View>
    );
  };
  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.detail}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map(renderItem)}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map(item => <ListItem key={item}>{item}</ListItem>)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: "100%",
  },
  detail: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  itemList: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  title: {
      fontSize: 22,
      fontFamily: 'open-sans-bold',
      textAlign: 'center'
  }
});

export default MealDetailScreen;
