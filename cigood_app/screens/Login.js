import React, { useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const loginUser = await AsyncStorage.getItem('esta_logueado');
        if (loginUser === 'true') {
          navigation.navigate('Principal');
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkSession();
  }, []);

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [usernameError, setUsernameError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      // Si el usuario o la contraseña están vacíos, muestra un error
      setUsernameError('Debes completar este campo');
      setPasswordError('Debes completar este campo');
      return;

    } else if (!username) {
      setUsernameError('Debes completar este campo');
      return;

    } else if (!password) {
      setPasswordError('Debes completar este campo');
      return;
    }

    try {
      await AsyncStorage.setItem('esta_logueado', 'true');
    } catch (error) {
      console.log(error);
    }

    console.log(`Iniciando sesión con usuario: ${username} y contraseña: ${password}`);
    navigation.navigate('Principal');
    // Aquí ira la validacion a la BD
  };

  // Link a al pestaña registros
  const handleRegisterLink = () => {
    navigation.navigate('Register');
  };

  // Valida el usario y la contraseña a tiempo real
  const handleUsernameChange = (text) => {
    setUsername(text);
    if (text.length < 6) {
      setUsernameError('El usuario debe tener al menos 6 caracteres');
    } else {
      setUsernameError('');
    }
  };
  
  const handlePasswordChange = (text) => {
    setPassword(text);
    if (text.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres');
    } else {
      setPasswordError('');
    }
  };
  

  const inputBorderColor = (usernameError || passwordError) ? 'red' : 'black';

  return (
    <View style={styles.container}>
      <Image source={require('./../images/logotipo-short.png')} style={styles.image}/>

      <TextInput
        style={[styles.input, { borderColor: inputBorderColor }]}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={handleUsernameChange}
      />
      {usernameError ? (<Text style={styles.error}>{usernameError}</Text>) : null}

      <TextInput
        style={[styles.input, { borderColor: inputBorderColor }]}
        placeholder="Contraseña"
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry={true}
      />
      {passwordError ? (<Text style={styles.error}>{passwordError}</Text>) : null}
      
      <TouchableOpacity
        style={[styles.button, { backgroundColor: usernameError || passwordError ? 'gray' : 'blue' },]}
        onPress={handleLogin}
        disabled={!!usernameError || !!passwordError}
      >
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
      
      <Text style={styles.text}>¿Aún no estás registrado?</Text>
      <TouchableOpacity onPress={handleRegisterLink}>
        <Text style={styles.link}>Regístrate aquí</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  image: {
    height: 130,
    width: 350,
    marginBottom: 50,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
    borderColor: 'gray',
  },
  button: {
    width: '80%',
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    marginTop: 20,
  },
  link: {
    color: '#2196F3',
    textDecorationLine: 'underline',
  },
  error: {
    color: 'red',
    marginBottom: 20,
  }
});

export default Login;
