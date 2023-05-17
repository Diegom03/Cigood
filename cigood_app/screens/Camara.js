import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, Button } from 'react-native';
import { Camera } from 'expo-camera';

const MyCamera = () => {
  const [scannedBarcode, setScannedBarcode] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleBarcodeScan = ({ data }) => {
    setScannedBarcode(data);
    setShowPopup(true);
  };

  const getCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      console.log('Se ha denegado el permiso para acceder a la cámara');
      return;
    }
  };

  useEffect(() => {
    getCameraPermission();
  }, []);

  const closePopup = () => {
    setShowPopup(false);
    setScannedBarcode('');
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        onBarCodeScanned={handleBarcodeScan}
      />
      <View style={styles.overlay}>
        <View style={styles.rectangleContainer}>
          <View style={styles.rectangle} />
        </View>
        <Text style={styles.overlayText}>Enfoca el código de barras</Text>
      </View>
      <Modal
        visible={showPopup}
        animationType="fade"
        transparent={true}
        onRequestClose={closePopup}
      >
        <View style={styles.popupContainer}>
          <View style={styles.popupContent}>
            <Text style={styles.popupText}>
              El código de barras que has escaneado es: {scannedBarcode}
            </Text>
            <Button title="Cerrar" onPress={closePopup} color="red" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rectangleContainer: {
    width: 250,
    height: 130,
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rectangle: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderColor: 'white',
  },
  overlayText: {
    fontSize: 16,
    color: 'white',
  },
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  popupText: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default MyCamera;
