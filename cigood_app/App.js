import React from 'react';
//import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import SplashScreen from './screens/SplashScreen';
import Login from './screens/Login';
import Register from './screens/Register';
import Principal from './screens/Principal';
import Ajustes from './screens/Ajustes';
import Notificaciones from './screens/Notificaciones';
import Cuenta from './screens/Cuenta';
import Prueba from './screens/Prueba';
import ListaRecetas from './screens/ListaRecetas';
import ListaIngredientes from './screens/ListaIngredientes';
import Camara from './screens/Camara';
import CamaraPhoto from './screens/CamaraPhoto';

const Stack = createStackNavigator();

// CADA VEZ QUE SE INSTALE ALGO ==> npm start --reset-cache

const App = () => {
  const [isSplashVisible, setSplashVisible] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setSplashVisible(false);
    }, 4000);
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSplashVisible ? (
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Principal"
              component={Principal}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Ajustes"
              component={Ajustes}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Notificaciones"
              component={Notificaciones}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Cuenta"
              component={Cuenta}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ListaRecetas"
              component={ListaRecetas}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ListaIngredientes"
              component={ListaIngredientes}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Prueba"
              component={Prueba}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Camara"
              component={Camara}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CamaraPhoto"
              component={CamaraPhoto}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
