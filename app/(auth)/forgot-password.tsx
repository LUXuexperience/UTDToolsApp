// En: app/(auth)/forgot-password.tsx
import { Feather } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    ImageBackground,
    Keyboard,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import CustomAlert from '../../components/CustomAlert';

import BackgroundImage from '../../assets/images/fondito.png';
import LogoImage from '../../assets/images/utd.png';

// La clave es que la función del componente se exporte como 'default'.
export default function ForgotPasswordScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');

    const [alertVisible, setAlertVisible] = useState(false);

    const handleRecovery = () => {
        if (!email.toLowerCase().endsWith('@utd.edu.mx')) {
            // Reutilizamos la alerta para el error
            setAlertVisible(true);
            return;
        }

        // Simulación de envío exitoso
        router.push({ 
            pathname: '/(auth)', 
            params: { successMessage: 'Si el correo está registrado, recibirás un enlace para recuperar tu contraseña.' } 
        });
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <ImageBackground source={BackgroundImage} style={styles.backgroundImage} />
                
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.headerContainer}>
                        <Image source={LogoImage} style={styles.logo} />
                        <Text style={styles.title}>Recuperar Contraseña</Text>
                        <Text style={styles.subtitle}>Ingresa tu correo institucional para recibir las instrucciones.</Text>
                    </View>

                    <View style={styles.formContainer}>
                        <Text style={styles.label}>Correo Institucional</Text>
                        <View style={styles.inputContainer}>
                            <Feather name="mail" size={20} color="#666" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="nombre@utd.edu.mx"
                                placeholderTextColor="#aaa"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>

                        <TouchableOpacity style={styles.button} onPress={handleRecovery}>
                            <Text style={styles.buttonText}>Enviar Instrucciones</Text>
                        </TouchableOpacity>

                        <View style={styles.loginContainer}>
                            <Link href="/(auth)" asChild>
                                <TouchableOpacity>
                                    <Text style={styles.loginLinkText}>Volver a Iniciar Sesión</Text>
                                </TouchableOpacity>
                            </Link>
                        </View>
                    </View>
                </ScrollView>

                <CustomAlert
                    visible={alertVisible}
                    title="Correo Inválido"
                    message="Por favor, ingresa un correo institucional válido."
                    onClose={() => setAlertVisible(false)}
                    type="error"
                />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    backgroundImage: { position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, width: '100%', height: '100%' },
    scrollContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 30 },
    headerContainer: { alignItems: 'center', marginBottom: 20, },
    logo: { width: 150, height: 75, resizeMode: 'contain', marginBottom: 5 },
    title: { fontSize: 32, fontWeight: 'bold', color: '#333', marginTop: 10, textAlign: 'center' },
    subtitle: { fontSize: 16, color: '#555', marginVertical: 20, textAlign: 'center' },
    formContainer: { width: '100%', backgroundColor: 'white', padding: 25, borderRadius: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 15, elevation: 8 },
    label: { fontSize: 16, color: '#444', marginBottom: 8, fontWeight: '500' },
    inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f6f6f6', borderRadius: 10, marginBottom: 20, paddingHorizontal: 15, borderWidth: 1, borderColor: '#eee' },
    icon: { marginRight: 10 },
    input: { flex: 1, height: 50, fontSize: 16, color: '#333' },
    button: { backgroundColor: '#17A67D', borderRadius: 10, paddingVertical: 15, alignItems: 'center', marginTop: 10 },
    buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
    loginContainer: { justifyContent: 'center', alignItems: 'center', marginTop: 25 },
    loginLinkText: { fontSize: 16, fontWeight: 'bold', color: '#17A67D' },
});
