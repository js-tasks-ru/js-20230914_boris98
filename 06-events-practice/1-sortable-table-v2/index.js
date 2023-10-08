import SortableTable from '../../05-dom-document-loading/2-sortable-table-v1/index.js';
export default class SortableTableExtended extends SortableTable {
/*
  const sortableTable = new SortableTable(headerConfig, {
    data,
    sorted: {
      id: headerConfig.find(item => item.sortable).id,
      order: 'asc'
    }
  });
*/
	constructor(headersConfig, {
		data = [],
		sorted = {}
	} = {}) {
		super(headersConfig, data);
		// Конструктор и методы нового класса
//		this.sorted=sorted;
	this.changeValue('title','desc');
	}
	changeValue(newField, newOrder) {
		this.newFieldValue =newField;
		this.orderValue = newOrder;
	  }
	// Новые методы и/или переопределение методов родительского класса
}

const sortableTable = new SortableTableExtended();
export { sortableTable };
/*
export default class SortableTable {
  constructor(headersConfig, {
	data = [],
	sorted = {}
  } = {}) {

  }
}
*/