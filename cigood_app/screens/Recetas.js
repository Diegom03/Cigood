import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CheckBox from 'expo-checkbox';
import { getFiltros, getRecetas } from '../Onload';
import { IP_GENERAL } from '../constants';

const Recetas = () => {
    const navigation = useNavigation();
    const [isFilterModalVisible, setFilterModalVisible] = useState(false);
    const [filtrosBD, setfiltrosBD] = useState([]);
    const [filtrosBusqueda, setFiltrosBusqueda] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [selectedFilterTitle, setSelectedFilterTitle] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const handleFilterTitlePress = (title) => {
        setSelectedFilterTitle(title);
    };

    const getFiltersByTitle = (title) => {
        const titleIndex = filterTitles.findIndex((filterTitle) => filterTitle === title);
        const start = titleIndex * 3;
        const end = start + 3;
        return filtrosBD.slice(start, end);
    };



    useEffect(() => {
        const fetchData = async () => {
            try {
                const filtros = await getFiltros();
                const recetas = await getRecetas();
                setFiltrosBusqueda([]);
                setfiltrosBD(filtros);
                setRecipes(recetas);
                setIsLoading(false);
            } catch (error) {
                console.error('Error al obtener los filtros o las recetas:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const filterTitles = [
        'Tipo de comida',
        'Dificultad',
        'Etiquetas dietéticas',
        'Tiempo de preparación',
    ];

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
        setRecipes([]);
        setIsLoading(true);
        // Obtener los nombres de los filtros seleccionados en forma de array
        const filters = filtrosBusqueda.map(filter => filter._nombre);

        // Realizar la búsqueda de recetas utilizando los filtros seleccionados
        //console.log('filtros busqueda: ' + JSON.stringify(filters));
        if (filters.length > 0) {
            fetchRecipes(filters);
        } else {
            const conseguirDefault = async () => {
                try {
                    const recetas = await getRecetas();
                    setRecipes(recetas);
                    setIsLoading(false);
                } catch (error) {
                    console.error('Error al obtener los filtros o las recetas:', error);
                    setIsLoading(false);
                }
            };

            conseguirDefault();
        }

    };

    const abrirReceta = (id) => {
        // Obtiene la receta cuyo id esta guardado
        //const datosReceta = recetas.map(objeto => objeto._nombre == id);
        const datosReceta = id;
        console.log('Abriendo: ' + JSON.stringify(datosReceta));

        // Abre la nueva vista con los datos
        navigation.navigate('PlantillaReceta_Sub', { receta: datosReceta });
    };
    const fetchRecipes = async (filtros) => {
        const tabla = "recetas";
        const encodedFilters = filtros.map(filter => encodeURIComponent(filter));
        const filtro = encodedFilters.join(",");
        const url = `http://` + IP_GENERAL + `:3000/api/filters/${tabla}/${filtro}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            // Ordenar las recetas según los filtros coincidentes
            const sortedRecipes = sortRecipesByFilters(data, filtros);
            console.log("coño" + sortedRecipes);
            setRecipes(sortedRecipes);
            setIsLoading(false);
            return sortedRecipes;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    // Función para ordenar las recetas según los filtros coincidentes
    const sortRecipesByFilters = (recipes, filters) => {
        return recipes.sort((a, b) => {
            // Contar el número de filtros coincidentes para cada receta
            const aMatchCount = countMatchingFilters(a._filtros, filters);
            const bMatchCount = countMatchingFilters(b._filtros, filters);

            if (aMatchCount > bMatchCount) {
                return -1; // a tiene más filtros coincidentes, se coloca antes
            } else if (aMatchCount < bMatchCount) {
                return 1; // b tiene más filtros coincidentes, se coloca antes
            } else {
                return 0; // a y b tienen el mismo número de filtros coincidentes, el orden se mantiene
            }
        });
    }

    // Función para contar el número de filtros coincidentes entre los filtros de la receta y los filtros seleccionados
    const countMatchingFilters = (recipeFilters, selectedFilters) => {
        let count = 0;
        for (const filter of selectedFilters) {
            if (recipeFilters.includes(filter)) {
                count++;
            }
        }
        return count;
    }



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recetas</Text>
            <View style={styles.searchContainer}>
                <TextInput style={styles.searchInput} placeholder="Buscar" onSubmitEditing={handleRecipeSearch} />
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
                        {filterTitles.map((title) => (
                            <View key={title}>
                                <TouchableOpacity
                                    style={styles.filterTitleContainer}
                                    onPress={() => handleFilterTitlePress(title)}
                                >
                                    <Text style={styles.filterTitle}>{title}</Text>
                                </TouchableOpacity>
                                {selectedFilterTitle === title && (
                                    <View style={styles.filterOptionsContainer}>
                                        {getFiltersByTitle(title).map((filter) => (
                                            <TouchableOpacity
                                                key={filter._id}
                                                style={styles.filterOption}
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
                                    </View>
                                )}
                            </View>
                        ))}
                        <TouchableOpacity style={styles.closeButton} onPress={handleFilterModalClose}>
                            <Text style={styles.closeButtonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View>
                {isLoading ? ( // Mostrar mensaje de carga si isLoading es true
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#FF5555" />
                        <Text style={styles.loadingText}>Cargando recetas...</Text>
                    </View>
                ) : (
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        {recipes.map((receta) => (
                            <TouchableOpacity key={receta._id} style={styles.recetaContainer} onPress={() => abrirReceta(receta)}>
                                <Image source={{ uri: receta._img }} style={styles.image} />
                                <View style={styles.textContainer}>
                                    <Text style={styles.name}>{receta._descripcion}</Text>
                                    <Text style={styles.description}>{receta._tiempo}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 50,
        backgroundColor: '#EAE6DC',
    },

    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 25,
        marginTop: 90,
        marginBottom: 20,
    },
    filterTitleContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
        paddingBottom: 10,
    },

    filterTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    filterOptionsContainer: {
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
    filterTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 20,
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
    title: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
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
        backgroundColor:'#F2EFE9'
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Recetas;
