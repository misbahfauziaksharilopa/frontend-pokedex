// src/dummyData/effectiveness.js
import { dummyTypes } from './types'

// Key = defending type, value = daftar attacking type per kategori.
// "normal" (1x) tidak disimpan eksplisit, sesuai kebiasaan tabel effectiveness.
const chart = {
  Normal:   { weak: ['Fighting'], resist: [], immune: ['Ghost'] },
  Fire:     { weak: ['Water', 'Ground', 'Rock'], resist: ['Fire', 'Grass', 'Ice', 'Bug', 'Steel', 'Fairy'], immune: [] },
  Water:    { weak: ['Electric', 'Grass'], resist: ['Fire', 'Water', 'Ice', 'Steel'], immune: [] },
  Electric: { weak: ['Ground'], resist: ['Electric', 'Flying', 'Steel'], immune: [] },
  Grass:    { weak: ['Fire', 'Ice', 'Poison', 'Flying', 'Bug'], resist: ['Water', 'Electric', 'Grass', 'Ground'], immune: [] },
  Ice:      { weak: ['Fire', 'Fighting', 'Rock', 'Steel'], resist: ['Ice'], immune: [] },
  Fighting: { weak: ['Flying', 'Psychic', 'Fairy'], resist: ['Bug', 'Rock', 'Dark'], immune: [] },
  Poison:   { weak: ['Ground', 'Psychic'], resist: ['Grass', 'Fighting', 'Poison', 'Bug', 'Fairy'], immune: [] },
  Ground:   { weak: ['Water', 'Grass', 'Ice'], resist: ['Poison', 'Rock'], immune: ['Electric'] },
  Flying:   { weak: ['Electric', 'Ice', 'Rock'], resist: ['Grass', 'Fighting', 'Bug'], immune: ['Ground'] },
  Psychic:  { weak: ['Bug', 'Ghost', 'Dark'], resist: ['Fighting', 'Psychic'], immune: [] },
  Bug:      { weak: ['Fire', 'Flying', 'Rock'], resist: ['Grass', 'Fighting', 'Ground'], immune: [] },
  Rock:     { weak: ['Water', 'Grass', 'Fighting', 'Ground', 'Steel'], resist: ['Normal', 'Fire', 'Poison', 'Flying'], immune: [] },
  Ghost:    { weak: ['Ghost', 'Dark'], resist: ['Poison', 'Bug'], immune: ['Normal', 'Fighting'] },
  Dragon:   { weak: ['Ice', 'Dragon', 'Fairy'], resist: ['Fire', 'Water', 'Electric', 'Grass'], immune: [] },
  Dark:     { weak: ['Fighting', 'Bug', 'Fairy'], resist: ['Ghost', 'Dark'], immune: ['Psychic'] },
  Steel:    { weak: ['Fire', 'Fighting', 'Ground'], resist: ['Normal', 'Grass', 'Ice', 'Flying', 'Psychic', 'Bug', 'Rock', 'Dragon', 'Steel', 'Fairy'], immune: ['Poison'] },
  Fairy:    { weak: ['Poison', 'Steel'], resist: ['Fighting', 'Bug', 'Dark'], immune: ['Dragon'] },
}

const nameToId = (name) => dummyTypes.find((t) => t.name === name)?.id

let idCounter = 1
export const dummyEffectiveness = []

Object.entries(chart).forEach(([defendingName, categories]) => {
  const defendingId = nameToId(defendingName)
  Object.entries(categories).forEach(([category, attackingNames]) => {
    attackingNames.forEach((attackingName) => {
      dummyEffectiveness.push({
        id: idCounter++,
        attacking_type_id: nameToId(attackingName),
        defending_type_id: defendingId,
        category, // 'weak' | 'resist' | 'immune'
      })
    })
  })
})

// Helper: ambil semua efektivitas untuk 1 atau 2 tipe pokemon sekaligus (digabung)
export const getEffectivenessForTypes = (typeId1, typeId2 = null) => {
  return dummyEffectiveness.filter(
    (e) => e.defending_type_id === typeId1 || (typeId2 && e.defending_type_id === typeId2)
  )
}