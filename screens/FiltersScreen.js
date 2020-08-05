import React, { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { DrawerActions } from "@react-navigation/native";

import CustomHeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";

const FiltersScreen = (props) => {
  const [isGluttenFree, setIsGluttenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const save = () => {
    const appliedFilters = {
        gluttenFree: isGluttenFree,
        lactoseFree: isLactoseFree,
        vegan: isVegan,
        vegetarian: isVegetarian
    };

    console.log(appliedFilters);
  };

  props.navigation.setOptions({
    title: "Filters",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() =>
            props.navigation.dispatch(DrawerActions.toggleDrawer())
          }
        ></Item>
      </HeaderButtons>
    ),
    headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Save"
            iconName="ios-save"
            onPress={() =>
              save()
            }
          ></Item>
        </HeaderButtons>
      ),
  });

  const ItemFilter = (props) => {
    return (
      <View style={styles.filterContainer}>
        <Text>{props.label}</Text>
        <Switch
          trackColor={{
            true: Colors.primaryColor,
          }}
          thumbColor={Colors.primaryColor}
          value={props.state}
          onValueChange={props.onChange}
        />
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
          <ItemFilter label="Glutten Free" state={isGluttenFree} onChange={(newValue) => setIsGluttenFree(newValue)} />
          <ItemFilter label="Lactose Free" state={isLactoseFree} onChange={(newValue) => setIsLactoseFree(newValue)} />
          <ItemFilter label="Vegan" state={isVegan} onChange={(newValue) => setIsVegan(newValue)} />
          <ItemFilter label="Vegetarian" state={isVegetarian} onChange={(newValue) => setIsVegetarian(newValue)} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans",
    fontSize: 22,
    margin: 20,
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 10,
  },
});

export default FiltersScreen;
