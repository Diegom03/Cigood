import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera } from 'expo-camera';


const MyCamera = () => {
  const [scannedBarcode, setScannedBarcode] = useState('');

  const handleBarcodeScan = ({ data }) => {
    setScannedBarcode(data);
  };

  const getCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      console.log('Se ha denegado el permiso para acceder a la cámara');
      return;
    }
    // Aquí puedes realizar las acciones necesarias una vez que se hayan concedido los permisos
  };

  useEffect(() => {
    // Realizar cualquier acción adicional con el código de barras escaneado
    console.log('Código de barras escaneado:', scannedBarcode);
  }, [scannedBarcode]);

  useEffect(() => {
    getCameraPermission();
  }, []);  

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        onBarCodeScanned={handleBarcodeScan}
      />
      <View style={styles.overlay}>
        <Text style={styles.overlayText}>Apunta la cámara hacia un código de barras</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 16,
    textAlign: 'center',
  },
});

export default MyCamera;
