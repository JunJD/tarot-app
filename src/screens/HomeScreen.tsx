import React from 'react';
import { View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { CardPicker } from '../components/CardPicker';
import { styles } from '../screens/styles';
import { StatusBar } from 'expo-status-bar';

export const HomeScreen = () => {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <SafeAreaView style={[styles.container]} edges={['top', 'bottom']}>
        <View style={styles.content}>
          <CardPicker />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}; 