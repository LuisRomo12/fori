import AsyncStorage from '@react-native-async-storage/async-storage';
import API_CONFIG from '../config/api';

const TOKEN_KEY = '@fori_token';
const USER_EMAIL_KEY = '@fori_user_email';
const PRIVACY_CONSENT_KEY = '@fori_privacy_consent';

/**
 * Guarda el token JWT y la sesión del usuario en AsyncStorage.
 */
export const storeSession = async (token, email) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    if (email) {
      await AsyncStorage.setItem(USER_EMAIL_KEY, email);
    }
  } catch (error) {
    console.error('Error guardando la sesión local:', error);
  }
};

/**
 * Obtiene el token JWT almacenado.
 */
export const getStoredToken = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error obteniendo token local:', error);
    return null;
  }
};

/**
 * Obtiene el email del usuario en sesión.
 */
export const getStoredUserEmail = async () => {
  try {
    return await AsyncStorage.getItem(USER_EMAIL_KEY);
  } catch (error) {
    return null;
  }
};

/**
 * Elimina la sesión actual (Logout).
 */
export const clearSession = async () => {
  try {
    await AsyncStorage.multiRemove([TOKEN_KEY, USER_EMAIL_KEY]);
  } catch (error) {
    console.error('Error cerrando sesión:', error);
  }
};

/**
 * Guarda el registro de consentimiento de privacidad del usuario.
 */
export const savePrivacyConsent = async (email) => {
  try {
    const consentData = {
      email,
      acceptedAt: new Date().toISOString(),
      consentGranted: true,
      version: '1.0',
    };
    await AsyncStorage.setItem(`${PRIVACY_CONSENT_KEY}_${email}`, JSON.stringify(consentData));
  } catch (e) {
    console.warn('No se pudo persistir el consentimiento de privacidad local:', e);
  }
};

/**
 * Realiza la petición de registro al backend FastAPI.
 * Endpoint: POST /api/register
 * Payload: { email, password, confirm_password, captcha_answer }
 */
export const registerUser = async ({ email, password, confirmPassword, captchaAnswer, privacyConsent }) => {
  if (!privacyConsent) {
    throw new Error('Es obligatorio leer y aceptar el Aviso de Privacidad y Consentimiento de Datos.');
  }

  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REGISTER}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        password: password,
        confirm_password: confirmPassword,
        captcha_answer: parseInt(captchaAnswer, 10),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data?.detail || 'Error en el registro de usuario';
      throw new Error(errorMsg);
    }

    // Guardar constancia de consentimiento para auditoría de privacidad
    await savePrivacyConsent(email.trim().toLowerCase());

    return data;
  } catch (error) {
    if (error.message.includes('Network request failed') || error.name === 'TypeError') {
      throw new Error(`No se pudo conectar con el servidor en ${API_CONFIG.BASE_URL}. Verifica que el backend esté ejecutándose.`);
    }
    throw error;
  }
};

/**
 * Realiza el inicio de sesión del usuario registrado.
 * Endpoint: POST /api/login
 * Payload: { email, password }
 */
export const loginUser = async ({ email, password }) => {
  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGIN}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        password: password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401 || response.status === 400) {
        throw new Error('El correo electrónico o la contraseña son incorrectos.');
      }
      throw new Error(data?.detail || 'Error al iniciar sesión');
    }

    // data: { access_token, token_type: "bearer" }
    await storeSession(data.access_token, email.trim().toLowerCase());

    return {
      token: data.access_token,
      email: email.trim().toLowerCase(),
    };
  } catch (error) {
    if (error.message.includes('Network request failed') || error.name === 'TypeError') {
      throw new Error(`No se pudo conectar con el servidor en ${API_CONFIG.BASE_URL}. Verifica que el backend esté ejecutándose.`);
    }
    throw error;
  }
};
