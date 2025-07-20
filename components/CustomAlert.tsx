// En: components/CustomAlert.tsx

import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// --- INTERFAZ ACTUALIZADA ---
// Se añaden props para un segundo botón de confirmación.
interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void; // Se usará para cancelar o cerrar
  onConfirm?: () => void; // Opcional: para el botón de confirmación
  confirmText?: string; // Texto para el botón de confirmar
  cancelText?: string; // Texto para el botón de cancelar/cerrar
  type?: 'success' | 'error' | 'warning'; // Se añade el tipo 'warning'
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  title,
  message,
  onClose,
  onConfirm,
  confirmText = 'Confirmar',
  cancelText = 'Entendido',
  type = 'error',
}) => {
  // Mapeo de íconos y colores según el tipo de alerta
  const alertConfig = {
    success: { icon: 'check-circle' as const, color: '#17A67D' },
    error: { icon: 'x-circle' as const, color: '#D9534F' },
    warning: { icon: 'alert-triangle' as const, color: '#D9534F' }, // Nuevo tipo
  };

  const { icon, color } = alertConfig[type];

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.alertContainer}>
          <Feather name={icon} size={50} color={color} />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          {/* --- LÓGICA DE BOTONES ACTUALIZADA --- */}
          {/* Si existe onConfirm, muestra dos botones. Si no, muestra solo uno. */}
          {onConfirm ? (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onClose}
              >
                <Text style={[styles.buttonText, styles.cancelButtonText]}>
                  {cancelText}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: color }]} // Botón de confirmar usa el color del tipo de alerta
                onPress={onConfirm}
              >
                <Text style={styles.buttonText}>{confirmText}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={[styles.button, { backgroundColor: color, width: '100%' }]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>{cancelText}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

// --- ESTILOS ACTUALIZADOS ---
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    shadowOffset: { width: 0, height: 2 },
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
  // Contenedor para dos botones
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    flex: 1, // Para que ocupen el mismo espacio
    marginHorizontal: 5, // Espacio entre botones
  },
  // Estilo específico para el botón de cancelar
  cancelButton: {
    backgroundColor: '#E5E7EB', // Gris neutral
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Texto oscuro para el botón de cancelar claro
  cancelButtonText: {
    color: '#374151',
  },
});

export default CustomAlert;