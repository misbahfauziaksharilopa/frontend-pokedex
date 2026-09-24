// src/dummyData/forms.js
export const dummyForms = [
  {
    id: 1,
    form_name: 'Mega Charizard X',
    type_1_id: 2, type_2_id: 15, // Fire / Dragon
    ability_1: 'Tough Claws', ability_2: null, hidden_ability: null,
    sprite_image: 'pokeball_sprite.png',
    hp: 78, atk: 130, def: 111, spa: 130, spd: 85, spe: 100,
  },
  {
    id: 2,
    form_name: 'Mega Charizard Y',
    type_1_id: 2, type_2_id: 10, // Fire / Flying
    ability_1: 'Drought', ability_2: null, hidden_ability: null,
    sprite_image: 'pokeball_sprite.png',
    hp: 78, atk: 104, def: 78, spa: 159, spd: 115, spe: 100,
  },
  {
    id: 3,
    form_name: 'Mega Venusaur',
    type_1_id: 5, type_2_id: 8, // Grass / Poison
    ability_1: 'Thick Fat', ability_2: null, hidden_ability: null,
    sprite_image: 'pokeball_sprite.png',
    hp: 80, atk: 100, def: 123, spa: 122, spd: 120, spe: 80,
  },
  {
    id: 4,
    form_name: 'Mega Blastoise',
    type_1_id: 3, type_2_id: null, // Water
    ability_1: 'Mega Launcher', ability_2: null, hidden_ability: null,
    sprite_image: 'pokeball_sprite.png',
    hp: 79, atk: 103, def: 120, spa: 135, spd: 115, spe: 78,
  },
  {
    id: 5,
    form_name: 'Mega Beedrill',
    type_1_id: 12, type_2_id: 8, // Bug / Poison
    ability_1: 'Adaptability', ability_2: null, hidden_ability: null,
    sprite_image: 'pokeball_sprite.png',
    hp: 65, atk: 150, def: 40, spa: 15, spd: 80, spe: 145,
  },
  {
    id: 6,
    form_name: 'Mega Pidgeot',
    type_1_id: 1, type_2_id: 10, // Normal / Flying
    ability_1: 'No Guard', ability_2: null, hidden_ability: null,
    sprite_image: 'pokeball_sprite.png',
    hp: 83, atk: 80, def: 80, spa: 135, spd: 80, spe: 121,
  },
]

export const getFormById = (id) => dummyForms.find((f) => f.id === id)