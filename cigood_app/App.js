import React from 'react';
//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import SplashScreen from './screens/SplashScreen';
import Login from './screens/Login';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>Pantalla principal</Text>
      <Button
        title="Ir a pantalla de detalles"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen() {
  return (
    <View>
      <Text>Pantalla de detalles</Text>
    </View>
  );
}

// CADA VEZ QUE SE INSTALE ALGO ==> npm start --reset-cache

const App = () => {
  const [isSplashVisible, setSplashVisible] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setSplashVisible(false);
    }, 3000);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isSplashVisible ? <SplashScreen /> : <Login />}
    </View>
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
