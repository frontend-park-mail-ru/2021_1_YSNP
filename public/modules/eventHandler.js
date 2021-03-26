/***
 * Release event action
 * @param {Event} ev - user event
 * @param {Object} actions - actions on this event
 * @param {boolean} isStopPropagation - release stop propagation
 */
export function eventHandler(ev, actions, isStopPropagation = false) {
    Object
        .entries(ev.composedPath())
        .forEach(([, el]) => {
            if (el.dataset !== undefined && 'action' in el.dataset) {
                if (isStopPropagation) {
                    ev.stopPropagation();
                }

                actions[el.dataset.action].open();
            }
        });
}

/***
 *
 * @param ev
 * @param dataType
 * @param actions
 * @param isStopPropagation
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