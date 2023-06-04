import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const RecipeTemplate = ({ route }) => {
  const { receta } = route.params;
  const [pasosCompletados, setPasosCompletados] = useState([]);

  const handlePasoPress = (index) => {
    const nuevosCompletados = [...pasosCompletados];
    if (nuevosCompletados.includes(index)) {
      // Si el paso ya estaba marcado como completado, lo desmarca
      nuevosCompletados.splice(nuevosCompletados.indexOf(index), 1);
    } else {
      // Si el paso no estaba marcado como completado, lo marca
      nuevosCompletados.push(index);
    }
    setPasosCompletados(nuevosCompletados);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: receta._img }} style={styles.image} resizeMode="cover" />
      <Text style={styles.recipeTitle}>{receta._descripcion}</Text>
      <Text style={styles.preparationTime}>Tiempo de preparación: {receta._tiempo}</Text>
      <View style={styles.ingredientsContainer}>
        <Text style={styles.sectionTitle}>Ingredientes:</Text>
        {/* Agrega los ingredientes según corresponda */}
      </View>
      <View style={styles.stepsContainer}>
        <Text style={styles.sectionTitle}>Pasos:</Text>
        {receta._pasos.map((paso, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.stepItem,
              pasosCompletados.includes(index) && styles.stepItemCompleted,
            ]}
            onPress={() => handlePasoPress(index)}
          >
            <View style={styles.stepIndicator} />
            <Text
              style={[
                styles.stepText,
                pasosCompletados.includes(index) && styles.stepTextCompleted,
              ]}
            >
              {`${paso}`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.finishButton} onPress={() => console.log('Terminar')}>
        <Text style={styles.finishButtonText}>Terminar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
    marginTop:20,
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  preparationTime: {
    fontSize: 16,
    marginBottom: 16,
  },
  ingredientsContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  stepsContainer: {
    marginBottom: 16,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepItemCompleted: {
    backgroundColor: '#E6E6E6',
    borderRadius: 4,
  },
  stepIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
    backgroundColor: '#FF9999',
  },
  stepText: {
    flex: 1,
    fontSize: 16,
  },
  stepTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#888888',
  },
  finishButton: {
    backgroundColor: '#FF9999',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderRadius: 8,
  },
  finishButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default RecipeTemplate;
