export default class SortableTable {
	constructor(headersConfig, {
		data = [],
		sorted = {}
	} = {}) {
		this.headerConfig = headersConfig;
		this.data = data;
		this.sorted = sorted;
		this.render();

	}
	createHeaderRow() {
		const divHeaderRow = document.createElement('div');

		divHeaderRow.setAttribute('class', 'sortable-table__header sortable-table__row');
		divHeaderRow.setAttribute('data-element', 'header');

		for (let key in this.headerConfig) {
			divHeaderRow.append(this.createHeaderCell(this.headerConfig[key]));
		}
		return divHeaderRow;
	}
	createHeaderCell(objCell) {

		const headerCell = objCell;

		const divHeaderCell = document.createElement('div');

		divHeaderCell.setAttribute('class', 'sortable-table__cell');
		divHeaderCell.setAttribute('data-id', headerCell.id);
		divHeaderCell.setAttribute('data-sortable', headerCell.sortable);

		divHeaderCell.append(document.createElement('span').innerText = headerCell.title);
		if (!this.fieldValue) {
			this.fieldValue = this.sorted.id;
		}
		if (!this.orderValue) {
			this.orderValue = this.sorted.order;
		}
		if (headerCell.id === this.fieldValue && headerCell.sortable) {
			divHeaderCell.setAttribute('data-order', this.orderValue);
			const sortArrow = document.createElement('span');
			sortArrow.className = 'sortable-table__sort-arrow';
			sortArrow.dataset.element = 'arrow';
			sortArrow.innerHTML = '<span class="sort-arrow"></span>';

			divHeaderCell.append(sortArrow);
		}

		divHeaderCell.addEventListener('click', () => {

			this.headerListner(headerCell.id);
		});

		return divHeaderCell;
	}
	createBodyTable(dataObj) {
		const bodyData = dataObj;
		const divBodyTable = document.createElement('div');

		divBodyTable.setAttribute('class', 'sortable-table__body');
		divBodyTable.setAttribute('data-element', 'body');

		for (let key in bodyData) {
			divBodyTable.append(this.createRowTable(bodyData[key]));
		}
		return divBodyTable;
	}
	createRowTable(rowObj) {
		const rowData = rowObj;
		const divRowTable = document.createElement('a');

		divRowTable.setAttribute('class', 'sortable-table__row');
		divRowTable.setAttribute('href', rowData.id);

		for (let key in this.headerConfig) {
			divRowTable.append(this.createCellTable(rowData[this.headerConfig[key].id]));
		}
		return divRowTable;
	}
	createCellTable(cellObj) {

		const cellData = cellObj;

		const divCellTable = document.createElement('div');

		divCellTable.setAttribute('class', 'sortable-table__cell');

		if (typeof (cellData) === 'object') {
			divCellTable.append(this.createImageSrc(cellData));
		}
		else {
			divCellTable.innerHTML = cellData;
		}
		return divCellTable;
	}
	createImageSrc(imageObj) {
		const imageData = imageObj[0];
		const imageSrc = document.createElement('img');

		imageSrc.setAttribute('class', 'sortable-table-image');
		imageSrc.setAttribute('alt', 'Image');
		imageSrc.setAttribute('src', imageData.url);

		return imageSrc;
	}
	createDivLoading() {
		const divLoading = document.createElement('div');

		divLoading.setAttribute('class', 'loading-line sortable-table__loading-line');

		return divLoading;
	}
	createDivEmptyPlaceholder() {
		const divLEmptyPlaceholder = document.createElement('div');

		divLEmptyPlaceholder.setAttribute('class', 'sortable-table__empty-placeholder');
		divLEmptyPlaceholder.setAttribute('data-element', 'emptyPlaceholder');

		divLEmptyPlaceholder.innerHTML = `
			  <div>
				<p>No products satisfies your filter criteria</p>
				<button type="button" class="button-primary-outline">Reset all filters</button>
			  </div>
			`;
		return divLEmptyPlaceholder;
	}
	createTableTemplate() {

		const divProductsList = document.createElement('div');

		divProductsList.setAttribute('class', 'products-list__container');
		divProductsList.setAttribute('data-element', 'productsContainer');

		const divTable = document.createElement('div');

		divTable.setAttribute('class', 'sortable-table');

		divTable.append(this.createHeaderRow());
		divTable.append(this.createBodyTable(this.data));
		divTable.append(this.createDivLoading());
		divTable.append(this.createDivEmptyPlaceholder());

		divProductsList.append(divTable);

		return divProductsList;

	}

	sort(fieldValue, orderValue) {

		this.fieldValue = fieldValue;
		this.orderValue = orderValue;

		const findSortTypeById = (array, id) => {
			const item = array.find(obj => obj.id === id);
			return item ? item.sortType : null;
		};

		const sortType = findSortTypeById(this.headerConfig, this.fieldValue);

		if (sortType === 'string') {
			if (this.orderValue == 'asc') {
				this.data.sort((a, b) => a[this.fieldValue].localeCompare(b[this.fieldValue], ['ru', 'en'], { caseFirst: 'upper' }));
			}
			else {
				this.data.sort((a, b) => b[this.fieldValue].localeCompare(a[this.fieldValue], ['ru', 'en'], { caseFirst: 'upper' }));
			}
		} else {

			if (this.orderValue == 'asc') {
				this.data.sort((a, b) => a[this.fieldValue] - b[this.fieldValue]);
			}
			else {
				this.data.sort((a, b) => b[this.fieldValue] - a[this.fieldValue]);
			}
		}


		return this.update();

	}
	update() {
		const newTableElement = this.createTableTemplate();
		this.element.replaceWith(newTableElement);
		this.element = newTableElement;
		this.subElements = {
			body: this.element.querySelector('[data-element="body"]'),
			header: this.element.querySelector('[data-element="header"]')
		};
		//		console.log(this.subElements.body);
	}
	render() {
		this.element = this.createTableTemplate();
		this.sort(this.sorted.id, this.sorted.order);
		//		console.log(this.subElements);
		/*
				this.subElements = {
					body: this.element.querySelector('[data-element="body"]'),
					header: this.element.querySelector('[data-element="header"]')
				};
		*/

	}
	headerListner(headerTitle) {

		const targetDiv = event.target.closest('div');
		/*
		const targetDiv = event.target;
		while (targetDiv && targetDiv.tagName !== 'DIV') {
			targetDiv = targetDiv.parentNode;
		}
		*/
		const oldOrder = targetDiv.getAttribute('data-order');

		console.log(targetDiv);
		console.log(oldOrder);

		if (!oldOrder) {
			this.orderValue = this.sorted.order;
		}
		else {
			if (oldOrder === 'asc') {
				this.orderValue = 'desc';
			}
			if (oldOrder === 'desc') {
				this.orderValue = 'asc';
			}
		}
		//		console.log(this.orderValue);
		this.sort(headerTitle, this.orderValue);
	}

	remove() {
		this.element.remove();
	}
	destroy() {
		this.remove();
	}
}
/*

const data = [
	{
		'id': 'soska-(pustyshka)-nuk-10729357',
		'title': 'Соска (пустышка) NUK 10729357',
		'price': 3,
		'sales': 14
	},
	{
		'id': 'tv-tyuner-d-color--dc1301hd',
		'title': 'ТВ тюнер D-COLOR  DC1301HD',
		'price': 15,
		'sales': 13
	},
	{
		'id': 'detskiy-velosiped-lexus-trike-racer-trike',
		'title': 'Детский велосипед Lexus Trike Racer Trike',
		'price': 53,
		'sales': 11
	},
	{
		'id': 'soska-(pustyshka)-philips-scf182/12',
		'title': 'Соска (пустышка) Philips SCF182/12',
		'price': 9,
		'sales': 11
	},
	{
		'id': 'powerbank-akkumulyator-hiper-sp20000',
		'title': 'Powerbank аккумулятор Hiper SP20000',
		'price': 30,
		'sales': 11
	},
];

export const headerConfig = [
	{
		id: 'title',
		title: 'Name',
		sortable: true,
		sortType: 'string'
	},
	{
		id: 'price',
		title: 'Price',
		sortable: true,
		sortType: 'number'
	},
	{
		id: 'sales',
		title: 'Sales',
		sortable: true,
		sortType: 'number'
	},
];
let sortableTable;
sortableTable = new SortableTable(headerConfig, {
	data,
	sorted: {
		id: headerConfig.find(item => item.sortable).id,
		order: 'asc'
	}
});

document.body.append(sortableTable.element);
const { children } = sortableTable.subElements.header;
const [title] = children;

const pointerdown = new MouseEvent('pointerdown', {
	bubbles: true
});

title.dispatchEvent(pointerdown);
const { body } = sortableTable.subElements;
const firstRow = body.firstElementChild;
const lastRow = body.lastElementChild;
console.log(firstRow);
console.log(lastRow);
*/