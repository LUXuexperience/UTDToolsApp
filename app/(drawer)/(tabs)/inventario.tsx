// En: app/(drawer)/(tabs)/inventario.tsx
import { Feather } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

// --- DATOS SIMULADOS PARA EL INVENTARIO ---
const inventoryData = [
    {
        category: 'Microcontroladores',
        icon: 'cpu',
        items: [
            { 
                id: 'ARD-001', 
                name: 'Arduino Uno R3', 
                description: 'Placa de desarrollo ideal para principiantes en electrónica y programación.',
                condition: 'Excelente',
                available: 15, 
                total: 20,
            },
            { 
                id: 'RAS-004', 
                name: 'Raspberry Pi 4 (4GB)', 
                description: 'Mini computadora versátil para proyectos avanzados de IoT y multimedia.',
                condition: 'Bueno',
                available: 0, 
                total: 10,
            },
        ],
    },
    {
        category: 'Sensores',
        icon: 'radio',
        items: [
            { 
                id: 'SEN-ULT-01', 
                name: 'Sensor Ultrasónico HC-SR04', 
                description: 'Mide distancias con alta precisión utilizando ondas sonoras.',
                condition: 'Bueno',
                available: 25, 
                total: 30,
            },
        ],
    },
    {
        category: 'Componentes Pasivos',
        icon: 'layers',
        items: [
            { 
                id: 'RES-KIT-01', 
                name: 'Resistencias (Kit Surtido de 500 piezas)', 
                description: 'Amplia variedad de valores de resistencias para todo tipo de prototipado.',
                condition: 'Bueno',
                available: 50, 
                total: 50,
            },
            { 
                id: 'CAP-CER-01', 
                name: 'Capacitores Cerámicos (Kit)', 
                description: 'Kit con diversos valores de capacitancia para filtrado y acoplamiento.',
                condition: 'Bueno',
                available: 30, 
                total: 30,
            },
        ],
    },
];

const InventoryItemCard = ({ item }: { item: any }) => {
    let availabilityColor = '#D9A404'; // Amarillo por defecto
    if (item.available === item.total) {
        availabilityColor = '#17A67D'; // Verde
    } else if (item.available === 0) {
        availabilityColor = '#D9534F'; // Rojo
    }

    return (
        <View style={[styles.itemCard, { borderLeftColor: availabilityColor }]}>
            <View style={styles.itemContent}>
                <View style={styles.itemHeader}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <View style={[styles.availabilityBadge, { backgroundColor: availabilityColor }]}>
                        <Text style={styles.availabilityText}>{`${item.available} / ${item.total}`}</Text>
                    </View>
                </View>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <View style={styles.itemFooter}>
                    <View style={styles.footerInfo}>
                        <Feather name="tag" size={12} color="#8E8E93" />
                        <Text style={styles.footerText}>ID: {item.id}</Text>
                    </View>
                    <View style={styles.footerInfo}>
                        <Feather name="shield" size={12} color="#8E8E93" />
                        <Text style={styles.footerText}>Condición: <Text style={{ color: '#17A67D', fontFamily: 'Inter-SemiBold' }}>{item.condition}</Text></Text>
                    </View>
                </View>
            </View>
        </View>
    );
};


const CategoryAccordion = ({ category, icon, items }: { category: string, icon: any, items: any[] }) => {
    const [isOpen, setIsOpen] = useState(true); // Abierto por defecto al buscar

    if (items.length === 0) {
        return null;
    }

    return (
        <View style={styles.accordionContainer}>
            <TouchableOpacity style={styles.accordionHeader} onPress={() => setIsOpen(!isOpen)}>
                <View style={styles.accordionTitleContainer}>
                    <Feather name={icon} size={22} color="#17A67D" />
                    <Text style={styles.accordionTitle}>{category}</Text>
                </View>
                <Feather name={isOpen ? 'chevron-up' : 'chevron-down'} size={24} color="#8E8E93" />
            </TouchableOpacity>
            {isOpen && (
                <View style={styles.accordionContent}>
                    {items.map(item => <InventoryItemCard key={item.id} item={item} />)}
                </View>
            )}
        </View>
    );
};


export default function InventarioScreen() {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(inventoryData);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredData(inventoryData);
        } else {
            const lowercasedQuery = searchQuery.toLowerCase();
            const filtered = inventoryData.map(category => {
                const filteredItems = category.items.filter(item => 
                    item.name.toLowerCase().includes(lowercasedQuery) ||
                    item.id.toLowerCase().includes(lowercasedQuery)
                );
                return { ...category, items: filteredItems };
            }).filter(category => category.items.length > 0);
            setFilteredData(filtered);
        }
    }, [searchQuery]);

    return (
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
                <Text style={styles.headerTitle}>Inventario Completo</Text>
                <View style={styles.headerButton} />
            </LinearGradient>

            <ScrollView style={styles.container}>
                <View style={styles.searchContainer}>
                    <Feather name="search" size={20} color="#8E8E93" style={styles.searchIcon} />
                    <TextInput
                        placeholder="Buscar por nombre o ID..."
                        placeholderTextColor="#8E8E93"
                        style={styles.searchInput}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                {/* --- CAMBIO: Lógica para mostrar "Sin resultados" --- */}
                {filteredData.length > 0 ? (
                    filteredData.map((category, index) => (
                        <CategoryAccordion key={index} {...category} />
                    ))
                ) : (
                    <View style={styles.noResultsContainer}>
                        <Feather name="search" size={40} color="#a0aec0" />
                        <Text style={styles.noResultsText}>Sin Resultados</Text>
                        <Text style={styles.noResultsSubText}>No se encontraron materiales que coincidan con tu búsqueda.</Text>
                    </View>
                )}
            </ScrollView>
        </View>
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
    container: {
        flex: 1,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 15,
        margin: 15,
        paddingHorizontal: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 50,
        fontFamily: 'Inter-Regular',
        fontSize: 16,
    },
    accordionContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        marginHorizontal: 15,
        marginBottom: 10,
        padding: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    accordionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    accordionTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    accordionTitle: {
        fontFamily: 'Inter-Bold',
        fontSize: 18,
        color: '#333',
        marginLeft: 15,
        flex: 1,
    },
    accordionContent: {
        paddingTop: 10,
    },
    itemCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        padding: 15,
        marginTop: 10,
        borderLeftWidth: 5,
    },
    itemContent: {
        flex: 1,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    itemName: {
        fontFamily: 'Inter-Bold',
        fontSize: 16,
        color: '#333',
        flex: 1,
        marginRight: 10,
    },
    availabilityBadge: {
        borderRadius: 12,
        paddingVertical: 4,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    availabilityText: {
        fontFamily: 'Inter-Bold',
        fontSize: 12,
        color: 'white',
    },
    itemDescription: {
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        color: '#555',
        marginBottom: 12,
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    footerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerText: {
        fontFamily: 'Inter-Medium',
        fontSize: 12,
        color: '#8E8E93',
        marginLeft: 5,
    },
    // --- CAMBIO: Nuevos estilos para el mensaje "Sin resultados" ---
    noResultsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        marginTop: 50,
    },
    noResultsText: {
        fontFamily: 'Inter-Bold',
        fontSize: 18,
        color: '#555',
        marginTop: 10,
    },
    noResultsSubText: {
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        color: '#8E8E93',
        marginTop: 5,
        textAlign: 'center',
    },
});
