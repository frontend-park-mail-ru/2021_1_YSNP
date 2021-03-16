'use strict';

/***
 * @author Ivan Gorshkov
 *
 * mask for amount
 * @param{string} value - value of amount
 * @return {string}
 */
export function amountMask(value) {
    const maxDigit = 15;
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