import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const MyScreen = () => {
    const [recipes, setRecipes] = useState([]);

    const getRecipes = () => {
        const tabla = "recetas";
        const id = "{}";
        
        fetch(`http://192.168.1.139:3000/api/data/${tabla}/${id}`)
            .then(response => response.json())
            .then(data => setRecipes(data))
            .catch(error => console.error(error));
    };

    return (
        <View style={styles.container}>
            <Button onPress={getRecipes} title='Mis recetas' />
            {recipes.map(recipe => (
                <View key={recipe._id}>
                    <Text>{recipe._descripcion}</Text>
                </View>
            ))}
        </View>
    );
};

export default MyScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 50,
    },
});