import React, { useState, useRef } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

// Datos de ejemplo
const ingredientesDB = [
  'manzana',
  'mango',
  'mandarina',
  'melón',
  'plátano',
  'piña',
];

const BarraBusqueda = () => {
  const [texto, setTexto] = useState('');
  const [sugerencias, setSugerencias] = useState([]);
  const flatListRef = useRef(null);

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
    <TouchableWithoutFeedback onPress={handleBlur}>
      <View style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 100,
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
  },
  sugerenciaContainer: {
    backgroundColor: '#e5e5e5',
    padding: 8,
    marginBottom: 8,
    
  },
  sugerenciaTexto: {
    fontSize: 16,
  },
});

export default BarraBusqueda;
