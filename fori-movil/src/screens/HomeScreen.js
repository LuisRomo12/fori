import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Colors from '../theme/colors';
import { useAuth } from '../context/AuthContext';
import API_CONFIG from '../config/api';

export const HomeScreen = () => {
  const { userEmail, userToken, logout } = useAuth();
  const [testingApi, setTestingApi] = useState(false);
  const [serverStatus, setServerStatus] = useState(null);

  const handleTestBackend = async () => {
    setTestingApi(true);
    setServerStatus(null);
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/api/categorias`);
      if (response.ok) {
        const data = await response.json();
        setServerStatus({
          ok: true,
          message: `Backend conectado con éxito (${data.length} categorías sincronizadas en tiempo real).`,
        });
      } else {
        setServerStatus({
          ok: false,
          message: `Respuesta del backend con código: ${response.status}`,
        });
      }
    } catch (e) {
      setServerStatus({
        ok: false,
        message: `No se pudo alcanzar el backend en ${API_CONFIG.BASE_URL}`,
      });
    } finally {
      setTestingApi(false);
    }
  };

  const handleLogout = () => {
    Alert.alert('Cerrar Sesión', '¿Estás seguro de que deseas salir de tu cuenta?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Salir', style: 'destructive', onPress: logout },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Barra Superior */}
        <View style={styles.topBar}>
          <View style={styles.brandRow}>
            <Text style={styles.brandLogo}>🌹</Text>
            <Text style={styles.brandName}>
              UT<Text style={styles.brandAccent}>FLOWER</Text>
            </Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>

        {/* Tarjeta de Bienvenida del Usuario */}
        <View style={styles.welcomeCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.welcomeGreeting}>¡Bienvenido a Fori Móvil!</Text>
            <Text style={styles.userEmail}>{userEmail || 'cliente@fori.com'}</Text>
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Sesión Activa (JWT Validado)</Text>
            </View>
          </View>
        </View>

        {/* Verificación de Conexión en Tiempo Real */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Sincronización con Backend FastAPI</Text>
          <Text style={styles.sectionSubtitle}>
            Verifica la conexión viva con la base de datos de PostgreSQL compartida con la web.
          </Text>

          <TouchableOpacity
            style={[styles.testButton, testingApi && styles.testButtonDisabled]}
            onPress={handleTestBackend}
            disabled={testingApi}
          >
            {testingApi ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.testButtonText}>⚡ Probar Conexión con FastAPI</Text>
            )}
          </TouchableOpacity>

          {serverStatus && (
            <View
              style={[
                styles.statusBox,
                serverStatus.ok ? styles.statusBoxSuccess : styles.statusBoxError,
              ]}
            >
              <Text style={styles.statusBoxIcon}>{serverStatus.ok ? '✅' : '❌'}</Text>
              <Text
                style={[
                  styles.statusBoxMessage,
                  serverStatus.ok ? styles.statusSuccessText : styles.statusErrorText,
                ]}
              >
                {serverStatus.message}
              </Text>
            </View>
          )}
        </View>

        {/* Hoja de Ruta de Módulos Móviles de Fori */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Alcance de Módulos Móviles (B2C)</Text>
          <Text style={styles.sectionSubtitle}>
            Infraestructura nativa preparada para el despliegue de las siguientes fases:
          </Text>

          <View style={styles.moduleItem}>
            <Text style={styles.moduleIcon}>🔐</Text>
            <View style={styles.moduleContent}>
              <Text style={styles.moduleName}>1. Autenticación & Privacidad</Text>
              <Text style={styles.moduleDescription}>
                Registro con consentimiento explícito de datos, desafío humano y login seguro con JWT.
              </Text>
              <Text style={styles.moduleDoneBadge}>✓ Completado</Text>
            </View>
          </View>

          <View style={styles.moduleItem}>
            <Text style={styles.moduleIcon}>🌺</Text>
            <View style={styles.moduleContent}>
              <Text style={styles.moduleName}>2. Catálogo Dinámico Táctil</Text>
              <Text style={styles.moduleDescription}>
                Navegación por categorías de flores, filtros de precio y control de stock en tiempo real.
              </Text>
            </View>
          </View>

          <View style={styles.moduleItem}>
            <Text style={styles.moduleIcon}>🎨</Text>
            <View style={styles.moduleContent}>
              <Text style={styles.moduleName}>3. Constructor de Ramos (Core Táctil)</Text>
              <Text style={styles.moduleDescription}>
                Arrastrar y soltar flores, follajes y conos directamente con gestos táctiles.
              </Text>
            </View>
          </View>

          <View style={styles.moduleItem}>
            <Text style={styles.moduleIcon}>🛍️</Text>
            <View style={styles.moduleContent}>
              <Text style={styles.moduleName}>4. Checkout y Carrito Express</Text>
              <Text style={styles.moduleDescription}>
                Flujo simplificado de compra rápida para reducir el abandono en dispositivos móviles.
              </Text>
            </View>
          </View>

          <View style={styles.moduleItem}>
            <Text style={styles.moduleIcon}>📦</Text>
            <View style={styles.moduleContent}>
              <Text style={styles.moduleName}>5. Historial y Perfil de Direcciones</Text>
              <Text style={styles.moduleDescription}>
                Rastreo de pedidos activos y selección de direcciones con Google Maps.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandLogo: {
    fontSize: 24,
  },
  brandName: {
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    fontSize: 20,
    fontWeight: '700',
    color: Colors.primaryDark,
    letterSpacing: 1.5,
  },
  brandAccent: {
    color: Colors.primary,
  },
  logoutButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: Colors.primaryLight,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  logoutText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  welcomeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    shadowColor: Colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
    gap: 14,
  },
  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  avatarText: {
    fontSize: 24,
  },
  userInfo: {
    flex: 1,
  },
  welcomeGreeting: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  userEmail: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.success,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.success,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    shadowColor: Colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 14,
    lineHeight: 18,
  },
  testButton: {
    backgroundColor: Colors.accent,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  testButtonDisabled: {
    opacity: 0.6,
  },
  testButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  statusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    marginTop: 12,
    gap: 8,
    borderWidth: 1,
  },
  statusBoxSuccess: {
    backgroundColor: Colors.successBackground,
    borderColor: Colors.success,
  },
  statusBoxError: {
    backgroundColor: Colors.errorBackground,
    borderColor: Colors.error,
  },
  statusBoxIcon: {
    fontSize: 16,
  },
  statusBoxMessage: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
  },
  statusSuccessText: {
    color: Colors.success,
  },
  statusErrorText: {
    color: Colors.error,
  },
  moduleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  moduleIcon: {
    fontSize: 22,
    marginTop: 2,
  },
  moduleContent: {
    flex: 1,
  },
  moduleName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  moduleDescription: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  moduleDoneBadge: {
    alignSelf: 'flex-start',
    fontSize: 10,
    fontWeight: '700',
    color: Colors.success,
    backgroundColor: Colors.successBackground,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
  },
});

export default HomeScreen;
