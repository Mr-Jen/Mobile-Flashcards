import { AsyncStorage } from 'react-native'

const DECK_STORAGE_KEY = 'MobileFlashcards:decks'

export function fetchDeckResults (){
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((decks) => {
            return JSON.parse(decks)
        })
}

export function submitDeck ({title, deck}){
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
        [title] : deck
    }))
}

export function clearAll (){
    return AsyncStorage.clear()
}

export function removeDeck (key){
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[key] = undefined
            delete data[key]
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
        })
}