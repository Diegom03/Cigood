import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajustes</Text>
      <View style={styles.listItem}>
        <Image source={require('../images/filtrar.png')} style={styles.icon} />
        <Text style={styles.itemText}>Cuenta</Text>
      </View>
      <View style={styles.listItem}>
        <Image source={require('../images/filtrar.png')} style={styles.icon} />
        <Text style={styles.itemText}>Notificaciones</Text>
      </View>
      <View style={styles.listItem}>
        <Image source={require('../images/filtrar.png')} style={styles.icon} />
        <Text style={styles.itemText}>Cerrar Sesión</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  itemText: {
    fontSize: 16,
  },
});

export default SettingsScreen;
