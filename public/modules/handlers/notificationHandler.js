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

        this.__isWorking = true;
        this.__notificationList.render(this.__makeContext());
    }

    remove() {
        this.__isWorking = false;
        this.__notificationList.remove();
    }

    addNotification(data) {
        if (this.__notifications) {
            this.__remove(this.__notifications.notificationID);
            this.__notifications = undefined;
            return;
        }

        this.__notifications = {
            notificationID: data.messageID,
            data: {
                notificationID: data.messageID,
                img: data.
            }
        };

        this.__add(this.__notifications);
    }

    __timerEnd(notificationID) {
        this.__remove(notificationID);
    }

    __add(data) {
        this.__notificationList.addNotification(data);

        this.__timer = setTimeout(() => {
            this.__timerEnd(data.notificationID);
        }, 4000);
    }

    __remove(notificationID) {
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
