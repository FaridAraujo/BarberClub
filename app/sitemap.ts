import type { MetadataRoute } from "next"

const SITE_URL = "https://barberclubcr.com"

// Update this date whenever meaningful content changes (new services, team, photos, etc.)
const LAST_UPDATED = "2026-05-07"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(LAST_UPDATED),
      changeFrequency: "monthly",
      priority: 1,
    },
  ]
}
