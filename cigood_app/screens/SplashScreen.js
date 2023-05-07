import React from 'react';
import { View, Text, Image, StyleSheet, AppLoading } from 'react-native';
import * as Font from 'expo-font';
import * as Animatable from 'react-native-animatable';
import { useFonts } from 'expo-font';

/* const titleFont = {
  'Bangers_Regular': require('./../assets/fonts/Bangers-Regular.ttf'),
}; */

const SplashScreen = () => {
  //Carga la fuente
  /*const [fontsLoaded, setFontsLoaded] = React.useState(false);

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={async () => {
          await Font.loadAsync(titleFont);
        }}
        onFinish={() => setFontsLoaded(true)}
      />
    );
  }*/

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInDown" delay={700}>
        <Image source={require('./../images/logo.png')} style={styles.image}/>
      </Animatable.View>
      <Animatable.View animation="fadeInUp" delay={700}> 
        <Text style={styles.titleText}>CIGOOD</Text>
        <Text style={styles.normalText}>Learn how to cook</Text>
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 50,
  },
  titleText: {
    //fontFamily: 'Bangers_Regular',
    color: 'red',
    fontSize: 40,
    marginBottom: 10,
  },
  normalText: {
    //fontFamily: 'antic',
    fontSize: 20,
  },
});
