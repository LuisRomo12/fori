import { Platform } from 'react-native';

/**
 * Configuración dinámica de la URL base para conectar con el backend FastAPI existente.
 * - Android Emulator: 10.0.2.2 apunta al localhost de la máquina anfitriona.
 * - iOS Simulator / Web: localhost.
 * - Dispositivo Físico: Usar la IP local de tu PC (ej: 192.168.1.X:8000).
 */
const getDefaultApiUrl = () => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:8000';
  }
  return 'http://127.0.0.1:8000';
};

export const API_CONFIG = {
  BASE_URL: getDefaultApiUrl(),
  ENDPOINTS: {
    REGISTER: '/api/register',
    LOGIN: '/api/login',
    PROFILE: '/api/user/direcciones',
    FLOWERS: '/api/flores',
    CATEGORIES: '/api/categorias',
    CART: '/api/user/carrito',
  },
  TIMEOUT: 10000,
};

// Permite actualizar la IP en tiempo de ejecución (útil al probar con teléfono físico)
export const setCustomBaseUrl = (newUrl) => {
  if (newUrl) {
    API_CONFIG.BASE_URL = newUrl.replace(/\/+$/, '');
  }
};

export default API_CONFIG;
