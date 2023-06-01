import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";

import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

// Importa tus componentes para cada sección o vista
import Principal from './screens/Principal';
import ListaIngredientes from './screens/ListaIngredientes';
import ListaRecetas from './screens/ListaRecetas';
import Cuenta from './screens/Cuenta';
import Ajustes from './screens/Ajustes';
import Camara from './screens/Camara';
import Notificaciones from './screens/Notificaciones';

// NAVIGATES DE PRINCIPAL
const HomeStack = createNativeStackNavigator();

// ESTO es para navigate con botones
function MyHomeStack() {
    return (
        <HomeStack.Navigator
            initialRouteName="Home"
        >
            <HomeStack.Screen
                name="Home"
                component={Principal}
                options={{ headerShown: false }}
            />
            <HomeStack.Screen
                name="Despensa" // Este nombre es con el que se hara navigate
                component={ListaIngredientes}
                options={{ headerShown: false }}
            />
            <HomeStack.Screen
                name="Recetas" // Este nombre es con el que se hara navigate
                component={ListaRecetas}
                options={{ headerShown: false }}
            />

        </HomeStack.Navigator>
    )
}


// NAVIGATES DE DESPENSA
const FoodStack = createNativeStackNavigator();
// Cada componente que tenga navigates dentro en uno de estos

// ESTO es para navigate con botones
function MyFoodStack() {
    return (
        <FoodStack.Navigator
            initialRouteName="Despensa"
        >
            <FoodStack.Screen
                name="Despensa" // Este nombre es con el que se hara navigate
                component={ListaIngredientes}
                options={{ headerShown: false }}
            />
            <FoodStack.Screen
                name="Camara" // Este nombre es con el que se hara navigate
                component={Camara}
                options={{ headerShown: false }}
            />

        </FoodStack.Navigator>
    )
}

// NAVIGATES DE DESPENSA
const SettingsStack = createNativeStackNavigator();
// Cada componente que tenga navigates dentro en uno de estos

// ESTO es para navigate con botones
function MySettingsStack() {
    return (
        <SettingsStack.Navigator
            initialRouteName="Ajustes"
        >
            <SettingsStack.Screen
                name="Ajustes"
                component={Ajustes}
                options={{ headerShown: false }}
            />
            <SettingsStack.Screen
                name="Notificaciones"
                component={Notificaciones}
                options={{ headerShown: false }}
            />
            <SettingsStack.Screen
                name="Cuenta"
                component={Cuenta}
                options={{ headerShown: false }}
            />

        </SettingsStack.Navigator>
    )
}


const Tab = createBottomTabNavigator();
// Aqui todos los componentes que estáran en el bottom navigator
function BottomNavigation() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let iconStyle = focused ? styles.iconFocused : styles.icon;

                    if (route.name === 'Principal') {
                        iconName = focused ? 'home' : 'home-outline';
                        iconStyle = [iconStyle, styles.iconMarginTop];
                    } else if (route.name === 'Despensa') {
                        iconName = focused ? 'fast-food' : 'fast-food-outline';
                        iconStyle = [iconStyle, styles.iconMarginTop];
                    } else if (route.name === 'Cuenta') {
                        iconName = focused ? 'person' : 'person-outline';
                        iconStyle = [iconStyle, styles.iconMarginTop];
                    } else if (route.name === 'Ajustes') {
                        iconName = focused ? 'settings' : 'settings-outline';
                        iconStyle = [iconStyle, styles.iconMarginTop];
                    }

                    return <Ionicons name={iconName} size={size} color={color} style={iconStyle} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'red',
                inactiveTintColor: 'gray',
                showLabel: false, // Oculta el nombre debajo del ícono en todos los tabs
            }}
        >
            <Tab.Screen
                name="Principal"
                component={MyHomeStack}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Despensa"
                component={MyFoodStack}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Cuenta"
                component={Cuenta}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Ajustes"
                component={MySettingsStack}
                options={{ headerShown: false }}
            />
        </Tab.Navigator>
    );
};

export default function Navigator() {
    return(
        //<NavigationContainer>
            <BottomNavigation />
        //</NavigationContainer>
    )
};

const styles = StyleSheet.create({
    icon: {
      // Estilos para el ícono
    },
    iconFocused: {
      // Estilos para el ícono cuando está seleccionado
    },
    iconMarginTop: {
      marginTop: 4, // Agrega el margen superior deseado
    },
});