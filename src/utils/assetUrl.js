// src/utils/assetUrl.js

// Ambil base URL backend (tanpa akhiran /api) dari .env yang sudah ada,
// contoh: VITE_API_URL=http://127.0.0.1:8000/api → BACKEND_URL=http://127.0.0.1:8000
const API_URL = import.meta.env.VITE_API_URL || ''
export const BACKEND_URL = API_URL.replace(/\/api\/?$/, '')

/**
 * Sprite TYPE (normal.png, fire.png, dst) — aset statis yang sudah ditaruh
 * manual di folder public Laravel: public/sprites/types/
 * ⚠️ SESUAIKAN path ini kalau ternyata lokasi file aslinya berbeda.
 */
export function typeSpriteUrl(filename) {
  if (!filename) return null
  return `${BACKEND_URL}/media/sprites/${filename}`
}

/**
 * Sprite POKEMON & FORM — hasil upload admin lewat Storage::disk('public'),
 * diakses lewat symlink /storage/... (php artisan storage:link).
 * `value` yang disimpan backend biasanya sudah termasuk folder,
 * misal "sprites/pokemon/xxxx.png".
 */
export function uploadedSpriteUrl(value) {
  if (!value) return null
  if (value.startsWith('http')) return value // kalau backend sudah kirim URL lengkap
  return `${BACKEND_URL}/media/${value}`
}