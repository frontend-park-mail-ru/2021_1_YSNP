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

/***
 * Show error when sending to backend
 * @param {string} id - id of error
 * @param {string} text - error message
 */
export function showBackendError(id, text) {
    const err = document.getElementById(id);
    err.textContent = text;
    err.classList.add('backend-error_visible');
    err.classList.remove('backend-error_hidden');
}

/***
 * Hide backend error
 * @param {string} id - id of error
 */
export function hideBackendError(id) {
    document.getElementById(id).classList.remove('backend-error_visible');
    document.getElementById(id).classList.add('backend-error_hidden');
    document.getElementById(id).classList.remove('settings-password-error_success');
}

/***
 * Analyze validate error
 * @param {boolean} error - error message
 * @param target - target that is validated
 * @param {string} message - message to show
 */
export function validateError(error, target, message) {
    if (!error) {
        addSuccesses(target, `${target.id}Error`);
        return true;
    }
    insertError(target, `${target.id}Error`, createMessageError(`
                  <ul class="list-errors">
                     <li>${message}</li>
                 </ul>
    `));
    return false;
}