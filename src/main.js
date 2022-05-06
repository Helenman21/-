import {
	UI_ELEMENT_BLOCK_SETTING, UI_ELEMENT_BLOCK_CHAT, UI_ELEMENT_BLOCK_SEND_MESSAGE, UI_ELEMENTS_BLOCK_SETTING,
	UI_ELEMENT_POPUP_SETTING, UI_ELEMENTS_POPUP_SETTING, UI_ELEMENT_POPUP_AUTORIZATION, UI_ELEMENTS_POPUP_AUTORIZATION,
	UI_ELEMENT_POPUP_CONFIRMATION, UI_ELEMENTS_POPUP_CONFIRMATION, UI_ELEMENTS_BLOCK_SEND_MESSAGE,
	TEMPLATE_MESSAGE, storage, UI_ELEMENTS_BLOCK_CHAT, UI_ELEMENT_BLOCK_CHAT_WINDOW
} from './constans.js';
import { addElement, openPopap, clozedPopap, resetForm, postData, patchData, handleError, getTime, alignElementLeft, markElement } from './utils.js'
function createElement(messageData) {
	const clone = TEMPLATE_MESSAGE.content.cloneNode(true);
	const textMessage = clone.querySelector('.description-text');
	textMessage.textContent = `${messageData?.name}: ${messageData?.text}`;
	const time = clone.querySelector('.description-time');
	let date = new Date();
	const hour = date.getHours();
	const minut = date.getMinutes();
	time.textContent = `${hour}${':'}${minut}`;
	return clone
};
UI_ELEMENTS_BLOCK_SETTING.buttonSetting.addEventListener('click', (event) => {
	openPopap(UI_ELEMENT_POPUP_SETTING)
	console.log('работает')
});
UI_ELEMENTS_POPUP_SETTING.buttonCloseSetting.addEventListener('click', (event) => {
	clozedPopap(UI_ELEMENT_POPUP_SETTING);
});
UI_ELEMENTS_POPUP_CONFIRMATION.buttonCloseConfirmation.addEventListener('click', (event) => {
	clozedPopap(UI_ELEMENT_POPUP_CONFIRMATION);
});
UI_ELEMENTS_POPUP_AUTORIZATION.buttoncloseAutorization.addEventListener('click', (event) => {
	clozedPopap(UI_ELEMENT_POPUP_AUTORIZATION);
})
UI_ELEMENTS_BLOCK_SETTING.buttonOut.addEventListener('click', (event) => {
	openPopap(UI_ELEMENT_POPUP_AUTORIZATION);
}
)

let NAME;
let currentMessageList = null;
const myEmail = 'liv_61@mail.ru';
const socket = new WebSocket(`ws://mighty-cove-31255.herokuapp.com/websockets?${storage.getToken()}`);
socket.onopen = function (e) {
	console.log("[open] Соединение установлено");
};
socket.onmessage = function (event) {
	// {"_id":"626fed9eb503280016afc3c3","text":"undefined","user":{"email":"maxim.anokhov@gmail.com","name":"Maxim"},"createdAt":"2022-05-02T14:41:34.178Z","updatedAt":"2022-05-02T14:41:34.178Z","__v":0}
	//console.log(`[message] Данные получены с сервера: ${event.data}`);
	const data = JSON.parse(event?.data)

	const messageData = {
		id: data?._id,
		name: data?.user?.name === NAME ? data?.user?.name : 'Елена',
		email: data?.user?.email,
		text: data?.text,
		createdAt: data?.createdAt
	}
	//console.log('messageData: ', messageData)
	const elemClone = createMessage(messageData);
	addElement(elemClone, UI_ELEMENT_BLOCK_CHAT);
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
	//console.log('test: ', UI_ELEMENTS_POPUP_SETTING.input)
	event.preventDefault();
	const value = UI_ELEMENTS_POPUP_SETTING.input.value;
	const token = storage.getToken();
	clozedPopap(UI_ELEMENTS_POPUP_SETTING)
	patchData('https://mighty-cove-31255.herokuapp.com/api/user', { name: value }, token)
		.catch(e => console.log('error /api/user: ', e));
})

UI_ELEMENTS_POPUP_AUTORIZATION.formAutorization.addEventListener('submit', (event) => {
	event.preventDefault();
	const value = UI_ELEMENTS_POPUP_AUTORIZATION.input.value;
	postData('https://mighty-cove-31255.herokuapp.com/api/user', { email: value })
		.then((data) => {
			//console.log(data); // JSON data parsed by `response.json()` call
			clozedPopap(UI_ELEMENT_POPUP_AUTORIZATION);
			openPopap(UI_ELEMENT_POPUP_CONFIRMATION);
			resetForm(UI_ELEMENTS_POPUP_AUTORIZATION.formAutorization);
		})
		.catch(e => console.log('error /api/user: ', e));
	// setTimeout(clozedPopap(UI_ELEMENT_POPUP_AUTORIZATION), 1000);
	// setTimeout(openPopap(UI_ELEMENT_POPUP_CONFIRMATION), 2000);
	// setTimeout(resetForm(UI_ELEMENTS_POPUP_AUTORIZATION.formAutorization), 3000);
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
function showMessage() {
	Promise.all([getMessage()])
		.then(([messages, profileData]) => {
			console.log('messages in Promise.all: ', messages)
			console.log('profileData in Promise.all: ', profileData)
			const messageList = messages?.map(item => {
				return {
					//isMyMessage: item?.user?._id,
					name: item?.user?.name,
					createdAt: item?.createdAt,
					id: item?._id,
					text: item?.text,
					email: item?.user?.email
				}
			})
			//console.log('получаемый массив', messageList)
			//messageList.reverse();
			const temporaryArray = messageList.splice(0, 20)
			currentMessageList = messageList;
			renderMessageList(temporaryArray);
		})
}

function addTwentyMessage() {
	console.log('messageList in addTwentyMessage: ', currentMessageList);
	if (currentMessageList?.length > 0) {
		console.log('получаемый массив', currentMessageList)
		const temporaryArray = currentMessageList.splice(0, 20);
		console.log('временный массив до обнуления: ', temporaryArray)
		renderMessageList(temporaryArray);
		temporaryArray.length = 0;
		console.log('временный массив после обнуления: ', temporaryArray)
		console.log('получаемый массив - 20: ', currentMessageList)
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
	console.log('это больше', getScrollChat())
	console.log('этого', getHeightMessageContainer())
	console.log('этого минус это', getHeightChatWindow())
	const isTimeScroll = - getScrollChat() > (getHeightMessageContainer() - getHeightChatWindow());
	console.log(isTimeScroll)
	if (isTimeScroll && currentMessageList) {
		addTwentyMessage()
	}

})

function renderMessageList(messageList) {
	messageList.forEach(message => {
		const newMessage = createMessage(message);
		addElement(newMessage, UI_ELEMENT_BLOCK_CHAT);
	})
}
function createMessage(messageData) {
	const { text, name, createdAt, email } = messageData;
	const clone = TEMPLATE_MESSAGE.content.cloneNode(true).querySelector('.chat__conteyner');
	const textMessage = clone.querySelector('.description-text');
	textMessage.textContent = `${name}: ${text}`;
	const time = clone.querySelector('.description-time');
	time.textContent = getTime(createdAt);
	const clonemessage = clone.querySelector('.chat__message')
	if (email === myEmail) {
		alignElementLeft(clone);
		markElement(clonemessage)
	}
	return clone
}

function getMessage() {
	return fetch('https://mighty-cove-31255.herokuapp.com/api/messages', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${storage.getToken()}`
		}
	})
		.then(handleError)
		.then((res) => {
			const messages = res?.messages;
			console.log(messages)
			return messages;
		})
		.catch(e => console.log('err: ', e))
}

function getProfile() {
	return fetch('https://mighty-cove-31255.herokuapp.com/api/user/me', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${storage.getToken()}`
		}
	})
		.then(handleError)
		.then((res) => {
			console.log('это res: ', res)
			const data = {
				name: res?.name,
				email: res?.email,
				id: res?._id
			}
		}
		)
}


