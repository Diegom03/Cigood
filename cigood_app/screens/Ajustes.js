import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Ajustes = () => {
    const navigation = useNavigation();

    // CERRAR SESIÓN
    const handleLogout = async () => {
        try {
          await AsyncStorage.setItem('esta_logueado', 'false');
        } catch (error) {
          console.log(error);
        }
    
        console.log('Cerrando sesion');
        navigation.navigate('Login');
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ajustes</Text>
            <View style={styles.listContainer}>
                <View style={styles.listItem} onPress={() => navigation.navigate('Ajustes')}>
                    <Image source={require('../images/usuario.png')} style={styles.icon} />
                    <Text style={styles.itemText} onPress={() => navigation.navigate('Cuenta')}>Cuenta</Text>
                </View>
                <View style={styles.listItem} >
                    <Image source={require('../images/notificaciones.png')} style={styles.icon} />
                    <Text style={styles.itemText} onPress={() => navigation.navigate('Notificaciones')}>Notificaciones</Text>
                </View>
                <View style={styles.listItem} onPress={() => navigation.navigate('Ajustes')}>
                    <Image source={require('../images/cerrar-sesion.png')} style={styles.icon} />
                    <Text style={styles.itemText} onPress={handleLogout}>Cerrar Sesión</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 20
    },
    listContainer: {
        alignSelf: 'stretch',
        margin: 20
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    itemText: {
        fontSize: 20,
    },
});

export default Ajustes;
