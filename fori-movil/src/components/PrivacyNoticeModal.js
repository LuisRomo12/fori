import React from 'react';
import {
  Modal,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Colors from '../theme/colors';

export const PrivacyNoticeModal = ({ visible, onClose, onAccept }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header del Modal */}
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <Text style={styles.icon}>📋</Text>
              <View>
                <Text style={styles.headerTitle}>Aviso de Privacidad</Text>
                <Text style={styles.headerSubtitle}>y Consentimiento de Uso de Datos Personales</Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeIconButton}>
              <Text style={styles.closeIconText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Cuerpo del Aviso (Scrollable) */}
          <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={true}>
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>Última actualización: Octubre 2026</Text>
            </View>

            <Text style={styles.paragraph}>
              En cumplimiento con la legislación aplicable en materia de Protección de Datos Personales,
              <Text style={styles.boldText}> Florería Fori (UTFlower)</Text>, pone a su disposición el
              presente Aviso de Privacidad Integral con el objeto de informarle de manera transparente
              el tratamiento que se dará a sus datos recabados a través de esta aplicación móvil.
            </Text>

            <Text style={styles.sectionTitle}>1. Identidad y Domicilio del Responsable</Text>
            <Text style={styles.paragraph}>
              Florería Fori es responsable del uso, almacenamiento y debida protección de los datos personales
              proporcionados por el usuario para la adquisición, personalización y entrega de arreglos florales.
            </Text>

            <Text style={styles.sectionTitle}>2. Datos Personales Recabados</Text>
            <Text style={styles.paragraph}>
              Para brindar nuestros servicios de comercio electrónico, recopilamos los siguientes datos:
            </Text>
            <View style={styles.bulletList}>
              <Text style={styles.bulletItem}>• <Text style={styles.boldText}>Datos de Identificación y Acceso:</Text> Correo electrónico y contraseña cifrada con algoritmos criptográficos (bcrypt).</Text>
              <Text style={styles.bulletItem}>• <Text style={styles.boldText}>Datos de Contacto y Entrega:</Text> Domicilio particular o laboral, referencias geográficas y teléfono de contacto para el destinatario.</Text>
              <Text style={styles.bulletItem}>• <Text style={styles.boldText}>Datos de Compra y Personalización:</Text> Diseños creados en el "Constructor de Ramos", historial de pedidos y productos favoritos.</Text>
            </View>

            <Text style={styles.sectionTitle}>3. Finalidades del Tratamiento de Datos</Text>
            <Text style={styles.subSectionTitle}>A. Finalidades Primarias (Necesarias para el servicio):</Text>
            <View style={styles.bulletList}>
              <Text style={styles.bulletItem}>• Registro, autenticación y mantenimiento de su cuenta de cliente en la App.</Text>
              <Text style={styles.bulletItem}>• Procesamiento de pedidos en línea y confección de ramos personalizados.</Text>
              <Text style={styles.bulletItem}>• Coordinación logística y entrega puntual de flores a los domicilios indicados.</Text>
              <Text style={styles.bulletItem}>• Emisión de comprobantes de compra y atención al cliente.</Text>
            </View>

            <Text style={styles.subSectionTitle}>B. Finalidades Secundarias (Opcionales):</Text>
            <View style={styles.bulletList}>
              <Text style={styles.bulletItem}>• Envío de promociones especiales y recordatorios de fechas conmemorativas (San Valentín, Día de las Madres, aniversarios).</Text>
              <Text style={styles.bulletItem}>• Evaluaciones de calidad del servicio e invitaciones a valorar los arreglos florales.</Text>
            </View>

            <Text style={styles.sectionTitle}>4. Medidas de Seguridad y Cifrado</Text>
            <Text style={styles.paragraph}>
              Sus contraseñas nunca son legibles por el personal de Florería Fori; se procesan mediante funciones
              hash unidireccionales seguras. Las comunicaciones entre la aplicación móvil y nuestros servidores
              se realizan bajo protocolos cifrados y tokens de sesión JWT temporales.
            </Text>

            <Text style={styles.sectionTitle}>5. Derechos ARCO</Text>
            <Text style={styles.paragraph}>
              Usted tiene derecho a conocer qué datos tenemos (Acceso), solicitar su corrección (Rectificación),
              eliminación de nuestras bases (Cancelación) u oponerse a su uso para fines específicos (Oposición).
              Puede ejercer estos derechos desde la sección de Perfil de la app o enviando una solicitud a soporte@fori.com.
            </Text>

            <View style={styles.declarationBox}>
              <Text style={styles.declarationTitle}>Consentimiento Expreso e Informado</Text>
              <Text style={styles.declarationText}>
                Al presionar "Acepto el Aviso de Privacidad", usted declara que ha leído, comprendido y otorga su
                consentimiento libre, específico e informado para que Florería Fori trate sus datos personales conforme a los
                términos aquí expuestos.
              </Text>
            </View>
          </ScrollView>

          {/* Footer de Acciones */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cerrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={() => {
                onAccept();
                onClose();
              }}
            >
              <Text style={styles.acceptButtonText}>Aceptar Consentimiento</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    padding: 16,
  },
  modalContainer: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 20,
    maxHeight: '90%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    backgroundColor: Colors.primaryLight,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  icon: {
    fontSize: 26,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  headerSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  closeIconButton: {
    padding: 8,
  },
  closeIconText: {
    fontSize: 18,
    color: Colors.textSecondary,
    fontWeight: 'bold',
  },
  contentScroll: {
    padding: 20,
  },
  badgeContainer: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.accentLight,
    borderColor: Colors.accent,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 14,
  },
  badgeText: {
    fontSize: 11,
    color: Colors.accent,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.primaryDark,
    marginTop: 16,
    marginBottom: 6,
  },
  subSectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginTop: 8,
    marginBottom: 4,
  },
  paragraph: {
    fontSize: 13,
    lineHeight: 20,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  boldText: {
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  bulletList: {
    paddingLeft: 4,
    marginBottom: 10,
  },
  bulletItem: {
    fontSize: 13,
    lineHeight: 19,
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  declarationBox: {
    backgroundColor: Colors.primaryLight,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    padding: 14,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 24,
  },
  declarationTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primaryDark,
    marginBottom: 4,
  },
  declarationText: {
    fontSize: 12,
    lineHeight: 18,
    color: Colors.textPrimary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    backgroundColor: '#FAFAFA',
    gap: 12,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  acceptButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  acceptButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default PrivacyNoticeModal;
