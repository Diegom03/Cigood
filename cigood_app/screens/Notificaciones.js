import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

const NotificationsScreen = () => {
    const [vaciarDespensaSwitch, setDespensaSwitch] = useState(false);
    const [compartirRecetaSwitch, setRecetasSwitch] = useState(false);
    const [compraGlovoSwitch, setGlovoSwitch] = useState(false);

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
        <View style={styles.container}>
            <Text style={styles.title}>Notificaciones</Text>
            <View style={styles.section}>
                <View style={styles.sectionItem}>
                    <Text style={styles.sectionTitle}>Vaciar despensa</Text>
                    <Text style={styles.description}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, ex non viverra sagittis, arcu lacus tristique
                        ligula, non commodo nisi lectus nec lacus.
                    </Text>
                    <View style={styles.switchContainer}>
                        <Switch value={vaciarDespensaSwitch} onValueChange={handleDespensaSwitch} />
                    </View>
                </View>
                <View style={styles.sectionItem}>
                    <Text style={styles.sectionTitle}>Compartir receta</Text>
                    <Text style={styles.description}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, ex non viverra sagittis, arcu lacus tristique
                        ligula, non commodo nisi lectus nec lacus.
                    </Text>
                    <View style={styles.switchContainer}>
                        <Switch value={compartirRecetaSwitch} onValueChange={handleRecetasSwitch} />
                    </View>
                </View>
                <View style={styles.sectionItem}>
                    <Text style={styles.sectionTitle}>Compra Glovo</Text>
                    <Text style={styles.description}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, ex non viverra sagittis, arcu lacus tristique
                        ligula, non commodo nisi lectus nec lacus.
                    </Text>
                    <View style={styles.switchContainer}>
                        <Switch value={compraGlovoSwitch} onValueChange={handleGlovoSwitch} />
                    </View>
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
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
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
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        marginBottom: 20,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default NotificationsScreen;
