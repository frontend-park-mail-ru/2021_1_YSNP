import './Notification.scss';
import notificationTemplate from './Notification.hbs';

/***
 * Notification class
 * @class Navigation
 */
export class Notification {

    /***
     * init of class Navigation
     * @constructor
     * @public
     */
    constructor() {
        this.__parent = document.getElementById('notification-line');
        this.__listeners = this.__createListeners();
    }

    /***
     * Add listeners from component
     */
    addListeners() {
        document
            .getElementById(`${this.__notificationID}`)
            .addEventListener(this.__context.listeners.notificationClick.type, this.__context.listeners.notificationClick.listener);
    }

    /***
     * Remove listeners from component
     */
    removeListeners() {
        document
            .getElementById(`${this.__notificationID}`)
            .removeEventListener(this.__context.listeners.notificationClick.type, this.__context.listeners.notificationClick.listener);
    }

    /***
     * Get notification listeners
     * @returns {{notificationClick: {listener, type: string}}}
     * @private
     */
    __createListeners() {
        return {
            notificationClick: {
                type: 'click',
                listener: this.__listenerNotificationClick.bind(this)
            }
        };
    }

    /***
     * Notification click event
     * @param {Event} ev - mouse event
     * @private
     */
    __listenerNotificationClick(ev) {
        const actions = this.__getActions();
        Object
            .entries(ev.composedPath())
            .forEach(([, el]) => {
                if (el.dataset !== undefined && 'action' in el.dataset) {
                    actions[el.dataset.action].open();
                }
            });
    }

    /***
     * Get notification actions
     * @returns {{advancedClick: {open}, setClick: {open}, baseClick: {open}, nothingClick: {open}, improvedClick: {open}}}
     * @private
     */
    __getActions() {
        return {
            closeClick: {
                open: this.__closeNotification.bind(this)
            },
            messageClick: {
                open: this.__openChat.bind(this)
            }
        };
    }

    /***
     * Open chat
     * @private
     */
    __openChat() {
        // const chatID = this.__context.data.chatID;
        //TODO redirect to chat
    }

    /***
     * Close notification
     * @private
     */
    __closeNotification() {
        try {
            this.removeListeners();
            document.getElementById(`${this.__notificationID}`).remove();
        } catch (err) {
            console.log(err.message);
        }
    }

    /***
     * context for template
     * @param ctx {Object} - context with info
     * @private
     */
    __makeContext(ctx) {
        this.__context = {
            data: {
                productImg: ctx.productImg,
                name: ctx.name,
                message: ctx.message,
                chatID: ctx.chatID,
                notificationID: ctx.messageId
            },
            listeners: this.__listeners
        };
        this.__notificationID = ctx.messageId;
    }

    /***
     * @author Ivan Gorshkov
     *
     * Add component to parent
     * @this {Navigation}
     * @public
     */
    render(ctx) {
        this.__makeContext(ctx);
        if (this.__parent.nextElementSibling.className === 'notification') {
            let child = this.__parent;
            let bottom = 13;
            while (child.nextElementSibling.className === 'notification') {
                child = child.nextElementSibling;
                child.style.bottom += `${bottom}vh`;
                bottom += 10;
            }
            this.__parent = child;
        }

        this.__parent.insertAdjacentHTML('afterend', notificationTemplate(this.__context.data));

        setTimeout(() => {
            this.__closeNotification();
            }, 4000);
        this.addListeners();
    }
}