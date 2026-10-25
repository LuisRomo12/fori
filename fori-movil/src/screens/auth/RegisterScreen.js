import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import Colors from '../../theme/colors';
import { useAuth } from '../../context/AuthContext';
import PrivacyNoticeModal from '../../components/PrivacyNoticeModal';

export const RegisterScreen = ({ onNavigateToLogin }) => {
  const { register } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Consentimiento de datos personales
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  // Estados de interfaz
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Validar Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'El correo electrónico es requerido.';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Ingresa un correo electrónico válido.';
    }

    // Validar Contraseña
    if (!password) {
      newErrors.password = 'La contraseña es requerida.';
    } else if (password.length < 8) {
      newErrors.password = 'La contraseña debe tener mínimo 8 caracteres.';
    }

    // Validar Confirmación
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Debes confirmar la contraseña.';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden.';
    }

    // Validar Captcha
    if (!captchaAnswer.trim()) {
      newErrors.captcha = 'Resuelve el desafío humano.';
    } else if (parseInt(captchaAnswer, 10) !== 8) {
      newErrors.captcha = 'Respuesta incorrecta. Pista: 5 + 3 = 8.';
    }

    // Validar Consentimiento de Privacidad
    if (!privacyAccepted) {
      newErrors.privacy = 'Debes aceptar el Aviso de Privacidad y Consentimiento de Datos para continuar.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      if (!privacyAccepted) {
        Alert.alert(
          'Aviso de Privacidad Requerido',
          'Para crear tu cuenta en Florería Fori, es indispensable leer y otorgar tu consentimiento para el tratamiento de tus datos personales conforme a la ley.',
          [
            { text: 'Ver Aviso', onPress: () => setShowPrivacyModal(true) },
            { text: 'Entendido', style: 'cancel' },
          ]
        );
      }
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await register({
        email,
        password,
        confirmPassword,
        captchaAnswer,
        privacyConsent: privacyAccepted,
      });

      Alert.alert(
        '¡Registro Exitoso! 🌸',
        'Tu cuenta ha sido creada exitosamente en Florería Fori. Ahora puedes iniciar sesión con tus credenciales.',
        [
          {
            text: 'Ir a Iniciar Sesión',
            onPress: () => onNavigateToLogin(email),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error en el Registro', error.message || 'No fue posible completar el registro.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardContainer}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Floral */}
          <View style={styles.header}>
            <View style={styles.logoBadge}>
              <Text style={styles.logoEmoji}>🌹</Text>
            </View>
            <Text style={styles.brandTitle}>
              UT<Text style={styles.brandAccent}>FLOWER</Text>
            </Text>
            <Text style={styles.screenTitle}>Crear Nueva Cuenta</Text>
            <Text style={styles.screenSubtitle}>
              Únete a Fori y crea tus ramos de flores personalizados
            </Text>
          </View>

          {/* Formulario */}
          <View style={styles.formCard}>
            {/* Campo: Correo */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Correo Electrónico *</Text>
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="ejemplo@correo.com"
                placeholderTextColor={Colors.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
                }}
              />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            {/* Campo: Contraseña */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Contraseña *</Text>
              <View style={styles.passwordWrapper}>
                <TextInput
                  style={[styles.input, styles.passwordInput, errors.password && styles.inputError]}
                  placeholder="Mínimo 8 caracteres"
                  placeholderTextColor={Colors.textMuted}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
                  }}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '🙈'}</Text>
                </TouchableOpacity>
              </View>
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>

            {/* Campo: Confirmar Contraseña */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirmar Contraseña *</Text>
              <View style={styles.passwordWrapper}>
                <TextInput
                  style={[
                    styles.input,
                    styles.passwordInput,
                    errors.confirmPassword && styles.inputError,
                  ]}
                  placeholder="Repite tu contraseña"
                  placeholderTextColor={Colors.textMuted}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    if (errors.confirmPassword)
                      setErrors((prev) => ({ ...prev, confirmPassword: null }));
                  }}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Text style={styles.eyeIcon}>{showConfirmPassword ? '👁️' : '🙈'}</Text>
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}
            </View>

            {/* Desafío Humano (Captcha FastAPI) */}
            <View style={styles.captchaBox}>
              <View style={styles.captchaHeader}>
                <Text style={styles.captchaIcon}>🛡️</Text>
                <Text style={styles.captchaTitle}>Desafío de Seguridad Humana</Text>
              </View>
              <Text style={styles.captchaQuestion}>¿Cuánto es 5 + 3?</Text>
              <TextInput
                style={[styles.captchaInput, errors.captcha && styles.inputError]}
                placeholder="Escribe el resultado numérico"
                placeholderTextColor={Colors.textMuted}
                keyboardType="numeric"
                value={captchaAnswer}
                onChangeText={(text) => {
                  setCaptchaAnswer(text);
                  if (errors.captcha) setErrors((prev) => ({ ...prev, captcha: null }));
                }}
              />
              {errors.captcha && <Text style={styles.errorText}>{errors.captcha}</Text>}
            </View>

            {/* AVISO Y CONSENTIMIENTO DE USO DE DATOS PERSONALES */}
            <View style={styles.consentContainer}>
              <TouchableOpacity
                style={styles.checkboxTouchable}
                activeOpacity={0.7}
                onPress={() => {
                  const nextState = !privacyAccepted;
                  setPrivacyAccepted(nextState);
                  if (nextState && errors.privacy) {
                    setErrors((prev) => ({ ...prev, privacy: null }));
                  }
                }}
              >
                <View style={[styles.checkbox, privacyAccepted && styles.checkboxActive]}>
                  {privacyAccepted && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.consentLabel}>
                  Otorgo mi consentimiento expreso para el tratamiento de mis datos personales conforme al{' '}
                  <Text
                    style={styles.linkText}
                    onPress={(e) => {
                      e.stopPropagation();
                      setShowPrivacyModal(true);
                    }}
                  >
                    Aviso de Privacidad Integral de Florería Fori
                  </Text>
                  .
                </Text>
              </TouchableOpacity>
              {errors.privacy && <Text style={styles.errorText}>{errors.privacy}</Text>}

              <TouchableOpacity
                style={styles.readNoticeBadge}
                onPress={() => setShowPrivacyModal(true)}
              >
                <Text style={styles.readNoticeBadgeText}>📖 Leer Aviso de Privacidad Completo</Text>
              </TouchableOpacity>
            </View>

            {/* Botón de Envío */}
            <TouchableOpacity
              style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
              onPress={handleRegister}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.submitButtonText}>Finalizar Registro</Text>
              )}
            </TouchableOpacity>

            {/* Enlace a Login */}
            <View style={styles.footerRow}>
              <Text style={styles.footerText}>¿Ya tienes una cuenta registrada? </Text>
              <TouchableOpacity onPress={() => onNavigateToLogin(email)}>
                <Text style={styles.footerLink}>Inicia Sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modal del Aviso de Privacidad */}
      <PrivacyNoticeModal
        visible={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
        onAccept={() => {
          setPrivacyAccepted(true);
          if (errors.privacy) {
            setErrors((prev) => ({ ...prev, privacy: null }));
          }
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  logoEmoji: {
    fontSize: 28,
  },
  brandTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    fontSize: 20,
    fontWeight: '700',
    color: Colors.primaryDark,
    letterSpacing: 2,
    marginBottom: 4,
  },
  brandAccent: {
    color: Colors.primary,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginTop: 6,
    marginBottom: 4,
  },
  screenSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  formCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 20,
    padding: 22,
    shadowColor: Colors.primaryDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: Colors.textPrimary,
  },
  passwordWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  passwordInput: {
    paddingRight: 45,
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    padding: 8,
  },
  eyeIcon: {
    fontSize: 16,
  },
  inputError: {
    borderColor: Colors.error,
    backgroundColor: Colors.errorBackground,
  },
  errorText: {
    color: Colors.error,
    fontSize: 11,
    marginTop: 4,
    fontWeight: '500',
  },
  captchaBox: {
    backgroundColor: Colors.accentLight,
    borderWidth: 1.5,
    borderColor: Colors.accent,
    borderRadius: 14,
    padding: 14,
    marginBottom: 18,
  },
  captchaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  captchaIcon: {
    fontSize: 16,
  },
  captchaTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.accent,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  captchaQuestion: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginVertical: 4,
  },
  captchaInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6B88A',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: Colors.textPrimary,
    marginTop: 4,
  },
  consentContainer: {
    marginBottom: 20,
    paddingTop: 4,
  },
  checkboxTouchable: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.8,
    borderColor: Colors.borderFocused,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkboxActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },
  consentLabel: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: Colors.textPrimary,
  },
  linkText: {
    color: Colors.primary,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  readNoticeBadge: {
    marginTop: 8,
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: Colors.primaryLight,
    borderRadius: 8,
  },
  readNoticeBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonDisabled: {
    opacity: 0.65,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
    flexWrap: 'wrap',
  },
  footerText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  footerLink: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
