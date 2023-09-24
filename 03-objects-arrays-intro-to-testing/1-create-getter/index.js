/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
	const fields = path.split('.');

	return function (obj) {
		let value = obj;
		for (const field of fields) {
			value = value[field];
			if (!value) {
				return;
			}
		}
		return value;
	};
}
