import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//import { ESTA_LOGUEADO } from '../constants.js';


const NotificationsScreen = () => {
    const [vaciarDespensaSwitch, setDespensaSwitch] = useState(false);
    const [compartirRecetaSwitch, setRecetasSwitch] = useState(false);
    const [compraGlovoSwitch, setGlovoSwitch] = useState(false);

    useEffect(() => {
        // Recuperar los estados guardados de AsyncStorage cuando la pantalla se monta
        AsyncStorage.getItem('vaciarDespensaSwitch').then((value) => {
            if (value !== null) {
                setDespensaSwitch(value === 'true');
            }
        });
        AsyncStorage.getItem('compartirRecetaSwitch').then((value) => {
            if (value !== null) {
                setRecetasSwitch(value === 'true');
            }
        });
        AsyncStorage.getItem('compraGlovoSwitch').then((value) => {
            if (value !== null) {
                setGlovoSwitch(value === 'true');
            }
        });
    }, []);

    const handleDespensaSwitch = (value) => {
        setDespensaSwitch(value);
        // Guardar el estado del interruptor en AsyncStorage
        AsyncStorage.setItem('vaciarDespensaSwitch', value.toString());
    };

    const handleRecetasSwitch = (value) => {
        setRecetasSwitch(value);
        // Guardar el estado del interruptor en AsyncStorage
        AsyncStorage.setItem('compartirRecetaSwitch', value.toString());
    };

    const handleGlovoSwitch = (value) => {
        setGlovoSwitch(value);
        // Guardar el estado del interruptor en AsyncStorage
        AsyncStorage.setItem('compraGlovoSwitch', value.toString());
    };

    return (
        <ImageBackground style={styles.container} /*source={require('../images/fondo-notificaciones.jpg')}*/>
            
            <View style={styles.imageContainer}>
                <Image
                    source={require('../images/notificacion.png')} // Ruta de tu imagen
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>
            <Text style={styles.title}>Notificaciones</Text>

            <View style={styles.section}>
                <View style={styles.sectionItem}>
                    <View style={styles.switchTextContainer}>
                        <Text style={styles.sectionTitle}>Vaciar despensa</Text>
                        <Switch value={vaciarDespensaSwitch} onValueChange={handleDespensaSwitch} />
                    </View>
                    <Text style={styles.description}>
                        Elimina automáticamente los productos de tu despensa
                    </Text>
                </View>
                <View style={styles.sectionItem}>
                    <View style={styles.switchTextContainer}>
                        <Text style={styles.sectionTitle}>Compartir receta</Text>
                        <Switch value={compartirRecetaSwitch} onValueChange={handleRecetasSwitch} />
                    </View>
                    <Text style={styles.description}>
                        Envía tus recetas favoritas a tus amigos a través de la aplicación
                    </Text>
                </View>
                <View style={styles.sectionItem}>
                    <View style={styles.switchTextContainer}>
                        <Text style={styles.sectionTitle}>Compra Glovo</Text>
                        <Switch value={compraGlovoSwitch} onValueChange={handleGlovoSwitch} />
                    </View>
                    <Text style={styles.description}>
                        Compra productos necesarios a través de la aplicación Glovo
                    </Text>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#EAE6DC',
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
        alignItems: 'center',
    },
    headerImage: {
        width: 250,
        height: 70,
        marginTop: 35,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10, 
        color: 'black',
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70,
    },
    image: {
        width: 70, // Ancho de la imagen
        height: 70, // Alto de la imagen
    },
    section: {
        width: '100%',
        backgroundColor: '#F2F2F2',
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
    },
    sectionItem: {
        backgroundColor: '#E6E6E6',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    switchTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        marginBottom: 20,
    },
});

export default NotificationsScreen;
