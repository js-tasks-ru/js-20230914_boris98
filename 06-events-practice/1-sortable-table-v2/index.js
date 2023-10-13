import SortableTable from '../../05-dom-document-loading/2-sortable-table-v1/index.js';

export default class SortableTableExtended extends SortableTable {
	constructor(headersConfig, {
		data = [],
		sorted = {}
	} = {}) {
		super(headersConfig, data);
		this.sorted = sorted;
		this.sort(this.sorted.id, this.sorted.order);

		this.addListener();
	}
	
	addListener() {
		const headerRowElement = this.element.querySelector('.sortable-table__header');

		headerRowElement.addEventListener('pointerdown', this.onHeaderRowPointerDown);
// on + object + event name

	}
	onHeaderRowPointerDown = (event) => {
		const { id, sortable } = event.target.closest('.sortable-table__cell').dataset;
		if (sortable === 'false') return;
		const order = event.target.closest('.sortable-table__cell').dataset.order === 'asc' ? 'desc' : 'asc';
		this.sort(id, order);
	}
	removeListener() {
		if (this.element) {
			const headerRow = this.element.querySelector('.sortable-table__header');

			headerRow.removeEventListener('pointerdown', this.onHeaderRowPointerDown);

		}
	}
	destroy() {
		this.removeListener();
		super.destroy();
	}
}

