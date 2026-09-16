export type Path = "parent" | "youth";
export type Lang = "en" | "es";

export const hubs = [
  { n: "Healthy Digital Life", p: "How do I know whether technology use is healthy for my child?", y: "Is the way I use my phone actually a problem, or is everyone just worried?", full: false },
  { n: "Social Media & Emotional Well-Being", p: "Could social media be affecting mood, confidence, relationships, or anxiety?", y: "Why do I feel worse after scrolling, and what can I do about it?", full: false },
  { n: "Sleep, Attention & Compulsive Use", p: "Why is it so hard to stop, and when should I worry?", y: "Why is it so hard to put down, and is that on me?", full: true },
  { n: "Social Comparison, Body Image & Harmful Content", p: "How does what my child sees affect how they feel about themselves?", y: "Why does everyone online look like they have it together?", full: false },
  { n: "Cyberbullying & Digital Relationships", p: "What should we do when online relationships become harmful?", y: "Someone is being cruel to me online. What are my options?", full: true },
  { n: "Privacy, Passwords, Phishing & Scams", p: "How do we protect our accounts, identity, and money?", y: "How do I keep my accounts and my money safe?", full: false },
  { n: "Grooming, Sextortion & Intimate Images", p: "What do we do if someone is pressuring or threatening my child?", y: "Someone is pressuring or threatening me. I did not do anything wrong, and there is a way out.", full: true },
  { n: "Gaming, Chats & Online Strangers", p: "How can my child participate without becoming an easy target?", y: "How do I play and chat without getting played?", full: false },
  { n: "AI, Deepfakes & Misinformation", p: "How do we live safely and intelligently in an AI-generated world?", y: "How do I know what's real, and what do I do if a fake is about me?", full: false },
];

export const worries: { en: string; es: string; hub?: number; help?: string; tool?: number }[] = [
  { en: "My kid can't stop", es: "Mi hijo no puede parar", hub: 2 },
  { en: "They seem down after scrolling", es: "Se ve triste después de usar redes", hub: 1 },
  { en: "Someone is being cruel to them online", es: "Alguien lo trata mal en línea", hub: 4 },
  { en: "Someone is pressuring or threatening them", es: "Alguien lo presiona o amenaza", help: "pressure" },
  { en: "They got scammed or hacked", es: "Lo estafaron o le robaron la cuenta", help: "scam" },
  { en: "A fake image of them is spreading", es: "Circula una imagen falsa de ellos", help: "deepfake" },
  { en: "Is my child ready for a phone?", es: "¿Mi hijo está listo para un celular?", tool: 0 },
  { en: "Strangers in their games", es: "Desconocidos en sus juegos", hub: 7 },
];

export const situations = [
  { k: "pressure", label: "Pressure or threats for images or money",
    steps: [
      ["Stop responding. Do not send more.", "Paying or sending more material does not make it stop. It usually makes it worse."],
      ["Preserve evidence.", "Screenshots of the profile, messages, and any usernames or payment requests. Do not delete the account yet."],
      ["Tell a trusted adult.", "For young people: a parent, a school counselor, or any adult you trust. You are not in trouble."],
      ["Report on the platform and to the right agency.", "Use the platform's reporting tool, then the national reporting pathway below."],
    ],
    route: ["NCMEC CyberTipline and Take It Down (image removal for minors)", "FBI (report.fbi.gov)", "School administration if a classmate is involved", "Licensed professional for emotional support"] },
  { k: "bully", label: "Bullying, harassment, or doxxing",
    steps: [
      ["Do not retaliate.", "Responding in kind escalates and can make the young person look like a participant."],
      ["Save evidence, then block.", "Screenshots with dates and usernames first, then block and mute."],
      ["Report to the platform.", "Every major platform has a harassment report flow. Use it even if it feels pointless."],
      ["Involve the school when appropriate.", "If it involves classmates or spills into school, the school has a duty to act."],
    ],
    route: ["School counselor or administration", "Platform harassment reporting", "Law enforcement for credible threats or leaked personal information", "Licensed professional if mood or sleep has changed"] },
  { k: "scam", label: "Scam, phishing, or account takeover",
    steps: [
      ["Pause. Do not click, pay, or share a code.", "Urgency is the tactic. Nothing legitimate needs a security code from you."],
      ["Verify independently.", "Call the person or company back on a number you already have, not one in the message."],
      ["Change the password and turn on MFA.", "Start with email, since it can reset everything else."],
      ["Review unknown devices and sessions.", "Sign out everywhere, then check recovery email and phone."],
    ],
    route: ["FTC (reportfraud.ftc.gov)", "Your bank or card issuer if money moved", "Platform account recovery", "CISA guidance for securing accounts"] },
  { k: "deepfake", label: "A fake or intimate image is circulating",
    steps: [
      ["Do not shame the child.", "Whether the image is real or generated, the child is the target, not the offender."],
      ["Preserve evidence, then request removal.", "Save URLs and screenshots, then use platform removal and the national removal tool."],
      ["Tell the school if it is spreading there.", "Schools can act on distribution among students."],
      ["Get emotional support in place.", "This is a high-distress situation. Line up a professional early."],
    ],
    route: ["Take It Down (NCMEC) for removal", "Platform reporting for non-consensual images", "Law enforcement", "Licensed professional Q&A and referral"] },
];

export const tools: { n: string; d: string; body?: { h: string; items?: string[]; p?: string; lines?: number }[] }[] = [
  { n: "First phone readiness", d: "Whether a child is ready, and what to set up before day one.",
    body: [
      { h: "Is the child ready?", items: ["Keeps track of belongings and follows household rules most of the time", "Tells you when something goes wrong, even when it is embarrassing", "Can stop an activity when asked without a major fight", "Understands that people online are not always who they say they are"] },
      { h: "Set up together before day one", items: ["Unique passcode the parent also knows, for now", "App store purchases require approval", "Location sharing only with family", "Notifications off for everything except calls and messages from family", "Charger lives outside the bedroom"] },
      { h: "Agree on this out loud", lines: 2 },
    ] },
  { n: "Family technology agreement", d: "A one-page agreement families fill in together, by age." },
  { n: "Family verification word", d: "A shared word to confirm it is really you when a message asks for money or codes.",
    body: [
      { h: "Why", p: "Voice cloning and account takeovers make \"it sounded just like her\" unreliable. A family word fixes that in one conversation." },
      { h: "How it works", items: ["Pick a word or short phrase nobody could guess from your social media. Not a pet name, not a street.", "Everyone in the family memorizes it. Never write it in a text or email.", "Any request for money, gift cards, or a security code, even from a familiar voice, gets the question: \"What's our word?\"", "No word, no money, no code. Hang up and call back on a number you already have."] },
      { h: "Practice it once a month", p: "Kids forget, and so do grandparents." },
    ] },
  { n: "Privacy & security checklist", d: "Unique passwords, MFA, location sharing, and who can see what." },
  { n: "Warning-sign guides", d: "Ordinary behavior versus signs that need attention, per topic." },
  { n: "Emergency card", d: "Who to call and what to save, in your pocket.",
    body: [
      { h: "If something happens online", items: ["Stay calm. Do not delete anything yet.", "Screenshot the profile, the messages, and the date.", "Do not pay. Do not send more.", "Tell one trusted adult today."] },
      { h: "Our people", lines: 3 },
      { h: "Report to", items: ["NCMEC CyberTipline (exploitation, sextortion)", "Take It Down (image removal for minors)", "reportfraud.ftc.gov (scams)", "911 if anyone is in immediate danger"] },
    ] },
];

export const talk = {
  parent: "\u201cI'm not trying to take your phone. I've noticed you seem wiped out in the mornings. What's keeping you up? Is it the app, or is it something else?\u201d",
  youth: "Try saying it to your parent this way: \u201cI know I'm on my phone a lot. I'm not sleeping great and I want to fix that, but I don't want it to turn into a fight.\u201d",
};

export const t: Record<Lang, Record<string, string>> = {
  en: { understand: "Understand", navigate: "Navigate", engage: "Engage", parent: "Parent", youth: "Youth",
    h1: "What's on your mind?", lede: "Digital safety, explained through family wellness. Start with a worry, or browse the topics.",
    placeholder: "Type a worry in your own words", suggestions: "People often start here", help: "I need help now",
    helpTitle: "Something happened online", calm1: "Stay calm. Do not shame the child. Safety first.", calm2: "Whatever happened, the goal right now is that they keep talking to you.",
    what: "What happened?", where: "Where to report and get help", emerg: "If anyone is in immediate danger, call 911. Evolving Lives provides education and routing, not emergency, clinical, or legal services.",
    full: "Full guide", quick: "Quick guide", back: "Back to topics", ages: "Ages",
    uk: "Nine topics, each built around the question a family actually asks. Every page follows the same six questions.",
    nk: "Short, printable tools a family can use this week.", ek: "Information is not the finish line. A person is.",
    ask: "Ask a licensed professional", askHint: "Answers are reviewed by a clinician and published without identifying details. Not an emergency service.", send: "Send question",
    sent: "Sent. Look for an answer in the Q&A within a week. If this is urgent, use the help button.", print: "Print", stub: "Scoped for Version 1, not written yet. Every safety page needs clinician and partner review before it ships." },
  es: { understand: "Entender", navigate: "Navegar", engage: "Conectar", parent: "Familia", youth: "Joven",
    h1: "¿Qué te preocupa?", lede: "Seguridad digital, explicada desde el bienestar familiar. Empieza por una preocupación o explora los temas.",
    placeholder: "Escribe tu preocupación con tus palabras", suggestions: "Muchas familias empiezan aquí", help: "Necesito ayuda ya",
    helpTitle: "Pasó algo en línea", calm1: "Mantén la calma. No avergüences al menor. La seguridad primero.", calm2: "Pase lo que pase, la meta ahora es que siga hablando contigo.",
    what: "¿Qué pasó?", where: "Dónde reportar y pedir ayuda", emerg: "Si alguien está en peligro inmediato, llama al 911. Evolving Lives ofrece educación y orientación, no servicios de emergencia, clínicos ni legales.",
    full: "Guía completa", quick: "Guía rápida", back: "Volver a los temas", ages: "Edades",
    uk: "Nueve temas, cada uno construido alrededor de la pregunta que una familia realmente hace. Cada página sigue las mismas seis preguntas.",
    nk: "Herramientas cortas e imprimibles para usar esta semana.", ek: "La información no es la meta. Una persona sí lo es.",
    ask: "Pregúntale a un profesional con licencia", askHint: "Las respuestas las revisa un clínico y se publican sin datos identificables. No es un servicio de emergencia.", send: "Enviar pregunta",
    sent: "Enviada. Busca la respuesta en Preguntas y Respuestas en una semana. Si es urgente, usa el botón de ayuda.", print: "Imprimir", stub: "Planeado para la Versión 1, aún no escrito. Cada página de seguridad necesita revisión clínica y de socios antes de publicarse." },
};
