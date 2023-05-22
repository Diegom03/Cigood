import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, Image, TouchableOpacity  } from 'react-native';
import { Camera } from 'expo-camera';

const MyCamera = () => {
  const [scannedBarcode, setScannedBarcode] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [scannedProduct, setScannedProduct] = useState(null);

  const handleBarcodeScan = ({ data }) => {
    // Establece los datos que vienen al escanear
    setScannedBarcode(data);

    // Busca el producto al que corresponde el código de barras
    fetch(`https://world.openfoodfacts.org/api/v0/product/${data}.json`)
      .then(response => response.json())
      .then(data => {
        if (data.status === 1) {
          setScannedProduct(data.product);
        }
      })
      .catch(error => console.error(error));

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
    setScannedProduct(null);
  };

  const handleAddProduct = () => {
    console.log('Agregar producto');
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} onBarCodeScanned={handleBarcodeScan} />
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
            {scannedProduct && (
              <React.Fragment>
                {scannedProduct.image_url && (
                  <Image source={{ uri: scannedProduct.image_url }} style={styles.productImage} />
                )}
                <Text style={styles.popupText}>¿Quieres añadir {scannedProduct.product_name} ?</Text>
              </React.Fragment>
            )}
            <View style={styles.buttonGroupContainer}>
              <TouchableOpacity
                style={[styles.buttonContainer, styles.buttonYes]}
                onPress={handleAddProduct}
              >
                <Text style={styles.buttonText}>Sí</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonContainer, styles.buttonNo]}
                onPress={closePopup}
              >
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
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
    borderRadius: 50,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
    height: 300,
  },
  popupText: {
    fontSize: 14,
    marginBottom: 20,
    //fontFamily: 'Arial', // Cambia la fuente a Arial
    textAlign: 'center', // Centra el texto horizontalmente
  },
  productImage: {
    width: 140,
    height: 140,
    marginBottom: 20,
    alignSelf: 'center', // Alinea la imagen al centro horizontalmente
  },
  buttonGroupContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonContainer: {
    width: 80,
    borderRadius: 20,
    overflow: 'hidden',
  },
  buttonYes: {
    backgroundColor: '#52BB32',
  },
  buttonNo: {
    backgroundColor: '#E12626',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    paddingVertical: 6,
    fontSize: 18,
  },
});

export default MyCamera;
