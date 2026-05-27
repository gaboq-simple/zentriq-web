import type { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Términos y Condiciones',
  description:
    'Términos y condiciones de uso de los servicios de ZENTRIQ MEXICO. ' +
    'Aplican las leyes de México.',
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

export default function TerminosPage() {
  return (
    <LegalLayout title="Términos y Condiciones" lastUpdated="26 de mayo de 2025" showDraftBanner>
      <Section title="1. Identificación del prestador">
        <p>
          Los presentes términos y condiciones regulan el uso de los servicios proporcionados por
          ZENTRIQ MEXICO (en adelante &quot;Zentriq&quot;), con domicilio en Ciudad de México,
          México. Para cualquier comunicación, puedes escribirnos a{' '}
          <a href="mailto:contacto@zentriq.mx" className="text-coral hover:text-deep-coral transition-colors">
            contacto@zentriq.mx
          </a>.
        </p>
      </Section>

      <Section title="2. Descripción del servicio">
        <p>
          Zentriq ofrece servicios de desarrollo de software a la medida y productos de
          tecnología, incluyendo Zlot, una plataforma SaaS de automatización de citas a través
          de la API oficial de WhatsApp Business. Zlot permite a negocios de servicios (barberías,
          salones, consultorios, entre otros) gestionar citas de forma automática mediante
          WhatsApp.
        </p>
      </Section>

      <Section title="3. Aceptación de los términos">
        <p>
          Al acceder o utilizar nuestros servicios, aceptas estos términos y condiciones en su
          totalidad. Si no estás de acuerdo con alguna disposición, debes abstenerte de utilizar
          nuestros servicios.
        </p>
      </Section>

      <Section title="4. Registro y cuentas">
        <p>
          Para utilizar ciertos servicios, es necesario crear una cuenta proporcionando
          información veraz y actualizada. El usuario es responsable de mantener la
          confidencialidad de sus credenciales de acceso y de todas las actividades que ocurran
          bajo su cuenta.
        </p>
      </Section>

      <Section title="5. Uso aceptable">
        <p>El usuario se compromete a:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Utilizar los servicios conforme a la legislación mexicana aplicable</li>
          <li>No enviar mensajes masivos no solicitados (spam) a través de la plataforma</li>
          <li>No utilizar los servicios para actividades ilícitas, fraudulentas o que violen derechos de terceros</li>
          <li>Cumplir con las políticas de uso de WhatsApp Business y Meta Platforms</li>
          <li>No intentar acceder de forma no autorizada a sistemas o datos de Zentriq o de otros usuarios</li>
          <li>Proporcionar información veraz y actualizada en su cuenta y comunicaciones</li>
        </ul>
      </Section>

      <Section title="6. Propiedad intelectual">
        <p>
          Todo el contenido, código fuente, diseño, marcas, logotipos y materiales disponibles
          en el sitio web y en los servicios de Zentriq son propiedad de ZENTRIQ MEXICO o de
          sus licenciantes, y están protegidos por las leyes de propiedad intelectual de México
          y tratados internacionales. Queda prohibida su reproducción, distribución o uso no
          autorizado.
        </p>
      </Section>

      <Section title="7. Niveles de servicio">
        <p>
          Zentriq se esfuerza por mantener la disponibilidad y calidad de sus servicios. Sin
          embargo, no garantiza la operación ininterrumpida o libre de errores. Los tiempos de
          respuesta y niveles de soporte específicos se establecerán en el acuerdo de servicio
          particular de cada cliente.
        </p>
      </Section>

      <Section title="8. Limitación de responsabilidad">
        <p>
          En la máxima medida permitida por la ley, Zentriq no será responsable por daños
          indirectos, incidentales, especiales o consecuentes que resulten del uso o la
          imposibilidad de uso de nuestros servicios. La responsabilidad total de Zentriq no
          excederá el monto pagado por el usuario en los últimos 12 meses por el servicio en
          cuestión.
        </p>
      </Section>

      <Section title="9. Protección de datos personales">
        <p>
          El tratamiento de datos personales se rige por nuestro{' '}
          <a href="/privacidad" className="text-coral hover:text-deep-coral transition-colors">
            Aviso de Privacidad
          </a>, el cual forma parte integral de estos términos.
        </p>
      </Section>

      <Section title="10. Terminación">
        <p>
          Zentriq se reserva el derecho de suspender o cancelar el acceso a los servicios en
          caso de incumplimiento de estos términos, uso indebido de la plataforma, o por razones
          operativas debidamente justificadas. El usuario puede cancelar su cuenta en cualquier
          momento contactando a{' '}
          <a href="mailto:contacto@zentriq.mx" className="text-coral hover:text-deep-coral transition-colors">
            contacto@zentriq.mx
          </a>.
        </p>
      </Section>

      <Section title="11. Modificaciones">
        <p>
          Zentriq se reserva el derecho de modificar estos términos en cualquier momento. Las
          modificaciones entrarán en vigor al ser publicadas en esta página. El uso continuado de
          los servicios después de la publicación de cambios constituye la aceptación de los
          mismos.
        </p>
      </Section>

      <Section title="12. Legislación aplicable y jurisdicción">
        <p>
          Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. Para la
          resolución de cualquier controversia derivada de estos términos, las partes se someten
          a la jurisdicción de los tribunales competentes de la Ciudad de México, renunciando a
          cualquier otro fuero que pudiera corresponderles.
        </p>
      </Section>

      <Section title="13. Contacto">
        <p>
          Para cualquier consulta sobre estos términos y condiciones:
        </p>
        <ul className="list-none pl-0 space-y-1 mt-3">
          <li><strong className="text-cream/90">Razón social:</strong> ZENTRIQ MEXICO</li>
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
