// src/dummyData/types.js
export const dummyTypes = [
  { id: 1,  name: 'Normal',   color_hex: '#A8A878', sprite_image: '/sprites/types/normal.png' },
  { id: 2,  name: 'Fire',     color_hex: '#F08030', sprite_image: '/sprites/types/fire.png' },
  { id: 3,  name: 'Water',    color_hex: '#6890F0', sprite_image: '/sprites/types/water.png' },
  { id: 4,  name: 'Electric', color_hex: '#F8D030', sprite_image: '/sprites/types/electric.png' },
  { id: 5,  name: 'Grass',    color_hex: '#78C850', sprite_image: '/sprites/types/grass.png' },
  { id: 6,  name: 'Ice',      color_hex: '#98D8D8', sprite_image: '/sprites/types/ice.png' },
  { id: 7,  name: 'Fighting', color_hex: '#C03028', sprite_image: '/sprites/types/fighting.png' },
  { id: 8,  name: 'Poison',   color_hex: '#A040A0', sprite_image: '/sprites/types/poison.png' },
  { id: 9,  name: 'Ground',   color_hex: '#E0C068', sprite_image: '/sprites/types/ground.png' },
  { id: 10, name: 'Flying',   color_hex: '#A890F0', sprite_image: '/sprites/types/flying.png' },
  { id: 11, name: 'Psychic',  color_hex: '#F85888', sprite_image: '/sprites/types/psychic.png' },
  { id: 12, name: 'Bug',      color_hex: '#A8B820', sprite_image: '/sprites/types/bug.png' },
  { id: 13, name: 'Rock',     color_hex: '#B8A038', sprite_image: '/sprites/types/rock.png' },
  { id: 14, name: 'Ghost',    color_hex: '#705898', sprite_image: '/sprites/types/ghost.png' },
  { id: 15, name: 'Dragon',   color_hex: '#7038F8', sprite_image: '/sprites/types/dragon.png' },
  { id: 16, name: 'Dark',     color_hex: '#705848', sprite_image: '/sprites/types/dark.png' },
  { id: 17, name: 'Steel',    color_hex: '#B8B8D0', sprite_image: '/sprites/types/steel.png' },
  { id: 18, name: 'Fairy',    color_hex: '#EE99AC', sprite_image: '/sprites/types/fairy.png' },
]

export const getTypeById = (id) => dummyTypes.find((t) => t.id === id)