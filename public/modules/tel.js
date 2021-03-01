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
    const matrix = '(___) ___ __ __';
    const val = ev.target.value.replace(/\D/g, '');
    let i = 0;

    ev.target.value = matrix.replace(/./g, (a) => /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a);
}

/***
 * Get telephone number
 * @param {String} tel - telephone number with mask
 */
export function telNumber(tel) {
    return `+7${tel.replaceAll(' ', '')
        .replace('(', '')
        .replace(')', '')}`;
}

/***
 * Check number length
 * @param {String} number - input number
 * @returns {{message: string, error: boolean}}
 */
export function validationNumber(number) {
    // eslint-disable-next-line no-magic-numbers
    if (number.length !== 12) {
        return {
            message: 'Неверно введен номер телефона',
            error: false
        };
    }

    return {
        message: '',
        error: true
    };
}