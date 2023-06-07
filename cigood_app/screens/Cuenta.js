import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cuenta = () => {
  const [expandedSections, setExpandedSections] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordRepeat, setNewPasswordRepeat] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // ONLOAD
  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await AsyncStorage.getItem('usuario_activo');
        console.log(userData);
        if (userData !== null) {
          const parsedData = JSON.parse(userData);
          const name = parsedData[0].name;
          const pass = parsedData[0].pass;
          const email = parsedData[0].email;
          setUsername(name);
          setEmail(email);
          setPassword(pass);
        }
      } catch (error) {
        console.error('Error al obtener los datos del AsyncStorage:', error);
      }
    }

    fetchUserData();
  }, []);

  // EXTENSIBLE
  const toggleSectionExpansion = (index) => {
    let newExpandedSections = [...expandedSections];
    if (newExpandedSections.includes(index)) {
      newExpandedSections = newExpandedSections.filter((i) => i !== index);
    } else {
      newExpandedSections.push(index);
    }
    setExpandedSections(newExpandedSections);
  };

  const validateUsername = () => {
    if (newUsername === username) {
      setUsernameError('El nuevo nombre de usuario es igual al actual');
    } else {
      setUsernameError('');
    }
  };

  const validateEmail = () => {
    if (newEmail === email) {
      setEmailError('El nuevo email es igual al actual');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    if (newPassword === password) {
      setPasswordError('La nueva contraseña es igual a la actual');
    } else if (newPassword !== newPasswordRepeat) {
      setPasswordError('Las contraseñas no coinciden');
    } else if (newPassword.length < 6 && newPassword.length != 0) {
      setPasswordError('La contraseña debe contener 6 caracteres');
    } else {
      setPasswordError('');
    }
  };

  const handleNewUsaername = () => {
    setUsername(newUsername);
  }

  const handleNewEmail = () => {
    setEmail(newEmail);
  }

  const handleNewPassword = () => {
    setPassword(newPassword);
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../images/usuario2.png')} // Ruta de tu imagen
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.subcontainer1}>
        <Text style={styles.title}>Cuenta</Text>
      </View>

      <ScrollView style={styles.subcontainer2}>
        <View style={styles.contentContainer}>

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
                  <TextInput
                    style={styles.input}
                    placeholder="Nuevo nombre de usuario"
                    onChangeText={(text) => setNewUsername(text)}
                    onBlur={validateUsername}
                  />
                  {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}
                  <TouchableOpacity style={styles.confirmButton} onPress={handleNewUsaername}>
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
                  <TextInput
                    style={styles.input}
                    placeholder="Nuevo email"
                    onChangeText={(text) => setNewEmail(text)}
                    onBlur={validateEmail}
                  />
                  {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                  <TouchableOpacity style={styles.confirmButton} onPress={handleNewEmail}>
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
                  <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Nueva contraseña"
                    onChangeText={(text) => setNewPassword(text)}
                    onBlur={validatePassword}
                  />
                  <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Repetir contraseña"
                    onChangeText={(text) => setNewPasswordRepeat(text)}
                    onBlur={validatePassword}
                  />
                  {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                  <TouchableOpacity style={styles.confirmButton} onPress={handleNewPassword}>
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
    backgroundColor: '#EAE6DC',
  },

  // CONTENEDOR SECUNDARIO 1

  // TITULO
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom:10,
  },

  // CONTENEDOR SECUNDARIO 2
  subcontainer2: {
    height: '75%',
    width: '100%',

  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  image: {
    width: 70, // Ancho de la imagen
    height: 70, // Alto de la imagen
  },

  // CONTENEDOR SECUNDARIO
  contentContainer: {
    backgroundColor: '#EAE6DC',
    borderRadius: 8,
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
  errorText: {
    fontSize: 14,
    color: 'red',
    marginBottom: 10,
  },

  //HEADER
  header: {
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#E1755F',
    opacity: 0.6,
    height: 120,
    width: '100%',
    alignItems: 'center',
  },
  headerImage: {
    width: 250,
    height: 70,
    marginTop: 35,
    position: 'absolute',
    zIndex: 2,
  },
});

export default Cuenta;
