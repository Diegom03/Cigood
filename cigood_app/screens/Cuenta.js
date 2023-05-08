import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ImageBackground } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Cuenta = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  
  const openPopup = (title) => {
    setPopupTitle(title);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <ImageBackground style={styles.container} source={require('../images/fondo-cuenta.jpg')}>
      <Text style={styles.title}>Cuenta</Text>
      <View style={styles.contentContainer}>
        <TouchableOpacity style={styles.section} onPress={() => openPopup('Trofeos')}>
          <Text style={styles.sectionTitle}>Trofeos</Text>
          <View style={styles.iconContainer}>
            {/* Iconos de trofeos */}
            {/* Aquí puedes agregar tus propios componentes de iconos */}
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.section} onPress={() => openPopup('Nombre de usuario')}>
          <Text style={styles.sectionTitle}>Nombre de usuario</Text>
          <Text style={styles.sectionContent}>Pepe Lolez</Text>
          <Text style={styles.sectionSubtitle}>Cambia tu nombre de usuario</Text>
          <View style={styles.iconContainer}>
            <AntDesign name="arrowright" size={18} color="#666666" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.section} onPress={() => openPopup('Email')}>
          <Text style={styles.sectionTitle}>Email</Text>
          <Text style={styles.sectionContent}>pepelolez@gmail.com</Text>
          <Text style={styles.sectionSubtitle}>Cambia tu email</Text>
          <View style={styles.iconContainer}>
            <AntDesign name="arrowright" size={18} color="#666666" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.section} onPress={() => openPopup('Contraseña')}>
          <Text style={styles.sectionTitle}>Contraseña</Text>
          <Text style={styles.sectionContent}>password123</Text>
          <Text style={styles.sectionSubtitle}>Cambia tu contraseña</Text>
          <View style={styles.iconContainer}>
            <AntDesign name="arrowright" size={18} color="#666666" />
          </View>
        </TouchableOpacity>
      </View>

      <Modal visible={popupVisible} animationType="fade" transparent={true}>
        <View style={styles.popupContainer}>
          <Text style={styles.popupTitle}>{popupTitle}</Text>
          <Text style={styles.popupText}>Lorem Ipsum</Text>
          <TouchableOpacity style={styles.closeButton} onPress={closePopup}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ImageBackground>
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
        fontSize: 34,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 20,
        color: 'white'
    },
    contentContainer: {
      backgroundColor: '#F2F2F2',
      borderRadius: 8,
      padding: 20,
      marginTop: 170
    },
    section: {
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#CCCCCC',
      borderRadius: 8,
      padding: 10,
      marginHorizontal: 50,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    sectionContent: {
      fontSize: 14,
      marginBottom: 5,
    },
    sectionSubtitle: {
      fontSize: 12,
      color: '#666666',
    },
    iconContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    popupContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    popupTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#FFFFFF',
    },
    popupText: {
      fontSize: 16,
      marginBottom: 20,
      color: '#FFFFFF',
    },
    closeButton: {
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 8,
    },
    closeButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  
export default Cuenta;
