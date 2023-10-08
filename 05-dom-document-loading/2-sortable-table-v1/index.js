export default class SortableTable {
	constructor(headerConfig = [], data = []) {
		this.fieldValue = '';
		this.orderValue = '';
		this.headerConfig = headerConfig;
		this.data = data;
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

		if (headerCell.id === this.fieldValue) {
			divHeaderCell.setAttribute('data-order', this.orderValue);
			const sortArrow = document.createElement('span');
			sortArrow.className = 'sortable-table__sort-arrow';
			sortArrow.dataset.element = 'arrow';
			sortArrow.innerHTML = '<span class="sort-arrow"></span>';

			divHeaderCell.append(sortArrow);
		}

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
			body: this.element.querySelector('[data-element="body"]')
		};
	}
	render() {

		this.element = this.createTableTemplate();

		this.subElements = {
			body: this.element.querySelector('[data-element="body"]')
		};
	}

	remove() {
		this.element.remove();
	}
	destroy() {
		this.remove();
	}
}
