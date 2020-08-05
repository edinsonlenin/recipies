import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, FlatList } from 'react-native';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { DrawerActions } from '@react-navigation/native';

import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile';
import CustomHeaderButton from "../components/HeaderButton";


const CategoriesScreen = props => {
    const renderItem = (itemData) => {
        return (
            <CategoryGridTile title={itemData.item.title} color={itemData.item.color}
                onSelect={() => props.navigation.navigate('CategoryMeal', {categoryId: itemData.item.id})}
            />
        );
    };

    const toogleDrawer = () => {
        props.navigation.dispatch(DrawerActions.toggleDrawer());
    };

    props.navigation.setOptions(
        {
            title: 'Meal Categories',
            headerLeft: props => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                  <Item
                    title="Menu"
                    iconName="ios-menu"
                    onPress={toogleDrawer}
                  ></Item>
                </HeaderButtons>
              ),
        }
        );

    return (
        <FlatList keyExtractor={item => item.id}
            data={CATEGORIES}
            renderItem={renderItem}
        numColumns={2} />
    );
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CategoriesScreen;