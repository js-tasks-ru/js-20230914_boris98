class Tooltip {
	element;
	constructor() {
		if (!Tooltip.instance) {
			Tooltip.instance = this;
		}
		return Tooltip.instance;
	}
	initialize() {
		document.addEventListener('pointerover', this.onTooltipPointerOver);
		document.addEventListener('pointermove', this.onTooltipPointerMove);
		document.addEventListener('pointerout', this.onTooltipPointerOut);
	}
	onTooltipPointerOver = (event) => {
		if (event.target.hasAttribute('data-tooltip')) {
			const tooltip = document.querySelector('.tooltip');
			if (!tooltip) {
				this.render();
			}
			const tooltipText = event.target.dataset.tooltip;
			this.element.textContent = tooltipText;
		}
	}
	onTooltipPointerMove = (event) => {
		if (Tooltip.instance.element) {
			Tooltip.instance.element.style.top = event.clientY + window.scrollY + 10 + 'px';
			Tooltip.instance.element.style.left = event.clientX + 10 + 'px';
		}
	}
	onTooltipPointerOut = (event) => {
		if (event.target.hasAttribute('data-tooltip')) {
			this.remove();
		}
	}
	render() {
		const wrapper = document.createElement('div');
		wrapper.innerHTML = `<div class="tooltip"></div>`;
		const element = wrapper.firstElementChild;
		this.element = element;
		document.body.append(this.element);
	}
	remove() {
		if (this.element) {
			this.element.remove();
		}
	}
	destroy() {
		document.removeEventListener('pointerover', this.onTooltipPointerOver);
		document.removeEventListener('pointermove', this.onTooltipPointerMove);
		document.removeEventListener('pointerout', this.onTooltipPointerOut);
		this.remove();
		this.element = null;
	}
}
export default Tooltip;

