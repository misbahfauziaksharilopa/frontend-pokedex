// src/utils/constants.js

// Aturan bisnis: maksimal 3 form per Pokemon
export const MAX_FORMS_PER_POKEMON = 3

// Jenis form yang diizinkan (dipakai di dropdown admin nanti)
export const ALLOWED_FORM_TYPES = ['Mega Evolve', 'Mega X', 'Mega Y', 'G-Max']

// Base stat maksimum teoritis (dipakai untuk lebar StatBar, 255 = standar Pokémon)
export const STAT_MAX = 255

// Styling untuk kategori type effectiveness (sesuai referensi UI: Immune/Weak/Normal/Resist)
export const EFFECTIVENESS_STYLE = {
  immune: { label: 'Immune', symbol: '✕', bg: 'bg-red-950', text: 'text-red-300', ring: 'ring-red-800' },
  weak:   { label: 'Weak',   symbol: '–', bg: 'bg-red-600',  text: 'text-white',   ring: 'ring-red-500' },
  normal: { label: 'Normal', symbol: '○', bg: 'bg-emerald-600', text: 'text-white', ring: 'ring-emerald-500' },
  resist: { label: 'Resist', symbol: '+', bg: 'bg-blue-600', text: 'text-white',   ring: 'ring-blue-500' },
}

export const DUMMY_SPRITE = '/sprites/pokemon/pokeball_sprite.png'