export const ADD_CARD = 'ADD_CARD'
export const ADD_DECK = 'ADD_ENTRY'
export const DELETE_DECK = 'DELETE_DECK'

export function addDeck (name) {
  return {
    type: ADD_DECK,
    name,
  }
}

export function addCard (card) {
  return {
    type: ADD_ENTRY,
    card,
  }
}

export function deleteDeck (id){
  return {
    type: DELETE_DECK,
    id
  }
}