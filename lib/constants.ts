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
export const REVIEWS = [
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
  { id: 25, name: "Alejandro LN",  badge: "Local Guide" as const, text: null },
  { id: 26, name: "Arson Salazar", badge: null,                    text: null },
  { id: 27, name: "David Vargas",  badge: null,                    text: null },
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
