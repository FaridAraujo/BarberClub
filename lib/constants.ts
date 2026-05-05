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
    name: "Arson",
    role: "CoFundador & Barbero",
    specialty: "Fades & Estilos",
    bio: "Especialista en fades de alta precisión.",
    photo: "/images/barbers/barber2.png",
    whatsapp: "50686540577",
  },
  {
    id: 3,
    name: "Erick",
    role: "Barbero",
    specialty: "Fades & Estilos",
    bio: "Especialista en fades de alta precisión.",
    photo: "/images/barbers/barber3.jpg",
    whatsapp: "506XXXXXXXX", // TODO: reemplazar con el número real de Erick
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
