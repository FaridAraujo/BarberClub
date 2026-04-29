import sharp from "sharp"
import { readFileSync, existsSync } from "fs"
import { join, dirname, extname, basename } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, "..", "public", "images")

async function printMeta(label, filePath) {
  if (!existsSync(filePath)) { console.log(`  ${label}: NOT FOUND`); return }
  const meta = await sharp(filePath).metadata()
  const size = readFileSync(filePath).length
  console.log(`  ${label}: ${meta.width}×${meta.height}px — ${(size / 1024).toFixed(1)} KB`)
}

async function convertToWebP(src, dest, { width, height, quality = 80, fit = "inside", position, extractTop } = {}) {
  let pipeline = sharp(src)

  if (extractTop !== undefined && width && height) {
    // Resize to target width keeping aspect ratio, then extract a slice from extractTop
    pipeline = pipeline
      .resize({ width, withoutEnlargement: true })
      .extract({ left: 0, top: extractTop, width, height })
  } else if (width || height) {
    pipeline = pipeline.resize({ width, height, fit, withoutEnlargement: true, ...(position ? { position } : {}) })
  }

  await pipeline.webp({ quality }).toFile(dest)
}

async function run() {
  // ── Hero images ─────────────────────────────────────────────────────────────
  const heroImages = [
    {
      src:  join(publicDir, "team.jpg"),
      dest: join(publicDir, "team.webp"),
      opts: { width: 800, quality: 80 },
    },
    {
      // Landscape 4:3 crop for mobile — image only fills top ~65vh of hero,
      // so crop stays wide enough to show all 3 barbers. "attention" picks
      // the highest-contrast region (faces).
      src:  join(publicDir, "team.jpg"),
      dest: join(publicDir, "team-mobile.webp"),
      opts: { width: 800, height: 600, fit: "cover", position: "attention", quality: 80 },
    },
    {
      src:  join(publicDir, "razor.png"),
      dest: join(publicDir, "razor.webp"),
      opts: { width: 104, height: 104, fit: "contain", quality: 85 },
    },
  ]

  // ── Gallery images ───────────────────────────────────────────────────────────
  // Displayed at max ~700px wide on desktop (2-col cell at max-w-5xl).
  // 900px covers 2× retina on the large cell.
  const galleryDir = join(publicDir, "gallery")
  const galleryImages = [
    // Portrait originals (9:16) → crop to 3:2 landscape so they fill the
    // landscape grid cells without heavy zoom. "top" keeps the head/haircut visible.
    { src: join(galleryDir, "work1.jpg"), dest: join(galleryDir, "work1.webp"), opts: { width: 900, height: 600, extractTop: 420, quality: 80 } },
    { src: join(galleryDir, "work2.png"), dest: join(galleryDir, "work2.webp"), opts: { width: 900, quality: 80 } },
    { src: join(galleryDir, "work3.png"), dest: join(galleryDir, "work3.webp"), opts: { width: 900, quality: 80 } },
    { src: join(galleryDir, "work4.jpg"), dest: join(galleryDir, "work4.webp"), opts: { width: 900, height: 600, extractTop: 400, quality: 80 } },
    { src: join(galleryDir, "work5.jpg"), dest: join(galleryDir, "work5.webp"), opts: { width: 900, height: 600, fit: "cover", position: "top",    quality: 80 } },
    { src: join(galleryDir, "work6.jpg"), dest: join(galleryDir, "work6.webp"), opts: { width: 900, quality: 80 } },
  ]

  const all = [...heroImages, ...galleryImages]

  // ── Before ──────────────────────────────────────────────────────────────────
  console.log("\nBefore:")
  for (const { src } of all) {
    const name = basename(src)
    await printMeta(name.padEnd(12), src)
  }

  // ── Convert ─────────────────────────────────────────────────────────────────
  console.log("\nConverting...")
  for (const { src, dest, opts } of all) {
    await convertToWebP(src, dest, opts)
    const name = basename(dest)
    const size = (readFileSync(dest).length / 1024).toFixed(1)
    console.log(`  ✓ ${name.padEnd(14)} → ${size} KB`)
  }

  // ── After ───────────────────────────────────────────────────────────────────
  console.log("\nAfter:")
  for (const { dest } of all) {
    const name = basename(dest)
    await printMeta(name.padEnd(12), dest)
  }

  console.log("\nDone.\n")
}

run().catch((err) => { console.error(err); process.exit(1) })
