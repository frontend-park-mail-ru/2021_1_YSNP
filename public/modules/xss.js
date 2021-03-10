/***
 * Delete symbols from str
 * @param {string} str - input string
 * @returns {string}
 */
export function deleteSymbolsXSS(str) {
    if (str !== undefined && typeof str === 'string') {
        const lt = /</g, gt = />/g, amp = /&/g, ap = /'/g, ic = /"/g;

        return str
            .replace(lt, '&lt;')
            .replace(gt, '&gt;')
            .replace(amp, '&amp;')
            .replace(ap, '&#39;')
            .replace(ic, '&#34;');
    }

    return str;
}