// En: app/_layout.tsx
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('../assets/fonts/Inter_28pt-Regular.ttf'),
    'Inter-Medium': require('../assets/fonts/Inter_28pt-Medium.ttf'),
    'Inter-SemiBold': require('../assets/fonts/Inter_28pt-SemiBoldItalic.ttf'),
    'Inter-Bold': require('../assets/fonts/Inter_28pt-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    // --- CAMBIO: La ruta inicial ahora es "splash" ---
    <Stack initialRouteName="splash">
      {/* Se definen TODAS las rutas de nivel superior que la app puede tener */}
      <Stack.Screen name="splash" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
