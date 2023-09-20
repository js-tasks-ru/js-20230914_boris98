/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
	let compare;
	let sortedArray = [...arr]; // array copy
	switch (param) {
		case 'asc':
			compare = function (a, b) {
				return a.localeCompare(b, ['ru', 'en'], { caseFirst: 'upper' });
			};
			break;
		case 'desc':
			compare = function (a, b) {
				return b.localeCompare(a, ['ru', 'en'], { caseFirst: 'upper' });
			};
			break;
		default:
			return arr; // invalid sort order return arr
	}
	return sortedArray.sort(compare);
}
