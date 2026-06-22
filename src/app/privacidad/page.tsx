import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import {
  Section,
  P,
  UL,
  LI,
  Mail,
  Ext,
  Sub,
} from "@/components/LegalContent";

export const metadata: Metadata = {
  title: "Aviso de Privacidad",
  description:
    "Aviso de Privacidad Integral de Zentriq México, S.A. de C.V., conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.",
};

export default function PrivacidadPage() {
  return (
    <LegalLayout
      eyebrow="Aviso de Privacidad"
      title="Aviso de Privacidad Integral"
      lastUpdated="29 de mayo de 2026"
    >
      <Section n={1} title="Identidad y domicilio del responsable">
        <P>
          Zentriq México, S.A. de C.V. (en adelante, “Zentriq”), con Registro
          Federal de Contribuyentes ZME2604287W4 y domicilio en Puerta de
          Temoaya 35, Bosque Esmeralda, Atizapán de Zaragoza, Estado de México,
          C.P. 52930, es el responsable del tratamiento de sus datos personales
          y del uso que se les dé a los mismos, en términos de la Ley Federal de
          Protección de Datos Personales en Posesión de los Particulares (la
          “Ley”), publicada en el Diario Oficial de la Federación el 20 de marzo
          de 2025 y vigente a partir del 21 de marzo de 2025.
        </P>
        <P>
          Para cualquier asunto relacionado con el presente Aviso de Privacidad,
          o para el ejercicio de sus derechos, puede contactarnos en: <Mail />.
        </P>
      </Section>

      <Section n={2} title="Datos personales que se recaban">
        <P>
          Para las finalidades señaladas en este Aviso, Zentriq podrá recabar
          las siguientes categorías de datos personales:
        </P>
        <P>
          a) De prospectos y visitantes (formulario de contacto del sitio web):
          nombre, correo electrónico, número telefónico, nombre de la empresa u
          organización y el contenido del mensaje o consulta que usted nos
          envíe.
        </P>
        <P>
          b) De clientes y sus representantes: datos de identificación y
          contacto, datos fiscales necesarios para la facturación (denominación
          o razón social, RFC, domicilio fiscal, régimen fiscal y uso de CFDI) y
          datos de identificación del representante o persona de contacto.
        </P>
        <P>
          Zentriq no recaba datos personales sensibles a través de su sitio web
          ni en el marco de la relación comercial con sus clientes.
        </P>
      </Section>

      <Section n={3} title="Finalidades del tratamiento">
        <Sub>
          Finalidades necesarias (indispensables para la relación con usted; no
          requieren su consentimiento expreso):
        </Sub>
        <UL>
          <LI>
            Atender, dar seguimiento y responder a las solicitudes de
            información, contacto o cotización que usted nos envíe.
          </LI>
          <LI>
            Gestionar, formalizar y dar cumplimiento a la relación contractual
            con nuestros clientes.
          </LI>
          <LI>
            Prestar, operar y dar soporte a los servicios de software
            contratados.
          </LI>
          <LI>Realizar la facturación y el cobro de los servicios.</LI>
          <LI>
            Dar cumplimiento a las obligaciones legales, fiscales y
            administrativas aplicables.
          </LI>
        </UL>
        <Sub>
          Finalidades voluntarias (no necesarias para la relación; requieren su
          consentimiento y usted puede negarse a ellas sin que afecte el
          servicio):
        </Sub>
        <UL>
          <LI>
            Enviarle comunicaciones comerciales, promocionales y newsletters
            sobre nuestros productos y servicios.
          </LI>
          <LI>
            Realizar seguimiento comercial y actividades de prospección de
            ventas.
          </LI>
          <LI>
            Invitarle a eventos, webinars o encuestas de satisfacción.
          </LI>
        </UL>
        <P>
          Si usted no desea que sus datos se traten para las finalidades
          voluntarias, puede manifestarlo desde este momento dejando sin marcar
          la casilla correspondiente en nuestro formulario, o enviando un correo
          a <Mail /> con la leyenda “No deseo recibir comunicaciones
          comerciales”. La negativa a estas finalidades no será motivo para
          negarle los servicios que solicite.
        </P>
      </Section>

      <Section n={4} title="Transferencias de datos personales">
        <P>
          Zentriq no transfiere sus datos personales a terceros, salvo en los
          siguientes supuestos:
        </P>
        <UL>
          <LI>
            Procesadores de pago. El medio de pago principal es la transferencia
            electrónica de fondos. Adicionalmente, si usted opta por pagar con
            tarjeta, sus datos de pago serán tratados por el procesador
            correspondiente (Stripe y/o Mercado Pago), quienes actúan como
            responsables del tratamiento de dichos datos para efectos del
            procesamiento del pago, la prevención de fraude y el cumplimiento de
            su propia normativa.
          </LI>
          <LI>
            Autoridades competentes, cuando exista un requerimiento fundado y
            motivado, o cuando ello sea necesario para el cumplimiento de
            obligaciones legales.
          </LI>
        </UL>
        <P>
          En términos del artículo 36 de la Ley, las transferencias antes
          señaladas no requieren su consentimiento.
        </P>
      </Section>

      <Section n={5} title="Almacenamiento de la información">
        <P>
          Sus datos personales podrán ser almacenados y procesados en servidores
          de proveedores de servicios tecnológicos que actúan por cuenta y orden
          de Zentriq, los cuales pueden ubicarse fuera del territorio nacional.
          Dichos proveedores tratan los datos únicamente conforme a las
          instrucciones de Zentriq y bajo obligaciones contractuales de
          confidencialidad y seguridad.
        </P>
      </Section>

      <Section
        n={6}
        title="Servicios integrados con WhatsApp Business Platform"
      >
        <P>
          Como parte de los servicios que presta a sus clientes, Zentriq podrá
          integrar y operar herramientas de mensajería a través de la plataforma
          WhatsApp Business Platform, provista por Meta Platforms, Inc. (“Meta”).
          En dicho marco:
        </P>
        <P>
          a) Rol de Zentriq. Zentriq actúa como proveedor tecnológico para sus
          clientes y, según el modelo contratado, podrá facilitar la conexión a
          la plataforma de WhatsApp Business y/u operar cuentas de WhatsApp
          Business por cuenta y orden de dichos clientes. Respecto de los datos
          personales de los usuarios finales que se comuniquen con tales
          cuentas, Zentriq actúa como encargado del tratamiento, no como
          responsable, tratando dichos datos únicamente conforme a las
          instrucciones documentadas de su cliente, quien es el responsable
          frente a sus titulares.
        </P>
        <P>
          b) Rol de Meta. Meta actúa como proveedor de infraestructura de
          mensajería conforme a sus propios términos y políticas, disponibles en{" "}
          <Ext href="https://www.whatsapp.com/legal/">
            https://www.whatsapp.com/legal/
          </Ext>{" "}
          y{" "}
          <Ext href="https://business.whatsapp.com/policy">
            https://business.whatsapp.com/policy
          </Ext>
          .
        </P>
        <P>
          c) Compromisos de Zentriq. En el tratamiento de los datos provenientes
          de WhatsApp Business, Zentriq se obliga a: (i) no utilizar dichos datos
          para construir o enriquecer perfiles de usuarios; (ii) no compartir,
          vender ni distribuir esos datos a terceros, salvo a los subencargados
          estrictamente necesarios para la prestación del servicio y bajo
          obligaciones equivalentes de confidencialidad y seguridad; y (iii)
          mantener medidas de seguridad y privacidad acordes a estándares de la
          industria, a los términos aplicables de Meta y a la normativa mexicana
          en materia de protección de datos personales.
        </P>
      </Section>

      <Section n={7} title="Uso de cookies y tecnologías de rastreo">
        <P>
          El sitio web de Zentriq no utiliza cookies de analítica, rastreo ni
          publicidad. Únicamente podrá emplear cookies estrictamente necesarias
          para el correcto funcionamiento del sitio. En caso de que en el futuro
          se incorporen herramientas de analítica, este Aviso será actualizado
          en consecuencia.
        </P>
      </Section>

      <Section
        n={8}
        title="Medios para ejercer los derechos ARCO y revocar el consentimiento"
      >
        <P>
          Usted tiene derecho a Acceder a sus datos personales, Rectificarlos
          cuando sean inexactos, Cancelarlos cuando considere que no se
          requieren para alguna de las finalidades señaladas, y Oponerse a su
          tratamiento para fines específicos (derechos ARCO). Asimismo, puede
          revocar el consentimiento que nos haya otorgado y limitar el uso o
          divulgación de sus datos.
        </P>
        <P>
          Para ejercer cualquiera de estos derechos, envíe su solicitud al correo{" "}
          <Mail />, indicando:
        </P>
        <UL>
          <LI>Nombre del titular y un medio para comunicarle la respuesta;</LI>
          <LI>
            Los documentos que acrediten su identidad (o, en su caso, la
            representación legal);
          </LI>
          <LI>
            La descripción clara y precisa de los datos respecto de los que
            busca ejercer el derecho; y
          </LI>
          <LI>
            Cualquier otro elemento que facilite la localización de los datos.
          </LI>
        </UL>
        <P>
          Zentriq dará respuesta a su solicitud en los plazos previstos por la
          Ley.
        </P>
      </Section>

      <Section n={9} title="Cambios al Aviso de Privacidad">
        <P>
          El presente Aviso de Privacidad podrá ser modificado en cualquier
          momento para atender novedades legislativas, políticas internas o
          nuevos requerimientos para la prestación de nuestros servicios.
          Cualquier modificación se hará de su conocimiento a través de nuestro
          sitio web <Ext href="https://zentriq.mx/">https://zentriq.mx/</Ext>.
        </P>
      </Section>

      <Section n={10} title="Consentimiento">
        <P>
          Al proporcionarnos sus datos personales por cualquier medio, y de no
          manifestar oposición conforme a lo señalado en este Aviso, usted
          consiente que sus datos sean tratados en los términos aquí descritos.
        </P>
      </Section>
    </LegalLayout>
  );
}
