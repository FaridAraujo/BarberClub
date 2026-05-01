import sharp from "sharp"
import heicConvert from "heic-convert"
import { readFileSync, existsSync } from "fs"
import { join, dirname, basename, extname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, "..", "public", "images")
const galleryDir = join(publicDir, "gallery")

// ── Helpers ───────────────────────────────────────────────────────────────────

async function printMeta(label, filePath) {
  if (!existsSync(filePath)) { console.log(`  ${label}: NOT FOUND`); return }
  const meta = await sharp(filePath).metadata()
  const size = readFileSync(filePath).length
  console.log(`  ${label}: ${meta.width}×${meta.height}px — ${(size / 1024).toFixed(1)} KB`)
}

// Returns a Sharp instance — handles HEIC by pre-decoding to JPEG buffer first.
async function getSharp(filePath) {
  const ext = extname(filePath).toLowerCase()
  if (ext === ".heic" || ext === ".heif") {
    const inputBuffer = readFileSync(filePath)
    const jpegBuffer = await heicConvert({ buffer: inputBuffer, format: "JPEG", quality: 1 })
    return sharp(Buffer.from(jpegBuffer))
  }
  return sharp(filePath)
}

async function convert(src, dest, opts = {}) {
  const { width, height, fit = "inside", position, quality = 82, extract } = opts
  let pipeline = await getSharp(src)
  if (extract) {
    pipeline = pipeline.extract(extract)
  }
  if (width || height) {
    pipeline = pipeline.resize({
      width, height, fit,
      withoutEnlargement: true,
      ...(position ? { position } : {}),
    })
  }
  await pipeline.webp({ quality }).toFile(dest)
  const kb = (readFileSync(dest).length / 1024).toFixed(1)
  console.log(`  ✓ ${basename(dest).padEnd(20)} ${kb} KB`)
}

// ── Image lists ───────────────────────────────────────────────────────────────

// Hero — portrait source (1365×2048) → desktop + mobile outputs
const heroImages = [
  {
    label: "Hero desktop",
    src:   join(publicDir, "team-source.jpeg"),
    dest:  join(publicDir, "team.webp"),
    opts:  { width: 1600, quality: 83 },
  },
  {
    label: "Hero mobile",
    src:   join(publicDir, "team-source.jpeg"),
    dest:  join(publicDir, "team-mobile.webp"),
    opts:  { extract: { left: 0, top: 500, width: 1365, height: 1700 }, width: 800, quality: 83 },
  },
  {
    label: "Razor",
    src:   join(publicDir, "razor.png"),
    dest:  join(publicDir, "razor.webp"),
    opts:  { width: 104, height: 104, fit: "contain", quality: 85 },
  },
]

// Local carousel — 6 photos (jpeg)
const localImages = Array.from({ length: 6 }, (_, i) => ({
  label: `Local ${i + 1}`,
  src:   join(publicDir, `local-${i + 1}.jpeg`),
  dest:  join(publicDir, `local-${i + 1}.webp`),
  opts:  { width: 1400, quality: 83 },
}))

// Gallery — 25 work photos
//   work01 → work1.jpg (original kept)
//   work02 → work02.jpeg
//   work03–work25 → HEIC
const galleryImages = [
  {
    label: "work01",
    src:   join(galleryDir, "work1.jpg"),
    dest:  join(galleryDir, "work01.webp"),
    opts:  { width: 1400, quality: 82 },
  },
  {
    label: "work02",
    src:   join(galleryDir, "work02.jpeg"),
    dest:  join(galleryDir, "work02.webp"),
    opts:  { width: 1400, quality: 82 },
  },
  ...Array.from({ length: 23 }, (_, i) => {
    const n = String(i + 3).padStart(2, "0")
    return {
      label: `work${n}`,
      src:   join(galleryDir, `work${n}.HEIC`),
      dest:  join(galleryDir, `work${n}.webp`),
      opts:  { width: 1400, quality: 82 },
    }
  }),
]

// ── Run ───────────────────────────────────────────────────────────────────────

async function run() {
  const sections = [
    { name: "Hero",    images: heroImages    },
    { name: "Local",   images: localImages   },
    { name: "Gallery", images: galleryImages },
  ]

  for (const { name, images } of sections) {
    console.log(`\n── ${name} ─────────────────────────────────────`)
    console.log("  Sources:")
    for (const { label, src } of images) {
      await printMeta(label.padEnd(16), src)
    }
    console.log("  Converting:")
    for (const { src, dest, opts } of images) {
      await convert(src, dest, opts)
    }
  }

  console.log("\n✓ All done.\n")
}

run().catch((err) => { console.error(err); process.exit(1) })
