'use strict';

/***
 * @author Ivan Gorshkov
 *
 * create box massage with errors
 * @param{string} errText
 * @return {string}
 */
export function createMessageError(errText) {
    return `
            <div class="message-container">
              <div class="message__arrow">
                <div class="message-outer"></div>
                <div class="message-inner"></div>
              </div>
              <div class="message-body">
                    ${errText}
              </div>
            </div>
    `;
}

/***
 * @author Ivan Gorshkov
 *
 * add to DOM error massage
 * @param{Object} target
 * @param{string} idError
 * @param{string} textError
 */
export function insertError(target, idError, textError) {
    target.classList.add('reg-panel__input-error');
    if (document.getElementById(idError) === null) {
        const el = document.createElement('div');
        el.id = idError;
        el.innerHTML = textError;
        el.className = 'error-hidden';

        target.parentNode.insertBefore(el, target.nextSibling);
    }
}


/***
 * @author Ivan Gorshkov
 *
 * add success massage
 * @param{Object} target
 * @param{string} idError
 */
export function addSuccesses(target, idError) {
    target.classList.remove('reg-panel__input-error');
    target.classList.add('reg-panel__input-susses');
    if (document.getElementById(idError)) {
        target.parentNode.removeChild(target.nextSibling);
    }
}


/****
 * @author Ivan Gorshkov
 *
 * action for hide Error event
 * @param{Event} ev - input event
 * @private
 */
export function hideError(ev) {
    if (ev.target.nextSibling.className === '') {
        ev.target.nextElementSibling.classList.add('error-hidden');
    }
}

/****
 * @author Ivan Gorshkov
 *
 * action for show Error
 * @param{Event} ev - input event
 * @private
 */
export function showError(ev) {
    if (ev.target.nextSibling.className === 'error-hidden') {
        ev.target.nextElementSibling.classList.remove('error-hidden');
    }
}