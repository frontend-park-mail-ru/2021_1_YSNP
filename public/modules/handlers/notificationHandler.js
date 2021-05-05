import {NotificationList} from '../../components/Notification/NotificationList';

export class NotificationHandler {
    constructor() {
        this.__isWorking = false;
        this.__notifications = [];
        this.__notificationList = new NotificationList(document.getElementById('notification-line'));

        this.start();
    }

    start() {
        if (this.__isWorking) {
            return;
        }

        this.__notificationList.render(this.__makeContext());
    }

    remove() {
        this.__isWorking = false;
        this.__notificationList.remove();
    }

    addNotification(data) {
        this.__notificationList.addNotification({
            notificationID: 4,
            img: '/img/search-background.webp',
            title: 'Владимир',
            message: 'Рш'
        });

        if (this.__notifications) {
            this.__removeNotificationFromList(this.__notifications.notificationID);
            this.__notifications = undefined;
            return;
        }

        this.__notifications = {
            notificationID: 5,
            data: data
        };
        this.__addNotificationToList(this.__notifications);
    }

    __timerEnd(notificationID) {
        this.__removeNotificationFromList(notificationID);
    }

    __addNotificationToList(data) {
        this.__notificationList.addNotification(data);
    }

    __removeNotificationFromList(notificationID) {
        this.__notificationList.removeNotification(notificationID);
    }

    __notificationClick(ev) {
        console.log('hi', ev);
    }

    __createListeners() {
        return {
            notificationClick: {
                type: 'click',
                listener: this.__notificationClick.bind(this)
            }
        };
    }

    __makeContext() {
        return {
            listeners: this.__createListeners()
        };
    }
}

export const notificationManager = new NotificationHandler();
