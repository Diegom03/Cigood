import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Login = () => {
  return (
    <View style={styles.container}>
      <Text>Pantalla de detalles</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
  });

export default Login;