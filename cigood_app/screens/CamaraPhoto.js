import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Modal, Image } from 'react-native';
import { Camera } from 'expo-camera';

const CameraPhoto = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photoTaken, setPhotoTaken] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      setPhotoTaken(photo);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setPhotoTaken(null);
    setShowModal(false);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No se tiene acceso a la cámara.</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={(ref) => setCameraRef(ref)} />
      <Button title="Tomar foto" onPress={takePicture} />

      <Modal visible={showModal} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.popupContainer}>
            {photoTaken && <Image source={{ uri: photoTaken.uri }} style={styles.photo} />}
            <Text style={styles.popupText}>Foto tomada</Text>
            <Button title="Cerrar" onPress={closeModal} />
          </View>
        </View>
      </Modal>
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
    width: '100%',
    height: '80%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  photo: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  popupText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default CameraPhoto;
