import React, { useState, useEffect } from 'react';
import { getRecetas } from '../conection';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function RecetasComponent() {
    const [recetas, setRecetas] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const recetasData = await getRecetas();
                setRecetas(recetasData);
            } catch (error) {
                console.error('Error al obtener las recetas:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recetas</Text>
            <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Ajustes')}>
                <Image source={require('../images/ajustes.png')} style={styles.settingsButtonImage} />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {recetas.map((receta) => (
                    <TouchableOpacity key={receta.id} style={styles.recetaContainer}>
                        <Image source={{ uri: receta.image }} style={styles.image} />
                        <View style={styles.textContainer}>
                            <Text style={styles.name}>{receta.name}</Text>
                            <Text style={styles.description}>{receta.description}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        paddingTop: 40,
        paddingBottom: 20,
        alignItems: 'center',
        marginTop: 100,
        paddingBottom: 100,
    },
    title: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'center',
        zIndex: 1,
        paddingTop: 60,
        paddingBottom: 20,
    },
    settingsButtonImage: {
        width: 30,
        height: 30,
    },
    settingsButton: {
        position: 'absolute',
        top: 40,
        left: 10, // Ajusta las coordenadas left según tu preferencia
        backgroundColor: 'transparent',
        padding: 10,
    },
    recetaContainer: {
        flexDirection: 'row',
        margin: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 16,
    },
});

export default RecetasComponent;
