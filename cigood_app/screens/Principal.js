import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList, Modal, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getIngredientes, recetasDespensa } from '../Onload';

const Principal = () => {
    const navigation = useNavigation();
    const [recetas, setRecetas] = useState([]);
    const [despensa, setDespensa] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState('');
    const [isLoading, setIsLoading] = useState(true);

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
                setIsLoading(false);
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
    const abrirModalReceta = (id) => {
        const datosReceta = id;
        setSelectedRecipe(datosReceta);
        setModalVisible(true);
    };

    const renderDiarias = ({ item }) => {
        return (
            <View style={styles.recipeItem}>
                <TouchableOpacity key={item._id} onPress={() => abrirReceta(item)} onLongPress={() => abrirModalReceta(item)}>
                    <Image source={{ uri: item._img }} style={styles.recipeImage} />
                    <View style={styles.recipeContainer}>
                        <Text style={styles.recipeTitle}>{item._descripcion}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    const renderModalContent = () => {
        return (
            <View style={styles.modalContent}>
                <Image source={{ uri: selectedRecipe._img }} style={styles.modalImage} />
                <View style={styles.modalTextContainer}>
                    <Text style={styles.modalRecipeTitle}>{selectedRecipe._descripcion}</Text>
                    <Text style={styles.modalRecipeTime}>Tiempo de preparación: {selectedRecipe._tiempo}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Image source={require('../images/logotipo-short.png')} style={styles.headerImage}></Image>
            </View>

            <Text style={styles.title2}>Recetas del día</Text>
            {isLoading ? ( // Mostrar mensaje de carga si isLoading es true
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#FF5555" />
                    <Text style={styles.loadingText}>Cargando recetas...</Text>
                </View>
            ) : (
                <FlatList
                    data={recetas}
                    renderItem={renderDiarias}
                    keyExtractor={(item) => item._id}
                    numColumns={2}
                    contentContainerStyle={styles.recipeContainer}
                />)}
            <Modal visible={modalVisible} animationType="fade" transparent>
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalContainer}>
                        {renderModalContent()}
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
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
        marginTop: 30,
    },

    // FLATLIST
    recipeContainer: {
        marginTop: 10,
        display: 'flex',
    },
    recipeItem: {
        width: '44%', // 48
        borderRadius: 8,
        paddingTop: 10,
        margin: 10,
        backgroundColor: '#FF8A6B',
        alignItems: 'center',
    },
    recipeImage: {
        width: 140, //150
        height: 140, //150
        borderRadius: 5,
    },
    recipeTitle: {
        fontSize: 17,
        fontWeight: '600',
        textAlign: 'center',
        paddingVertical: 20,
        color: 'black',
    },
    //MODAL
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 20,
        paddingVertical: 50,
    },

    modalContent: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
    },
    modalTextContainer: {
        marginTop: 20,
    },
    modalImage: {
        width: 250,
        height: 150,
        borderRadius: 8,
        marginBottom: 10,
    },
    modalRecipeTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    modalRecipeTime: {
        fontSize: 16,
        marginBottom: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color:'#FF5555'
    },
});

export default Principal;
