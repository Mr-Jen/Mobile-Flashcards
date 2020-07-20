import { RECEIVE_DECKS, ADD_DECK, ADD_CARD, REMOVE_DECK } from '../actions'

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks,
      }
    case ADD_DECK :
      return {
        ...state,
        ...action.deck
      }
    case REMOVE_DECK:
      const { deckName } = action
      delete state[deckName]
      return {
        ...state,
      }
    case ADD_CARD :
      const deck = state[action.title]
      return {
        ...state,
        [action.title]: {...deck, cards: deck.cards.concat([action.card])}
      }
    default :
      return state
  }
}

export default decks