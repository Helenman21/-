export const UI_ELEMENT_BLOCK_SETTING: HTMLElement = document.querySelector('.settings');
export const UI_ELEMENT_BLOCK_CHAT: HTMLElement = document.querySelector('.chatContainer');
export const UI_ELEMENT_BLOCK_CHAT_WINDOW: HTMLElement = document.querySelector('.chat');
export const UI_ELEMENTS_BLOCK_CHAT = {
	messageConteyner: UI_ELEMENT_BLOCK_CHAT.querySelector('.chat__conteyner'),
	message: UI_ELEMENT_BLOCK_CHAT.querySelector('.chat__conteyner'),
}
export const UI_ELEMENT_BLOCK_SEND_MESSAGE: HTMLFormElement = document.querySelector('.send-message-form');
export const UI_ELEMENTS_BLOCK_SETTING: {
	buttonSetting: HTMLElement,
	buttonOut: HTMLElement
} = {
	buttonSetting: UI_ELEMENT_BLOCK_SETTING.querySelector('.settings__button'),
	buttonOut: UI_ELEMENT_BLOCK_SETTING.querySelector('.settings__button-out')
};
export const UI_ELEMENT_POPUP_SETTING: HTMLElement = document.querySelector('.popup-setting');
export const UI_ELEMENTS_POPUP_SETTING: {
	buttonCloseSetting: HTMLElement,
	formSetting: HTMLFormElement,
	input: HTMLInputElement
} = {
	buttonCloseSetting: UI_ELEMENT_POPUP_SETTING.querySelector('.popup-setting__close-img'),
	formSetting: UI_ELEMENT_POPUP_SETTING.querySelector('.popup-setting-form'),
	input: UI_ELEMENT_POPUP_SETTING.querySelector('.popup-setting__input-name')
};
export const UI_ELEMENT_POPUP_AUTORIZATION: HTMLElement = document.querySelector('.popup-authorization');
export const UI_ELEMENTS_POPUP_AUTORIZATION: {
	formAutorization: HTMLFormElement,
	input: HTMLInputElement,
	buttonReceiving: HTMLElement,
	buttoncloseAutorization: HTMLElement
} = {
	formAutorization: UI_ELEMENT_POPUP_AUTORIZATION.querySelector('.popup-authorization-form'),
	input: UI_ELEMENT_POPUP_AUTORIZATION.querySelector('.popup-authorization__input-mail'),
	buttonReceiving: UI_ELEMENT_POPUP_AUTORIZATION.querySelector('.popup-authorization__button-code'),
	buttoncloseAutorization: UI_ELEMENT_POPUP_AUTORIZATION.querySelector('.popup-authorization__close-img'),
};
export const UI_ELEMENT_POPUP_CONFIRMATION: HTMLElement = document.querySelector('.popup-confirmation');
export const UI_ELEMENTS_POPUP_CONFIRMATION: {
	formConfirmation: HTMLFormElement,
	input: HTMLInputElement,
	buttonEntrance: HTMLLIElement,
	buttonCloseConfirmation: HTMLLIElement
} = {
	formConfirmation: UI_ELEMENT_POPUP_AUTORIZATION.querySelector('.popup-confirmation-form'),
	input: UI_ELEMENT_POPUP_AUTORIZATION.querySelector('.popup-confirmation__input-code'),
	buttonEntrance: UI_ELEMENT_POPUP_AUTORIZATION.querySelector('.popup-authorization__button-entrance'),
	buttonCloseConfirmation: UI_ELEMENT_POPUP_AUTORIZATION.querySelector('.popup-confirmation__close-img'),
};
export const UI_ELEMENTS_BLOCK_SEND_MESSAGE: {
	input: HTMLInputElement,
	button: HTMLLIElement
} = {
	input: UI_ELEMENT_BLOCK_SEND_MESSAGE.querySelector('.send-message__input'),
	button: UI_ELEMENT_BLOCK_SEND_MESSAGE.querySelector('.send-message__button')
};
export const TEMPLATE_MESSAGE = document.querySelector('#message__item-clone');
export const storage = {
	saveToken(value: string) {
		return localStorage.setItem('token', JSON.stringify(value));
	},
	saveID(value: string) {
		return localStorage.setItem('id', JSON.stringify(value));
	},
	getToken() {
		return JSON.parse(localStorage.getItem('token'));
	},
	getId() {
		return JSON.parse(localStorage.getItem('id'));
	}
}
export const API = {
	apiUser: 'https://mighty-cove-31255.herokuapp.com/api/user',
	apiMessage: 'https://mighty-cove-31255.herokuapp.com/api/messages',
	apiMe: 'https://mighty-cove-31255.herokuapp.com/api/user/me'
}
