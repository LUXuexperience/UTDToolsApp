// En: components/CustomDrawerContent.tsx
import { Feather, Ionicons } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const userData = {
    name: 'Estudiante Demo',
    avatar: require('../assets/images/utd.png'), 
};

// Componente para cada elemento del menú
const DrawerItem = ({ icon, name, href, active, navigation }: { icon: any, name: string, href: string, active?: boolean, navigation: any }) => {
    const router = useRouter();
    
    // Función para manejar la navegación y cerrar el menú
    const handlePress = () => {
        navigation.closeDrawer();
        router.push(href as Href);
    };

    return (
        <TouchableOpacity 
            onPress={handlePress} 
            style={[styles.drawerItem, active && styles.activeDrawerItem]}
        >
            {active && <View style={styles.activeIndicator} />}
            <Feather name={icon} size={22} color={active ? '#17A67D' : '#333'} />
            <Text style={[styles.drawerItemText, active && styles.activeDrawerItemText]}>{name}</Text>
        </TouchableOpacity>
    );
};

// El componente ahora recibe 'navigation' directamente de las props
export default function CustomDrawerContent({ navigation }: { navigation: any }) {
    const router = useRouter();

    const handleLogout = () => {
        router.replace('/(auth)');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Image source={userData.avatar} style={styles.logo} />
                <TouchableOpacity onPress={() => navigation.closeDrawer()} style={styles.closeButton}>
                    <Feather name="x" size={24} color="#555" />
                </TouchableOpacity>
            </View>
            <View style={styles.profileInfo}>
                <Ionicons name="person-circle-outline" size={24} color="#555" />
                <Text style={styles.profileName}>{userData.name}</Text>
            </View>
            
            <ScrollView style={styles.menuScrollView}>
                <View style={styles.menuContainer}>
                    <Text style={styles.menuSectionTitle}>MENÚ PRINCIPAL</Text>
                    {/* Pasamos la prop 'navigation' a cada item */}
                    <DrawerItem icon="home" name="Inicio" href="/(drawer)/(tabs)/index" active navigation={navigation} />
                    <DrawerItem icon="repeat" name="Préstamos Activos" href="/(drawer)/(tabs)/prestamos" navigation={navigation} />
                    <DrawerItem icon="list" name="Inventario" href="/(drawer)/(tabs)/inventario" navigation={navigation} />
                    <DrawerItem icon="clock" name="Historial" href="/(drawer)/(tabs)/historial" navigation={navigation} />
                    <DrawerItem icon="bar-chart-2" name="Mis Estadísticas" href="/(drawer)/(tabs)/historial" navigation={navigation} />
                    <DrawerItem icon="info" name="Acerca del Proyecto" href="/(drawer)/(tabs)/acerca-de" navigation={navigation} />
                    
                    <Text style={styles.menuSectionTitle}>AJUSTES Y SOPORTE</Text>
                    <DrawerItem icon="user" name="Mi Perfil" href="/(drawer)/(tabs)/index" navigation={navigation} />
                    <DrawerItem icon="bell" name="Notificaciones" href="/(drawer)/(tabs)/index" navigation={navigation} />
                    <DrawerItem icon="help-circle" name="Ayuda" href="/(drawer)/(tabs)/index" navigation={navigation} />
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Feather name="log-out" size={22} color="#D9534F" />
                <Text style={styles.logoutText}>Cerrar Sesión</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

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
        paddingTop: 20,
        paddingBottom: 10,
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
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    profileName: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 18,
        marginLeft: 10,
    },
    menuScrollView: {
        flex: 1,
    },
    menuContainer: {
        paddingTop: 10,
    },
    menuSectionTitle: {
        fontFamily: 'Inter-Bold',
        color: '#a0aec0',
        fontSize: 12,
        textTransform: 'uppercase',
        marginBottom: 10,
        marginTop: 10,
        paddingHorizontal: 15,
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
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        margin: 10,
    },
    logoutText: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 16,
        marginLeft: 15,
        color: '#D9534F',
    },
});
