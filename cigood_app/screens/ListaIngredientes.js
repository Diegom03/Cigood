import React, { useState, useEffect } from 'react';
import { getIngredientes } from '../conection';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function ListaIngredientes() {
    const [ingredientes, setIngredientes] = useState([]);
    const [selectedIngredientes, setSelectedIngredientes] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchIngredientes = async () => {
            try {
                const ingredientesData = await getIngredientes();
                setIngredientes(ingredientesData);
            } catch (error) {
                console.error('Error al obtener los ingredientes:', error);
            }
        };

        fetchIngredientes();
    }, []);

    const handleEliminar = () => {
        if (selectedIngredientes.length === 0) {
            return;
        }

        setShowConfirmation(true);
    };

    const handleConfirmationResponse = (response) => {
        if (response === 'yes') {
            // Eliminar ingredientes seleccionados
            setIngredientes((prevIngredientes) =>
                prevIngredientes.filter((ingrediente) => !selectedIngredientes.includes(ingrediente))
            );
            setSelectedIngredientes([]);
        }

        setShowConfirmation(false);
    };

    const handleIngredientePress = (id) => {
        let updatedSelectedIngredientes;
        if (selectedIngredientes.includes(id)) {
            // Desseleccionar ingrediente
            updatedSelectedIngredientes = selectedIngredientes.filter((selectedId) => selectedId !== id);
        } else {
            // Seleccionar ingrediente
            updatedSelectedIngredientes = [...selectedIngredientes, id];
        }

        setSelectedIngredientes(updatedSelectedIngredientes);
    };

    const renderIngrediente = ({ item }) => {
        const isSelected = selectedIngredientes.includes(item.id);

        return (
            <TouchableOpacity
                style={[styles.ingredienteContainer, isSelected && styles.selectedIngrediente]}
                onPress={() => handleIngredientePress(item.id)}
            >
                <Text style={styles.ingredienteNombre}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ingredientes</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar ingredientes"
                />
            </View>
            <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Ajustes')}>
                <Image source={require('../images/ajustes.png')} style={styles.settingsButtonImage} />
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleEliminar}>
                    <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Vaciar lista</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={ingredientes}
                renderItem={renderIngrediente}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                contentContainerStyle={styles.listContent}
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
                            style={styles.confirmationButton} onPress={() => handleConfirmationResponse('no')}
                        >
                            <Text style={styles.confirmationButtonText}>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            <View style={styles.whiteBar}>
                {/* Agregar el botón "Buscar recetas" dentro de la franja blanca */}
                <TouchableOpacity style={styles.buscarRecetasButton}>
                    <Text style={styles.buscarRecetasButtonText}>Buscar recetas</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 10,
    },
    title: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        zIndex: 2,
        paddingTop: 60,
        paddingBottom: 140,
    },
    searchContainer: {
        position: 'absolute',
        top: 150,
        left: 10,
        right: 10,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        zIndex: 1,
        borderWidth: 1,
        borderColor: 'black',
        marginHorizontal: 20,
        zIndex: 2,

    },
    searchInput: {
        fontSize: 16,

    },
    settingsButton: {
        position: 'absolute',
        top: 40,
        right: 10,
        backgroundColor: 'transparent',
        padding: 10,
        zIndex: 2,
    },
    settingsButtonImage: {
        width: 30,
        height: 30,
    },
    buttonContainer: {
        position: 'absolute',
        top: 200,
        left: 10,
        right: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 2,
        marginHorizontal: 20,
    },
    button: {
        backgroundColor: '#DDDDDD',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    listContent: {
        paddingHorizontal: 10,
        paddingTop: 260,
        marginHorizontal: 10, // Ajusta el valor según sea necesario para evitar solapamiento con el título y los botones
        paddingBottom:90,
    },
    ingredienteContainer: {
        width: '45%',
        padding: 10,
        backgroundColor: '#F2F2F2',
        marginBottom: 10,
        borderRadius: 5,
        marginHorizontal: 5,
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
    buscarRecetasButton: {
        backgroundColor: '#FF9999',
        paddingVertical: 10,
        paddingHorizontal: 100,
        borderRadius: 5,
        marginBottom:10,
    },
    buscarRecetasButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',

    },
});

export default ListaIngredientes;