/***
 * Auth controller
 */
export class MapController {
    /***
     *
     * @param {HTMLElement} parent - element callback will work with
     * @param {Map} map - map
     */
    constructor(parent, map) {
        this.__parent = parent;
        this.__map = map;
        this.__isShown = false;
    }

    /***
     * Add listeners
     */
    control() {
        this.__map.listeners = this.__createListeners();
        this.__map.addListeners();
        this.__isShown = true;
    }

    /***
     *  Remove listeners
     */
    removeControllerListeners() {
        if (this.__isShown) {
            this.__map.removeListeners();
        }
    }

    /***
     * Map popup click event
     * @param {MouseEvent} ev - event
     * @private
     */
    __listenerMapClick(ev) {
        ev.stopPropagation();

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
     * Map outside popup click event
     * @param {Event} ev - event
     * @private
     */
    __listenerPageClick(ev) {
        ev.preventDefault();

        this.__closeMap();
    }

    /***
     * Map key esc pressed
     * @param {KeyboardEvent} ev - event
     * @private
     */
    __listenerKeyClick(ev) {
        if (ev.key === 'Escape') {
            this.__closeMap();
        }
    }

    /***
     * Get auth listeners
     * @returns {{mapClick: {listener: *, type: string}, pageClick: {listener: *, type: string}, keyClick: {listener: *, type: string}}}
     * @private
     */
    __createListeners() {
        return {
            mapClick: {
                type: 'click',
                listener: this.__listenerMapClick.bind(this)
            },
            pageClick: {
                type: 'click',
                listener: this.__listenerPageClick.bind(this)
            },
            keyClick: {
                type: 'keydown',
                listener: this.__listenerKeyClick.bind(this)
            }
        };
    }

    /***
     * Close auth
     * @private
     */
    __closeMap() {
        this.__map.removeListeners();
        this.__map.remove();
        this.__isShown = false;
    }

    /***
     * Get auth actions
     * @returns {{closeClick: {open: *}}}
     * @private
     */
    __getActions() {
        return {
            closeClick: {
                open: this.__closeMap.bind(this)
            }
        };
    }
}