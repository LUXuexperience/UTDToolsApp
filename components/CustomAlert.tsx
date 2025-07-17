// En: components/CustomAlert.tsx
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Definimos los tipos de props que nuestro componente aceptará
interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
  type?: 'success' | 'error'; // El tipo de alerta para mostrar diferentes íconos/colores
}

const CustomAlert: React.FC<CustomAlertProps> = ({ visible, title, message, onClose, type = 'error' }) => {
  // Determinamos el color y el ícono basado en el tipo de alerta
  const iconName = type === 'success' ? 'check-circle' : 'x-circle';
  const iconColor = type === 'success' ? '#17A67D' : '#D9534F';

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.alertContainer}>
          {/* Ícono de la Alerta */}
          <Feather name={iconName} size={50} color={iconColor} />

          {/* Título de la Alerta */}
          <Text style={styles.title}>{title}</Text>

          {/* Mensaje de la Alerta */}
          <Text style={styles.message}>{message}</Text>

          {/* Botón para cerrar */}
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Entendido</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro semi-transparente
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContainer: {
    width: '85%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 25,
  },
  button: {
    backgroundColor: '#17A67D',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomAlert;
