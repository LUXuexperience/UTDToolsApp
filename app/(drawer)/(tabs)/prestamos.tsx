// En: app/(drawer)/(tabs)/prestamos.tsx
import { Feather } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

// --- DATOS SIMULADOS PARA PRÉSTAMOS ACTIVOS ---
const activeLoansData = [
    {
        id: '1',
        name: 'Arduino Uno R3',
        quantity: 2,
        category: 'Microcontroladores',
        loanDate: '27 de mayo de 2025',
        returnDate: '3 de junio de 2025',
        image: require('../../../assets/images/carousel/pesado1.jpg'), // Reemplaza con la imagen correcta
    },
    {
        id: '2',
        name: 'Sensor Ultrasónico',
        quantity: 5,
        category: 'Sensores',
        loanDate: '28 de mayo de 2025',
        returnDate: '4 de junio de 2025',
        image: require('../../../assets/images/carousel/pesado1.jpg'),
    },
    {
        id: '3',
        name: 'Protoboard',
        quantity: 1,
        category: 'Componentes',
        loanDate: '29 de mayo de 2025',
        returnDate: '5 de junio de 2025',
        image: require('../../../assets/images/carousel/pesado1.jpg'),
    },
     {
        id: '4',
        name: 'Multímetro Digital',
        quantity: 1,
        category: 'Herramientas',
        loanDate: '30 de mayo de 2025',
        returnDate: '6 de junio de 2025',
        image: require('../../../assets/images/carousel/pesado1.jpg'),
    },
];

const summaryLoansData = [
    { id: '1', name: 'Arduino Uno R3', quantity: 2, category: 'Microcontroladores', returnDate: '03 jun' },
    { id: '2', name: 'Sensor Ultrasónico HC-SR04 de Largo Alcance para Proyectos', quantity: 3, category: 'Sensores', returnDate: '05 jun' },
    { id: '3', name: 'Protoboard 830 puntos', quantity: 1, category: 'Componentes', returnDate: '12 jun' },
    { id: '4', name: 'Multímetro Digital', quantity: 1, category: 'Instrumentos', returnDate: '07 jun' },
];

const LoanSummaryItem = ({ item }: { item: typeof summaryLoansData[0] }) => (
    <View style={styles.loanItemCard}>
        <View style={styles.itemIconContainer}>
            <Feather name="package" size={24} color="#17A67D" />
        </View>
        <View style={styles.itemTextContainer}>
            <View style={styles.itemRow}>
                <Text style={styles.itemNameLarge}>{item.name}</Text>
                <View style={styles.itemCategoryContainer}>
                    <Feather name="tag" size={12} color="#8E8E93" />
                    <Text style={styles.itemCategory}>{item.category}</Text>
                </View>
            </View>
            <View style={styles.itemRow}>
                <Text style={styles.itemDetailText}>Cant: {item.quantity}</Text>
                <Text style={styles.itemDetailText}>Entrega: {item.returnDate}</Text>
            </View>
        </View>
    </View>
);


export default function PrestamosScreen() {
    const navigation = useNavigation();
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const onMomentumScrollEnd = (event: any) => {
        const index = Math.floor(
            Math.floor(event.nativeEvent.contentOffset.x) /
            Math.floor(event.nativeEvent.layoutMeasurement.width)
        );
        setActiveIndex(index);
    };

    const handleScroll = (direction: 'prev' | 'next') => {
        let nextIndex;
        if (direction === 'next') {
            nextIndex = activeIndex === activeLoansData.length - 1 ? 0 : activeIndex + 1;
        } else {
            nextIndex = activeIndex === 0 ? activeLoansData.length - 1 : activeIndex - 1;
        }
        flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    };

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
                <Text style={styles.headerTitle}>Préstamos Activos</Text>
                <View style={styles.headerButton} />
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryLabel}>Préstamos Activos</Text>
                    <Text style={styles.summaryValue}>{activeLoansData.length}</Text>
                </View>

                <View style={styles.loanCarouselCard}>
                    <FlatList
                        ref={flatListRef}
                        data={activeLoansData}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        onMomentumScrollEnd={onMomentumScrollEnd}
                        renderItem={({ item }) => (
                            <View style={styles.carouselItemContainer}>
                                <ImageBackground source={item.image} style={styles.itemImage} imageStyle={{ borderRadius: 15 }}>
                                    <View style={styles.imageOverlay} />
                                </ImageBackground>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <View style={styles.itemDetails}>
                                    <Text style={styles.itemQuantity}>Cantidad: {item.quantity}</Text>
                                    <View style={styles.itemTag}>
                                        <Text style={styles.itemTagText}>{item.category}</Text>
                                    </View>
                                </View>
                                <View style={styles.dateInfoContainer}>
                                    <View style={styles.dateRow}>
                                        <Feather name="calendar" size={16} color="#fff" />
                                        <Text style={styles.dateText}>Prestado: {item.loanDate}</Text>
                                    </View>
                                    <View style={styles.dateRow}>
                                        <Feather name="clock" size={16} color="#fff" />
                                        <Text style={styles.dateText}>Entrega: {item.returnDate}</Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    />
                    <TouchableOpacity style={[styles.arrowButton, styles.arrowLeft]} onPress={() => handleScroll('prev')}>
                        <Feather name="chevron-left" size={24} color="#333" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.arrowButton, styles.arrowRight]} onPress={() => handleScroll('next')}>
                        <Feather name="chevron-right" size={24} color="#333" />
                    </TouchableOpacity>
                </View>
                
                <View style={styles.paginationContainer}>
                    {activeLoansData.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.paginationDot, 
                                { backgroundColor: index === activeIndex ? '#17A67D' : '#e0e0e0' }
                            ]}
                        />
                    ))}
                </View>

                <View style={styles.summaryListContainer}>
                    <Text style={styles.summaryListTitle}>Resumen de Préstamos</Text>
                    {summaryLoansData.map(item => (
                        <LoanSummaryItem key={item.id} item={item} />
                    ))}
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
    // --- CAMBIO: Estilos de la tarjeta de resumen actualizados ---
    summaryCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 25,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    summaryValue: {
        fontFamily: 'Inter-Bold',
        fontSize: 40,
        color: '#17A67D',
    },
    summaryLabel: {
        fontFamily: 'Inter-Bold',
        fontSize: 18,
        color: '#333',
    },
    loanCarouselCard: {
        backgroundColor: '#17A67D',
        borderRadius: 20,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },
    carouselItemContainer: {
        width: width - 70,
    },
    itemImage: {
        height: 150,
        borderRadius: 15,
        marginBottom: 15,
    },
    imageOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 15,
    },
    itemName: {
        fontFamily: 'Inter-Bold',
        fontSize: 22,
        color: 'white',
        marginBottom: 10,
    },
    itemDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    itemQuantity: {
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        color: 'white',
    },
    itemTag: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 8,
        paddingVertical: 4,
        paddingHorizontal: 10,
    },
    itemTagText: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 12,
        color: 'white',
    },
    dateInfoContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
        borderRadius: 10,
        padding: 10,
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
    },
    dateText: {
        fontFamily: 'Inter-Medium',
        fontSize: 14,
        color: 'white',
        marginLeft: 10,
    },
    arrowButton: {
        position: 'absolute',
        top: 75,
        marginTop: -20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        zIndex: 10,
    },
    arrowLeft: {
        left: 5,
    },
    arrowRight: {
        right: 5,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
    summaryListContainer: {
        marginTop: 30,
    },
    summaryListTitle: {
        fontFamily: 'Inter-Bold',
        fontSize: 18,
        color: '#0A7360',
        marginBottom: 15,
    },
    loanItemCard: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    itemIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: 'rgba(23, 166, 125, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    itemTextContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    itemNameLarge: {
        fontFamily: 'Inter-Bold',
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
    itemCategoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemCategory: {
        fontFamily: 'Inter-Regular',
        fontSize: 12,
        color: '#8E8E93',
        marginLeft: 4,
    },
    itemDetailText: {
        fontFamily: 'Inter-Medium',
        fontSize: 13,
        color: '#555',
    },
});
