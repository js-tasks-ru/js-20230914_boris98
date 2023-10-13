export default class NotificationMessage {
	static currentMessage = null;
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
		if (NotificationMessage.currentMessage) {
			NotificationMessage.currentMessage.remove();
		}
		targetElement.append(this.element);
		if (this.duration) {
			this.hideTimeoutId = setTimeout(() => this.remove(), this.duration);
		}
		NotificationMessage.currentMessage = this;
	}
	remove() {
		this.element.remove();
	}
	destroy() {
		this.remove();
		if (this.hideTimeoutId) {
			clearTimeout(this.hideTimeoutId);
		}
		this.hideTimeoutId = null;
	}
}