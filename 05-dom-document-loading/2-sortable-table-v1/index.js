export default class SortableTable {
	constructor(headerConfig = [], data = []) {
		this.headerConfig = headerConfig;
		this.data = data;
		this.element = this.createTableTemplate();
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
		this.odjCell = objCell;
		const divHeaderCell = document.createElement('div');

		divHeaderCell.setAttribute('class', 'sortable-table__cell');
		divHeaderCell.setAttribute('data-id', this.odjCell.id);
		divHeaderCell.setAttribute('data-sortable', this.odjCell.sortable);
		//		divHeaderCell.setAttribute('data-order', this.odjCell.sortType);

		divHeaderCell.innerHTML = `
				<span>${this.odjCell.title}</span>
				${this.odjCell.sortable ?
				`<span data-element="arrow" class="sortable-table__sort-arrow">
						<span class="sort-arrow"></span>
					</span>`: ''}
		`;
		return divHeaderCell;
	}
	createBodyTable(dataObj) {
		this.dataObj = dataObj;
		const divBodyTable = document.createElement('div');

		divBodyTable.setAttribute('class', 'sortable-table__body');
		divBodyTable.setAttribute('data-element', 'body');

		for (let key in this.dataObj) {
			divBodyTable.append(this.createRowTable(this.dataObj[key]));
		}
		return divBodyTable;
	}
	createRowTable(rowObj) {
		this.rowObj = rowObj;
		const divRowTable = document.createElement('a');

		divRowTable.setAttribute('class', 'sortable-table__row');
		divRowTable.setAttribute('href', this.rowObj.id);

		for (let key in this.headerConfig) {
			divRowTable.append(this.createCellTable(this.rowObj[this.headerConfig[key].id]));
		}
		return divRowTable;
	}
	createCellTable(cellObj) {
		this.cellObj = cellObj;
		const divCellTable = document.createElement('div');

		divCellTable.setAttribute('class', 'sortable-table__cell');

		if (typeof (this.cellObj) === 'object') {
			divCellTable.append(this.createImageSrc(this.cellObj));
		}
		else {
			divCellTable.innerHTML = this.cellObj;
		}
		return divCellTable;
	}
	createImageSrc(imageObj) {
		this.ImageSrc = imageObj[0];
		const imageSrc = document.createElement('img');

		imageSrc.setAttribute('class', 'sortable-table-image');
		imageSrc.setAttribute('alt', 'Image');
		imageSrc.setAttribute('src', this.ImageSrc.url);

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

		const sortedBodyTable = document.querySelector('.sortable-table__body');
		sortedBodyTable.replaceWith(this.createBodyTable(this.data));

	}
	remove() {
		this.element.remove();
	}
	destroy() {
		this.remove();
	}
}

