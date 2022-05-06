export const UI_ELEMENT_BLOCK_SETTING = document.querySelector('.settings');
export const UI_ELEMENT_BLOCK_CHAT = document.querySelector('.chatContainer');
export const UI_ELEMENT_BLOCK_CHAT_WINDOW = document.querySelector('.chat');
export const UI_ELEMENTS_BLOCK_CHAT = {
	messageConteyner: UI_ELEMENT_BLOCK_CHAT.querySelector('.chat__conteyner'),
	message: UI_ELEMENT_BLOCK_CHAT.querySelector('.chat__conteyner'),
}
export const UI_ELEMENT_BLOCK_SEND_MESSAGE = document.querySelector('.send-message-form');
export const UI_ELEMENTS_BLOCK_SETTING = {
	buttonSetting: UI_ELEMENT_BLOCK_SETTING.querySelector('.settings__button'),
	buttonOut: UI_ELEMENT_BLOCK_SETTING.querySelector('.settings__button-out')
};
export const UI_ELEMENT_POPUP_SETTING = document.querySelector('.popup-setting');
export const UI_ELEMENTS_POPUP_SETTING = {
	buttonCloseSetting: UI_ELEMENT_POPUP_SETTING.querySelector('.popup-setting__close-img'),
	formSetting: UI_ELEMENT_POPUP_SETTING.querySelector('.popup-setting-form'),
	input: UI_ELEMENT_POPUP_SETTING.querySelector('.popup-setting__input-name')
};
export const UI_ELEMENT_POPUP_AUTORIZATION = document.querySelector('.popup-authorization');
export const UI_ELEMENTS_POPUP_AUTORIZATION = {
	formAutorization: UI_ELEMENT_POPUP_AUTORIZATION.querySelector('.popup-authorization-form'),
	input: UI_ELEMENT_POPUP_AUTORIZATION.querySelector('.popup-authorization__input-mail'),
	buttonReceiving: UI_ELEMENT_POPUP_AUTORIZATION.querySelector('.popup-authorization__button-code'),
	buttoncloseAutorization: UI_ELEMENT_POPUP_AUTORIZATION.querySelector('.popup-authorization__close-img'),
};
export const UI_ELEMENT_POPUP_CONFIRMATION = document.querySelector('.popup-confirmation');
export const UI_ELEMENTS_POPUP_CONFIRMATION = {
	formConfirmation: UI_ELEMENT_POPUP_AUTORIZATION.querySelector('.popup-confirmation-form'),
	input: UI_ELEMENT_POPUP_AUTORIZATION.querySelector('.popup-confirmation__input-code'),
	buttonEntrance: UI_ELEMENT_POPUP_AUTORIZATION.querySelector('.popup-authorization__button-entrance'),
	buttonCloseConfirmation: UI_ELEMENT_POPUP_AUTORIZATION.querySelector('.popup-confirmation__close-img'),
};
export const UI_ELEMENTS_BLOCK_SEND_MESSAGE = {
	input: UI_ELEMENT_BLOCK_SEND_MESSAGE.querySelector('.send-message__input'),
	button: UI_ELEMENT_BLOCK_SEND_MESSAGE.querySelector('.send-message__button')
};
export const TEMPLATE_MESSAGE = document.querySelector('#message__item-clone');
export const storage = {
	saveToken(value) {
		return localStorage.setItem('token', JSON.stringify(value));
	},
	saveID(value) {
		return localStorage.setItem('id', JSON.stringify(value));
	},
	getToken() {
		// return JSON.parse(localStorage.getItem('token'));
		return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imxpdl82MUBtYWlsLnJ1IiwiaWF0IjoxNjUxMjI3NDA5LCJleHAiOjE2NTE2NzM4MDl9.TCm8ow-Xc0Vv0e7vNXF_BxO8O5Trnk8SPVaOo1qanLY'
	},
	getId() {
		return JSON.parse(localStorage.getItem('id'));
	}
}
// export const socket = new WebSocket(`ws://mighty-cove-31255.herokuapp.com/websockets?eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imxpdl82MUBtYWlsLnJ1IiwiaWF0IjoxNjUxMjI3NDA5LCJleHAiOjE2NTE2NzM4MDl9.TCm8ow-Xc0Vv0e7vNXF_BxO8O5Trnk8SPVaOo1qanLY`);
