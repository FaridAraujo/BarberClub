export const ASSET_VERSION = "v5"
export const LOGO_PATH = "/images/logo.png"

// Six featured photos shown in the asymmetric grid on the main page.
// objectPosition: "center 15%" shows the haircut at the top of each landscape cell.
// Swap IDs / reorder to change which photos appear and in which position.
export const GALLERY_IMAGES = [
  { id:  1, src: "/images/gallery/work01.webp", alt: "Corte fade",      objectPosition: "center center", objectFit: "cover" as const, zoom: 1 },
  { id:  2, src: "/images/gallery/work02.webp", alt: "Corte clásico",   objectPosition: "center 48%",    objectFit: "cover" as const, zoom: 1 },
  { id:  3, src: "/images/gallery/work03.webp", alt: "Estilo moderno",  objectPosition: "center 50%",    objectFit: "cover" as const, zoom: 1 },
  { id:  4, src: "/images/gallery/work04.webp", alt: "Fade degradado",  objectPosition: "center 43%",    objectFit: "cover" as const, zoom: 1 },
  { id:  5, src: "/images/gallery/work05.webp", alt: "Barba perfilada", objectPosition: "center 60%",    objectFit: "cover" as const, zoom: 1 },
  { id:  6, src: "/images/gallery/work06.webp", alt: "Corte completo",  objectPosition: "center 57%",    objectFit: "cover" as const, zoom: 1 },
]

// All 25 photos — used in the "Ver más" modal.
export const GALLERY_ALL = Array.from({ length: 25 }, (_, i) => ({
  id:  i + 1,
  src: `/images/gallery/work${String(i + 1).padStart(2, "0")}.webp`,
  alt: `Trabajo ${String(i + 1).padStart(2, "0")}`,
}))

export const BARBERS = [
  {
    id: 1,
    name: "Dylan",
    role: "Fundador & Barbero",
    specialty: "Fades & Estilos",
    bio: "Especialista en fades de alta precisión.",
    photo: "/images/barbers/dylan.jpg",
    whatsapp: "50660451251",
  },
  {
    id: 2,
    name: "Erick",
    role: "Barbero",
    specialty: "Fades & Estilos",
    bio: "Especialista en fades de alta precisión.",
    photo: "/images/barbers/barber3.jpg",
    whatsapp: "506XXXXXXXX", // TODO: reemplazar con el número real de Erick
  },
  {
    id: 3,
    name: "Arson",
    role: "CoFundador & Barbero",
    specialty: "Fades & Estilos",
    bio: "Especialista en fades de alta precisión.",
    photo: "/images/barbers/barber2.png",
    whatsapp: "50686540577",
  },
]

// Google reviews — add new entries here. reviewCount in layout.tsx is auto-calculated.
// IDs 9001+ = solo estrellas sin comentario (van primero para no interferir con la numeración)
export const REVIEWS = [
  { id: 9001, name: "Alejandro LN",  badge: null,                    text: null },
  { id: 9002, name: "Zerok",         badge: null,                    text: null },
  { id: 9003, name: "Jarret Dixon",  badge: null,                    text: null },
  // ── Reseñas con comentario — agregar al final con ID siguiente ──────────────
  {
    id: 1,
    name: "Ricardo Nu Cz",
    badge: null,
    text: "El servicio es rápido!! Pero de igual forma ir con tiempo porque tienen buena clientela!! Le cortaron el pelo a mi hijo de 5 años, y tenían lo necesario para atenderlo perfectamente, el corte que sugerí se lo hicieron tal cual!",
  },
  {
    id: 2,
    name: "Josué Choso Rojas",
    badge: null,
    text: "Una de las mejores barberías de Heredia junto a uno de los mejores barberos como es Dylan.",
  },
  {
    id: 3,
    name: "farid araujo",
    badge: null,
    text: "Excelente servicio, muy bien los 3.",
  },
  {
    id: 4,
    name: "Xavi Araujo",
    badge: null,
    text: "Buen servicio, pura vida los 3.",
  },
  {
    id: 5,
    name: "Cristopher Carballo",
    badge: null,
    text: "Excelente barbería, 100% recomendados, buen servicio, muy buena nota, vengo desde largo solo a cortarme el pelo con ellos!!",
  },
  {
    id: 6,
    name: "Jettlin Torrez",
    badge: null,
    text: "Me eh cortado el pelo hace más de 4 años con Arson y siempre me a brindado un buen servicio, estoy muy agradecido con mi bro. Ánimos…",
  },
  {
    id: 7,
    name: "Victor R",
    badge: null,
    text: "Muy buena nota los tres y siempre pendientes de lo que quiere el cliente, recomendado 10/10",
  },
  {
    id: 8,
    name: "Kendall Muñoz",
    badge: null,
    text: "Excelente servicio , muy profesionales 🔥🔥🔥",
  },
  {
    id: 9,
    name: "Karla Rodriguez",
    badge: null,
    text: "Llevo a mi bb de 2 años , me encanta por que el bárbaro me entiende perfecto como es que me gusta que le quede el corte , adicional el trato que nos brindan , y el servicio es 💯👌🏼.",
  },
  {
    id: 10,
    name: "Jcc Cjc",
    badge: null,
    text: "Fui por primera vez y me gustó mucho. El lugar es limpio, atienden bien y el corte quedó excelente. Se nota que saben lo que hacen. Volvería sin duda.",
  },
  {
    id: 11,
    name: "Paulo Barrantes",
    badge: null,
    text: "Excelente servicio",
  },
  {
    id: 12,
    name: "Roberto Lopez",
    badge: null,
    text: "Excelente servicio y buena música",
  },
  {
    id: 13,
    name: "Hector Meneses",
    badge: null,
    text: "Excelente servicio, llevo cortándome el pelo dos años con ellos y siempre con maneras de tratar a los demás, profesionales con su labor y la barbería muy bonita, con excelente ambiente.",
  },
  {
    id: 14,
    name: "David Garita",
    badge: null,
    text: "Barberia hay en todo lado, pero que te escuchen al 100% de lo que quieres y hagan un buen trabajo cada que vas, solo acá lo he sentido. Un lugar limpio, ordenado y sobre todo muy buena gente, recomiendadisimo maes!!",
  },
  {
    id: 15,
    name: "Andres Paniagua",
    badge: null,
    text: "Excelente atención, la comodidad del lugar, la ubicación y el excelente servicio de parte de todos. Muy recomendados 👌👌",
  },
  {
    id: 16,
    name: "Santiago Medina Rodríguez",
    badge: null,
    text: "Muy buena experiencia",
  },
  {
    id: 17,
    name: "Justin Moya",
    badge: null,
    text: "Maes muy pichudos para cortar pelo.!!",
  },
  {
    id: 18,
    name: "Hernan Calderon Araya",
    badge: null,
    text: "Excelente barbería",
  },
  {
    id: 19,
    name: "Dereck Jimenez",
    badge: null,
    text: "Excelente Servicio y cortes de pelo a como lo quiere y a un precio accesible",
  },
  {
    id: 20,
    name: "David Arias G",
    badge: null,
    text: "Excelente servicio",
  },
  {
    id: 21,
    name: "Roy lee Blanco Chavarría",
    badge: null,
    text: "Los mejores barberos de Heredia🔥",
  },
  {
    id: 22,
    name: "Gabriel Vindas Hernández",
    badge: null,
    text: "Los más duros de Heredia, sin duda 🫡",
  },
  {
    id: 23,
    name: "Jordan Fernandez Sojo",
    badge: null,
    text: "Excelente servicio, son pura calidad.",
  },
  {
    id: 24,
    name: "Esteban Méndez",
    badge: null,
    text: "La mejor barbería de Heredia, muy amables todos y siempre excelente el servicio",
  },
  {
    id: 25,
    name: "Emiliano Mata",
    badge: null,
    text: "Excelente servicio instalaciones muy buenas y el corte muy bueno.",
  },
  {
    id: 26,
    name: "GUIDO MATA",
    badge: null,
    text: "Buen servicio, rápido, buen corte,buen ambiente y lugar limpio y bien cuidado.",
  },
  {
    id: 27,
    name: "Gerardo Angulo",
    badge: null,
    text: "Siempre hace el trabajo de la mejor manera",
  },
  {
    id: 28,
    name: "Julian Malespin",
    badge: null,
    text: "Buena barbería, todos contar muy bien, muy buen ambiente, recomendada 💯💈",
  },
  {
    id: 29,
    name: "Jefferson Contreras",
    badge: null,
    text: "Excelente lugar y con un muy buen ambiente!! Súper recomendado y aparte de eso son rápidos y eficaces",
  },
  {
    id: 30,
    name: "Jason Matamoros",
    badge: null,
    text: "Un lugar muy bueno para cortarse el pelo, 100% recomendado, demasiado buena vibra todos!",
  },
  {
    id: 31,
    name: "Tavo Bermúdez",
    badge: null,
    text: "increíble lugar, muy limpio, muy buen trato, buen ambiente y buena atención",
  },
  {
    id: 32,
    name: "Kenneth Jiménez",
    badge: null,
    text: "Los mejores del área 🔥",
  },
  {
    id: 33,
    name: "Dylan Delgado",
    badge: null,
    text: "Calidad!",
  },
  {
    id: 34,
    name: "Anderson Ocampobarrantes",
    badge: null,
    text: "Demasiado buen servicio, y demasiada calidad en los cortes, lo recomiendo muchísimo",
  },
  {
    id: 35,
    name: "Dylan Ronaldo Morales",
    badge: null,
    text: "Excelente servicio, buena calidad en la atención!",
  },
  {
    id: 36,
    name: "Edixon López",
    badge: null,
    text: "el mejor servicio siempre!",
  },
  {
    id: 37,
    name: "Yorsbel Arguedas",
    badge: null,
    text: "Muy buen lugar, buenos barberos, buenos cortes y siempre una buena atención, totalmente recomendado.",
  },
  {
    id: 38,
    name: "axel sanchez",
    badge: null,
    text: "Buen servicio y siempre disponibilidad, muy buenos los tres !!",
  },
  {
    id: 39,
    name: "Antonio Porras",
    badge: null,
    text: "Buen ambiente mas el corte queda elite 👌🏾",
  },
  {
    id: 40,
    name: "Me Na",
    badge: null,
    text: "El trato del personal es excelente y la calidad del corte es de muy buena calidad",
  },
  {
    id: 41,
    name: "Eithan Campos",
    badge: null,
    text: "Muy buena experiencia",
  },
  {
    id: 42,
    name: "Olger Umaña",
    badge: null,
    text: "Excelente ambiente atención ,educación y profesión. Un lugar 100% recomendado",
  },
  {
    id: 43,
    name: "gilbert acuña",
    badge: null,
    text: "Buen servicio, buen ambiente y sobre todo buenos cortes. Recomendado a ojos cerrados...!",
  },
  {
    id: 44,
    name: "Mathias Jimenez",
    badge: null,
    text: "Muy buen servicio, muy bien el corte, 10/10",
  },
  {
    id: 45,
    name: "Andres Rodriguez",
    badge: null,
    text: "Los más fresas.",
  },
  {
    id: 46,
    name: "Joel Rodriguez",
    badge: null,
    text: "Un lugar primeramente muy ordenado, limpio, ponen la música moderada para que los clientes estén tranquilos y en mi caso que me hago los cortes con Arson, siempre ha sido un excelente servicio 100% profesional, recomendando.",
  },
  {
    id: 47,
    name: "armando chavarria",
    badge: null,
    text: "Mas de 5año cortándome el pelo con estos crack sin duda no los cambio por nada ! Super recomendado",
  },
  {
    id: 48,
    name: "Steven Angulo",
    badge: null,
    text: "Legalmente en Barber Club se la rifan. Llegué sin mucha hablada y salí ak7, el corte quedó fino fino. Buen ambiente, buena vibra y los maes saben lo que hacen. De fijo vuelvo otra vez.",
  },
  {
    id: 49,
    name: "Gerald Lopez Fonseca",
    badge: null,
    text: "Excelente barbería, muy buenos cortes y atención. Además de excelente precio. Altamente recomendado. Además el lugar es fresco y música ambiente buena.",
  },
  {
    id: 50,
    name: "Maikell Hernandez",
    badge: null,
    text: "Los mejores súper buenos Cortes",
  },
  {
    id: 51,
    name: "shadrock sawers",
    badge: null,
    text: "Servicio muy profesional, recomiendo",
  },
  {
    id: 52,
    name: "Bryan Mendez",
    badge: null,
    text: "Mejores de Heredia",
  },
  {
    id: 53,
    name: "Fabian",
    badge: null,
    text: "Excelente servicio",
  },
  {
    id: 54,
    name: "D.A.S",
    badge: null,
    text: "mae excelente servicio, corte y atención100% recomendado",
  },
  {
    id: 55,
    name: "Santiago Núñez",
    badge: null,
    text: "Excelente atención y muy buen ambiente. Los 3 barberos muy buenos, entendió exactamente el corte que quería y el resultado quedó increíble. Además, el lugar es limpio, cómodo y el trato al cliente es de primera. Sin duda volvería y la recomiendo totalmente.",
  },
  {
    id: 56,
    name: "Kendall Solano",
    badge: null,
    text: "Llevo 7 años con el mismo barbero, y ahora en Barber Shop dan un servicio excelente y calidad corte, la mejor barbería",
  },
  {
    id: 57,
    name: "Justin Cerdas",
    badge: null,
    text: "Muy recomendado, mucha calidad y buen atención al cliente",
  },
  {
    id: 58,
    name: "eduard bastos",
    badge: null,
    text: "Vengo desde Alajuela solo por cortármelo con Arson, ya que siento que vale la pena.!! E ido a otros lados y siento que ningún a valido la pena 👌🏽",
  },
  {
    id: 59,
    name: "Jefferson Vargas",
    badge: null,
    text: "Excelente atencion al cliente, excelente servicio",
  },
  {
    id: 60,
    name: "Ian Benavides",
    badge: null,
    text: "Buen servicio al cliente y buena técnica de corte.Totalmente recomendado.",
  },
  {
    id: 61,
    name: "ADRIAN 1215",
    badge: null,
    text: "Excelente servicio",
  },
  {
    id: 62,
    name: "axel gabriel noguera ortega",
    badge: null,
    text: "Excelente servicio",
  },
  {
    id: 63,
    name: "Joan Vázquez Álvarez",
    badge: null,
    text: "Muy recomendado, el lugar es muy limpio y la atención desde que se entra es excelente! Los barberos son muy profesionales!",
  },
  {
    id: 64,
    name: "David Vargas",
    badge: null,
    text: "Buenos cortes y buena atención y precio",
  },
  {
    id: 65,
    name: "raul espinoza",
    badge: null,
    text: "Excelente servicio",
  },
  {
    id: 66,
    name: "Bryan",
    badge: null,
    text: "Excelente servicio en Barber Club, desde que uno llega lo atienden con amabilidad y profesionalismo. El corte siempre queda exactamente como lo quiero, con mucha atención a los detalles y un ambiente muy cómodo. Sin duda una barbería totalmente recomendada.",
  },
  {
    id: 67,
    name: "Alejandro Sosa",
    badge: null,
    text: "Soy cliente regular de Barber Club y siempre mantienen un nivel de servicio excelente. Los barberos son muy profesionales, el ambiente es agradable y siempre salgo satisfecho con el corte. Se nota la dedicación y la calidad en cada detalle. Súper recomendados.",
  },
  {
    id: 68,
    name: "Kevin Rodriguez",
    badge: null,
    text: "Excelente servicio.",
  },
  {
    id: 69,
    name: "Daniel Arce",
    badge: null,
    text: "La mejor barbería, no los cambio por nada. Un excelente servicio y muy dedicados en su trabajo.",
  },
  {
    id: 70,
    name: "Brandon Quesada",
    badge: null,
    text: "La mejor barbería de Heredia.",
  },
]


export const SITE_DATA = {
  name: "Barber Club",
  slogan: "Sin citas. Solo llegá.",
  location: "Heredia, Costa Rica",
  whatsapp: "50660451251",
  instagram: "https://instagram.com/barber_club__",
  tiktok:    "https://www.tiktok.com/@barber_club__",
  schedule: [
    { days: "Lunes - Jueves", hours: "9:30am - 7:00pm" },
    { days: "Viernes", hours: "8:00am - 7:00pm" },
    { days: "Sábado", hours: "8:00am - 5:00pm" },
    { days: "Domingo", hours: "Cerrado" },
  ],
  services: [
    { name: "Corte", price: 5000 },
    { name: "Corte con barba", price: 7000 },
  ],
}
