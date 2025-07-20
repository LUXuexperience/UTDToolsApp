// En: app/(drawer)/(tabs)/historial.tsx
import { Feather } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// --- DATOS SIMULADOS AMPLIADOS ---
const alertsData = [
    { type: 'warning', text: 'Protoboard 830 puntos - Devolución pendiente desde hace 2 días' },
    { type: 'warning', text: 'Límite de préstamos diarios casi alcanzado (4/5)' },
    { type: 'info', text: 'Nuevo equipo disponible: Kit de sensores IoT' },
];

const allHistoryData = [
    { id: '1', name: 'Arduino Uno R3', type: 'Préstamo', date: '2024-01-15 09:30', duration: '2h 30m', category: 'Microcontroladores', status: 'completed' },
    { id: '2', name: 'Sensor de Temperatura DHT22', type: 'Devolución', date: '2024-01-14 15:00', duration: '1 día', category: 'Sensores', status: 'completed' },
    { id: '3', name: 'Protoboard 830 puntos', type: 'Advertencia', date: '2024-01-13 11:00', duration: 'Retraso de 2 días', category: 'Componentes', status: 'warning' },
    { id: '4', name: 'Resistencias 220Ω', type: 'Préstamo', date: '2024-01-12 10:15', duration: '45m', category: 'Componentes', status: 'completed' },
    { id: '5', name: 'Multímetro Digital', type: 'Devolución', date: '2024-01-11 17:00', duration: '3 días', category: 'Herramientas', status: 'completed' },
    { id: '6', name: 'Fuente de Poder', type: 'Alerta', date: '2024-01-10 12:00', duration: 'No devuelto', category: 'Equipos', status: 'alert' },
];

// --- Interfaces para los props de los componentes ---
interface AlertCardProps {
    type: 'warning' | 'info';
    text: string;
}

interface HistoryItemProps {
    item: typeof allHistoryData[0];
}

// --- CAMBIO: Se añade la prop 'color' ---
interface SummaryCountCardProps {
    count: number;
    label: string;
    color: string;
}

// --- Componentes ---
const AlertCard: React.FC<AlertCardProps> = ({ type, text }) => {
    const borderColor = type === 'warning' ? '#D97C0B' : '#17A67D';
    return (
        <View style={[styles.alertCard, { borderLeftColor: borderColor }]}>
            <Text style={styles.alertText}>{text}</Text>
        </View>
    );
};

const HistoryItem: React.FC<HistoryItemProps> = ({ item }) => {
    let statusColor = '#333';
    let statusBgColor = '#f0f0f0';
    let statusIcon: any = 'info';

    switch (item.status) {
        case 'completed':
            statusColor = '#17A67D';
            statusBgColor = 'rgba(23, 166, 125, 0.1)';
            statusIcon = item.type === 'Préstamo' ? 'arrow-up-circle' : 'arrow-down-circle';
            break;
        case 'warning':
            statusColor = '#D9A404';
            statusBgColor = 'rgba(217, 164, 4, 0.1)';
            statusIcon = 'alert-circle';
            break;
        case 'alert':
            statusColor = '#D9534F';
            statusBgColor = 'rgba(217, 83, 79, 0.1)';
            statusIcon = 'alert-octagon';
            break;
    }

    return (
        <View style={styles.historyItemCard}>
            <View style={styles.historyItemHeader}>
                <Text style={styles.historyItemName}>{item.name}</Text>
                <View style={[styles.statusBadge, { backgroundColor: statusBgColor }]}>
                    <Feather name={statusIcon} size={12} color={statusColor} />
                    <Text style={[styles.statusBadgeText, { color: statusColor }]}>{item.type}</Text>
                </View>
            </View>
            <View style={styles.historyItemDetails}>
                <View style={styles.detailItem}>
                    <Feather name="calendar" size={14} color="#8E8E93" />
                    <Text style={styles.detailText}>{item.date}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Feather name="clock" size={14} color="#8E8E93" />
                    <Text style={styles.detailText}>{item.duration}</Text>
                </View>
            </View>
            <View style={styles.categoryTag}>
                <Text style={styles.categoryTagText}>{item.category}</Text>
            </View>
        </View>
    );
};

// --- CAMBIO: El componente ahora usa la prop 'color' ---
const SummaryCountCard: React.FC<SummaryCountCardProps> = ({ count, label, color }) => (
    <View style={styles.summaryCountCard}>
        <Text style={[styles.summaryCountValue, { color }]}>{count}</Text>
        <Text style={styles.summaryCountLabel}>{label}</Text>
    </View>
);

const filterColors = {
    Todos: '#17A67D',
    Completados: '#17A67D',
    Advertencias: '#D9A404',
    Alertas: '#D9534F',
};

export default function HistorialScreen() {
    const navigation = useNavigation();
    const [activeFilter, setActiveFilter] = useState('Todos');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredHistory = useMemo(() => {
        let data = allHistoryData;

        if (activeFilter === 'Completados') {
            data = data.filter(item => item.status === 'completed');
        } else if (activeFilter === 'Advertencias') {
            data = data.filter(item => item.status === 'warning');
        } else if (activeFilter === 'Alertas') {
            data = data.filter(item => item.status === 'alert');
        }

        if (searchQuery.trim() !== '') {
            const lowercasedQuery = searchQuery.toLowerCase();
            data = data.filter(item => item.name.toLowerCase().includes(lowercasedQuery));
        }

        return data;
    }, [activeFilter, searchQuery]);

    const completedCount = allHistoryData.filter(item => item.status === 'completed').length;
    const warningCount = allHistoryData.filter(item => item.status === 'warning').length;
    const alertCount = allHistoryData.filter(item => item.status === 'alert').length;

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
                <Text style={styles.headerTitle}>Historial y Alertas</Text>
                <View style={styles.headerButton} />
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <Feather name="alert-triangle" size={20} color="#D97C0B" />
                        <Text style={styles.sectionTitle}>Alertas Activas</Text>
                    </View>
                    {alertsData.map((alert, index) => (
                        <AlertCard key={index} type={alert.type} text={alert.text} />
                    ))}
                </View>

                <View style={styles.filterCard}>
                    <View style={styles.searchContainer}>
                        <Feather name="search" size={20} color="#8E8E93" style={styles.searchIcon} />
                        <TextInput
                            placeholder="Buscar en historial..."
                            placeholderTextColor="#8E8E93"
                            style={styles.searchInput}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterButtonsContainer}>
                        {['Todos', 'Completados', 'Advertencias', 'Alertas'].map(filter => (
                            <TouchableOpacity
                                key={filter}
                                style={[
                                    styles.filterButton, 
                                    activeFilter === filter && { backgroundColor: filterColors[filter as keyof typeof filterColors] }
                                ]}
                                onPress={() => setActiveFilter(filter)}
                            >
                                <Text style={[styles.filterButtonText, activeFilter === filter && styles.activeFilterButtonText]}>{filter}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <Feather name="clock" size={20} color="#333" />
                        <Text style={styles.sectionTitle}>Historial de Actividades</Text>
                    </View>
                    {filteredHistory.length > 0 ? (
                        filteredHistory.map(item => (
                            <HistoryItem key={item.id} item={item} />
                        ))
                    ) : (
                        <View style={styles.noResultsContainer}>
                            <Feather name="search" size={40} color="#a0aec0" />
                            <Text style={styles.noResultsText}>No se encontraron resultados</Text>
                            <Text style={styles.noResultsSubText}>Intenta con otro filtro o término de búsqueda.</Text>
                        </View>
                    )}
                </View>

                {/* --- CAMBIO: Se pasan los colores a las tarjetas de resumen --- */}
                <View style={styles.summaryCountContainer}>
                    <SummaryCountCard count={completedCount} label="Completados" color={filterColors.Completados} />
                    <SummaryCountCard count={warningCount} label="Advertencias" color={filterColors.Advertencias} />
                    <SummaryCountCard count={alertCount} label="Alertas" color={filterColors.Alertas} />
                </View>
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
    scrollContent: {
        padding: 20,
    },
    sectionContainer: {
        marginBottom: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontFamily: 'Inter-Bold',
        fontSize: 18,
        color: '#333',
        marginLeft: 10,
    },
    alertCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 15,
        marginBottom: 10,
        borderLeftWidth: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    alertText: {
        fontFamily: 'Inter-Medium',
        fontSize: 15,
        color: '#4a5568',
    },
    filterCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        elevation: 2,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f2f5',
        borderRadius: 15,
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 45,
        fontFamily: 'Inter-Regular',
        fontSize: 16,
    },
    filterButtonsContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    filterButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 10,
        backgroundColor: '#f0f2f5',
    },
    activeFilterButton: {},
    filterButtonText: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 14,
        color: '#555',
    },
    activeFilterButtonText: {
        color: 'white',
    },
    historyItemCard: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 15,
        marginBottom: 10,
        elevation: 2,
    },
    historyItemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    historyItemName: {
        fontFamily: 'Inter-Bold',
        fontSize: 16,
        color: '#333',
        flex: 1,
        marginRight: 10,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    statusBadgeText: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 12,
        marginLeft: 4,
    },
    historyItemDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailText: {
        fontFamily: 'Inter-Regular',
        fontSize: 13,
        color: '#8E8E93',
        marginLeft: 5,
    },
    categoryTag: {
        backgroundColor: '#f0f2f5',
        borderRadius: 8,
        paddingVertical: 4,
        paddingHorizontal: 10,
        alignSelf: 'flex-start',
    },
    categoryTagText: {
        fontFamily: 'Inter-Medium',
        fontSize: 12,
        color: '#555',
    },
    summaryCountContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    summaryCountCard: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 15,
        alignItems: 'center',
        width: '32%',
        elevation: 2,
    },
    summaryCountValue: {
        fontFamily: 'Inter-Bold',
        fontSize: 24,
    },
    summaryCountLabel: {
        fontFamily: 'Inter-Medium',
        fontSize: 12,
        color: '#555',
        marginTop: 4,
    },
    noResultsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 15,
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
