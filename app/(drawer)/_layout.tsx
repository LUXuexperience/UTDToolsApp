// En: app/(drawer)/_layout.tsx
import { Drawer } from 'expo-router/drawer';
import CustomDrawerContent from '../../components/CustomDrawerContent';

export default function AppDrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '85%',
          backgroundColor: '#fff',
        },
      }}
    >
      <Drawer.Screen name="(tabs)" />
    </Drawer>
  );
}