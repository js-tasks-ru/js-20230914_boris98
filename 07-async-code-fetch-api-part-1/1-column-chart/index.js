import fetchJson from "./utils/fetch-json.js";

const BACKEND_URL = "https://course-js.javascript.ru";

export default class ColumnChart {
	element;
	subElements;
	data = [];

	constructor(options = {}) {
		const {
			url = "",
			label = "",
			link = "",
			formatHeading = (value) => value,
			range: { from = new Date(), to = new Date() } = {},
			chartHeight = 50,
		} = options;

		this.label = label;
		this.link = link;
		this.formatHeading = formatHeading;
		this.chartHeight = chartHeight;
		this.render();
		this.subElements = this.getSubElements();
		this.url = new URL(url, BACKEND_URL);;
		this.from = from.toISOString();
		this.to = to.toISOString();

		this.update(this.from, this.to);
	}

	createLinkTemplate() {
		return this.link ? `<a href="${this.link}" class="column-chart__link">View all</a>` : "";
	}
	createChartTemplate() {

		const maxValue = Math.max(...this.data);

		return this.data
			.map(item => {
				const scale = this.chartHeight / maxValue;
				const percent = (item / maxValue * 100).toFixed(0);

				return `<div style="--value: ${Math.floor(item * scale)}" data-tooltip="${percent}%"></div>`;
			})
			.join('');
	}

	createElementContentTemplate() {
		return `
        <div class="column-chart__title">
            Total ${this.label}
            ${this.createLinkTemplate()}
        </div>
        <div class="column-chart__container">
            <div data-element="header" class="column-chart__header"></div>
            <div data-element="body" class="column-chart__chart"></div>
        </div>
    `;
	}
	getSubElements() {
		const elements = this.element.querySelectorAll('[data-element]');

		return [...elements].reduce((accum, subElement) => {
			accum[subElement.dataset.element] = subElement;

			return accum;
		}, {});
	}

	toggleLoadingClass(data) {
		if (!this.data.length && data.length) {
			this.element.classList.remove("column-chart_loading");
		} else if (this.data.length && !data.length) {
			this.element.classList.add("column-chart_loading");
		}
	}
	render() {
		const element = document.createElement("div");
		element.classList.add("column-chart");

		if (!this.data.length) {
			element.classList.add("column-chart_loading");
		}
		element.innerHTML = this.createElementContentTemplate();
		this.element = element;
	}
	async update(from, to) {
		this.url.searchParams.set('from', from);
		this.url.searchParams.set('to', to);
		const data = await fetchJson(this.url);
		const newDataValues = Object.values(data);
		this.toggleLoadingClass(newDataValues);
		this.data = newDataValues;
		let sum = newDataValues.reduce((total, current) => total + current, 0);
		this.subElements.header.innerHTML = this.formatHeading(sum);
		this.subElements.body.innerHTML = this.createChartTemplate();
		return data;
	}
	remove() {
		this.element.remove();
	}
	destroy() {
		this.remove();
	}
}