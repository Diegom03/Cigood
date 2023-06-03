import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getIngredientes, recetasDespensa } from '../Onload';

const Principal = () => {
    const navigation = useNavigation();
    const [recetas, setRecetas] = useState([]);
    const [despensa, setDespensa] = useState([]);

    // const recetasDiarias = [
    //     { _id: '1', _image: require('../images/receta1.jpg'), _text: 'Receta 1' },
    //     { _id: '2', _image: require('../images/receta2.jpg'), _text: 'Receta 2' },
    //     { _id: '3', _image: require('../images/receta3.jpg'), _text: 'Receta 3' },
    //     { _id: '4', _image: require('../images/receta4.png'), _text: 'Receta 4' },
    //     // Agrega más elementos si es necesario
    // ];

    useEffect(() => {
        const obtenerRecetas = async () => {
            // Obtiene el codigo de los ingredientes de la despensa
            try {
                const ingredientes = await getIngredientes();
                const productos = ingredientes.map((elemento) => elemento._producto);
                setDespensa(productos);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            }

            console.log('Paso 1');
        };

        obtenerRecetas();
    }, []);

    useEffect(() => {
        const obtenerRecetasDiarias = async () => {
            // Obtiene las recetas diarias recomendadas de la despensa
            try {
                const recetasDiarias = await recetasDespensa(despensa);
                setRecetas(recetasDiarias);
            } catch (error) {
                console.error('Error al obtener las recetas diarias:', error);
            }

            console.log('Paso 2');
        };

        if (despensa.length !== 0) {
            obtenerRecetasDiarias();
        }   
    }, [despensa]);

    // Carga la recteta seleccionada
    const abrirReceta = (id) => {
        // Obtiene la receta cuyo id esta guardado
        //const datosReceta = recetas.map(objeto => objeto._nombre == id);
        const datosReceta = id;
        console.log('Abriendo: ' + JSON.stringify(datosReceta));

        // Abre la nueva vista con los datos
        navigation.navigate('PlantillaReceta_Sub', { receta: datosReceta });
    };


    const renderDiarias = ({ item }) => {
        return (
            <View style={styles.recipeItem}>
                <TouchableOpacity key={item._id} onPress={() => abrirReceta(item)}>
                    <Image source={{ uri: item._img }} style={styles.recipeImage} />
                    <Text style={styles.recipeTitle}>{item._descripcion}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Image source={require('../images/logotipo-short.png')} style={styles.headerImage}></Image>
            </View>

            <Text style={styles.title2}>Recetas del día</Text>

            <FlatList
                data={recetas}
                renderItem={renderDiarias}
                keyExtractor={(item) => item._id}
                numColumns={2}
                contentContainerStyle={styles.recipeContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 50,
    },

    // HEADER
    header: {
        top: -50,
        left: 0,
        right: 0,
        backgroundColor: '#E1755F',
        opacity: 0.6,
        height: 120,
        width: '100%',
        alignItems: 'center',
    },
    headerImage: {
        width: 250,
        height: 70,
        marginTop: 35,
        position: 'absolute',
        zIndex: 2,
    },

    title2: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#E12626',
        top: -10,
    },

    // FLATLIST
    recipeContainer: {
        paddingHorizontal: 20,
        marginTop: 10,
        display: 'flex',
    },
    recipeItem: {
        width: '44%', // 48
        marginBottom: 20,
        borderRadius: 8,
        padding: 10,
        margin: 10,
        backgroundColor: '#FA5937',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#FA5937',
    },
    recipeImage: {
        width: 140, //150
        height: 140, //150
        marginBottom: 10,
        borderRadius: 5,
    },
    recipeTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Principal;
