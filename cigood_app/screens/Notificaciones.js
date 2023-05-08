import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ImageBackground } from 'react-native';

const NotificationsScreen = () => {
    const [vaciarDespensaSwitch, setVaciarDespensaSwitch] = useState(false);
    const [compartirRecetaSwitch, setCompartirRecetaSwitch] = useState(false);
    const [compraGlovoSwitch, setCompraGlovoSwitch] = useState(false);

    const handleVaciarDespensaToggleSwitch = () => {
        setVaciarDespensaSwitch(previousState => !previousState);
    };

    const handleCompartirRecetaToggleSwitch = () => {
        setCompartirRecetaSwitch(previousState => !previousState);
    };

    const handleCompraGlovoToggleSwitch = () => {
        setCompraGlovoSwitch(previousState => !previousState);
    };

    const handleDespensaSwitch = () => {
        setDespensaSwitch((previousState) => !previousState);
    };
    const handleRecetasSwitch = () => {
        setRecetasSwitch((previousState) => !previousState);
    };
    const handleGlovoSwitch = () => {
        setGlovoSwitch((previousState) => !previousState);
    };

    return (
        <ImageBackground style={styles.container} source={require('../images/fondo-notificaciones.jpg')}>
            <Text style={styles.title}>Notificaciones</Text>
            <View style={styles.section}>
                <View style={styles.sectionItem}>
                    <View style={styles.switchTextContainer}>
                        <Text style={styles.sectionTitle}>Vaciar despensa</Text>
                        <Switch value={vaciarDespensaSwitch} onValueChange={handleVaciarDespensaToggleSwitch} />
                    </View>
                    <Text style={styles.description}>
                        Elimina automáticamente los productos de tu despensa
                    </Text>
                </View>
                <View style={styles.sectionItem}>
                    <View style={styles.switchTextContainer}>
                        <Text style={styles.sectionTitle}>Compartir receta</Text>
                        <Switch value={compartirRecetaSwitch} onValueChange={handleCompartirRecetaToggleSwitch} />
                    </View>
                    <Text style={styles.description}>
                        Envía tus recetas favoritas a tus amigos a través de la aplicación
                    </Text>
                </View>
                <View style={styles.sectionItem}>
                    <View style={styles.switchTextContainer}>
                        <Text style={styles.sectionTitle}>Compra Glovo</Text>
                        <Switch value={compraGlovoSwitch} onValueChange={handleCompraGlovoToggleSwitch} />
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
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 20,
        color: 'white'
    },
    section: {
        width: '100%',
        backgroundColor: '#F2F2F2',
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
        marginTop: 160,
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
