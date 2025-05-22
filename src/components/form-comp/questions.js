export const questions = [
  { 
    id: 1, 
    text: "¿Cuántos años tiene su hijo/a?", 
    type: "input", 
    options: [] 
  },
  { 
    id: 2, 
    text: "¿Cuál es el género de su hijo/a?", 
    type: "select", 
    options: ["Masculino", "Femenino"] 
  },
  { 
    id: 3,
    text: "¿Tu hijo te mira cuando lo llamas por su nombre?",
    example: "Ejemplo: si le dices 'Juan', voltea a verte o muestra alguna reacción.",
    type: "default",
    options: ['Siempre', 'Usualmente', 'A veces', 'Raramente', 'Nunca']
  },
  { 
    id: 4,
    text: "¿Qué tan fácil es para ti lograr contacto visual con tu hijo?",
    example: "Ejemplo: cuando le hablas, te mantiene la mirada o la evita.",
    type: "default",
    options: ['Muy fácil', 'Bastante fácil', 'Bastante difícil', 'Muy difícil', 'Imposible']
  },
  { 
    id: 5,
    text: "¿Tu hijo señala para indicar que quiere algo?",
    example: "Ejemplo: apunta con el dedo hacia un juguete que no puede alcanzar.",
    type: "default",
    options: ['Muchas veces al día', 'Unas cuantas veces al día', 'Unas cuantas veces por semana', 'Menos de una vez por semana', 'Nunca']
  },
  { 
    id: 6,
    text: "¿Tu hijo señala para compartir interés contigo?",
    example: "Ejemplo: señala un avión en el cielo o algo que le emociona para que tú también lo mires.",
    type: "default",
    options: ['Muchas veces al día', 'Unas cuantas veces al día', 'Unas cuantas veces por semana', 'Menos de una vez por semana', 'Nunca']
  },
  { 
    id: 7,
    text: "¿Tu hijo finge?",
    example: "Ejemplo: actúa como si hablara por teléfono o le da comida a una muñeca.",
    type: "default",
    options: ['Muchas veces al día', 'Unas cuantas veces al día', 'Unas cuantas veces por semana', 'Menos de una vez por semana', 'Nunca']
  },
  { 
    id: 8,
    text: "¿Tu hijo sigue con la mirada hacia donde tú estás mirando?",
    example: "Ejemplo: si miras una lámpara o un objeto, él también lo observa.",
    type: "default",
    options: ['Muchas veces al día', 'Unas cuantas veces al día', 'Unas cuantas veces por semana', 'Menos de una vez por semana', 'Nunca']
  },
  { 
    id: 9,
    text: "¿Tu hijo muestra señales de querer consolar?",
    example: "Ejemplo: si alguien llora, se acerca, acaricia o abraza.",
    type: "default",
    options: ['Siempre', 'Usualmente', 'A veces', 'Raramente', 'Nunca']
  },
  { 
    id: 10,
    text: "¿Cómo describirías las primeras palabras de tu hijo?",
    example: "Ejemplo: decía 'mamá', 'agua' o palabras similares como otros niños.",
    type: "default",
    options: ['Muy típicas', 'Bastante típicas', 'Ligeramente inusuales', 'Muy inusuales', 'Mi hijo no habla']
  },
  { 
    id: 11,
    text: "¿Tu hijo usa gestos simples?",
    example: "Ejemplo: saluda con la mano, señala lo que quiere o mueve la cabeza para decir 'sí' o 'no'.",
    type: "default",
    options: ['Muchas veces al día', 'Unas cuantas veces al día', 'Unas cuantas veces por semana', 'Menos de una vez por semana', 'Nunca']
  },
  { 
    id: 12,
    text: "¿Tu hijo se queda mirando fijamente a la nada sin un propósito aparente?",
    example: "Ejemplo: lo ves con la mirada perdida, sin enfocarse en algo concreto.",
    type: "default",
    options: ['Muchas veces al día', 'Unas cuantas veces al día', 'Unas cuantas veces por semana', 'Menos de una vez por semana', 'Nunca']
  },
  { 
    id: 13, 
    text: "¿Su hijo/a tiene dificultades para hablar o expresar ideas claramente?",
    example: "Ejemplo: le cuesta formar frases, pronunciar palabras o explicar lo que piensa o siente.",
    type: "yesno",
    options: ["No", "Sí"]
  },
  { 
    id: 14, 
    text: "¿Su hijo/a tiene dificultades para aprender?",
    example: "Ejemplo: aprende más lento que otros niños en lectura, escritura o matemáticas, o necesita más ayuda para entender explicaciones.",
    type: "yesno",
    options: ["No", "Sí"]
  },
  { 
    id: 15, 
    text: "¿Su hijo/a tiene algún trastorno genético?",
    example: "Ejemplo: ha sido diagnosticado con una condición hereditaria como una alteración genética relacionada con el metabolismo o una enfermedad que otros familiares también han presentado.",
    type: "yesno",
    options: ["No", "Sí"]
  },
  { 
    id: 16, 
    text: "¿Su hijo/a presenta síntomas de depresión?",
    example: "Ejemplo: está triste la mayor parte del tiempo, sin ganas de jugar o con poco interés en cosas que antes disfrutaba.",
    type: "yesno",
    options: ["No", "Sí"]
  },
  { 
    id: 17, 
    text: "¿Ha notado un retraso en el desarrollo de su hijo/a?",
    example: "Ejemplo: tarda más que otros niños en hablar, entender instrucciones o realizar actividades diarias como vestirse solo.",
    type: "yesno",
    options: ["No", "Sí"]
  },
  { 
    id: 18, 
    text: "¿Su hijo/a tiene problemas de comportamiento o sociales?",
    example: "Ejemplo: le cuesta seguir reglas, se enoja fácilmente, no tiene control sobre sus emociones o tiene dificultad para jugar con otros niños o compartir.",
    type: "yesno",
    options: ["No", "Sí"]
  },
  { 
    id: 19, 
    text: "¿Su hijo/a muestra señales de ansiedad?",
    example: "Ejemplo: se preocupa mucho, tiene miedo sin razón clara o evita situaciones por temor a lo que pueda pasar.",
    type: "yesno",
    options: ["No", "Sí"]
  },
  { 
    id: 20, 
    text: "¿Alguien en su familia cercana ha sido diagnosticado con autismo?",
    example: "Ejemplo: un hermano, padre, abuelo u otro familiar ha recibido diagnóstico de autismo o tiene comportamientos relacionados.",
    type: "yesno",
    options: ["No", "Sí"]
  }
];