import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ajustes</Text>
            <View style={styles.listContainer}>
                <View style={styles.listItem} onPress={() => navigation.navigate('Ajustes')}>
                    <Image source={require('../images/usuario.png')} style={styles.icon} />
                    <Text style={styles.itemText}>Cuenta</Text>
                </View>
                <View style={styles.listItem} >
                    <Image source={require('../images/notificaciones.png')} style={styles.icon} />
                    <Text style={styles.itemText} onPress={() => navigation.navigate('Notificaciones')}>Notificaciones</Text>
                </View>
                <View style={styles.listItem} onPress={() => navigation.navigate('Ajustes')}>
                    <Image source={require('../images/cerrar-sesion.png')} style={styles.icon} />
                    <Text style={styles.itemText}>Cerrar Sesión</Text>
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

export default SettingsScreen;
