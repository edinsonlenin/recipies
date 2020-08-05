import React from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { DrawerActions } from '@react-navigation/native';

import { Ionicons } from "@expo/vector-icons";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealScreen from "../screens/CategoryMealScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import FiltersScreen from "../screens/FiltersScreen";

import Colors from "../constants/Colors";
import CustomHeaderButton from "../components/HeaderButton";

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

let Tab;

if (Platform.OS === "android") {
  Tab = createMaterialBottomTabNavigator();
} else {
  Tab = createBottomTabNavigator();
}

const tabScreenConfig = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === "Meals") {
      iconName = focused ? "ios-restaurant" : "ios-restaurant";
    } else if (route.name === "Favorites") {
      iconName = focused ? "ios-star" : "ios-star";
    }

    // You can return any component that you like here!
    return <Ionicons name={iconName} size={size} color={color} />;
  },
});

const screenOptions = {
  headerStyle: {
    backgroundColor: Colors.primaryColor,
  },
  headerTintColor: "white",
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
};

const mealDetailOptions = {
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Favorite"
          iconName="ios-star"
          onPress={() => console.log("press favorite")}
        ></Item>
      </HeaderButtons>
    ),
  };

const hamburguerMenu = ({ navigation }) => ({
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title="Menu"
        iconName="ios-menu"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      ></Item>
    </HeaderButtons>
  ),
});

function FavoritesNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen} options={hamburguerMenu}
      />
      <Stack.Screen name="MealDetail" component={MealDetailScreen} options={mealDetailOptions}/>
    </Stack.Navigator>
  );
}

function FilterNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptions} >
      <Stack.Screen name="Filters" component={FiltersScreen}  />
    </Stack.Navigator>
  );
}

function MealsNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="CategoryMeal" component={CategoryMealScreen} />
      <Stack.Screen name="MealDetail" component={MealDetailScreen} 
        options={mealDetailOptions} />
    </Stack.Navigator>
  );
}

const optionsFavorites = {
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title="Favorite"
        iconName="ios-star"
        onPress={() => console.log("press favorite")}
      ></Item>
    </HeaderButtons>
  ),
};

function MealsFavoritesTabs() {
  return (
    <Tab.Navigator
      shifting={true}
      barStyle={{ backgroundColor: Colors.primaryColor }}
      screenOptions={tabScreenConfig}
      tabBarOptions={{
        activeTintColor: Colors.accentColor,
        labelStyle: {
          fontFamily: 'open-sans-bold'
        }
      }}
    >
      <Tab.Screen name="Meals" component={MealsNavigator} />
      <Tab.Screen
        name="Favorites"
        component={FavoritesNavigator}
        options={{ tabBarLabel: "Favorites!" }}
      />
    </Tab.Navigator>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator drawerContentOptions={{activeTintColor: Colors.accentColor, labelStyle: {
      fontFamily: 'open-sans-bold'
    }}} >
      <Drawer.Screen name="MealFav" component={MealsFavoritesTabs} options={{title: 'Meals'}} />
      <Drawer.Screen name="Filters" component={FilterNavigator} options={{title: 'Filters!!!'}}/>
    </Drawer.Navigator>
  );
}

const navigationContainer = () => (
  <NavigationContainer>{MyDrawer()}</NavigationContainer>
);

export default navigationContainer;
