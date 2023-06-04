import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cuenta = () => {
  const [expandedSections, setExpandedSections] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await AsyncStorage.getItem('usuario_activo');
        console.log(userData);
        if (userData !== null) {
          const { name, pass, email } = JSON.parse(userData);
          setUsername(name);
          setEmail(pass);
          setPassword(email);
        }
      } catch (error) {
        console.error('Error al obtener los datos del AsyncStorage:', error);
      }
    }

    fetchUserData();
  }, []);

  const toggleSectionExpansion = (index) => {
    let newExpandedSections = [...expandedSections];
    if (newExpandedSections.includes(index)) {
      newExpandedSections = newExpandedSections.filter((i) => i !== index);
    } else {
      newExpandedSections.push(index);
    }
    setExpandedSections(newExpandedSections);
  };

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer1}>
        <Text style={styles.title}>Cuenta</Text>
      </View>

      <ScrollView style={styles.subcontainer2}>
        <View style={styles.contentContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Trofeos</Text>
            <View style={styles.iconContainer}>
              {/* Iconos de trofeos */}
              {/* Aquí puedes agregar tus propios componentes de iconos */}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nombre de usuario</Text>
            <View style={styles.subSection}>
              <Text style={styles.sectionContent}>{username}</Text>
              <Text style={styles.sectionSubtitle}>Cambia tu nombre de usuario</Text>
              <Entypo
                name={expandedSections.includes(0) ? 'chevron-down' : 'chevron-right'}
                size={30}
                color="black"
                style={styles.expandButton}
                onPress={() => toggleSectionExpansion(0)}
              />

              {expandedSections.includes(0) && (
                <View style={styles.expandedContent}>
                  <TextInput style={styles.input} placeholder="Nuevo nombre de usuario" />
                  <TextInput style={styles.input} placeholder="Repetir" />
                  <TouchableOpacity style={styles.confirmButton}>
                    <Text style={styles.confirmButtonText}>Confirmar</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Email</Text>
            <View style={styles.subSection}>
              <Text style={styles.sectionContent}>{email}</Text>
              <Text style={styles.sectionSubtitle}>Cambia tu email</Text>
              <Entypo
                name={expandedSections.includes(1) ? 'chevron-down' : 'chevron-right'}
                size={30}
                color="black"
                style={styles.expandButton}
                onPress={() => toggleSectionExpansion(1)}
              />

              {expandedSections.includes(1) && (
                <View style={styles.expandedContent}>
                  <TextInput style={styles.input} placeholder="Nuevo email" />
                  <TextInput style={styles.input} placeholder="Repetir" />
                  <TouchableOpacity style={styles.confirmButton}>
                    <Text style={styles.confirmButtonText}>Confirmar</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contraseña</Text>
            <View style={styles.subSection}>
              <Text style={styles.sectionContent}>*********</Text>
              <Text style={styles.sectionSubtitle}>Cambia tu contraseña</Text>
              <Entypo
                name={expandedSections.includes(2) ? 'chevron-down' : 'chevron-right'}
                size={30}
                color="black"
                style={styles.expandButton}
                onPress={() => toggleSectionExpansion(2)}
              />

              {expandedSections.includes(2) && (
                <View style={styles.expandedContent}>
                  <TextInput style={styles.input} placeholder="Nueva contraseña" />
                  <TextInput style={styles.input} placeholder="Repetir" />
                  <TouchableOpacity style={styles.confirmButton}>
                    <Text style={styles.confirmButtonText}>Confirmar</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // CONTENEDOR PRINCIPAL
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
  },

  // CONTENEDOR SECUNDARIO 1
  subcontainer1: {
    height: '25%',
    width: '100%',
    backgroundColor: '#E12626',
    alignItems: 'center',
  },

  // TITULO
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20,
    color: 'white',
  },

  // CONTENEDOR SECUNDARIO 2
  subcontainer2: {
    height: '75%',
    width: '100%',
    backgroundColor: '#E6E6E6',
  },

  // CONTENEDOR SECUNDARIO
  contentContainer: {
    backgroundColor: '#E6E6E6',
    borderRadius: 8,
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
  section: {
    marginBottom: 10,
    padding: 10,
    //paddingTop: 0,
    width: '90%',
  },
  subSection: {
    width: '100%',
    backgroundColor: 'white',
    padding: 5,
    paddingLeft: 10,
    borderRadius: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 5,
    color: '#0A2C62',
  },
  sectionContent: {
    fontSize: 17,
    marginBottom: 5,
    fontWeight: '800',
    color: '#0A2C62',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#666666',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    right: 15,
    top: '35%',
  },
  expandButton: {
    alignSelf: 'flex-end',
  },

  // CONTENIDO EXPANSIÓN
  expandedContent: {
    marginTop: 10,
  },
  input: {
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#E6E6E6',
  },
  confirmButton: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'center',
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#52BB32',
  },
});

export default Cuenta;
