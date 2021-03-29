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