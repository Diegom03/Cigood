import React, { useState, useEffect } from 'react';
import { getRecetas } from '../Onload';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function RecetasComponent({ route }) {
    const { recetas } = route.params;
    //const [recetas, setRecetas] = useState([]);
    const navigation = useNavigation();

    const abrirReceta = (id) => {
        // Obtiene la receta cuyo id esta guardado
        //const datosReceta = recetas.map(objeto => objeto._nombre == id);
        const datosReceta = id;
        console.log('Abriendo: ' + JSON.stringify(datosReceta));

        // Abre la nueva vista con los datos
        navigation.navigate('PlantillaReceta_Sub', { receta: datosReceta });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recetas</Text>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {recetas.map((receta) => (
                    <TouchableOpacity key={receta._id} style={styles.recetaContainer} onPress={() => abrirReceta(receta)}>
                        <Image source={{ uri: receta._img }} style={styles.image} />
                        <View style={styles.textContainer}>
                            <Text style={styles.name}>{receta._descripcion}</Text>
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
        borderRadius: 5,
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
