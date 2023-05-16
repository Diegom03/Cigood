import React, { useState, useEffect, useRef } from 'react';
import { getIngredientes } from '../conection';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Alert, TextInput, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function ListaIngredientes() {
    const [ingredientes, setIngredientes] = useState([]);
    const [selectedIngredientes, setSelectedIngredientes] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigation = useNavigation();
    const [texto, setTexto] = useState('');
    const [sugerencias, setSugerencias] = useState([]);
    const flatListRef = useRef(null);

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

    // Datos de ejemplo
    const ingredientesDB = [
        'manzana',
        'mango',
        'mandarina',
        'melón',
        'plátano',
        'piña',
    ];

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
    const handleChange = (nuevoTexto) => {
        setTexto(nuevoTexto);

        // Obtener sugerencias basadas en el texto introducido
        const nuevasSugerencias = ingredientesDB.filter((ingrediente) =>
            ingrediente.toLowerCase().startsWith(nuevoTexto.toLowerCase())
        );

        setSugerencias(nuevasSugerencias);
    };

    const handleBlur = () => {
        setSugerencias([]);
    };

    const renderSugerencia = ({ item }) => (
        <View style={styles.sugerenciaContainer}>
            <Text style={styles.sugerenciaTexto}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
        </View>
    );
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ingredientes</Text>
            <TouchableWithoutFeedback onPress={handleBlur}>
                <View style={styles.inputContainer} >
                    <TextInput
                        style={styles.input}
                        value={texto}
                        onChangeText={handleChange}
                        placeholder="Buscar ingredientes..."
                        onFocus={() => setSugerencias([])}
                    />
                    <FlatList
                        ref={flatListRef}
                        data={sugerencias}
                        renderItem={renderSugerencia}
                        keyExtractor={(item) => item}
                        contentContainerStyle={styles.sugerenciasContainer}
                    />
                </View>
            </TouchableWithoutFeedback>
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
    inputContainer: {
        zIndex: 3,
        marginTop: 130,
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 16,
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
        paddingTop: 140,
        marginHorizontal: 10, // Ajusta el valor según sea necesario para evitar solapamiento con el título y los botones
        paddingBottom: 90,
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
        marginBottom: 10,
    },
    buscarRecetasButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',

    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 16,
    },
    sugerenciasContainer: {
        width: '100%',
        alignItems: 'stretch',
        zIndex: 3,
    },
    sugerenciaContainer: {
        backgroundColor: '#e5e5e5',
        padding: 8,
        marginBottom: 8,
        width: 1000,
    },
    sugerenciaTexto: {
        fontSize: 16,
        zIndex: 4,
    },
});

export default ListaIngredientes;