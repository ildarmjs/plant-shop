// Модальное окно
const popupLinks = document.querySelectorAll('.modal-link')
const body = document.querySelector('body')
const lockPadding = document.querySelectorAll('.lock-padding')

let unlock = true

const timeout = 800

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index]
		popupLink.addEventListener('click', function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '')
			const currentPopup = document.getElementById(popupName)
			popupOpen(currentPopup)
			e.preventDefault()
		})
	}
}

const popupCloseIcon = document.querySelectorAll('.close-modal')
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index]
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.modal'))
			e.preventDefault()
		})
	}
}

//Функция открытия модального окна
function popupOpen(currentPopup) {
	if (currentPopup && unlock) {
		const popupActive = document.querySelector('.modal.open')
		if (popupActive) {
			popupClose(popupActive, false)
		} else {
			bodyLock()
		}
		currentPopup.classList.add('open')
		currentPopup.addEventListener('click', function (e) {
			if (!e.target.closest('.modal__content')) {
				popupClose(e.target.closest('.modal'))
			}
		})
	}
}
//Функция закрытия модального окна
function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open')
		if (doUnlock) {
			bodyUnLock()
		}
	}
}
//Функция запрета на прокрутку страницы
function bodyLock() {
	const lockPaddingValue =
		window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'
	for (let index = 0; index < lockPadding.length; index++) {
		const el = lockPadding[index]
		el.style.paddingRight = lockPaddingValue
	}
	body.style.paddingRight = lockPaddingValue
	body.classList.add('lock')
	unlock = false
	setTimeout(() => {
		unlock = true
	}, timeout)
}

function bodyUnLock() {
	setTimeout(() => {
		for (let i = 0; i < lockPadding.length; i++) {
			const el = lockPadding[index]
			el.style.paddingRight = '0px'
		}
		body.style.paddingRight = '0px'
		body.classList.remove('lock')
	}, timeout)

	unlock = false
	setTimeout(() => {
		unlock = true
	}, timeout)
}

// Валидаци формы
const form = document.getElementById('form')
const inputText = document.getElementById('input-text')
const inputTel = document.getElementById('input-tel')
const error = document.getElementById('error')
const error2 = document.getElementById('error2')
const button = document.getElementById('button')

const modalContent = document.querySelector('.modal__content')
const modalBody = document.querySelector('.modal__body')

form.addEventListener('submit', e => {
	e.preventDefault()
	let reg = /^((\+7|7|8)+([0-9]){10})$/
	if (
		inputText.value.length < inputText.dataset.minLength ||
		!reg.test(inputTel.value)
	) {
		error.style.display = 'block'
		error2.style.display = 'block'
	} else {
		error.style.display = 'none'
		error2.style.display = 'none'
		async function getUser() {
			try {
				let loading = document.querySelector('.loader')
				loading.classList.add('show')
				let response = await fetch('https://jsonplaceholder.typicode.com/todos')

				if (response.ok) {
					const data = await response.json()
					loading.classList.remove('show')
					console.log(data)
					const user = data.find(todo => todo.id === 5)
					modalContent.innerHTML = `
					<a href="" class="modal__close close-modal"
						><i class="fa-solid fa-xmark"></i
					></a>
					<div class="modal__iamge">
						<div class="modal__logo">
							<img src="img/modal/modal.svg" alt="Logo-modal" />
						</div>
					</div>
					<table>
						<colgroup >
							<col span="2">
							<col>
						</colgroup>
						<tr>
							<th>UserID</th>
							<th>id</th>
							<th>Title</th>
							<th>Completed</th>
						</tr>
						<tr>
							<td>${user.userId}</td>
							<td>${user.id}</td>
							<td>${user.title}</td>
							<td>${user.completed}</td>
						</tr>
					</table>
				`
					modalBody.append(modalContent)
				} else {
					loading.classList.remove('show')
					modalContent.innerHTML = `
					<a href="" class="modal__close close-modal"
						><i class="fa-solid fa-xmark"></i
					></a>
					<div class="modal__iamge">
						<div class="modal__logo">
							<img src="img/modal/modal.svg" alt="Logo-modal" />
						</div>
					</div>
					<div class="error-server">Ошибка</div>
				`
					modalBody.append(modalContent)
				}
			} catch (err) {
				console.log(err, 'Ошибка!')
			}
		}
		getUser()
	}
})
