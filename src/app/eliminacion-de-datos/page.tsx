import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import {
  Section,
  P,
  UL,
  LI,
  Mail,
  Int,
  Callout,
} from "@/components/LegalContent";

export const metadata: Metadata = {
  title: "Eliminación de Datos",
  description:
    "Procedimiento para solicitar la eliminación de datos personales tratados por Zentriq México, S.A. de C.V.",
};

export default function EliminacionDeDatosPage() {
  return (
    <LegalLayout
      eyebrow="Eliminación de datos"
      title="Instrucciones de eliminación de datos"
      lastUpdated="29 de mayo de 2026"
    >
      <Section n={1} title="Identificación del responsable">
        <P>
          Zentriq México, S.A. de C.V. (“Zentriq”), con Registro Federal de
          Contribuyentes ZME2604287W4 y domicilio en Puerta de Temoaya 35,
          Bosque Esmeralda, Atizapán de Zaragoza, Estado de México, C.P. 52930,
          es la entidad responsable del tratamiento de los datos personales que
          se describen en su Aviso de Privacidad. Para asuntos relacionados con
          la eliminación de sus datos, puede contactarnos en <Mail />.
        </P>
      </Section>

      <Section n={2} title="Objeto de estas instrucciones">
        <P>
          El presente documento describe el procedimiento mediante el cual
          cualquier persona puede solicitar a Zentriq la eliminación de sus
          datos personales. Estas instrucciones forman parte del derecho de
          Cancelación previsto en la Ley Federal de Protección de Datos
          Personales en Posesión de los Particulares (la “Ley”) y se publican
          adicionalmente para facilitar el ejercicio de este derecho a los
          usuarios que interactúan con servicios prestados a través de
          plataformas de terceros, incluyendo WhatsApp Business Platform operada
          por Meta Platforms, Inc. (“Meta”).
        </P>
      </Section>

      <Section n={3} title="¿A quién aplican estas instrucciones?">
        <P>
          Estas instrucciones aplican a dos perfiles de personas, con un
          procedimiento distinto en cada caso:
        </P>
        <P>
          a) Titulares directos. Si usted es visitante del sitio web de Zentriq,
          prospecto a través del formulario de contacto, cliente de Zentriq o
          representante de un cliente, Zentriq actúa como responsable de sus
          datos y atenderá su solicitud directamente.
        </P>
        <P>
          b) Usuarios finales de clientes de Zentriq. Si usted interactuó a
          través de WhatsApp Business u otro canal con un negocio que utiliza los
          servicios de Zentriq, Zentriq actúa como encargado del tratamiento por
          cuenta y orden de ese negocio, quien es el responsable de sus datos. En
          este supuesto, Zentriq: (i) eliminará los datos que mantenga de su lado
          conforme a las instrucciones del responsable; y (ii) coordinará con el
          responsable la atención de su solicitud. Le recomendamos contactar
          adicionalmente al negocio con el que interactuó.
        </P>
      </Section>

      <Section n={4} title="Cómo solicitar la eliminación de sus datos">
        <P>
          Para solicitar la eliminación de sus datos personales, envíe un correo
          electrónico a <Mail /> con el asunto: “Solicitud de eliminación de
          datos personales”.
        </P>
        <P>
          Su solicitud deberá contener la información mínima señalada en la
          cláusula 5, así como, en su caso, la documentación que acredite su
          identidad.
        </P>
      </Section>

      <Section n={5} title="Información que debe incluir su solicitud">
        <P>
          Para que Zentriq pueda atender adecuadamente su solicitud, le pedimos
          incluir:
        </P>
        <UL>
          <LI>Nombre completo del titular.</LI>
          <LI>
            Correo electrónico y/o número de teléfono asociado a los datos cuya
            eliminación solicita.
          </LI>
          <LI>
            Si interactuó con un cliente de Zentriq (negocio), el nombre del
            negocio y, en lo posible, la fecha aproximada de la interacción.
          </LI>
          <LI>
            Descripción clara de los datos que solicita eliminar (por ejemplo:
            “todos mis datos”, “mi número de teléfono”, “el historial de
            mensajes”).
          </LI>
          <LI>
            Medio por el cual desea recibir la confirmación de Zentriq (correo
            electrónico, en la mayoría de los casos).
          </LI>
          <LI>
            En el caso de titulares directos: copia de identificación oficial
            vigente (INE, pasaporte u otro documento), o de la representación
            legal cuando aplique.
          </LI>
        </UL>
      </Section>

      <Section n={6} title="Plantilla sugerida de solicitud">
        <P>
          Si lo desea, puede utilizar la siguiente plantilla, reemplazando los
          campos entre corchetes con su información. Esta plantilla es opcional;
          cualquier solicitud que contenga la información mínima señalada en la
          cláusula 5 será atendida.
        </P>
        <Callout>
          <pre className="whitespace-pre-wrap font-mono text-[12.5px] leading-[1.7] text-[#9A9AA5]">
{`Para: contacto@zentriq.mx
Asunto: Solicitud de eliminación de datos personales

Por medio del presente, solicito a Zentriq México, S.A. de C.V. la
eliminación de mis datos personales, conforme a la Ley Federal de
Protección de Datos Personales en Posesión de los Particulares.

Datos del titular:
- Nombre completo: [______________________]
- Correo electrónico: [______________________]
- Número telefónico (si aplica): [______________________]

Si interactué con un cliente de Zentriq (negocio):
- Nombre del negocio: [______________________]
- Fecha aproximada de la interacción: [______________________]

Datos que solicito eliminar:
[Describa los datos. Ej.: "todos mis datos personales", "mi número
de teléfono y el historial de mensajes", etc.]

Medio para recibir la confirmación:
[Correo electrónico o teléfono]

Adjunto: identificación oficial (solo titulares directos).

Atentamente,
[Nombre o firma]`}
          </pre>
        </Callout>
      </Section>

      <Section n={7} title="Verificación de identidad">
        <P>
          Para proteger sus datos y evitar que terceros soliciten indebidamente
          su eliminación, Zentriq podrá requerirle información o documentación
          adicional con el fin de verificar su identidad. Mientras dicha
          verificación no se complete, Zentriq podrá suspender el procesamiento
          de la solicitud.
        </P>
      </Section>

      <Section n={8} title="Plazos de respuesta">
        <P>Zentriq atenderá su solicitud conforme a los siguientes plazos:</P>
        <UL>
          <LI>
            Confirmación de recepción: dentro de los 5 días hábiles siguientes a
            la recepción de la solicitud.
          </LI>
          <LI>
            Respuesta formal: dentro de los 20 días hábiles siguientes a la
            recepción de la solicitud, conforme a lo previsto en la Ley.
          </LI>
          <LI>
            Ejecución de la eliminación: cuando la solicitud sea procedente, la
            eliminación se ejecutará dentro de los 15 días siguientes a la
            comunicación de la respuesta.
          </LI>
        </UL>
        <P>
          Si Zentriq no puede atender su solicitud dentro de los plazos
          señalados, le informará de las razones y le indicará un plazo razonable
          adicional.
        </P>
      </Section>

      <Section n={9} title="Limitaciones y excepciones a la eliminación">
        <P>
          Conforme a la Ley, Zentriq podrá conservar ciertos datos a pesar de su
          solicitud de eliminación, cuando ello sea necesario para:
        </P>
        <UL>
          <LI>
            Cumplir con obligaciones legales, fiscales, contables o
            administrativas (por ejemplo, conservación de comprobantes fiscales).
          </LI>
          <LI>Atender requerimientos de autoridades competentes.</LI>
          <LI>
            Defender derechos o intereses legítimos frente a reclamaciones,
            investigaciones o procedimientos.
          </LI>
          <LI>
            Conservar datos en respaldos rutinarios, los cuales serán
            sobrescritos conforme a los ciclos normales de retención.
          </LI>
        </UL>
        <P>
          Los datos que deban conservarse por las razones anteriores serán
          bloqueados del tratamiento ordinario y únicamente utilizados para los
          fines que justifican su conservación. Asimismo, los datos que hayan
          sido anonimizados (de forma que no sea posible identificar al titular)
          dejan de ser datos personales y no se encuentran sujetos a estas
          instrucciones.
        </P>
      </Section>

      <Section n={10} title="Solicitudes relacionadas con WhatsApp Business y Meta">
        <P>
          Si su solicitud se relaciona con interacciones realizadas a través de
          WhatsApp Business, tenga en consideración lo siguiente:
        </P>
        <UL>
          <LI>
            Zentriq eliminará los datos que mantenga en sus propios sistemas
            conforme a estas instrucciones y, en su caso, coordinará con el
            cliente (negocio) que sea responsable de sus datos.
          </LI>
          <LI>
            Los datos que residen en la infraestructura de Meta están sujetos a
            los términos y procesos de privacidad de Meta, los cuales son
            administrados directamente por Meta. Puede consultar las opciones de
            control y eliminación disponibles en la propia aplicación de WhatsApp
            y en el Centro de Privacidad de Meta.
          </LI>
        </UL>
        <P>
          Estas instrucciones no sustituyen ni limitan los derechos y mecanismos
          que Meta pone a disposición de los usuarios de sus plataformas.
        </P>
      </Section>

      <Section n={11} title="Relación con sus derechos ARCO">
        <P>
          Estas instrucciones desarrollan específicamente el derecho de
          Cancelación previsto en la Ley. Si desea ejercer alguno de sus demás
          derechos —Acceso, Rectificación u Oposición—, así como revocar el
          consentimiento que haya otorgado o limitar el uso o divulgación de sus
          datos, puede consultar el procedimiento detallado en el{" "}
          <Int href="/privacidad">Aviso de Privacidad de Zentriq</Int>,
          disponible en nuestro sitio web.
        </P>
      </Section>

      <Section n={12} title="Contacto y actualizaciones">
        <P>
          Para cualquier duda o aclaración respecto del procedimiento aquí
          descrito, puede contactarnos en <Mail />.
        </P>
        <P>
          Zentriq podrá actualizar estas instrucciones en cualquier momento,
          publicando la versión vigente en su sitio web.
        </P>
      </Section>
    </LegalLayout>
  );
}
