import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import {
  Section,
  P,
  UL,
  LI,
  Mail,
  Ext,
  Int,
} from "@/components/LegalContent";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Términos y Condiciones del Servicio de Zentriq México, S.A. de C.V. y de su producto Zlot.",
};

export default function TerminosPage() {
  return (
    <LegalLayout
      eyebrow="Términos y condiciones"
      title="Términos y Condiciones del Servicio"
      lastUpdated="29 de mayo de 2026"
    >
      <Section n={1} title="Identificación del titular">
        <P>
          Los presentes Términos y Condiciones del Servicio (los “Términos”) son
          ofrecidos por Zentriq México, S.A. de C.V. (“Zentriq”), con Registro
          Federal de Contribuyentes ZME2604287W4 y domicilio en Puerta de
          Temoaya 35, Bosque Esmeralda, Atizapán de Zaragoza, Estado de México,
          C.P. 52930. Para cualquier asunto relacionado con estos Términos,
          puede contactarnos en <Mail />.
        </P>
      </Section>

      <Section n={2} title="Objeto y aceptación">
        <P>
          Estos Términos regulan el acceso y uso de los productos y servicios de
          software ofrecidos por Zentriq (los “Servicios”) por parte de las
          personas que los contraten o utilicen (el “Cliente”). La contratación
          de los Servicios, el alta de una cuenta o el uso de cualquiera de las
          funcionalidades implica la aceptación plena y sin reservas de los
          presentes Términos.
        </P>
        <P>
          Si el Cliente no está de acuerdo con estos Términos, deberá abstenerse
          de contratar o utilizar los Servicios.
        </P>
      </Section>

      <Section n={3} title="Definiciones">
        <P>Para efectos de estos Términos:</P>
        <UL>
          <LI>
            Servicios: los productos y servicios de software ofrecidos por
            Zentriq, identificados en la cláusula 4 de los presentes Términos.
          </LI>
          <LI>
            Cliente: la persona física con actividad empresarial o persona moral
            que contrata o utiliza los Servicios.
          </LI>
          <LI>
            Usuario Final: las personas con las que el Cliente interactúa a
            través de los Servicios (por ejemplo, sus clientes, empleados o
            contactos).
          </LI>
          <LI>
            Cuenta: el perfil y credenciales mediante los cuales el Cliente
            accede a los Servicios.
          </LI>
          <LI>
            Contrato Individual: el contrato de prestación de servicios suscrito
            por separado entre Zentriq y el Cliente, cuando exista.
          </LI>
        </UL>
      </Section>

      <Section n={4} title="Productos y servicios cubiertos">
        <P>
          Estos Términos aplican a la generalidad de los productos y servicios
          de software ofrecidos por Zentriq. A la fecha de publicación, el
          producto principal de Zentriq es Zlot, una plataforma de software para
          la gestión de operaciones y servicios de negocios.
        </P>
        <P>
          Zentriq podrá incorporar nuevos productos o discontinuar los
          existentes en cualquier momento. La incorporación de nuevos productos
          quedará sujeta a estos Términos a partir de su publicación en el sitio
          web <Ext href="https://zentriq.mx/">https://zentriq.mx/</Ext>.
          Determinados productos podrán contar con condiciones particulares
          adicionales, las cuales prevalecerán sobre estos Términos generales
          únicamente respecto del producto al que se refieran.
        </P>
      </Section>

      <Section n={5} title="Naturaleza de los Servicios y elegibilidad">
        <P>
          Los Servicios están dirigidos exclusivamente a personas físicas con
          actividad empresarial y personas morales, para fines relacionados con
          la gestión de su negocio. Al contratar o utilizar los Servicios, el
          Cliente declara: (i) ser mayor de edad y contar con plena capacidad
          legal; (ii) en su caso, contar con las facultades suficientes para
          obligar a la persona moral que representa; y (iii) que la información
          que proporcione es veraz y actualizada.
        </P>
      </Section>

      <Section n={6} title="Registro y Cuenta del Cliente">
        <P>
          Para utilizar los Servicios, el Cliente contará con una Cuenta cuyo
          alta podrá realizarse directamente por el Cliente o mediante el proceso
          de onboarding gestionado por Zentriq. La Cuenta podrá incluir distintos
          perfiles de acceso con permisos diferenciados (por ejemplo, perfil
          administrador, perfil operativo, entre otros), conforme a la
          configuración disponible en los Servicios.
        </P>
        <P>
          El Cliente es el único responsable de: (i) mantener la confidencialidad
          de las credenciales de acceso, propias y de los perfiles que cree o
          autorice; (ii) la correcta asignación de perfiles y permisos a las
          personas que designe; (iii) la actividad realizada a través de la
          Cuenta y de cada uno de los perfiles asociados; y (iv) notificar a
          Zentriq de manera inmediata cualquier uso no autorizado o sospecha de
          vulneración de seguridad.
        </P>
        <P>
          Zentriq podrá rechazar el alta o suspender una Cuenta o un perfil
          específico cuando exista causa razonable, incluyendo la sospecha
          fundada de incumplimiento a estos Términos, a la normativa aplicable o
          a las políticas de terceros aplicables a los canales utilizados.
        </P>
      </Section>

      <Section
        n={7}
        title="Servicios prestados a través de canales de mensajería (WhatsApp Business Platform)"
      >
        <P>
          Determinados Servicios podrán prestarse, total o parcialmente,
          mediante la integración con plataformas de mensajería operadas por
          terceros, incluyendo WhatsApp Business Platform, operada por Meta
          Platforms, Inc. (“Meta”). En relación con dichos canales:
        </P>
        <P>
          a) Aceptación de términos del proveedor. El uso de WhatsApp Business
          como canal está sujeto, además de a estos Términos, a los términos y
          políticas vigentes de Meta, incluyendo de manera enunciativa los
          Términos Comerciales de WhatsApp, la Política Comercial y la Política
          de Plataforma de Mensajería, disponibles en{" "}
          <Ext href="https://www.whatsapp.com/legal/">
            https://www.whatsapp.com/legal/
          </Ext>{" "}
          y{" "}
          <Ext href="https://business.whatsapp.com/policy">
            https://business.whatsapp.com/policy
          </Ext>
          . El Cliente declara conocer y aceptar dichos términos y se obliga a
          cumplirlos en todo momento.
        </P>
        <P>
          b) Consentimiento de los Usuarios Finales (opt-in). El Cliente es el
          único responsable de obtener, conservar y, en su caso, acreditar el
          consentimiento válido (opt-in) de sus Usuarios Finales para recibir
          mensajes a través de WhatsApp Business, conforme a las políticas de
          Meta y a la legislación aplicable. Zentriq podrá requerir al Cliente la
          acreditación de dichos consentimientos.
        </P>
        <P>
          c) Reglas de comportamiento. El Cliente se obliga a no utilizar los
          Servicios para: (i) enviar comunicaciones no solicitadas, fraudulentas
          o engañosas; (ii) distribuir contenido ilícito, ofensivo,
          discriminatorio o que infrinja derechos de terceros; (iii) realizar
          prácticas contrarias a las políticas de Meta o de cualquier otro
          proveedor de canal utilizado; ni (iv) utilizar los Servicios para
          finalidades distintas a las contratadas.
        </P>
        <P>
          d) Suspensión por terceros. Las cuentas, números y comunicaciones
          operadas a través de WhatsApp Business pueden ser suspendidas,
          restringidas o terminadas por Meta conforme a sus propios términos, sin
          que ello sea imputable a Zentriq. Zentriq podrá suspender de forma
          inmediata la prestación de los Servicios cuando el Cliente incurra en
          incumplimientos a las políticas de Meta, para proteger la integridad
          operativa y reputacional de la plataforma.
        </P>
        <P>
          e) Tratamiento de datos. El tratamiento de los datos personales que
          circulen a través de estos canales se rige por el Aviso de Privacidad
          de Zentriq y, en su caso, por el contrato de encargado celebrado entre
          el Cliente y Zentriq, cuando Zentriq actúe como encargado respecto de
          los datos de los Usuarios Finales del Cliente.
        </P>
      </Section>

      <Section n={8} title="Obligaciones del Cliente y uso aceptable">
        <P>
          El Cliente se obliga a utilizar los Servicios conforme a la ley, la
          moral, el orden público y los presentes Términos. De manera enunciativa
          mas no limitativa, el Cliente se obliga a no:
        </P>
        <UL>
          <LI>
            Utilizar los Servicios con fines ilícitos, fraudulentos o contrarios
            a la buena fe.
          </LI>
          <LI>
            Introducir o difundir virus, código malicioso o cualquier elemento
            que pueda dañar los Servicios o los sistemas de Zentriq o de
            terceros.
          </LI>
          <LI>
            Realizar ingeniería inversa, descompilar, modificar, copiar o crear
            obras derivadas a partir del software, salvo en la medida permitida
            por la ley aplicable.
          </LI>
          <LI>
            Acceder o intentar acceder a áreas, sistemas o datos a los que no
            esté autorizado.
          </LI>
          <LI>
            Utilizar los Servicios para tratar categorías de datos cuya
            naturaleza requiera medidas especiales que excedan las contratadas
            (por ejemplo, datos personales sensibles), sin acuerdo previo con
            Zentriq.
          </LI>
          <LI>
            Revender, sublicenciar o ceder los Servicios a terceros sin
            autorización previa y por escrito de Zentriq.
          </LI>
        </UL>
      </Section>

      <Section n={9} title="Propiedad intelectual">
        <P>
          Todos los derechos de propiedad intelectual e industrial sobre los
          Servicios —incluyendo, de manera enunciativa mas no limitativa, el
          software, código fuente, interfaces, diseño, marcas (incluyendo
          “Zentriq” y “Zlot”), logotipos, nombres comerciales y documentación—
          son propiedad exclusiva de Zentriq o de sus licenciantes.
        </P>
        <P>
          Mientras esté vigente la relación entre el Cliente y Zentriq, el
          Cliente recibe una licencia limitada, no exclusiva, intransferible y
          revocable, para utilizar los Servicios únicamente conforme a estos
          Términos y, en su caso, al Contrato Individual. Esta licencia no
          transfiere ningún derecho de propiedad.
        </P>
        <P>
          Los datos e información que el Cliente cargue o genere a través de los
          Servicios (los “Datos del Cliente”) son y permanecerán como propiedad
          del Cliente. El Cliente otorga a Zentriq la licencia estrictamente
          necesaria para procesar dichos Datos del Cliente con el fin de prestar
          los Servicios.
        </P>
      </Section>

      <Section n={10} title="Datos personales y privacidad">
        <P>
          El tratamiento de los datos personales por parte de Zentriq se rige por
          el <Int href="/privacidad">Aviso de Privacidad</Int>.
        </P>
        <P>
          Cuando Zentriq trate datos personales de los Usuarios Finales del
          Cliente en el marco de los Servicios, lo hará en calidad de encargado
          del tratamiento, por cuenta y orden del Cliente, quien será el
          responsable frente a sus titulares. Las obligaciones específicas en
          esta materia se rigen por el Contrato Individual y, en su caso, por el
          anexo de encargo de tratamiento correspondiente.
        </P>
        <P>
          El Cliente declara y garantiza que cuenta con la base legal y los
          consentimientos necesarios para que Zentriq trate los datos de sus
          Usuarios Finales conforme a estos Términos.
        </P>
      </Section>

      <Section n={11} title="Tarifas, pago y facturación">
        <P>
          Las tarifas, modalidades de pago y términos de facturación aplicables a
          los Servicios son los previstos en el Contrato Individual celebrado con
          el Cliente o, en su defecto, en la cotización o plan vigente al momento
          de la contratación.
        </P>
        <P>
          Los medios de pago disponibles incluyen transferencia electrónica de
          fondos y, en su caso, pago con tarjeta a través de procesadores como
          Stripe y/o Mercado Pago. La falta de pago oportuno podrá dar lugar a la
          suspensión o terminación de los Servicios conforme a lo previsto en el
          Contrato Individual y/o a estos Términos.
        </P>
      </Section>

      <Section n={12} title="Vigencia, suspensión y terminación">
        <P>
          Estos Términos estarán vigentes mientras el Cliente mantenga una Cuenta
          activa o utilice los Servicios. Adicionalmente, los Servicios estarán
          sujetos a la vigencia y causas de terminación previstas en el Contrato
          Individual.
        </P>
        <P>
          Zentriq podrá suspender o terminar el acceso a los Servicios, total o
          parcialmente, en caso de: (i) incumplimiento por el Cliente a estos
          Términos o al Contrato Individual; (ii) incumplimiento a los términos o
          políticas de los proveedores de canal (incluyendo Meta); (iii)
          requerimiento de autoridad competente; o (iv) razones técnicas, de
          seguridad o de mantenimiento. Cuando sea razonablemente posible,
          Zentriq dará aviso previo al Cliente.
        </P>
      </Section>

      <Section n={13} title="Garantías limitadas y limitación de responsabilidad">
        <P>
          Zentriq prestará los Servicios con la diligencia técnica y profesional
          propia de la industria, pero no garantiza que los Servicios se
          encuentren libres de errores ni que su disponibilidad sea
          ininterrumpida. La disponibilidad, niveles de servicio y compromisos
          específicos serán los pactados en el Contrato Individual, en su caso.
        </P>
        <P>
          En la medida permitida por la ley, Zentriq no será responsable por
          daños indirectos, incidentales, especiales, consecuentes o lucro
          cesante derivados del uso o imposibilidad de uso de los Servicios. Las
          limitaciones de responsabilidad específicas serán las previstas en el
          Contrato Individual, las cuales prevalecerán sobre las contenidas en
          estos Términos.
        </P>
      </Section>

      <Section n={14} title="Indemnización">
        <P>
          El Cliente se obliga a sacar en paz y a salvo a Zentriq, sus
          accionistas, consejeros, funcionarios y empleados, frente a cualquier
          reclamación, daño, pérdida o gasto (incluidos honorarios razonables de
          abogados) derivados de: (i) el incumplimiento del Cliente a estos
          Términos, al Contrato Individual o a la legislación aplicable; (ii) el
          uso indebido de los Servicios por parte del Cliente o sus Usuarios
          Finales; (iii) el incumplimiento del Cliente a las políticas de Meta o
          de cualquier otro proveedor de canal utilizado; o (iv) la falta de
          consentimientos o avisos válidos respecto de los Usuarios Finales del
          Cliente.
        </P>
      </Section>

      <Section n={15} title="Modificaciones a los Términos">
        <P>
          Zentriq podrá modificar estos Términos en cualquier momento. Las
          modificaciones entrarán en vigor desde su publicación en el sitio web{" "}
          <Ext href="https://zentriq.mx/terminos">
            https://zentriq.mx/terminos
          </Ext>
          . Cuando las modificaciones impliquen cambios materiales, Zentriq
          procurará notificar previamente al Cliente por un medio razonable. El
          uso continuado de los Servicios con posterioridad a la publicación de
          las modificaciones implicará la aceptación de las mismas.
        </P>
      </Section>

      <Section n={16} title="Relación con el Contrato Individual">
        <P>
          En caso de existir un Contrato Individual entre Zentriq y el Cliente,
          dicho contrato regulará de forma íntegra la relación comercial
          específica entre las partes. En caso de conflicto o inconsistencia
          entre el Contrato Individual y estos Términos, el Contrato Individual
          prevalecerá respecto de las materias en él reguladas.
        </P>
      </Section>

      <Section n={17} title="Notificaciones">
        <P>
          Salvo que el Contrato Individual disponga otra cosa, las notificaciones
          que el Cliente deba hacer a Zentriq en virtud de estos Términos podrán
          enviarse al correo <Mail />. Zentriq podrá notificar al Cliente al
          correo registrado en su Cuenta o mediante avisos publicados en el sitio
          web.
        </P>
      </Section>

      <Section n={18} title="Cesión">
        <P>
          El Cliente no podrá ceder estos Términos ni los derechos u obligaciones
          derivados de los mismos, sin el consentimiento previo y por escrito de
          Zentriq. Zentriq podrá ceder estos Términos a sus afiliadas o a un
          sucesor en el marco de una reorganización corporativa o transmisión de
          negocio, previa notificación al Cliente.
        </P>
      </Section>

      <Section n={19} title="Ley aplicable y jurisdicción">
        <P>
          Estos Términos se rigen por la legislación aplicable en los Estados
          Unidos Mexicanos. Para la interpretación y cumplimiento de los mismos,
          las partes se someten expresamente a la jurisdicción de los tribunales
          competentes de la Ciudad de México, renunciando a cualquier otro fuero
          que pudiera corresponderles por razón de su domicilio presente o
          futuro. Lo anterior, salvo que el Contrato Individual establezca una
          jurisdicción distinta, en cuyo caso aquella prevalecerá.
        </P>
      </Section>

      <Section n={20} title="Disposiciones generales">
        <P>
          Si alguna disposición de estos Términos fuere declarada nula o
          inaplicable por una autoridad competente, las demás disposiciones
          permanecerán plenamente vigentes. La falta de ejercicio por parte de
          Zentriq de cualquier derecho previsto en estos Términos no implicará su
          renuncia.
        </P>
      </Section>
    </LegalLayout>
  );
}
