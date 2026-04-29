// ── Open/closed check — Costa Rica is UTC-6, no DST ──────────────────────────
// Shared between Hero (status badge) and Header (mobile menu schedule).

function getCostaRicaMinutes(): { day: number; minutes: number } {
  const now = new Date()
  const utc = now.getTime() + now.getTimezoneOffset() * 60_000
  const cr  = new Date(utc - 6 * 60 * 60_000)
  return { day: cr.getDay(), minutes: cr.getHours() * 60 + cr.getMinutes() }
}

export function checkIsOpen(): boolean {
  const { day, minutes } = getCostaRicaMinutes()
  if (day === 0) return false                                       // Domingo: cerrado
  if (day === 6) return minutes >= 8 * 60     && minutes < 18 * 60 // Sábado: 8am–6pm
  if (day === 5) return minutes >= 8 * 60     && minutes < 19 * 60 // Viernes: 8am–7pm
  return             minutes >= 9 * 60 + 30  && minutes < 19 * 60 // Lun–Jue: 9:30am–7pm
}
