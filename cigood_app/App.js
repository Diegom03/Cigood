import React from 'react';
//import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import SplashScreen from './screens/SplashScreen';
import Login from './screens/Login';
import Register from './screens/Register';

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
