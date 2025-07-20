// En: components/CustomDrawerContent.tsx

import { Feather, Ionicons } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';
import React, { useState } from 'react'; // <-- 1. Importar useState
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import CustomAlert from './CustomAlert'; // <-- 2. Importar tu CustomAlert

// --- Datos del usuario actualizados ---
const userData = {
    name: 'Paulina Ale Breceda',
    email: 'paulina_3141230012@utd.edu.mx',
    avatar: require('../assets/images/utd.png'),
};

const DrawerItem = ({ icon, name, href, routeName, activeRoute, navigation }: { icon: any, name: string, href: string, routeName: string, activeRoute?: string, navigation: any }) => {
    // ... (sin cambios en este componente)
    const router = useRouter();
    const isActive = activeRoute === routeName;

    const handlePress = () => {
        navigation.closeDrawer();
        router.replace(href as Href);
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            style={[styles.drawerItem, isActive && styles.activeDrawerItem]}
        >
            {isActive && <View style={styles.activeIndicator} />}
            <Feather name={icon} size={22} color={isActive ? '#17A67D' : '#555'} />
            <Text style={[styles.drawerItemText, isActive && styles.activeDrawerItemText]}>{name}</Text>
        </TouchableOpacity>
    );
};


export default function CustomDrawerContent({ navigation, state }: { navigation: any, state: any }) {
    const router = useRouter();

    // 3. Añadir estado para controlar la visibilidad de la alerta
    const [alertVisible, setAlertVisible] = useState(false);

    const activeRouteName = state?.routes[state.index]?.name;
    const activeTabRoute = activeRouteName === '(tabs)'
        ? state?.routes[state.index]?.state?.routes[state.routes[state.index].state.index]?.name
        : activeRouteName;

    // 4. Función para confirmar el cierre de sesión
    const handleConfirmLogout = () => {
        setAlertVisible(false); // Cierra la alerta
        router.replace('/(auth)'); // Navega a la pantalla de login
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* 5. Añadir el componente de alerta al renderizado */}
            <CustomAlert
                visible={alertVisible}
                title="¿Cerrar Sesión?"
                message="¿Estás seguro de que quieres finalizar tu sesión actual?"
                onClose={() => setAlertVisible(false)} // El botón "Cancelar" solo cierra la alerta
                onConfirm={handleConfirmLogout} // El botón "Confirmar" ejecuta el cierre de sesión
                type="warning"
                confirmText="Sí, cerrar"
                cancelText="Cancelar"
            />

            <View style={styles.header}>
                {/* ... (sin cambios aquí) */}
                <Image source={userData.avatar} style={styles.logo} />
                <TouchableOpacity onPress={() => navigation.closeDrawer()} style={styles.closeButton}>
                    <Feather name="x" size={24} color="#555" />
                </TouchableOpacity>
            </View>
            <View style={styles.profileInfo}>
                {/* ... (sin cambios aquí) */}
                <Ionicons name="person-circle-outline" size={28} color="#17A67D" />
                <View>
                    <Text style={styles.profileName}>{userData.name}</Text>
                    <Text style={styles.profileEmail}>{userData.email}</Text>
                </View>
            </View>

            <ScrollView style={styles.menuScrollView}>
                {/* ... (sin cambios aquí) */}
                <View style={styles.menuContainer}>
                    <Text style={styles.menuSectionTitle}>MENÚ PRINCIPAL</Text>
                    <DrawerItem icon="home" name="Inicio" href="/" routeName="index" activeRoute={activeTabRoute} navigation={navigation} />
                    <DrawerItem icon="repeat" name="Préstamos Activos" href="/prestamos" routeName="prestamos" activeRoute={activeTabRoute} navigation={navigation} />
                    <DrawerItem icon="list" name="Inventario" href="/inventario" routeName="inventario" activeRoute={activeTabRoute} navigation={navigation} />
                    <DrawerItem icon="clock" name="Historial" href="/historial" routeName="historial" activeRoute={activeTabRoute} navigation={navigation} />
                    <DrawerItem icon="bar-chart-2" name="Mis Estadísticas" href="/estadisticas" routeName="estadisticas" activeRoute={activeTabRoute} navigation={navigation} />
                    <DrawerItem icon="info" name="Acerca del Proyecto" href="/acerca-de" routeName="acerca-de" activeRoute={activeTabRoute} navigation={navigation} />

                    <Text style={styles.menuSectionTitle}>AJUSTES Y SOPORTE</Text>
                    <DrawerItem icon="user" name="Mi Perfil" href="/(drawer)/(tabs)/perfil" routeName="perfil" activeRoute={activeTabRoute} navigation={navigation} />
                    <DrawerItem icon="bell" name="Notificaciones" href="/(drawer)/(tabs)/notificaciones" routeName="notificaciones" activeRoute={activeTabRoute} navigation={navigation} />
                    <DrawerItem icon="help-circle" name="Ayuda" href="/(drawer)/(tabs)/ayuda" routeName="ayuda" activeRoute={activeTabRoute} navigation={navigation} />
                </View>
            </ScrollView>

            <View style={styles.footer}>
                {/* 6. El botón ahora muestra la alerta en lugar de navegar directamente */}
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={() => setAlertVisible(true)} // <-- Muestra la alerta
                >
                    <Feather name="log-out" size={22} color="#D9534F" />
                    <Text style={styles.logoutText}>Cerrar Sesión</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}


// Estilos (sin cambios)
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    logo: {
        width: 100,
        height: 50,
        resizeMode: 'contain',
    },
    closeButton: {
        padding: 5,
    },
    profileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    profileName: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 16,
        marginLeft: 10,
    },
    profileEmail: {
        fontFamily: 'Inter-Regular',
        fontSize: 12,
        marginLeft: 10,
        color: '#8E8E93',
    },
    menuScrollView: {
        flex: 1,
    },
    menuContainer: {
        padding: 15,
        paddingTop: 0,
    },
    menuSectionTitle: {
        fontFamily: 'Inter-Bold',
        color: '#a0aec0',
        fontSize: 12,
        textTransform: 'uppercase',
        marginBottom: 10,
        marginTop: 15,
    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginBottom: 5,
    },
    activeDrawerItem: {
        backgroundColor: 'rgba(23, 166, 125, 0.1)',
    },
    activeIndicator: {
        position: 'absolute',
        left: 0,
        top: 10,
        bottom: 10,
        width: 4,
        backgroundColor: '#17A67D',
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
    },
    drawerItemText: {
        fontFamily: 'Inter-Medium',
        fontSize: 16,
        marginLeft: 15,
        color: '#333',
    },
    activeDrawerItemText: {
        color: '#17A67D',
        fontFamily: 'Inter-Bold',
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoutText: {
        fontFamily: 'Inter-Bold',
        fontSize: 16,
        marginLeft: 10,
        color: '#D9534F',
    },
});