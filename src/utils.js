export function addElement(elem, node) {
	node.prepend(elem);
};
export function openPopap(element) {
	element.classList.add('popup-open');
	//window.addEventListener('keydown', checkEscButton);
};
export function markElement (element) {
	element.classList.add('chat__message-change-color');
}
export function alignElementLeft(element) {
	element?.classList?.add('alignment');
}
export function clozedPopap(element) {
	element.classList.remove('popup-open')
	//window.removeEventListener('keydown', checkEscButton);
};
export function resetForm(elem) {
	elem.reset()
};
export async function postData(url = '', data = {}) {
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	return await handleError(response);
};
export async function patchData(url = '', data = {}, token) {
	const response = await fetch(url, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: JSON.stringify(data)
	});
	return await handleError(response);
};
export function handleError(res) {
	if (res.ok) {
		return res.json();
	}
	// если ошибка, отклоняем промис
	return Promise.reject(`Ошибка: ${res.status}`);
};
export function getTime(dateString) {
	const date = new Date(dateString);
	const hours = date.getHours();
	const minut = date.getMinutes();
	const time = `${hours}:${minut}`;
	return time
}