// En: app/(drawer)/(tabs)/perfil.tsx
import { Feather } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

// --- Datos simulados del usuario ---
const userData = {
    name: 'Paulina Ale Breceda',
    matricula: '3141230012',
    initials: 'PB',
    email: 'paulina_3141230012@utd.edu.mx',
    phone: '6182933260',
    career: 'TSU en Tecnologías de la Información',
    semester: '5to Cuatrimestre',
    group: 'B',
    modality: 'Clásica',
    biography: 'Apasionada por el desarrollo de software y la inteligencia artificial. Siempre buscando aprender nuevas tecnologías y aplicarlas en proyectos innovadores.',
};

// --- Componente para un item de información ---
const InfoItem = ({ icon, label, value, color }: { icon: any, label: string, value: string, color: string }) => (
    <View style={styles.infoItem}>
        <Feather name={icon} size={22} color={color} />
        <View style={styles.infoTextContainer}>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
    </View>
);

export default function PerfilScreen() {
    const navigation = useNavigation();
    const [isEditing, setIsEditing] = useState(false);
    const [biography, setBiography] = useState(userData.biography);

    const handleSave = () => {
        // Aquí iría la lógica para guardar la biografía en la base de datos
        console.log("Biografía guardada:", biography);
        setIsEditing(false);
    };

    return (
        <KeyboardAvoidingView 
            style={{ flex: 1 }} 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.fullScreenContainer}>
                <LinearGradient
                    colors={['#0A7360', '#17A67D']}
                    style={styles.header}
                >
                    <TouchableOpacity 
                        style={styles.headerButton}
                        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                    >
                        <Feather name="menu" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Mi Perfil</Text>
                    <View style={styles.headerButton} />
                </LinearGradient>

                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.profileCard}>
                        <View style={styles.avatarContainer}>
                            <Text style={styles.avatarText}>{userData.initials}</Text>
                        </View>
                        <Text style={styles.profileName}>{userData.name}</Text>
                        <Text style={styles.profileMatricula}>{userData.matricula}</Text>
                    </View>

                    <View style={styles.infoCard}>
                        <Text style={styles.cardTitle}>Información Académica y Contacto</Text>
                        <InfoItem icon="mail" label="Correo Electrónico" value={userData.email} color="#17A67D" />
                        <InfoItem icon="phone" label="Teléfono" value={userData.phone} color="#17A67D" />
                        <InfoItem icon="book-open" label="Carrera" value={userData.career} color="#D9A404" />
                        <InfoItem icon="calendar" label="Cuatrimestre" value={userData.semester} color="#D9A404" />
                        <InfoItem icon="users" label="Grupo" value={userData.group} color="#D97C0B" />
                        <InfoItem icon="layers" label="Modalidad" value={userData.modality} color="#D97C0B" />
                    </View>

                    <View style={styles.infoCard}>
                        <View style={styles.bioHeader}>
                            <Text style={styles.cardTitle}>Biografía</Text>
                            <TouchableOpacity 
                                style={styles.editButton} 
                                onPress={() => isEditing ? handleSave() : setIsEditing(true)}
                            >
                                <Feather name={isEditing ? "save" : "edit-2"} size={16} color="#17A67D" />
                                <Text style={styles.editButtonText}>{isEditing ? "Guardar" : "Editar"}</Text>
                            </TouchableOpacity>
                        </View>
                        {isEditing ? (
                            <TextInput
                                style={styles.bioInput}
                                value={biography}
                                onChangeText={setBiography}
                                multiline
                                autoFocus
                            />
                        ) : (
                            <Text style={styles.bioText}>{biography}</Text>
                        )}
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    fullScreenContainer: {
        flex: 1,
        backgroundColor: '#f4f7f9',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 50,
        paddingBottom: 15,
        paddingHorizontal: 15,
    },
    headerButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: 'Inter-Bold',
        color: 'white',
    },
    scrollContent: {
        padding: 20,
    },
    profileCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 20,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#D9A404',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    avatarText: {
        fontFamily: 'Inter-Bold',
        fontSize: 40,
        color: 'white',
    },
    profileName: {
        fontFamily: 'Inter-Bold',
        fontSize: 22,
        color: '#333',
    },
    profileMatricula: {
        fontFamily: 'Inter-Regular',
        fontSize: 16,
        color: '#8E8E93',
        marginTop: 4,
    },
    infoCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    cardTitle: {
        fontFamily: 'Inter-Bold',
        fontSize: 18,
        color: '#333',
        marginBottom: 5, // Reducido para el nuevo layout
    },
    // --- CAMBIO: Estilos para la nueva lista de información ---
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    infoTextContainer: {
        marginLeft: 15,
        flex: 1,
    },
    infoLabel: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 14,
        color: '#333',
        marginBottom: 2,
    },
    infoValue: {
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        color: '#555',
    },
    // --- CAMBIO: Estilos para la tarjeta de biografía ---
    bioHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#17A67D',
    },
    editButtonText: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 14,
        color: '#17A67D',
        marginLeft: 8,
    },
    bioText: {
        fontFamily: 'Inter-Regular',
        fontSize: 15,
        color: '#555',
        lineHeight: 22,
    },
    bioInput: {
        fontFamily: 'Inter-Regular',
        fontSize: 15,
        color: '#333',
        lineHeight: 22,
        backgroundColor: '#f4f7f9',
        borderRadius: 10,
        padding: 15,
        minHeight: 120,
        textAlignVertical: 'top',
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
});
