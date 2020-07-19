import { Notifications } from 'expo'
import { AsyncStorage } from 'react-native'

const NOTIFICATION_KEY = 'MobileFlashcards:notifications'

export function timeToString (time = Date.now()) {
    const date = new Date(time)
    const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    return todayUTC.toISOString().split('T')[0]
}
  
export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
}
  
function createNotification () {
    return {
        title: 'Daily Reminder',
        body: "👋 don't forget to practice today!",
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                if (true) {
                    Notifications.cancelAllScheduledNotificationsAsync()
    
                    let tomorrow = new Date()
                    tomorrow.setDate(tomorrow.getDate() + 1)
                    tomorrow.setHours(20)
                    tomorrow.setMinutes(0)
    
                    Notifications.scheduleLocalNotificationAsync(
                    createNotification(),
                    {
                        time: tomorrow,
                        repeat: 'day',
                    }
                    )
    
                    AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                }
            }
        })
}