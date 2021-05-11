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
 *
 * @param tel
 */
export function parseTelMask(tel) {
    const mask = '(___) ___ __ __';
    const val = tel.replace(/\D/g, '');
    let i = 0;

// Add mask to input data
    return mask.replace(/./g, (a) => {
        if (/[_\d]/.test(a) && i < val.length) {
            return val.charAt(i++);
        } else if (i >= val.length) {
            return '';
        }

        return a;
    });
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

/***
 * @author Ivan Gorshkov
 *
 * mask for amount
 * @param{string} value - value of amount
 * @return {string}
 */
export function amountMask(value) {
    const maxDigit = 12;
    const firstIndex = 0;
    const lastIndex = -1;
    const groupNumber = 3;
    const remainder = 0;

    if (value.length > maxDigit) {
        return value.slice(firstIndex, lastIndex);
    }

    const tmpString = value.replace(/[^0-9]/g, '').toString();
    const newStr = tmpString.split('').reverse().reduce((previousValue, currentValue, currentIndex) => {
        if (currentIndex % groupNumber === remainder && currentIndex !== firstIndex) {
            return `${previousValue} ${currentValue}`;
        }
        return previousValue + currentValue.toString();
    }, '');

    return newStr.split('').reverse().join('');
}

/***
 * Parse telephone number (delete mask symbols)
 * @param {string} value - value
 * @returns {number}
 */
export function parseAmount(value) {
    return parseInt(value.replace(/[^0-9]/g, '', 0));
}