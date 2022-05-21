import { MessageData } from './types.js'
import {
	UI_ELEMENT_BLOCK_SETTING, UI_ELEMENT_BLOCK_CHAT, UI_ELEMENT_BLOCK_SEND_MESSAGE, UI_ELEMENTS_BLOCK_SETTING,
	UI_ELEMENT_POPUP_SETTING, UI_ELEMENTS_POPUP_SETTING, UI_ELEMENT_POPUP_AUTORIZATION, UI_ELEMENTS_POPUP_AUTORIZATION,
	UI_ELEMENT_POPUP_CONFIRMATION, UI_ELEMENTS_POPUP_CONFIRMATION, UI_ELEMENTS_BLOCK_SEND_MESSAGE,
	TEMPLATE_MESSAGE, storage, UI_ELEMENT_BLOCK_CHAT_WINDOW, API
} from './constans1.js';
import { addElement, openPopap, clozedPopap, resetForm, postData, patchData, handleError, getTime, alignElementLeft, markElement } from './utils1.js'

function createElement(messageData: MessageData): HTMLElement {
	const clone = (TEMPLATE_MESSAGE as HTMLTemplateElement).content.cloneNode(true);
	const textMessage = (clone as HTMLElement).querySelector('.description-text');
	textMessage.textContent = `${messageData?.name}: ${messageData?.text}`;
	const time = (clone as HTMLElement).querySelector('.description-time');
	let date = new Date();
	const hour: number = date.getHours();
	const minut: number = date.getMinutes();
	time.textContent = `${hour}${':'}${minut}`;
	return (clone as HTMLElement)
};

UI_ELEMENTS_BLOCK_SETTING.buttonSetting.addEventListener('click', (event) => {
	openPopap(UI_ELEMENT_POPUP_SETTING)
});
UI_ELEMENTS_POPUP_SETTING.buttonCloseSetting.addEventListener('click', (event) => {
	clozedPopap(UI_ELEMENT_POPUP_SETTING);
});
UI_ELEMENTS_POPUP_CONFIRMATION.buttonCloseConfirmation.addEventListener('click', (event) => {
	clozedPopap(UI_ELEMENT_POPUP_CONFIRMATION as HTMLElement);
});
UI_ELEMENTS_POPUP_AUTORIZATION.buttoncloseAutorization.addEventListener('click', (event) => {
	clozedPopap(UI_ELEMENT_POPUP_AUTORIZATION as HTMLElement);
})
UI_ELEMENTS_BLOCK_SETTING.buttonOut.addEventListener('click', (event) => {
	openPopap(UI_ELEMENT_POPUP_AUTORIZATION as HTMLElement);
}
)

let NAME: string;
let currentMessageList = null;
let myEmail: string = null;
const socket = new WebSocket(`ws://mighty-cove-31255.herokuapp.com/websockets?${storage.getToken()}`);
socket.onopen = function (e) {
	console.log("[open] Соединение установлено");
};
socket.onmessage = function (event) {
	try {
		const data = JSON.parse(event?.data)

		const messageData = {
			id: data?._id,
			name: data?.user?.name === NAME ? data?.user?.name : 'Елена',
			email: data?.user?.email,
			text: data?.text,
			createdAt: data?.createdAt
		}
		const elemClone = createMessage(messageData);
		addElement(elemClone, UI_ELEMENT_BLOCK_CHAT);
	}
	catch (e) {
		console.log(e.name);
		console.log(e.message);
	}
};

socket.onclose = function (event) {
	if (event.wasClean) {
		console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
	} else {
		// например, сервер убил процесс или сеть недоступна
		// обычно в этом случае event.code 1006
		console.log('[close] Соединение прервано');
	}
};


UI_ELEMENT_BLOCK_SEND_MESSAGE.addEventListener('submit', (event) => {
	event.preventDefault();
	socket.send(JSON.stringify({
		text: `${UI_ELEMENTS_BLOCK_SEND_MESSAGE.input.value}`,
	}));
	resetForm(UI_ELEMENT_BLOCK_SEND_MESSAGE);
});

UI_ELEMENTS_POPUP_SETTING.formSetting.addEventListener('submit', (event) => {
	event.preventDefault();
	const value = UI_ELEMENTS_POPUP_SETTING.input.value;
	const token = storage.getToken();
	clozedPopap(UI_ELEMENT_POPUP_SETTING)
	patchData(API.apiUser, { name: value }, token)
		.catch(e => console.log('error /api/user: ', e));
})

UI_ELEMENTS_POPUP_AUTORIZATION.formAutorization.addEventListener('submit', (event) => {
	event.preventDefault();
	const value = UI_ELEMENTS_POPUP_AUTORIZATION.input.value;
	postData(API.apiUser, { email: value })
		.then((data) => {
			clozedPopap(UI_ELEMENT_POPUP_AUTORIZATION);
			openPopap(UI_ELEMENT_POPUP_CONFIRMATION);
			resetForm(UI_ELEMENTS_POPUP_AUTORIZATION.formAutorization);
		})
		.catch(e => console.log('error /api/user: ', e));
});
UI_ELEMENTS_POPUP_CONFIRMATION.formConfirmation.addEventListener('submit', (event) => {
	event.preventDefault();
	if (UI_ELEMENTS_POPUP_CONFIRMATION.input.value) {
		storage.saveToken(UI_ELEMENTS_POPUP_CONFIRMATION.input.value)
		showMessage()
	}
	clozedPopap(UI_ELEMENT_POPUP_CONFIRMATION);
	resetForm(UI_ELEMENTS_POPUP_CONFIRMATION.formConfirmation)
});
showMessage()

type MessageListArray = Array<{
	name: string,
	createdAt: string,
	id: string,
	email: string,
	text: string
}>

function showMessage() {
	Promise.all([getMessage(), getProfile()])
		.then(([messages, profileData]) => {
			const messageList: MessageListArray = messages?.map(item => {
				return {
					name: item?.user?.name,
					createdAt: item?.createdAt,
					id: item?._id,
					text: item?.text,
					email: item?.user?.email
				}
			})
			messageList.reverse();
			const temporaryArray = messageList.splice(0, 20);
			currentMessageList = messageList;
			renderMessageList(temporaryArray);
		})
}

function addTwentyMessage() {
	if (currentMessageList?.length > 0) {
		const temporaryArray = currentMessageList.splice(0, 20);
		renderMessageList(temporaryArray);
		temporaryArray.length = 0;
	}
	if (currentMessageList?.length === 0) {
		currentMessageList = null;
		return UI_ELEMENT_BLOCK_CHAT.insertAdjacentHTML('afterend', '<div>Вся история загружена</div>');
	}
}

UI_ELEMENT_BLOCK_CHAT_WINDOW.addEventListener('scroll', (event) => {
	const getHeightMessageContainer = () => UI_ELEMENT_BLOCK_CHAT?.clientHeight;
	const getHeightChatWindow = () => UI_ELEMENT_BLOCK_CHAT_WINDOW?.clientHeight;
	const getScrollChat = () => UI_ELEMENT_BLOCK_CHAT_WINDOW?.scrollTop;
	const isTimeScroll = - getScrollChat() > (getHeightMessageContainer() - getHeightChatWindow());
	const isValid = isTimeScroll && currentMessageList;
	if (isValid) {
		addTwentyMessage()
	}

})

type MessageList = MessageData[];

function renderMessageList(messageList: MessageList): void {
	messageList.forEach(message => {
		const newMessage = createMessage(message);
		addElement(newMessage, UI_ELEMENT_BLOCK_CHAT as HTMLElement);
	})
}

function createMessage(messageData: MessageData): HTMLElement {
	const { text, name, createdAt, email } = messageData;
	const itemClone = (TEMPLATE_MESSAGE as HTMLTemplateElement).content.cloneNode(true);
	const clone = (itemClone as HTMLElement).querySelector('.chat__conteyner')
	const textMessage = clone.querySelector('.description-text');
	const isValidEmail = email === myEmail;
	const time = clone.querySelector('.description-time');
	time.textContent = getTime(createdAt);
	const clonemessage = clone.querySelector('.chat__message');
	if(isValidEmail) {
		textMessage.textContent = `Я: ${text}`;
		alignElementLeft(clone as HTMLElement);
		markElement(clonemessage as HTMLElement);
	}else{
		textMessage.textContent = `${name}: ${text}`;
	}
	return clone as HTMLElement;
}

type MessageItem = {
	user: {
		name: string,
		email: string
	},
	createdAt: string,
	_id: string,
	text: string
}

type GetMessage = Promise<MessageItem[]>

function getMessage(): GetMessage {
	return fetch(API.apiMessage, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(handleError)
		.then((res) => {
			const messages = res?.messages;
			return messages;
		})
		.catch(e => console.log('err getMessage: ', e))
}

function getProfile() {
	return fetch(API.apiMe, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${storage.getToken()}`
		}
	})
		.then(handleError)
		.then((res) => {
			console.log('это res getProfile: ', res)
			const data = {
				name: res?.name,
				email: res?.email,
				id: res?._id
			}
			myEmail = data.email
		}
		)
}


