import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function PrestamosScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Préstamos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
  },
});
