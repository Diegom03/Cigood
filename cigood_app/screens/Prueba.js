import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { findDocuments } from './db.js';

const MyScreen = () => {
    const navigation = useNavigation();

    const getRecipes = () => {
        const recetas = findDocuments("recetas", {});
    };

    return (
        <View style={styles.container}>
            <Button onPress={getRecipes}
                title='Mis recetas'>
            </Button>
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
});

export default MyScreen;