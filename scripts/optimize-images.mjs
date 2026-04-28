import sharp from "sharp"
import { readFileSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, "..", "public", "images")

async function printMeta(label, filePath) {
  const meta = await sharp(filePath).metadata()
  const size = readFileSync(filePath).length
  console.log(`  ${label}: ${meta.width}×${meta.height}px — ${(size / 1024).toFixed(1)} KB`)
}

async function run() {
  const teamSrc  = join(publicDir, "team.jpg")
  const teamDest = join(publicDir, "team.webp")
  const razorSrc  = join(publicDir, "razor.png")
  const razorDest = join(publicDir, "razor.webp")

  console.log("\nBefore:")
  await printMeta("team.jpg ", teamSrc)
  await printMeta("razor.png", razorSrc)

  // team.jpg → team.webp — max 800px wide, quality 80
  await sharp(teamSrc)
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(teamDest)

  // razor.png → razor.webp — 104×104 (2× retina for 52px display size), quality 85
  await sharp(razorSrc)
    .resize({ width: 104, height: 104, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 85, lossless: false })
    .toFile(razorDest)

  console.log("\nAfter:")
  await printMeta("team.webp ", teamDest)
  await printMeta("razor.webp", razorDest)
  console.log("\nDone.\n")
}

run().catch((err) => { console.error(err); process.exit(1) })
