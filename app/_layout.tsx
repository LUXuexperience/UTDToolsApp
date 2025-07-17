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
    <Stack initialRouteName="(auth)">
      {/* Define el grupo de pantallas de autenticación */}
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      {/* Define el grupo de la app principal (el menú lateral) */}
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
