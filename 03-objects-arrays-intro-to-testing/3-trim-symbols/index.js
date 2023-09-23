/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
	if (size === 0 || string === '') {
		return '';
	}

	let result = '';
	let count = 0;
	let prevChar = '';

	for (let i = 0; i < string.length; i++) {
		const char = string[i];
		if (char !== prevChar) {
			count = 0;
		}
		count++;
		if (!size || count <= size) {
			result += char;
		}
		prevChar = char;
	}

	return result;
}
