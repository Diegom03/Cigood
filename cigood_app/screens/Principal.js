import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList, Modal, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getIngredientes, recetasDespensa, getRecetas, getNameIngredientes } from '../Onload';
import Carousel from 'react-native-snap-carousel';

const Principal = () => {
    const navigation = useNavigation();
    const [recetas, setRecetas] = useState([]);
    const [despensa, setDespensa] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [recetaDelDia, setRecetaDelDia] = useState(null);
    const [allRecipes, serRecipes] = useState([]);
    const [ingredientesModal, setIngredientes] = useState([]);
    const [showRecetaDelDia, setShowRecetaDelDia] = useState(false);

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
        const obtenerAllRecetas = async () => {
            try {
                if (recetas.length > 0) {
                    const recetasBD = await getRecetas();
                    const randomIndex = Math.floor(Math.random() * 27);
                    const nuevaRecetaDelDia = recetasBD[randomIndex];
                    setRecetaDelDia(nuevaRecetaDelDia);
                }
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            }
        };

        obtenerAllRecetas();
    }, [recetas]);

    const obtenerIngredientes = async (datosReceta) => {
        try {
            if (recetaDelDia && recetaDelDia._ingredientes) {
                const data = await getNameIngredientes(datosReceta._ingredientes);
                console.log("hola" + JSON.stringify(data));
                setIngredientes(data);
            }
        } catch (error) {
            console.error('Error al obtener los ingredientes:', error);
        }
    };




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
        obtenerIngredientes(datosReceta);
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
                    <View style={styles.ingredientItemsContainer}>
                        <Text style={styles.modalIngredientes}>Ingredientes:</Text>
                        {ingredientesModal.map((ingrediente, index) => (
                            <Text key={index} style={styles.ingredientItem}>
                                - {ingrediente._nombre}
                            </Text>
                        ))}
                    </View>
                </View>
            </View>
        );
    };
    const renderRecetaDelDia = () => {
        if (!showRecetaDelDia) {
          return (
            <TouchableOpacity
              onPress={() => setShowRecetaDelDia(true)}
              style={styles.recetaDelDiaContainer}
            >
              <View style={styles.recetaDelDiaOverlay}>
                <Text style={styles.recetaDelDiaOverlayText}>Pulsa para revelar</Text>
              </View>
              <Image source={{ uri: recetaDelDia._img }} style={styles.recetaDelDiaImage} />
              <View style={styles.recetaDelDiaTextContainer}>
                <Text style={styles.recetaDelDiaTitle}>{recetaDelDia._descripcion}</Text>
                <Text style={styles.recetaDelDiaTitle}>{recetaDelDia._tiempo}</Text>
              </View>
            </TouchableOpacity>
          );
        }
    
        return (
          <TouchableOpacity onPress={() => abrirReceta(recetaDelDia)} onLongPress={() => abrirModalReceta(recetaDelDia)} style={styles.recetaDelDiaContainer}>
            <Image source={{ uri: recetaDelDia._img }} style={styles.recetaDelDiaImage} />
            <View style={styles.recetaDelDiaTextContainer}>
              <Text style={styles.recetaDelDiaTitle}>{recetaDelDia._descripcion}</Text>
              <Text style={styles.recetaDelDiaTime}>{recetaDelDia._tiempo}</Text>
            </View>
          </TouchableOpacity>
        );
      };

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Image source={require('../images/logotipo-short.png')} style={styles.headerImage}></Image>
            </View>

            <Text style={styles.title2}>Recomendaciones</Text>
            {isLoading ? ( // Mostrar mensaje de carga si isLoading es true
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#FF5555" />
                    <Text style={styles.loadingText}>Cargando recetas...</Text>
                </View>
            ) : (
                <Carousel
                    data={recetas}
                    renderItem={renderDiarias}
                    sliderWidth={400}
                    itemWidth={200}
                    layout="default"
                />)}
            <Text style={styles.title2}>Receta del dia</Text>
            {recetaDelDia ? (
                renderRecetaDelDia()
            ) : (
                <ActivityIndicator size="large" color="#FF5555" />
            )}
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
        color: '#FF7F50',
        marginTop: 20,
        marginBottom: 10,
    },
    // CARRUSEL
    recipeItem: {
        borderRadius: 8,
        paddingTop: 10,
        margin: 0,
        backgroundColor: '#FF6347',
        alignItems: 'center',
    },
    recipeContainer: {
        display: 'flex',
        height: 60,
        justifyContent: 'center',
    },
    recipeImage: {
        width: 140, //150
        height: 140, //150
        borderRadius: 5,
        alignSelf: 'center',
    },
    recipeTitle: {
        fontSize: 17,
        fontWeight: '600',
        textAlign: 'center',
        color: 'black',
        maxWidth: 150,
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
    modalIngredientes: {
        fontSize: 16,
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
        color: '#FF5555'
    },

    //RECETA DEL DIA
    recetaDelDiaContainer: {
        borderRadius: 8,
        margin: 0,
        width: 300,
        height: 200,
        backgroundColor: '#008C6C',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'row',
    },
    recetaDelDiaOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex:2,
        // Otros estilos para la superposición de la receta del día
      },
      recetaDelDiaOverlayText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        // Otros estilos para el texto de superposición de la receta del día
      },
    recetaDelDiaImage: {
        width: 140,
        height: 140,
        borderRadius: 5,
        alignSelf: 'center',
    },
    recetaDelDiaTitle: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        maxWidth: 180,
        paddingVertical: 10,
        //fontWeight: '500',
    },
    ingredientItem: {
        fontSize: 16,
        marginLeft: 8,

    },
    recetaDelDiaTextContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
    },
    ingredientContainer: {
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start', // Alinear los ingredientes al inicio del contenedor
    },

});

export default Principal;
