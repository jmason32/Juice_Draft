import React from 'react';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native'

import { Juice, Order } from './app/screens'
import Tabs from './app/navigation/tabs'

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={'Home'}
            >
                <Stack.Screen name="Home" component={Tabs} />
                <Stack.Screen name="Juice" component={Juice} />
                {/* <Stack.Screen name="Order" component={Order} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;