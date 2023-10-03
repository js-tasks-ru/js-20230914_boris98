export default class NotificationMessage {
	constructor(
		message = '',
		{
			type = '',
			duration = 0
		} = {}
	) {
		this.textMessage = message;
		this.type = type;
		this.duration = duration;
		this.element = this.createTemplate();

		this.show();
	}

	createTemplate() {
		const wrapper = document.createElement('div');
		wrapper.setAttribute('class', `notification ${this.type}`);
		wrapper.style.setProperty('--value', `${this.duration / 1000}s`);

		wrapper.innerHTML = `
		  <div class="timer"></div>
		  <div class="inner-wrapper">
			<div class="notification-header">${this.type}</div>
			<div class="notification-body">${this.textMessage}</div>
		  </div>
		`;

		return wrapper;

	}
	show(targetElement = document.body) {

		targetElement.appendChild(this.element);
		if (this.duration) {
			this.hideTimeout = setTimeout(() => this.remove(), this.duration);
		}

	}
	remove() {
		clearTimeout(this.hideTimeout);
		this.element.remove();

	}
	destroy() {
		this.remove();
	}

}
