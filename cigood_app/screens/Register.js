import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const navigation = useNavigation();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');

  const [usernameError, setUsernameError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');

  const handleRegister = () => {
    if (!username || !password || !email) {
      // Valida que los campos esten vacios
      setUsernameError('Debes completar este campo');
      setPasswordError('Debes completar este campo');
      setEmailError('Debes completar este campo');
      return;

    } else if (!username || !password) {
      setUsernameError('Debes completar este campo');
      setPasswordError('Debes completar este campo');
      return;
      
    } else if (!username || !email) {
      setUsernameError('Debes completar este campo');
      setEmailError('Debes completar este campo');
      return;

    } else if (!password || !email) {
      setPasswordError('Debes completar este campo');
      setEmailError('Debes completar este campo');
      return;

    } else if (!username) {
      setUsernameError('Debes completar este campo');
      return;

    } else if (!email) {
      setEmailError('Debes completar este campo');
      return;

    } else if (!password) {
      setPasswordError('Debes completar este campo');
      return;
    }

    // Aquí iría la lógica para registrar al usuario
    console.log(`Iniciando sesión con usuario: ${username}, contraseña: ${password} y email: ${email}`);
    navigation.navigate('Principal');
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

  const handleEmailChange = (text) => {
    setEmail(text);
    if (text.length < 6) {
      setEmailError('Email email debe tener al menos 6 caracteres');
    } else {
      setEmailError('');
    }
  };

  const inputBorderColor = (usernameError || passwordError || emailError) ? 'red' : 'black';

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
        placeholder="Correo electrónico"
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
      />
      {emailError ? (<Text style={styles.error}>{emailError}</Text>) : null}

      <TextInput
        style={[styles.input, { borderColor: inputBorderColor }]}
        placeholder="Contraseña"
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry={true}
      />
      {passwordError ? (<Text style={styles.error}>{passwordError}</Text>) : null}

      <TouchableOpacity
        style={[styles.button, { backgroundColor: usernameError || !!emailError || passwordError ? 'gray' : 'blue' },]}
        onPress={handleRegister}
        disabled={!!usernameError || !!emailError || !!passwordError}
      >
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      <Text style={styles.text}>¿Ya tienes una cuenta?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Inicia sesión aquí</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  image: {
    height: 130,
    width: 350,
    marginBottom: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    width: '100%',
    marginBottom: 40,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginText: {
    color: '#007AFF',
    fontSize: 16,
  },
  text: {
    marginVertical: 10,
  },
});

export default Register;
