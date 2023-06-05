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
            <View style={styles.header}>
                <Image source={require('../images/logotipo-short.png')} style={styles.headerImage}></Image>
            </View>

            <Text style={styles.title}>Ajustes generales</Text>
            <View style={styles.listContainer}>
                <View style={styles.listItem} onPress={() => navigation.navigate('Ajustes_Sub')}>
                    <Image source={require('../images/usuario.png')} style={styles.icon} />
                    <Text style={styles.itemText} onPress={() => navigation.navigate('Cuenta_Sub')}>Cuenta</Text>
                </View>
                <View style={styles.listItem} >
                    <Image source={require('../images/notificaciones.png')} style={styles.icon} />
                    <Text style={styles.itemText} onPress={() => navigation.navigate('Notificaciones_Sub')}>Notificaciones</Text>
                </View>
                <View style={styles.listItem} onPress={() => navigation.navigate('Ajustes_Sub')}>
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
        backgroundColor: '#F2EFE9',
    },

    // HEADER
    header: {
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#E1755F',
        opacity: 0.6,
        height: 120,
        position: 'absolute',
        zIndex: 2,
        alignItems: 'center',
    },
    headerImage: {
        width: 250,
        height: 70,
        marginTop: 35,
    },
    
    // TITLE
    title: {
        fontSize: 30,
        textAlign: 'center',
        margin: 20,
        marginTop: 140,
    },

    // LISTA OPCIONES
    listContainer: {
        alignSelf: 'stretch',
        margin: 20
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
    },
    icon: {
        width: 38,
        height: 38,
        marginRight: 10,
    },
    itemText: {
        fontSize: 20,
    },
});

export default Ajustes;
