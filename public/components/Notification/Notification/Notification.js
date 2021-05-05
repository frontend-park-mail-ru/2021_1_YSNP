import notificationTemplate from './Notification.hbs';
import './Notification.scss';

export class Notification {
    constructor(parent, offset) {
        this.__parent = parent;
        this.__offset = offset;
    }

    __getNotification() {
        return document.getElementById(`notification-${this.__context.notificationID}`);
    }

    liftUp() {
        console.log('release lift up');
    }

    liftDown() {
        console.log('release lift down');
    }

    render(context) {
        try {
            this.__context = context;

            this.__parent.insertAdjacentHTML('beforeend', notificationTemplate(this.__context));
        } catch (err) {
            console.log(err.message);
        }
    }

    remove() {
        try {
            this.__getNotification().remove();
        } catch (err) {
            console.log(err.message);
        }
    }
}