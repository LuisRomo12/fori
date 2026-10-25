# Fori Móvil 📱🌹 (UTFlower)

Aplicación móvil nativa en **React Native / Expo** para la floristería **Fori**. Esta solución se conecta directamente con la infraestructura backend existente en **FastAPI** y la base de datos **PostgreSQL**.

---

## 📌 Módulos Implementados en esta Fase

### 1. 📝 Registro por parte del Usuario
- Formulario de registro nativo optimizado para móviles:
  - Correo electrónico (validación de formato RFC).
  - Contraseña segura (mínimo 8 caracteres) con opción para mostrar/ocultar.
  - Confirmación de contraseña.
  - **Desafío Humano (Captcha):** Integrado con la lógica requerida por el backend FastAPI (`captcha_answer = 8`).
- Conexión al endpoint `POST /api/register`.
- Almacenamiento seguro del correo y confirmación de alta en la base de datos PostgreSQL.

### 2. 📋 Aviso y Consentimiento de Uso de Datos Personales
- Modal y componente interactivo con el **Aviso de Privacidad Integral** conforme a la legislación de protección de datos personales.
- Detalla:
  - Identidad del responsable (**Florería Fori**).
  - Finalidades primarias (procesamiento de pedidos, confección de ramos personalizados, logística de entregas a domicilio).
  - Finalidades secundarias (promociones, avisos de temporadas como San Valentín o Día de las Madres).
  - Medidas de cifrado de credenciales (bcrypt + JWT) y ejercicio de derechos ARCO.
- **Consentimiento obligatorio:** Casilla interactiva (*checkbox*) que bloquea el registro hasta que el usuario otorga su consentimiento expreso e informado.

### 3. 🔐 Ingreso (Login) por parte del Usuario Registrado
- Formulario de acceso con correo y contraseña.
- Conexión al endpoint `POST /api/login`.
- Almacenamiento persistente del token JWT mediante `@react-native-async-storage/async-storage`.
- Manejo de sesión activa automática al abrir la app.
- Función de **Cerrar Sesión** (*Logout*) con revocación del token local.
- Selector rápido de IP del servidor backend (para cambiar entre emulador Android `10.0.2.2`, localhost o dispositivo físico por WiFi).

---

## 🚀 Cómo Iniciar la App Móvil

### Prerrequisitos
- Tener el backend de FastAPI en ejecución:
  ```bash
  cd backend
  uvicorn main:app --reload --host 0.0.0.0 --port 8000
  ```

### Instalación y Ejecución de la App
1. Entra a la carpeta móvil:
   ```bash
   cd fori-movil
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo de Expo:
   ```bash
   npm start
   ```
4. Opciones de visualización:
   - **En tu teléfono físico:** Descarga la app **Expo Go** (disponible gratis en Google Play y App Store) y escanea el código QR que aparecerá en tu terminal.
   - **En emulador Android:** Presiona `a` en la terminal.
   - **En simulador iOS (Mac):** Presiona `i` en la terminal.
   - **En el navegador web:** Presiona `w` en la terminal.

---

## 📂 Estructura del Proyecto Móvil

```
fori-movil/
├── App.js                         # Entrada principal con navegación por estados
├── app.json                       # Configuración de Expo
├── package.json                   # Dependencias de React Native y Expo
└── src/
    ├── api/
    │   └── auth.js                # Servicios REST para /api/register y /api/login
    ├── components/
    │   └── PrivacyNoticeModal.js  # Aviso de Privacidad y Consentimiento Legal
    ├── config/
    │   └── api.js                 # Configuración de URL base (10.0.2.2 / LAN / localhost)
    ├── context/
    │   └── AuthContext.js         # Estado global de sesión y persistencia JWT
    ├── screens/
    │   ├── auth/
    │   │   ├── LoginScreen.js     # Pantalla de Ingreso
    │   │   └── RegisterScreen.js  # Pantalla de Registro con consentimiento
    │   └── HomeScreen.js          # Pantalla autenticada con comprobación de backend
    └── theme/
        └── colors.js              # Paleta de diseño floral de Fori
```
