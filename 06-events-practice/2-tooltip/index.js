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
	}
	onTooltipPointerOver = (event) => {
		if (event.target.hasAttribute('data-tooltip')) {
			const tooltip = document.querySelector('.tooltip');
			if (!tooltip) {
				this.render();
			}
			const tooltipText = event.target.dataset.tooltip;
			this.element.textContent = tooltipText;
			document.addEventListener('pointermove', this.onTooltipPointerMove);
			event.target.addEventListener('pointerout', this.onTooltipPointerOut);
		}
	}
	onTooltipPointerMove(event) {
		const tooltip = document.querySelector('.tooltip');
		tooltip.style.top = event.clientY + window.scrollY + 10 + 'px';
		tooltip.style.left = event.clientX + 10 + 'px';
	}
	onTooltipPointerOut = (event) => {
		if (event.target.hasAttribute('data-tooltip')) {
			document.removeEventListener('pointermove', this.onTooltipPointerMove);
			event.target.removeEventListener('pointerout', this.onTooltipPointerOut);
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
		document.addEventListener('pointerout', this.onTooltipPointerOut);
		this.remove();
		this.element = null;
	}
}
export default Tooltip;

