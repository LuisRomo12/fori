import React, { useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, StatusBar } from 'react-native';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import Colors from './src/theme/colors';

const MainNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [currentScreen, setCurrentScreen] = useState('login'); // 'login' | 'register'
  const [prefilledEmail, setPrefilledEmail] = useState('');

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingEmoji}>🌸</Text>
        <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 12 }} />
        <Text style={styles.loadingText}>Iniciando Fori Móvil...</Text>
      </View>
    );
  }

  // Si el usuario ya está autenticado (token guardado o login exitoso)
  if (isAuthenticated) {
    return <HomeScreen />;
  }

  // Flujo de Autenticación
  if (currentScreen === 'register') {
    return (
      <RegisterScreen
        onNavigateToLogin={(email) => {
          if (email) setPrefilledEmail(email);
          setCurrentScreen('login');
        }}
      />
    );
  }

  return (
    <LoginScreen
      initialEmail={prefilledEmail}
      onNavigateToRegister={() => setCurrentScreen('register')}
    />
  );
};

export default function App() {
  return (
    <AuthProvider>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <MainNavigator />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  loadingEmoji: {
    fontSize: 48,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
});
