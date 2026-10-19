// Privacy policy and legal notice, in three languages. Written for a private, non-commercial app
// offered from Spain (GDPR, ePrivacy / LSSI). A draft for the owner to check, not legal advice.
// The owner's details live in ONE place: change them here and every language follows.
export const OWNER = {
  name: 'Philipp Schäfer', // confirmed by the owner
  addressLines: ['Cortijo Las Padillas 10', 'Vélez-Málaga (Málaga), España'], // published without postal code, as the owner decided
  email: 'philipp.schaefer.dev@gmail.com',
};
export const LAST_UPDATED = '2026-10-19';

const DOCS = {
  en: {
    privacy: {
      title: 'Privacy policy',
      sections: [
        { h: 'Who is responsible', p: ['{name}', '{address}', 'Email: {email}', 'Lemon Soda is a private, non-commercial project.'] },
        { h: 'In short', p: ['Lemon Soda does not collect, store or share your personal data on any server. Everything you enter stays on your own device. There is no account, no tracking, no analytics and no advertising.'] },
        { h: 'What is stored on your device', p: [
          'To work, the app saves your language, your name (optional), your own words, your background photo, your number of days, the date of your last check-in and your badges in your browser’s own storage (localStorage and IndexedDB). It also keeps the app files for offline use. Your photo is only shrunk and saved on your device. It is never uploaded.',
          'This data never leaves your device and we cannot see it. The number of days can say something about your health, which is why it stays on your device only.',
          'You can delete everything at any time by clearing the site data for Lemon Soda in your browser, or by removing the app from your home screen.',
          'This storage is strictly necessary to provide the service you asked for, so no cookie banner or consent is needed (Art. 5(3) ePrivacy Directive, Art. 22(2) LSSI).'] },
        { h: 'Hosting', p: [
          'The app is delivered by Vercel Inc. (USA). When you open the app, Vercel’s servers technically process the data your browser sends, such as your IP address, date and time, the requested file and your browser type, and keep it in server logs. This is needed to deliver the app and keep it secure (Art. 6(1)(f) GDPR, legitimate interest). We do not use these logs to identify or profile you.',
          'Vercel is based in the USA. Transfers rely on the safeguards the provider uses under GDPR, such as the EU–US Data Privacy Framework or standard contractual clauses. More information: vercel.com/legal/privacy-policy'] },
        { h: 'Your rights', p: [
          'You have the right to access, rectification, erasure, restriction of processing, data portability and objection (Articles 15 to 21 GDPR). Because we hold no personal data about you, we can usually only confirm that. For anything about the server logs, write to {email}.',
          'You can also complain to a data protection authority: in Spain the Agencia Española de Protección de Datos (www.aepd.es), or the authority where you live.'] },
        { h: 'Changes', p: ['We may update this text when the app changes. Last updated: {date}.'] },
      ],
    },
    legal: {
      title: 'Legal notice',
      sections: [
        { h: 'Provider', p: ['{name}', '{address}', 'Email: {email}', 'Lemon Soda is a free, non-commercial project without advertising. This notice is provided voluntarily, in the spirit of Article 10 of the Spanish Law 34/2002 (LSSI).'] },
        { h: 'No medical advice', p: ['Lemon Soda is a support tool, not a medical product. It gives no medical advice, diagnosis or treatment and cannot guarantee success. If you drink heavily every day, talk to a doctor before stopping suddenly. If you need help, contact a doctor or a local helpline. In an emergency call 112.'] },
        { h: 'Responsibility for content', p: ['We prepare the content with care but cannot guarantee that it is complete or up to date. You use the app at your own responsibility.'] },
        { h: 'Credits', p: ['Font: Manrope, © The Manrope Project Authors, licensed under the SIL Open Font License 1.1 (github.com/sharanda/manrope).', 'App icon: created for this project.'] },
      ],
    },
  },
  de: {
    privacy: {
      title: 'Datenschutzerklärung',
      sections: [
        { h: 'Wer verantwortlich ist', p: ['{name}', '{address}', 'E-Mail: {email}', 'Lemon Soda ist ein privates, nichtkommerzielles Projekt.'] },
        { h: 'Kurz gesagt', p: ['Lemon Soda erhebt, speichert und teilt keine personenbezogenen Daten von dir auf einem Server. Alles, was du eingibst, bleibt auf deinem eigenen Gerät. Es gibt kein Konto, kein Tracking, keine Analyse und keine Werbung.'] },
        { h: 'Was auf deinem Gerät gespeichert wird', p: [
          'Damit die App funktioniert, speichert sie deine Sprache, deinen Namen (optional), deine eigenen Worte, dein Hintergrundfoto, deine Tage, das Datum deines letzten Eintrags und deine Abzeichen im eigenen Speicher deines Browsers (localStorage und IndexedDB). Außerdem hält sie die App-Dateien für die Nutzung ohne Internet bereit. Dein Foto wird nur verkleinert und auf deinem Gerät gespeichert. Es wird nie hochgeladen.',
          'Diese Daten verlassen dein Gerät nie, und wir können sie nicht sehen. Die Zahl deiner Tage kann etwas über deine Gesundheit aussagen, deshalb bleibt sie ausschließlich auf deinem Gerät.',
          'Du kannst alles jederzeit löschen, indem du die Website-Daten für Lemon Soda in deinem Browser löschst oder die App von deinem Home-Bildschirm entfernst.',
          'Dieser Speicher ist unbedingt erforderlich, um den von dir gewünschten Dienst bereitzustellen. Ein Cookie-Banner oder eine Einwilligung ist deshalb nicht nötig (Art. 5 Abs. 3 ePrivacy-Richtlinie, Art. 22 Abs. 2 LSSI).'] },
        { h: 'Hosting', p: [
          'Die App wird von Vercel Inc. (USA) ausgeliefert. Wenn du die App öffnest, verarbeiten die Server von Vercel technisch die Daten, die dein Browser sendet, etwa deine IP-Adresse, Datum und Uhrzeit, die angeforderte Datei und deinen Browsertyp, und speichern sie in Server-Protokollen. Das ist nötig, um die App auszuliefern und sicher zu halten (Art. 6 Abs. 1 lit. f DSGVO, berechtigtes Interesse). Wir nutzen diese Protokolle nicht, um dich zu identifizieren oder ein Profil von dir zu erstellen.',
          'Vercel hat seinen Sitz in den USA. Übermittlungen stützen sich auf die Garantien, die der Anbieter nach der DSGVO nutzt, etwa das EU-US Data Privacy Framework oder Standardvertragsklauseln. Mehr Informationen: vercel.com/legal/privacy-policy'] },
        { h: 'Deine Rechte', p: [
          'Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch (Art. 15 bis 21 DSGVO). Da wir keine personenbezogenen Daten von dir speichern, können wir das meist nur bestätigen. Bei Fragen zu den Server-Protokollen schreibe an {email}.',
          'Du kannst dich außerdem bei einer Datenschutzbehörde beschweren: in Spanien bei der Agencia Española de Protección de Datos (www.aepd.es) oder bei der Behörde an deinem Wohnort.'] },
        { h: 'Änderungen', p: ['Wir können diesen Text anpassen, wenn sich die App ändert. Stand: {date}.'] },
      ],
    },
    legal: {
      title: 'Impressum',
      sections: [
        { h: 'Anbieter', p: ['{name}', '{address}', 'E-Mail: {email}', 'Lemon Soda ist ein kostenloses, nichtkommerzielles Projekt ohne Werbung. Diese Angaben erfolgen freiwillig, im Sinne von Artikel 10 des spanischen Gesetzes 34/2002 (LSSI).'] },
        { h: 'Keine medizinische Beratung', p: ['Lemon Soda ist ein Hilfsmittel, kein Medizinprodukt. Die App gibt keine medizinische Beratung, Diagnose oder Behandlung und kann keinen Erfolg garantieren. Wenn du jeden Tag viel trinkst, sprich mit einer Ärztin oder einem Arzt, bevor du plötzlich aufhörst. Wenn du Hilfe brauchst, wende dich an eine Ärztin, einen Arzt oder eine Beratungsstelle in deiner Nähe. Im Notfall wähle die 112.'] },
        { h: 'Verantwortung für Inhalte', p: ['Wir erstellen die Inhalte sorgfältig, können aber nicht garantieren, dass sie vollständig oder aktuell sind. Du nutzt die App auf eigene Verantwortung.'] },
        { h: 'Nachweise', p: ['Schrift: Manrope, © The Manrope Project Authors, lizenziert unter der SIL Open Font License 1.1 (github.com/sharanda/manrope).', 'App-Icon: für dieses Projekt erstellt.'] },
      ],
    },
  },
  es: {
    privacy: {
      title: 'Política de privacidad',
      sections: [
        { h: 'Quién es el responsable', p: ['{name}', '{address}', 'Correo electrónico: {email}', 'Lemon Soda es un proyecto privado y sin ánimo de lucro.'] },
        { h: 'En resumen', p: ['Lemon Soda no recoge, almacena ni comparte tus datos personales en ningún servidor. Todo lo que introduces se queda en tu propio dispositivo. No hay cuenta, ni seguimiento, ni analítica, ni publicidad.'] },
        { h: 'Qué se guarda en tu dispositivo', p: [
          'Para funcionar, la app guarda tu idioma, tu nombre (opcional), tus propias palabras, tu foto de fondo, tu número de días, la fecha de tu último registro y tus insignias en el almacenamiento propio de tu navegador (localStorage e IndexedDB). También conserva los archivos de la app para usarla sin internet. Tu foto solo se reduce y se guarda en tu dispositivo. Nunca se sube.',
          'Estos datos nunca salen de tu dispositivo y nosotros no podemos verlos. El número de días puede decir algo sobre tu salud, por eso se queda únicamente en tu dispositivo.',
          'Puedes borrarlo todo en cualquier momento eliminando los datos del sitio de Lemon Soda en tu navegador o quitando la app de tu pantalla de inicio.',
          'Este almacenamiento es estrictamente necesario para prestar el servicio que has solicitado, por lo que no hace falta banner de cookies ni consentimiento (art. 5.3 de la Directiva ePrivacy, art. 22.2 LSSI).'] },
        { h: 'Alojamiento', p: [
          'La app la entrega Vercel Inc. (EE. UU.). Cuando abres la app, los servidores de Vercel tratan técnicamente los datos que envía tu navegador, como tu dirección IP, la fecha y la hora, el archivo solicitado y el tipo de navegador, y los guardan en registros del servidor. Esto es necesario para entregar la app y mantenerla segura (art. 6.1.f RGPD, interés legítimo). No usamos estos registros para identificarte ni para crear un perfil tuyo.',
          'Vercel tiene su sede en EE. UU. Las transferencias se basan en las garantías que el proveedor utiliza conforme al RGPD, como el Marco de Privacidad de Datos UE-EE. UU. o las cláusulas contractuales tipo. Más información: vercel.com/legal/privacy-policy'] },
        { h: 'Tus derechos', p: [
          'Tienes derecho de acceso, rectificación, supresión, limitación del tratamiento, portabilidad y oposición (artículos 15 a 21 RGPD). Como no tenemos datos personales tuyos, normalmente solo podemos confirmarlo. Para cualquier cuestión sobre los registros del servidor, escribe a {email}.',
          'También puedes presentar una reclamación ante una autoridad de protección de datos: en España, la Agencia Española de Protección de Datos (www.aepd.es), o la autoridad de tu lugar de residencia.'] },
        { h: 'Cambios', p: ['Podemos actualizar este texto cuando cambie la app. Última actualización: {date}.'] },
      ],
    },
    legal: {
      title: 'Aviso legal',
      sections: [
        { h: 'Titular', p: ['{name}', '{address}', 'Correo electrónico: {email}', 'Lemon Soda es un proyecto gratuito, sin ánimo de lucro y sin publicidad. Esta información se ofrece voluntariamente, en el espíritu del artículo 10 de la Ley 34/2002 (LSSI).'] },
        { h: 'Sin consejo médico', p: ['Lemon Soda es una herramienta de apoyo, no un producto sanitario. No ofrece consejo médico, diagnóstico ni tratamiento y no puede garantizar el éxito. Si bebes mucho cada día, habla con un médico antes de dejarlo de golpe. Si necesitas ayuda, acude a un médico o a un servicio de ayuda cercano. En caso de emergencia llama al 112.'] },
        { h: 'Responsabilidad sobre los contenidos', p: ['Elaboramos los contenidos con cuidado, pero no podemos garantizar que estén completos ni actualizados. Usas la app bajo tu propia responsabilidad.'] },
        { h: 'Créditos', p: ['Tipografía: Manrope, © The Manrope Project Authors, con licencia SIL Open Font License 1.1 (github.com/sharanda/manrope).', 'Icono de la app: creado para este proyecto.'] },
      ],
    },
  },
};

// Returns { title, sections: [{ h, p: [ [part, ...] ] }] } where parts are plain strings or { email }.
export function legalDoc(kind, lang) {
  const doc = (DOCS[lang] || DOCS.en)[kind];
  const date = new Intl.DateTimeFormat(lang, { dateStyle: 'long' }).format(new Date(LAST_UPDATED + 'T12:00:00'));
  const fill = (text) => {
    const parts = [];
    text.replace(/\{address\}/g, OWNER.addressLines.join(', ')).split(/(\{email\})/).forEach((chunk) => {
      if (chunk === '{email}') parts.push({ email: OWNER.email });
      else if (chunk) parts.push(chunk.replace(/\{name\}/g, OWNER.name).replace(/\{date\}/g, date));
    });
    return parts;
  };
  return { title: doc.title, sections: doc.sections.map((s) => ({ h: s.h, p: s.p.map(fill) })) };
}
