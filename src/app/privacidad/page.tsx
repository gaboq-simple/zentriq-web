import type { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Aviso de Privacidad',
  description:
    'Política de privacidad de ZENTRIQ MEXICO. Conoce cómo recopilamos, ' +
    'usamos y protegemos tus datos personales conforme a la LFPDPPP.',
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-heading text-cream text-body-lg font-medium tracking-tight mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function PrivacidadPage() {
  return (
    <LegalLayout title="Aviso de Privacidad" lastUpdated="26 de mayo de 2025" showDraftBanner>
      <Section title="1. Identidad del responsable">
        <p>
          ZENTRIQ MEXICO (en adelante &quot;Zentriq&quot;), con domicilio en Ciudad de
          México, México, es responsable del tratamiento de tus datos personales.
          Para cualquier consulta relacionada con este aviso, puedes contactarnos en{' '}
          <a href="mailto:contacto@zentriq.mx" className="text-coral hover:text-deep-coral transition-colors">
            contacto@zentriq.mx
          </a>.
        </p>
      </Section>

      <Section title="2. Datos personales que recopilamos">
        <p>Dependiendo del servicio utilizado, podemos recopilar los siguientes datos personales:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Nombre completo</li>
          <li>Número de teléfono</li>
          <li>Dirección de correo electrónico</li>
          <li>Nombre del negocio o establecimiento</li>
          <li>Datos de citas y reservaciones (fecha, hora, servicio solicitado)</li>
          <li>Mensajes intercambiados a través de WhatsApp Business API en el contexto del servicio</li>
          <li>Datos de uso y navegación del sitio web (cookies)</li>
        </ul>
      </Section>

      <Section title="3. Finalidad del tratamiento">
        <p>Tus datos personales serán utilizados para las siguientes finalidades:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Prestación del servicio contratado, incluyendo la gestión automatizada de citas vía WhatsApp</li>
          <li>Comunicación con clientes y usuarios sobre el estado de sus citas y servicios</li>
          <li>Envío de recordatorios y confirmaciones de citas</li>
          <li>Atención de solicitudes, quejas y soporte técnico</li>
          <li>Mejora de nuestros productos y servicios</li>
          <li>Cumplimiento de obligaciones legales</li>
        </ul>
      </Section>

      <Section title="4. Compartición de datos con terceros">
        <p>
          Para la prestación de nuestros servicios, compartimos datos con los siguientes terceros:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>
            <strong className="text-cream/90">Meta Platforms, Inc. (WhatsApp Business API):</strong> como
            plataforma de mensajería para la gestión automatizada de citas. Meta procesa los mensajes
            conforme a sus propias políticas de privacidad.
          </li>
          <li>
            <strong className="text-cream/90">Proveedores de infraestructura:</strong> servicios de
            hospedaje y almacenamiento de datos que operan bajo acuerdos de confidencialidad.
          </li>
        </ul>
        <p className="mt-3">
          No vendemos, alquilamos ni comercializamos tus datos personales con terceros para fines
          de mercadotecnia.
        </p>
      </Section>

      <Section title="5. Derechos ARCO">
        <p>
          Conforme a la Ley Federal de Protección de Datos Personales en Posesión de los
          Particulares (LFPDPPP), tienes derecho a:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li><strong className="text-cream/90">Acceso:</strong> conocer qué datos personales tenemos sobre ti</li>
          <li><strong className="text-cream/90">Rectificación:</strong> solicitar la corrección de tus datos</li>
          <li><strong className="text-cream/90">Cancelación:</strong> pedir la eliminación de tus datos</li>
          <li><strong className="text-cream/90">Oposición:</strong> oponerte al tratamiento de tus datos para fines específicos</li>
        </ul>
        <p className="mt-3">
          Para ejercer cualquiera de estos derechos, envía un correo electrónico a{' '}
          <a href="mailto:contacto@zentriq.mx" className="text-coral hover:text-deep-coral transition-colors">
            contacto@zentriq.mx
          </a>{' '}
          con el asunto &quot;Derechos ARCO&quot;, indicando tu nombre completo, el derecho que
          deseas ejercer, y una descripción clara de tu solicitud. Responderemos en un plazo
          máximo de 20 días hábiles.
        </p>
      </Section>

      <Section title="6. Cookies y tecnologías de rastreo">
        <p>
          Nuestro sitio web puede utilizar cookies y tecnologías similares para mejorar la
          experiencia de navegación, analizar el tráfico del sitio y personalizar contenido.
          Puedes configurar tu navegador para rechazar cookies, aunque esto podría afectar
          la funcionalidad del sitio.
        </p>
      </Section>

      <Section title="7. Seguridad de los datos">
        <p>
          Implementamos medidas de seguridad técnicas, administrativas y físicas para proteger
          tus datos personales contra daño, pérdida, alteración, destrucción o uso, acceso o
          tratamiento no autorizado.
        </p>
      </Section>

      <Section title="8. Modificaciones al aviso de privacidad">
        <p>
          Nos reservamos el derecho de modificar este aviso de privacidad en cualquier momento.
          Las modificaciones serán publicadas en esta misma página con la fecha de última
          actualización. Te recomendamos revisar periódicamente este aviso.
        </p>
      </Section>

      <Section title="9. Contacto">
        <p>
          Si tienes preguntas sobre este aviso de privacidad o sobre el tratamiento de tus datos
          personales, contáctanos en:
        </p>
        <ul className="list-none pl-0 space-y-1 mt-3">
          <li><strong className="text-cream/90">Responsable:</strong> ZENTRIQ MEXICO</li>
          <li><strong className="text-cream/90">Correo:</strong>{' '}
            <a href="mailto:contacto@zentriq.mx" className="text-coral hover:text-deep-coral transition-colors">
              contacto@zentriq.mx
            </a>
          </li>
          <li><strong className="text-cream/90">Ubicación:</strong> Ciudad de México, México</li>
        </ul>
      </Section>
    </LegalLayout>
  );
}
