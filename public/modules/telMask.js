/* eslint-disable no-unused-vars */

/***
 * Set cursor pointer in input
 * @param {HTMLInputElement} elem - input element
 * @param {Number} pos - position in input
 */
function setCursorPosition(elem, pos) {
    if (elem.setSelectionRange) {
        elem.focus();
        elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
        const range = elem.createTextRange();

        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);

        range.select();
    }
}

/***
 * Tel mask replace all prohibited symbols
 * @param {Event} ev - event
 */
export function telMask(ev) {
    const mask = '(___) ___ __ __';
    const val = ev.target.value.replace(/\D/g, '');
    let i = 0;

    // Add mask to input data
    ev.target.value = mask.replace(/./g, (a) => {
        if (/[_\d]/.test(a) && i < val.length) {
            return val.charAt(i++);
        } else if (i >= val.length) {
            return '';
        }

        return a;
    });
}

/***
 * Parse telephone number (delete mask symbols)
 * @param {string} tel - telephone number with mask
 * @returns {string}
 */
export function parseTelNumber(tel) {
    return `+7${tel.replaceAll(' ', '')
        .replace('(', '')
        .replace(')', '')}`;
}
