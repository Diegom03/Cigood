import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CheckBox from 'expo-checkbox';
import { getFiltros } from '../Onload';
import { IP_GENERAL } from '../constants';

const MyScreen = () => {
    const navigation = useNavigation();
    const [isFilterModalVisible, setFilterModalVisible] = useState(false);
    const [filtrosBD, setfiltrosBD] = useState([]);
    const [filtrosBusqueda, setFiltrosBusqueda] = useState([]);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchFiltros = async () => {
            try {
                const filtros = await getFiltros();

                setFiltrosBusqueda([]);
                //console.log(filtros);
                setfiltrosBD(filtros);
            } catch (error) {
                console.error('Error al obtener los filtros:', error);
            }
        };
        fetchFiltros();
    }, []);

    const handleFilterButtonPress = () => {
        setFilterModalVisible(true);
    };

    const handleFilterModalClose = () => {
        setFilterModalVisible(false);
    };

    const handleFilterOptionPress = (filter) => {
        if (filtrosBusqueda.includes(filter)) {
            // Si el filtro ya está seleccionado, eliminarlo de la lista de filtros seleccionados
            setFiltrosBusqueda(filtrosBusqueda.filter((f) => f !== filter));
        } else {
            // Si el filtro no está seleccionado, agregarlo a la lista de filtros seleccionados
            setFiltrosBusqueda((prevFilters) => [...prevFilters, filter]);
        }
    };

    const handleRecipeSearch = () => {
        // Obtener los nombres de los filtros seleccionados en forma de array
        const filters = filtrosBusqueda.map(filter => filter._nombre);

        // Realizar la búsqueda de recetas utilizando los filtros seleccionados
        console.log('filtros busqueda: ' + JSON.stringify(filters));

        getRecipes(filters)
            .then(recipes => {
                // Aquí puedes hacer lo que desees con las recetas obtenidas
                console.log(JSON.stringify(recipes));
            })
            .catch(error => {
                // Manejar el error si ocurre
                console.error(error);
            });
    };


    const getRecipes = (filtros) => {
        const tabla = "recetas";

        const encodedFilters = filtros.map(filter => encodeURIComponent(filter));
        const filtro= encodedFilters.join(",");

        const url = `http://` + IP_GENERAL + `:3000/api/filters/${tabla}/${filtro}`;

        return fetch(url)
            .then(response => response.json())
            .then(data => {
                setRecipes(data);
                return data;
            })
            .catch(error => {
                console.error(error);
                return [];
            });
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Ajustes')}>
                <Image source={require('../images/ajustes.png')} style={styles.settingsButtonImage} />
            </TouchableOpacity>
            <Text style={styles.title}>Cigood</Text>
            <View style={styles.searchContainer}>
                <TextInput style={styles.searchInput} placeholder="Buscar" />
                <TouchableOpacity style={styles.filterButton} onPress={handleFilterButtonPress}>
                    <Image source={require('../images/filtrar.png')} style={styles.searchButtonImage} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.searchButton} onPress={handleRecipeSearch}>
                    <Image source={require('../images/lupa.png')} style={styles.searchButtonImage} />
                </TouchableOpacity>
            </View>

            <Modal visible={isFilterModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Opciones de Filtro</Text>

                        {filtrosBD.map((filter) => (
                            <TouchableOpacity
                                style={styles.filterOption}
                                key={filter._id}
                                onPress={() => handleFilterOptionPress(filter)}
                            >
                                <CheckBox
                                    value={filtrosBusqueda.includes(filter)}
                                    onValueChange={() => handleFilterOptionPress(filter)}
                                    style={styles.checkbox}
                                />
                                <Text style={styles.filterOptionLabel}>{filter._nombre}</Text>
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity style={styles.closeButton} onPress={handleFilterModalClose}>
                            <Text style={styles.closeButtonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>


            <Text style={styles.title2}>Recetas del día</Text>
            <View style={styles.recipeContainer}>
                <View style={styles.recipeItem}>
                    <Image source={require('../images/receta1.jpg')} style={styles.recipeImage} />
                    <Text style={styles.recipeTitle}>Receta 1</Text>
                </View>
                <View style={styles.recipeItem}>
                    <Image source={require('../images/receta2.jpg')} style={styles.recipeImage} />
                    <Text style={styles.recipeTitle}>Receta 2</Text>
                </View>
                <View style={styles.recipeItem}>
                    <Image source={require('../images/receta3.jpg')} style={styles.recipeImage} />
                    <Text style={styles.recipeTitle}>Receta 3</Text>
                </View>
                <View style={styles.recipeItem}>
                    <Image source={require('../images/receta4.png')} style={styles.recipeImage} />
                    <Text style={styles.recipeTitle}>Receta 4</Text>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListaIngredientes')}>
                    <Text style={styles.buttonText}>Mi despensa</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button]} onPress={() => navigation.navigate('ListaRecetas')}>
                    <Text style={styles.buttonText}>Recetas</Text>
                </TouchableOpacity>
            </View>
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
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    title2: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        color: '#E12626',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 25,
        marginTop: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginRight: 10,
        paddingHorizontal: 10,
    },
    searchButton: {
        position: 'absolute',
        padding: 10,
        right: 10,
    },
    filterButton: {
        position: 'absolute',
        padding: 10,
        right: 40,
    },
    searchButtonImage: {
        width: 24,
        height: 24,
    },
    settingsButtonImage: {
        width: 30,
        height: 30,
    },
    settingsButton: {
        position: 'absolute',
        top: 40,
        right: 10,
        backgroundColor: 'transparent',
        padding: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    filterOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    selectedFilterOption: {
        backgroundColor: 'lightblue',
    },
    filterOptionLabel: {
        marginLeft: 10,
    },
    closeButton: {
        backgroundColor: 'lightgray',
        padding: 10,
        alignSelf: 'flex-end',
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'black',
        fontWeight: 'bold',
    },
    recipeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 30,
    },
    recipeItem: {
        width: '44%', // 48
        marginBottom: 20,
        backgroundColor: '#E1755F',
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
    },
    recipeImage: {
        width: 120, //150
        height: 120, //150
        marginBottom: 10,
    },
    recipeTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 20,
        width: '100%',
    },

    button: {
        backgroundColor: '#FF9999',
        flex: 1,
        paddingVertical: 10,
        marginHorizontal: 19,
        borderRadius: 5,
    },

    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        width: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    filterOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkbox: {
        marginRight: 10,
    },
    filterOptionLabel: {
        fontSize: 16,
    },
    closeButton: {
        marginTop: 20,
        alignSelf: 'flex-end',
    },
    closeButtonText: {
        fontSize: 16,
        color: 'blue',
        fontWeight: 'bold',
    },
});

export default MyScreen;
