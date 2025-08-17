// scripts/images.js  (ESM: у тебя "type":"module" в package.json)
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const inputDir = 'src/assets/img/original'
const outputDir = 'src/assets/img/optimized'

// рекурсивный обход директорий
async function* walk(dir) {
  for (const d of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, d.name)
    if (d.isDirectory()) {
      yield* walk(full)
    } else {
      yield full
    }
  }
}

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true })
}

function toWebpOutPath(srcPath) {
  const rel = path.relative(inputDir, srcPath)
  return path.join(outputDir, rel.replace(/\.[^.]+$/, '.webp'))
}

async function isUpToDate(src, out) {
  try {
    const [s, o] = await Promise.all([fs.stat(src), fs.stat(out)])
    return o.mtimeMs >= s.mtimeMs
  } catch {
    return false
  }
}

async function convertOne(file) {
  const out = toWebpOutPath(file)
  await ensureDir(path.dirname(out))

  // пропускаем, если уже актуально
  if (await isUpToDate(file, out)) {
    // console.log('skip', out)
    return
  }

  await sharp(file)
    // можно добавить .rotate() чтобы учесть EXIF-ориентацию:
    // .rotate()
    .toFormat('webp', { quality: 75 })
    .toFile(out)

  console.log('→', out)
}

async function main() {
  // создаём базовую папку назначения
  await ensureDir(outputDir)

  for await (const file of walk(inputDir)) {
    if (!/\.(jpe?g|png)$/i.test(file)) continue
    await convertOne(file)
  }

  console.log('✔ done')
}

main().catch((e) => {
  console.error('❌ image build failed:', e)
  process.exit(1)
})
