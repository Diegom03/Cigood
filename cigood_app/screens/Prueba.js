import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MyScreen = () => {
    const navigation = useNavigation();
    const [recipes, setRecipes] = useState([]);

    const getRecipes = () => {
        const tabla = "recetas";
        const id = "644ab1bebb62c636801a0d94";

        //ETSO OBTIENE TODAS LAS RECETAS
        // fetch(`http://192.168.1.139:3000/api/data/${tabla}/${id}`)
        //     .then(response => response.json())
        //     .then(data => setRecipes(data))
        //     .catch(error => console.error(error));

        //ESTO VACIA LA DESPENSA
        fetch(`http://192.168.1.139:3000/api/despensa/${id}`)
            .then(response => response.json())
            .then(data => setRecipes(data))
            .catch(error => console.error(error));

        //ESTO PILLA LA IA

        // fetch('https://world.openfoodfacts.org/api/v0/product/8412833203800.json')
        //     .then(response => response.json())
        //     .then(data => console.log(data))
        //     .catch(error => console.error(error));
    };

    return (
        <View style={styles.container}>
            <Button onPress={getRecipes} title='Mis recetas' />
            {recipes.map(recipe => (
                <View key={recipe._id}>
                    <Text>{recipe._descripcion}</Text>
                </View>
            ))}
            <Button onPress={getCamara} title='Mi camara' />
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