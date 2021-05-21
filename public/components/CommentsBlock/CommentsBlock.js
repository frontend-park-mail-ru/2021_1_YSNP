import './CommentsBlock.scss';
import commentBlockTemplate from './CommentsBlock.hbs';
import oneCommentTemplate from './OneComment/OneComment.hbs';

import {sentryManager} from '../../modules/sentry';
import {OneComment} from './OneComment/OneComment';

/***
 * Profile menu
 */
export class CommentsBlock {
    /***
     * Class constructor
     * @param {Element} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * Make context
     * @param {Object} context - context
     * @private
     */
    __makeContext(context) {
        this.__context = {
            title: 'Отзывы',
            data: context.data,
            listeners: context.listeners
        };
    }

    /***
     * Add component listeners
     * @this {Settings}
     */
    __addListeners() {
        document
            .getElementById('comments')
            .addEventListener(this.__context.listeners.type, this.__context.listeners.listener);
    }

    /***
     * Remove component listeners
     * @this {Settings}
     */
    removeListeners() {
        document
            .getElementById('comments')
            .removeEventListener(this.__context.listeners.type, this.__context.listeners.listener);
    }

    /***
     * Draw comments
     * @private
     */
    __drawComments() {
        const {sellerBlock, buyerBlock} = this.getCommentsElements();
        const sellerComments = [];
        const buyerComments = [];
        for (let i = 0; i < this.__context.data.length; i++) {
            if (this.__context.data[i].belongs === 0) {
                sellerComments.push(this.__context.data[i]);
            } else {
                buyerComments.push(this.__context.data[i]);
            }
        }
        if (sellerComments.length === 0) {
            sellerBlock.innerText = 'У пользователя еще нет отзывов';
        }
        if (sellerComments.length === 0) {
            buyerBlock.innerText = 'У пользователя еще нет отзывов';
        }
        for (let i = 0; i < sellerComments.length; i++) {
            const oneComment = new OneComment(sellerBlock);
            oneComment.render(sellerComments[i]);
        }
        for (let i = 0; i < buyerComments.length; i++) {
            const oneComment = new OneComment(buyerBlock);
            oneComment.render(buyerComments[i]);
        }
    }

    /***
     * Get HTML element of one comment by id
     * @param id
     * @returns {HTMLElement}
     */
    getCommentElementByID(id) {
        return document.getElementById(`one-comment-${id}`);
    }

    /***
     * Get HTML elements
     * @returns {{sellerBlock: HTMLElement, buyerBlock: HTMLElement}}
     */
    getCommentsElements() {
        return {
            sellerBlock: document.getElementById('comments-sellers'),
            buyerBlock: document.getElementById('comments-buyers')
        };
    }

    /***
     * Add component to parent
     */
    render(context) {
        try {
            this.__makeContext(context);
            this.__parent.insertAdjacentHTML('beforeend', commentBlockTemplate(this.__context));
            this.__drawComments();
            this.__addListeners();
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }
}