import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

const NotificationsScreen = () => {
    const [vaciarDespensaSwitch, setToggleSwitch] = useState(false);
    const [compartirRecetaSwitch] = useState(false);
    const [compraGlovoSwitch] = useState(false);

    const handleToggleSwitch = () => {
        setToggleSwitch((previousState) => !previousState);
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
                        <Switch value={vaciarDespensaSwitch} onValueChange={handleToggleSwitch} />
                    </View>
                </View>
                <View style={styles.sectionItem}>
                    <Text style={styles.sectionTitle}>Compartir receta</Text>
                    <Text style={styles.description}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, ex non viverra sagittis, arcu lacus tristique
                        ligula, non commodo nisi lectus nec lacus.
                    </Text>
                    <View style={styles.switchContainer}>
                        <Switch value={compartirRecetaSwitch} onValueChange={handleToggleSwitch} />
                    </View>
                </View>
                <View style={styles.sectionItem}>
                    <Text style={styles.sectionTitle}>Compra Glovo</Text>
                    <Text style={styles.description}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, ex non viverra sagittis, arcu lacus tristique
                        ligula, non commodo nisi lectus nec lacus.
                    </Text>
                    <View style={styles.switchContainer}>
                        <Switch value={compraGlovoSwitch} onValueChange={handleToggleSwitch} />
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
