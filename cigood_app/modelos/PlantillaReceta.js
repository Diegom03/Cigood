import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const RecipeTemplate = ({route}) => {
  const { receta } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../images/receta1.jpg')}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.recipeTitle}>{receta._descripcion}</Text>
      <View style={styles.ingredientsContainer}>
        <Text style={styles.sectionTitle}>Ingredientes:</Text>
        <Text style={styles.ingredientsText}>- Ingrediente 1</Text>
        <Text style={styles.ingredientsText}>- Ingrediente 2</Text>
        <Text style={styles.ingredientsText}>- Ingrediente 3</Text>
        {/* Agrega más ingredientes si es necesario */}
      </View>
      <View style={styles.stepsContainer}>
        <Text style={styles.sectionTitle}>Pasos:</Text>
        <Text style={styles.stepsText}>
          1. Paso 1: Descripción del paso 1
        </Text>
        <Text style={styles.stepsText}>
          2. Paso 2: Descripción del paso 2
        </Text>
        <Text style={styles.stepsText}>
          3. Paso 3: Descripción del paso 3
        </Text>
        {/* Agrega más pasos si es necesario */}
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
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  ingredientsContainer: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ingredientsText: {
    fontSize: 16,
    marginBottom: 4,
  },
  stepsContainer: {
    marginTop: 16,
  },
  stepsText: {
    fontSize: 16,
    marginBottom: 4,
  },
  finishButton: {
    backgroundColor: '#FF9999',
    marginTop: 16,
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
