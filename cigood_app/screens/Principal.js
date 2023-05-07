import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MyScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Ajustes')}>
                <Image source={require('../images/ajustes.png')} style={styles.settingsButtonImage} />
            </TouchableOpacity>
            <Text style={styles.title}>Cigood</Text>
            <View style={styles.searchContainer}>
                <TextInput style={styles.searchInput} placeholder="Buscar" >
                </TextInput>
                <TouchableOpacity style={styles.filterButton}>
                    <Image source={require('../images/filtrar.png')} style={styles.searchButtonImage} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.searchButton}>
                    <Image source={require('../images/lupa.png')} style={styles.searchButtonImage} />
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
        padding: 10
    }
});

export default MyScreen;
