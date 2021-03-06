/***
 * @author Ivan Gorshkov
 *
 * Release event action
 * @param {Event} ev - user event
 * @param {string} dataType - action of dataset
 * @param {Object} actions - actions on this event
 * @param {boolean} isStopPropagation - release stop propagation
 */
export function eventHandlerWithDataType(ev, dataType, actions, isStopPropagation = false) {
    Object
        .entries(ev.composedPath())
        .forEach(([, el]) => {
            if (el.dataset !== undefined && dataType in el.dataset) {
                if (isStopPropagation) {
                    ev.stopPropagation();
                }

                actions[el.dataset[dataType]].open(ev);
            }
        });
}

/***
 * Release event action
 * @param {Event} ev - user event
 * @param {Object} actions - actions on this event
 * @param {boolean} isStopPropagation - release stop propagation
 */
export function eventHandler(ev, actions, isStopPropagation = false) {
    eventHandlerWithDataType(ev, 'action', actions, isStopPropagation);
}

/***
 * Release event with id
 * @param {MouseEvent} ev - user event
 * @param {Object} actions - actions on this event
 * @param {string} idName - id name in dataset
 */
export function eventHandlerWithId(ev, actions, idName) {
    ev.preventDefault();

    let id = undefined;
    let action = undefined;
    Object
        .entries(ev.composedPath())
        .forEach(([, el]) => {
            if (el.dataset !== undefined) {
                if ('action' in el.dataset && action === undefined) {
                    action = el.dataset.action;
                }

                if (idName in el.dataset) {
                    id = el.dataset[idName];
                }
            }
        });

    if (action !== undefined) {
        actions[action].open(id);
    }
}

/***
 * Release product click event
 * @param {MouseEvent} ev - user event
 * @param {Object} actions - actions on this event
 */
export function eventProductListHandler(ev, actions) {
    eventHandlerWithId(ev, actions, 'cardId');
}

/***
 * Release chat list click event
 * @param {MouseEvent} ev - user event
 * @param {Object} actions - actions on this event
 */
export function eventChatListHandler(ev, actions) {
    eventHandlerWithId(ev, actions, 'chatId');
}

/***
 * Release review list click event
 * @param {MouseEvent} ev - user event
 * @param {Object} actions - actions on this event
 */
export function eventReviewListHandler(ev, actions) {
    eventHandlerWithId(ev, actions, 'reviewId');
}

/***
 * Release select user click event
 * @param {MouseEvent} ev - user event
 * @param {Object} actions - actions on this event
 */
export function eventSelectUserHandler(ev, actions) {
    eventHandlerWithId(ev, actions, 'userId');
}

/***
 * Release event with two id
 * @param {MouseEvent} ev - event
 * @param {Object} actions - event actions
 * @param {string} idNameOne - id name in dataset
 * @param {string} idNameTwo - id name in dataset
 */
export function eventHandlerWithTwoId(ev, actions, idNameOne, idNameTwo) {
    ev.preventDefault();

    let idOne = undefined;
    let idTwo = undefined;
    let action = undefined;
    Object
        .entries(ev.composedPath())
        .forEach(([, el]) => {
            if (el.dataset !== undefined) {
                if ('action' in el.dataset && action === undefined) {
                    action = el.dataset.action;
                }

                if (idNameOne in el.dataset) {
                    idOne = el.dataset[idNameOne];
                }

                if (idNameTwo in el.dataset) {
                    idTwo = el.dataset[idNameTwo];
                }
            }
        });

    if (action !== undefined) {
        actions[action].open(parseInt(idOne, 10), parseInt(idTwo, 10));
    }
}

/***
 * Release await review
 * @param {MouseEvent} ev - event
 * @param {Object} actions - event actions
 */
export function eventReviewAwaitHandler(ev, actions) {
    eventHandlerWithTwoId(ev, actions, 'productId', 'userId');
}