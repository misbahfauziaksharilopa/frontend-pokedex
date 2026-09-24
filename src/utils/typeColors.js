// src/utils/typeColors.js

// Menentukan apakah teks di atas warna background sebaiknya hitam atau putih,
// berdasarkan tingkat kecerahan (luminance) warna hex.
export function getContrastTextColor(hex) {
  if (!hex) return '#ffffff'
  const clean = hex.replace('#', '')
  const r = parseInt(clean.substring(0, 2), 16)
  const g = parseInt(clean.substring(2, 4), 16)
  const b = parseInt(clean.substring(4, 6), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.6 ? '#1a1a1a' : '#ffffff'
}

// Style inline siap pakai untuk badge/elemen dengan background dinamis dari DB
export function typeBadgeStyle(hex) {
  return {
    backgroundColor: hex || '#6b7280',
    color: getContrastTextColor(hex),
  }
}