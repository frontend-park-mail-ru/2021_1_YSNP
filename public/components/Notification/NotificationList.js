import notificationListTemplate from './NotificationList.hbs';
import './NotificationList.scss';

import {Notification} from './Notification/Notification';

export class NotificationList {
    constructor(parent) {
        this.__parent = parent;
        this.__notificationList = new Map();
    }

    __getNotificationList() {
        return document.getElementById('notification-list');
    }

    __getNotificationListContent() {
        return document.getElementById('notification-list-content');
    }

    __addListeners() {
        this.__getNotificationList()
            .addEventListener(this.__context.listeners.notificationClick.type, this.__context.listeners.notificationClick.listener);
    }

    __removeListeners() {
        this.__getNotificationList()
            .removeEventListener(this.__context.listeners.notificationClick.type, this.__context.listeners.notificationClick.listener);
    }

    addNotification(data) {
        const notification = new Notification(this.__getNotificationListContent(), 0);
        notification.render(data);
        this.__notificationList.set(data.notificationID, notification);
    }

    removeNotification(notificationID) {
        const notification = this.__notificationList.get(notificationID);
        if (notification) {
            notification.remove();
        }
    }

    liftUpNotification(notificationID) {
        const notification = this.__notificationList.get(notificationID);
        if (notification) {
            notification.liftUp();
        }
    }

    liftDownNotification(notificationID) {
        const notification = this.__notificationList.get(notificationID);
        if (notification) {
            notification.liftDown();
        }
    }

    render(context) {
        try {
            this.__context = context;

            this.__parent.insertAdjacentHTML('beforeend', notificationListTemplate());
            this.__addListeners();
        } catch (err) {
            console.log(err.message);
        }
    }

    remove() {
        try {
            this.__removeListeners();
            this.__getNotificationList().remove();
        } catch (err) {
            console.log(err.message);
        }
    }
}