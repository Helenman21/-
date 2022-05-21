export function addElement(elem: HTMLElement, node: HTMLElement) {
	node.prepend(elem);
};
export function openPopap(element: HTMLElement) {
	element.classList.add('popup-open');
	//window.addEventListener('keydown', checkEscButton);
};
export function markElement (element: HTMLElement) {
	element.classList.add('chat__message-change-color');
}
export function alignElementLeft(element: HTMLElement) {
	element?.classList?.add('alignment');
}
export function clozedPopap(element: HTMLElement) {
	element.classList.remove('popup-open')
	//window.removeEventListener('keydown', checkEscButton);
};
export function resetForm(elem: HTMLFormElement) {
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
export async function patchData(url = '', data = {}, token: string) {
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
export function handleError(res: Response) {
	if (res.ok) {
		return res.json();
	}
	// если ошибка, отклоняем промис
	return Promise.reject(`Ошибка: ${res.status}`);
};
export function getTime(dateString: string) {
	const date = new Date(dateString);
	const hours = date.getHours();
	const minut = date.getMinutes();
	const time = `${hours}:${minut}`;
	return time
}