import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MyScreen = () => {
    const navigation = useNavigation();
    const [isFilterModalVisible, setFilterModalVisible] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([]);

    const handleFilterButtonPress = () => {
        setFilterModalVisible(true);
    };

    const handleFilterModalClose = () => {
        setFilterModalVisible(false);
    };

    const handleFilterOptionPress = (filter) => {
        if (selectedFilters.includes(filter)) {
            setSelectedFilters(selectedFilters.filter((f) => f !== filter));
        } else {
            setSelectedFilters([...selectedFilters, filter]);
        }
    };

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
                <TouchableOpacity style={styles.searchButton} onPress={() => navigation.navigate('Prueba')}>
                    <Image source={require('../images/lupa.png')} style={styles.searchButtonImage} />
                </TouchableOpacity>
            </View>

            <Modal visible={isFilterModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Opciones de Filtro</Text>
                        <TouchableOpacity
                            style={[
                                styles.filterOption,
                                selectedFilters.includes('opcion1') && styles.selectedFilterOption,
                            ]}
                            onPress={() => handleFilterOptionPress('opcion1')}
                        >
                            <Text style={styles.filterOptionLabel}>Opción 1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.filterOption,
                                selectedFilters.includes('opcion2') && styles.selectedFilterOption,
                            ]}
                            onPress={() => handleFilterOptionPress('opcion2')}
                        >
                            <Text style={styles.filterOptionLabel}>Opción 2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.filterOption,
                                selectedFilters.includes('opcion3') && styles.selectedFilterOption,
                            ]}
                            onPress={() => handleFilterOptionPress('opcion3')}
                        >
                            <Text style={styles.filterOptionLabel}>Opción 3</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.filterOption,
                                selectedFilters.includes('opcion4') && styles.selectedFilterOption,
                            ]}
                            onPress={() => handleFilterOptionPress('opcion4')}
                        >
                            <Text style={styles.filterOptionLabel}>Opción 4</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeButton} onPress={handleFilterModalClose}>
                            <Text style={styles.closeButtonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Text style={styles.title2}>Recetas del dia</Text>
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
                <TouchableOpacity style={[styles.button]}onPress={() => navigation.navigate('ListaRecetas')}>
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
});

export default MyScreen;