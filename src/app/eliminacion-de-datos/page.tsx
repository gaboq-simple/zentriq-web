import type { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Eliminación de Datos de Usuario',
  description:
    'Solicita la eliminación completa de tus datos personales de los ' +
    'servicios de ZENTRIQ MEXICO.',
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

export default function EliminacionDeDatosPage() {
  return (
    <LegalLayout title="Eliminación de Datos de Usuario" lastUpdated="26 de mayo de 2026">
      <Section title="Tu derecho a la eliminación de datos">
        <p>
          En ZENTRIQ MEXICO respetamos tu derecho a solicitar la eliminación completa de tus
          datos personales de nuestros sistemas, conforme a la Ley Federal de Protección de
          Datos Personales en Posesión de los Particulares (LFPDPPP).
        </p>
      </Section>

      <Section title="¿Cómo solicitar la eliminación de tus datos?">
        <p>
          Envía un correo electrónico a{' '}
          <a href="mailto:contacto@zentriq.mx" className="text-coral hover:text-deep-coral transition-colors">
            contacto@zentriq.mx
          </a>{' '}
          con el siguiente formato:
        </p>
        <div className="mt-4 border border-cream/10 bg-cream/[0.03] rounded-sm p-5 space-y-2">
          <p><strong className="text-cream/90">Asunto:</strong> Solicitud de eliminación de datos</p>
          <p><strong className="text-cream/90">Contenido:</strong></p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Nombre completo del titular de los datos</li>
            <li>Número de teléfono asociado a la cuenta</li>
            <li>Correo electrónico asociado a la cuenta (si aplica)</li>
            <li>Nombre del negocio (si aplica)</li>
            <li>Descripción de los datos que deseas eliminar, o indicación de que deseas la eliminación total</li>
          </ul>
        </div>
      </Section>

      <Section title="¿Qué datos se eliminan?">
        <p>Al procesar tu solicitud, identificamos y eliminamos de nuestros sistemas:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Nombre y datos de contacto (teléfono, correo electrónico)</li>
          <li>Historial de citas y reservaciones</li>
          <li>Mensajes de WhatsApp almacenados en nuestra plataforma</li>
          <li>Datos del perfil de negocio (para cuentas de negocio)</li>
          <li>Registros de uso de la plataforma</li>
        </ul>
      </Section>

      <Section title="Plazo de procesamiento">
        <p>
          Tu solicitud será procesada en un plazo máximo de <strong className="text-cream/90">30 días
          hábiles</strong> a partir de la recepción del correo electrónico. Una vez completada la
          eliminación, te enviaremos una confirmación por correo electrónico.
        </p>
      </Section>

      <Section title="Información importante">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            La eliminación de datos es <strong className="text-cream/90">irreversible</strong>. Una
            vez procesada, no podremos recuperar la información eliminada.
          </li>
          <li>
            Es posible que debamos conservar ciertos datos por obligaciones legales o fiscales,
            en cuyo caso te informaremos qué datos se retienen y por cuánto tiempo.
          </li>
          <li>
            La eliminación de datos almacenados en la plataforma de WhatsApp/Meta se rige por
            las políticas propias de Meta Platforms, Inc. y es independiente de este proceso.
          </li>
          <li>
            Si tienes una suscripción activa, la eliminación de datos implicará la cancelación
            del servicio.
          </li>
        </ul>
      </Section>

      <Section title="Contacto">
        <p>
          Si tienes preguntas sobre el proceso de eliminación de datos:
        </p>
        <ul className="list-none pl-0 space-y-1 mt-3">
          <li><strong className="text-cream/90">Correo:</strong>{' '}
            <a href="mailto:contacto@zentriq.mx" className="text-coral hover:text-deep-coral transition-colors">
              contacto@zentriq.mx
            </a>
          </li>
          <li><strong className="text-cream/90">Responsable:</strong> ZENTRIQ MEXICO</li>
          <li><strong className="text-cream/90">Ubicación:</strong> Ciudad de México, México</li>
        </ul>
      </Section>
    </LegalLayout>
  );
}
