export const ASSET_VERSION = "v5"
export const LOGO_PATH = "/images/logo.png"

export const GALLERY_IMAGES = [
  { id: 1, src: "/images/gallery/work1.webp", alt: "Corte fade",      objectPosition: "center center", objectFit: "cover" as const, zoom: 1 },
  { id: 2, src: "/images/gallery/work2.webp", alt: "Corte clásico",   objectPosition: "center 20%",    objectFit: "cover" as const, zoom: 1 },
  { id: 3, src: "/images/gallery/work3.webp", alt: "Barba perfilada", objectPosition: "center center", objectFit: "cover" as const, zoom: 1 },
  { id: 4, src: "/images/gallery/work4.webp", alt: "Fade degradado",  objectPosition: "center center", objectFit: "cover" as const, zoom: 1 },
  { id: 5, src: "/images/gallery/work5.webp", alt: "Corte moderno",   objectPosition: "center center", objectFit: "cover" as const, zoom: 1 },
  { id: 6, src: "/images/gallery/work6.webp", alt: "Estilo completo", objectPosition: "center center", objectFit: "cover" as const, zoom: 1 },
]

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
    role: "CoFundador &Barbero",
    specialty: "Fades & Estilos",
    bio: "Especialista en fades de alta precisión.",
    photo: "/images/barbers/barber2.png",
    whatsapp: "50600000000",
  },
  {
    id: 3,
    name: "Erick",
    role: "Barbero",
    specialty: "Fades & Estilos",
    bio: "Especialista en fades de alta precisión.",
    photo: "/images/barbers/barber3.jpg",
    whatsapp: "50600000000",
  },
]

export const SITE_DATA = {
  name: "Barber Club",
  slogan: "Únete al club del estilo",
  location: "Heredia, Costa Rica",
  whatsapp: "50660451251",
  instagram: "https://instagram.com/barber_club__",
  schedule: [
    { days: "Lunes - Jueves", hours: "9:30am - 7:00pm" },
    { days: "Viernes", hours: "8:00am - 7:00pm" },
    { days: "Sábado", hours: "8:00am - 6:00pm" },
    { days: "Domingo", hours: "Cerrado" },
  ],
  services: [
    { name: "Corte", price: 5000 },
    { name: "Corte con barba", price: 7000 },
  ],
}
