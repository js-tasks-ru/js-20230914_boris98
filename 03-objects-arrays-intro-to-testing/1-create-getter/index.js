/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
	const fieldsArray = path.split('.');

	return function (obj) {
		let value = obj;
		for (let field of fieldsArray) {
			value = value[field];
			if (!value) {
				return undefined;
			}
		}
		return value;
	};
}
