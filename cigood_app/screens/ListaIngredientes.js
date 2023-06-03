import React, { useState, useEffect, useRef } from 'react';
import { getIngredientes, dropIngredientes, asyncIngredientes, addIngrediente } from '../Onload';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Alert, TextInput, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListaIngredientes = () => {
    const [ingredientes, setIngredientes] = useState([]);
    const [ingredientesDB, setIngredientesDB] = useState([]);
    const [selectedIngredientes, setSelectedIngredientes] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigation = useNavigation();
    const [searchValue, setSearchValue] = useState('');
    const [texto, setTexto] = useState('');
    const [sugerencias, setSugerencias] = useState([]);
    const [contador, setContador] = useState(0);
    const flatListRef = useRef(null);

    useEffect(() => {
        const fetchIngredientes = async () => {
            //Obtiene los ingredientes de la despensa
            try {
                const ingredientesData = await getIngredientes();
                setIngredientes(ingredientesData);
            } catch (error) {
                console.error('Error al obtener los ingredientes:', error);
            }

            // Obtiene el asistente de busqueda
            try {
                // Arego el listado de productos al AsyncStorage para recuperarlo mas tarde
                const ingredientesLista = await asyncIngredientes();
                AsyncStorage.setItem('listado_ingredientes', JSON.stringify(ingredientesLista));

                const nombresIngredientes = ingredientesLista.map((ingrediente) => ingrediente._nombre);
                setIngredientesDB(nombresIngredientes);
            } catch (error) {
                console.error('Error al obtener el asistente:', error);
            }
        };

        fetchIngredientes();
    }, []);

    const handleEliminar = () => {
        // Si no hay nada seleccionado vuelve a la lista
        if (selectedIngredientes.length === 0) {
            return;
        }

        // Si hay ingredientes marcados, muestra la confirmación
        setShowConfirmation(true);
    };

    const handleConfirmationResponse = (response) => {
        if (response === 'yes') {
            // Obtener los ids de los ingredientes seleccionados
            const idsSeleccionados = selectedIngredientes.map((id) => id._producto);

            console.log(idsSeleccionados);

            // Eliminar ingredientes (BBDD)
            dropIngredientes(idsSeleccionados, "varios");

            // Eliminar ingredientes seleccionados (visual)
            setIngredientes((prevIngredientes) =>
                prevIngredientes.filter((ingrediente) => !idsSeleccionados.includes(ingrediente._producto))
            );
            setSelectedIngredientes([]);
        }

        setShowConfirmation(false);
    };

    const handleIngredientePress = (item) => {
        let updatedSelectedIngredientes;
        if (selectedIngredientes.includes(item)) {
            // Desseleccionar ingrediente
            updatedSelectedIngredientes = selectedIngredientes.filter((selectedItem) => selectedItem !== item);
        } else {
            // Seleccionar ingrediente
            updatedSelectedIngredientes = [...selectedIngredientes, item];
        }

        setSelectedIngredientes(updatedSelectedIngredientes);
    };

    const hideSuggestions = () => {
        setSugerencias([]);
        setSearchValue('');
    };

    const handleSuggestionPress = (ingredient) => {
        setSearchValue(ingredient);
        setSugerencias([]);
    };

    const handleSearchChange = (text) => {
        const capitalizedText = text.charAt(0).toUpperCase() + text.slice(1);
        setTexto(text);
        const filteredIngredientes = ingredientesDB.filter((ingrediente) =>
            ingrediente.toLowerCase().includes(text.toLowerCase())
        );
        setSugerencias(filteredIngredientes);
        setSearchValue(text);
    };

    const renderIngrediente = ({ item }) => {
        const isSelected = selectedIngredientes.includes(item);

        return (
            <TouchableOpacity
                style={[styles.ingredienteContainer, isSelected && styles.selectedIngrediente]}
                onPress={() => handleIngredientePress(item)}
            >
                <Text style={styles.ingredienteNombre}>{item._nombre}</Text>
            </TouchableOpacity>
        );
    };

    const usarCamara = () => {
        navigation.navigate('Camara');
    };

    // Agrega el producto, obtiene el nombre y lo busca en el AsyncStorage
    const agregarProducto = async () => {
        const addProducto = await AsyncStorage.getItem('listado_ingredientes');
        const productos = JSON.parse(addProducto);

        const productoEncontrado = productos.find((producto) => producto._nombre === searchValue);

        if (productoEncontrado) {
            console.log('Producto encontrado: ')
            console.log(productoEncontrado);

            await addIngrediente(productoEncontrado);
            setSearchValue('');
            setContador(contador + 1);

            // Actualiza el listado
            try {
                const despensa = await getIngredientes();
                setIngredientes(despensa);
            } catch (error) {
                console.error('Error al obtener los ingredientes:', error);
            }

        } else {
            console.log('Producto no encontrado');
            setSearchValue('Producto no encontrado');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={hideSuggestions}>
            <View style={styles.container}>

                <View style={styles.header}>
                    <Image source={require('../images/logotipo-short.png')} style={styles.headerImage}></Image>
                </View>

                <View style={styles.searchContainer}>
                    <TouchableOpacity onPress={agregarProducto}>
                        <View style={styles.searchIconContainer2}>
                            <Image source={require('../images/carrito-de-compras.png')} style={styles.searchIcon} />
                        </View>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar ingredientes"
                        value={searchValue}
                        onChangeText={handleSearchChange}
                    />
                    {sugerencias.length > 0 && (
                        <FlatList
                            data={sugerencias}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleSuggestionPress(item)}>
                                    <Text style={styles.searchSuggestion}>{item}</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item}
                            style={styles.suggestionList}
                        />
                    )}
                    <TouchableOpacity onPress={usarCamara}>
                        <View style={styles.searchIconContainer}>
                            <Image source={require('../images/camara.png')} style={styles.searchIcon} />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.introductionText}>Estos son tus ingredientes</Text>
                </View>

                <FlatList
                    data={ingredientes}
                    renderItem={renderIngrediente}
                    //keyExtractor={(item) => item._producto.toString()}
                    keyExtractor={(item) => item._producto.toString() + '_' + contador.toString()}
                    numColumns={2}
                    contentContainerStyle={styles.listContent}
                    ref={flatListRef}
                    onContentSizeChange={() => ingredientes.length > 0 && flatListRef.current.scrollToEnd({ animated: true })}

                />
                {showConfirmation && (
                    <View style={styles.confirmationContainer}>
                        <Text style={styles.confirmationText}>¿Estás seguro de que quieres eliminar los ingredientes?</Text>
                        <View style={styles.confirmationButtons}>
                            <TouchableOpacity
                                style={[styles.confirmationButton, { backgroundColor: 'lightblue' }]}
                                onPress={() => handleConfirmationResponse('yes')}
                            >
                                <Text style={styles.confirmationButtonText}>Sí</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.confirmationButton}
                                onPress={() => handleConfirmationResponse('no')}
                            >
                                <Text style={styles.confirmationButtonText}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                <View style={styles.whiteBar}>
                    <View style={styles.botonesContainer}>
                        <TouchableOpacity style={styles.botones} onPress={handleEliminar}>
                            <Text style={styles.botonTexto}>Eliminar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.botones} onPress={handleEliminar}>
                            <Text style={styles.botonTexto}>Vaciar lista</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 10,
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
        zIndex: 2,
        alignItems: 'center',
    },
    headerImage: {
        width: 250,
        height: 70,
        marginTop: 35,
    },

    // BUSCADOR
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 140,
        marginBottom: 20,
        zIndex: 4,
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderColor: '#DDDDDD',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    suggestionList: {
        position: 'absolute',
        top: 60, // Ajusta este valor según sea necesario para que la lista aparezca debajo de la barra de búsqueda
        left: 0,
        right: 0,
        zIndex: 2, // Asegúrate de que la lista tenga un valor de zIndex mayor que los botones
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10,
        borderColor: '#DDDDDD',
        borderWidth: 1,
        borderRadius: 5,
    },
    searchSuggestion: {
        fontSize: 16,
        paddingVertical: 5,
    },
    searchIconContainer: {
        marginLeft: 8,
    },
    searchIconContainer2: {
        marginRight: 12,
    },
    searchIcon: {
        width: 40,
        height: 40,
    },

    // TEXT
    textContainer: {
        position: 'absolute',
        top: 210,
        left: 10,
        right: 10,
        justifyContent: 'space-between',
        zIndex: 2,
        marginHorizontal: 20,
        paddingTop: 5,
    },
    introductionText: {
        fontSize: 20,
        justifyContent: 'center',
        textAlign: 'center',
        color: '#F06244',
        fontWeight: 'bold',
    },

    // FLATLIST
    listContent: {
        paddingHorizontal: 10,
        paddingTop: 20,
        marginHorizontal: 10, // Ajusta el valor según sea necesario para evitar solapamiento con el título y los botones
        paddingBottom: 90, // Para que no lo tape el botón
        borderWidth: 5,
        borderColor: '#FF9999',
        borderRadius: 30,
        marginTop:50,
    },
    ingredienteContainer: {
        width: '45%',
        padding: 10,
        backgroundColor: '#F2F2F2',
        marginBottom: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        backgroundColor: '#F5F5F5', // Color suave
        alignItems: 'center',
        //borderWidth: 1, // Contorno suave
        //borderColor: '#E8E8E8', // Color del contorno suave
      },
      
    selectedIngrediente: {
        backgroundColor: 'lightblue',
    },
    ingredienteNombre: {
        fontSize: 16,
        
    },
    confirmationContainer: {
        position: 'absolute',
        top: 300,
        left: 10,
        right: 10,
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 5,
        zIndex: 3,
    },
    confirmationText: {
        fontSize: 18,
        marginBottom: 10,
    },
    confirmationButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    confirmationButton: {
        backgroundColor: '#DDDDDD',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    confirmationButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    // BOTÓN DE ABAJO
    whiteBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    botonesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20, // Separación horizontal entre los botones
      },
      botones: {
        backgroundColor: '#FF9999',
        paddingVertical: 10,
        flex: 1, // Para que ambos botones tengan el mismo ancho
        marginHorizontal: 5, // Separación horizontal entre los botones
        borderRadius: 5,
        marginBottom: 10,
      },
      botonTexto: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center', // Alineación del texto dentro de los botones
      },
});

export default ListaIngredientes;
