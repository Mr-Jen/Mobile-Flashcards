import AsyncStorage from '@react-native-community/async-storage'

export const DECK_STORAGE_KEY = 'MobileFlashcards:decks'

export function fetchDeckResults (){
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((decks) => {
            return typeof(decks) !== 'undefined' ? JSON.parse(decks) : null
        })
}

export function submitDeck ({title, deck}){
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
        [title] : deck
    }))
}

export function removeDeckFromStorage (key) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
      .then((results) => {
        const data = JSON.parse(results)
        data[key] = undefined
        delete data[key]
        AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
      })
  }

export function submitCard ({ title, card }){
    fetchDeck(title).then((deck) => {
        if (deck.cards){
            deck.cards.push(card)
        }
        else {
            deck.cards = []
            deck.cards.push(card)
        }
        
        return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
            [title]: deck
        }))
    })
}

export function fetchDeck (title){
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((decks) => {
            return typeof(decks) !== 'undefined' ? JSON.parse(decks)[title] : null
        })
}

export function clearAll (){
    return AsyncStorage.clear()
}

