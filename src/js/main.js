import '/src/sass/style.scss';

document.getElementById('contactForm').addEventListener('submit', event => {
	event.preventDefault(); // Забороняємо стандартну відправку

	let isValid = true;

	// Очищення попередніх повідомлень про помилки
	document.getElementById('nameError').textContent = '';
	document.getElementById('emailError').textContent = '';
	document.getElementById('questionError').textContent = '';
	document.getElementById('agreeError').textContent = '';
	document.getElementById('successMessage').style.display = 'none';

	// Валідація імені
	const name = document.getElementById('name').value.trim();
	if (name === '') {
		document.getElementById('nameError').textContent = 'Name is required';
		isValid = false;
	}

	// Валідація email
	const email = document.getElementById('email').value.trim();
	const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	if (!emailPattern.test(email)) {
		document.getElementById('emailError').textContent = 'Enter a valid email';
		isValid = false;
	}

	// Валідація питання
	const question = document.getElementById('question').value.trim();
	if (question === '') {
		document.getElementById('questionError').textContent = 'Please enter your question';
		isValid = false;
	}

	// Перевірка чекбоксу
	document.getElementById('contactForm').addEventListener('submit', event => {
		const agreeCheckbox = document.getElementById('agree');
		const agreeError = document.getElementById('agreeError');

		if (agreeCheckbox.checked === false) { // Явно порівнюємо значення
			agreeError.textContent = 'You must agree to continue';
			event.preventDefault(); // Забороняємо відправку форми
		} else {
			agreeError.textContent = ''; // Очищаємо помилку
		}
	});

	if (isValid) {
		// Показуємо повідомлення про успішну відправку
		document.getElementById('successMessage').style.display = 'block';

		// Вимикаємо кнопку на 3 секунди
		const submitButton = document.getElementById('submitButton');
		submitButton.disabled = true;

		// Очищення форми
		document.getElementById('contactForm').reset();

		// Прибираємо повідомлення через 3 секунди та вмикаємо кнопку
		setTimeout(() => {
			document.getElementById('successMessage').style.display = 'none';
			submitButton.disabled = false;
		}, 3000);
	}

	document.addEventListener('DOMContentLoaded', () => {
		document.getElementById('contactForm').addEventListener('submit', async function (event) {
			event.preventDefault(); // ❌ Зупиняємо стандартне відправлення форми

			const submitButton = document.getElementById('submitButton');
			const responseMessage = document.getElementById('responseMessage');
			const formData = new FormData(this);

			// ❌ Захист від подвійного натискання
			if (submitButton.disabled) {
				return;
			}

			submitButton.textContent = 'Submitting...';
			submitButton.disabled = true; // Вимикаємо кнопку

			try {
				const response = await fetch(this.action, {
					method: this.method,
					body: formData,
				});

				if (!response.ok) {
					throw new Error('Server error!');
				}

				const _result = await response.json(); // ESLint не буде лаятися
				console.log(_result); // Використовуємо отримані дані (якщо треба)

				responseMessage.textContent = '✅ Form submitted successfully!';
				responseMessage.style.color = 'green';
			} catch (_error) { // ✅ ESLint тепер не буде лаятися
				console.error('Form submission error:', _error); // Виводимо в консоль для налагодження
				responseMessage.textContent = '❌ Error submitting form!';
				responseMessage.style.color = 'red';
			}

			setTimeout(() => {
				submitButton.textContent = 'Submit';
				submitButton.disabled = false; // Через 2 секунди кнопка знову активна
			}, 2000);
		});
	});
});

document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('contactForm').addEventListener('submit', async function (event) {
		event.preventDefault(); // ❌ Зупиняємо стандартне відправлення форми

		const submitButton = document.getElementById('submitButton');
		const responseMessage = document.getElementById('responseMessage');
		const formData = new FormData(this);

		// ❌ Захист від подвійного натискання
		if (submitButton.disabled) {
			return;
		}

		submitButton.textContent = 'Submitting...';
		submitButton.disabled = true; // Вимикаємо кнопку

		try {
			const response = await fetch(this.action, {
				method: this.method,
				body: formData,
			});

			if (!response.ok) {
				throw new Error('Server error!');
			}

			const _result = await response.json(); // Використовуємо змінну (_result), щоб уникнути помилки ESLint
			console.log('Server response:', _result); // Виводимо в консоль для налагодження

			responseMessage.textContent = '✅ Form submitted successfully!';
			responseMessage.style.color = 'green';
		} catch (_error) { // ✅ ESLint тепер не лається
			console.error('Form submission error:', _error); // Виводимо помилку в консоль
			responseMessage.textContent = '❌ Error submitting form!';
			responseMessage.style.color = 'red';
		}

		// ✅ Використовуємо `setTimeout`, щоб повернути кнопку у стан "Submit"
		setTimeout(() => {
			submitButton.textContent = 'Submit'; // 🔄 Кнопка повертається у стан "Submit"
			submitButton.disabled = false; // 🔓 Знову вмикаємо кнопку
		}, 2000);
	});
});
document.getElementById('contactForm').addEventListener('submit', event => {
	const nameInput = document.getElementById('name');
	const nameError = document.getElementById('nameError');

	if (nameInput.value.trim() === '') {
		nameInput.classList.add('error'); // Додаємо помилку
		nameError.style.display = 'block'; // Показуємо повідомлення
		event.preventDefault();
	} else {
		nameInput.classList.remove('error'); // Прибираємо помилку
		nameError.style.display = 'none';
	}
});

document.addEventListener('DOMContentLoaded', () => {
	const slides = document.querySelector('.slides');
	const buttons = document.querySelectorAll('.slider-btn');
	const prevBtn = document.querySelector('.prev');
	const nextBtn = document.querySelector('.next');

	const slideWidth = 330; // Ширина 1 картинки + відступ
	let activeIndex = 0; // Початковий активний слайд
	const maxIndex = 1; // Можна зміститися лише на 1 (4 картинки, 3 видно)

	// Функція зміни слайду
	function changeSlide(index) {
		slides.style.transform = `translateX(-${index * slideWidth}px)`;

		// Оновлюємо активний клас у кнопок
		buttons.forEach(btn => btn.classList.remove('active'));
		buttons[index].classList.add('active');

		activeIndex = index;
	}

	// Додаємо подію для кнопок-індикаторів
	buttons.forEach((button, index) => {
		button.addEventListener('click', () => changeSlide(index));
	});

	// Кнопка "Вперед"
	nextBtn.addEventListener('click', () => {
		if (activeIndex < maxIndex) {
			changeSlide(activeIndex + 1);
		}
	});

	// Кнопка "Назад"
	prevBtn.addEventListener('click', () => {
		if (activeIndex > 0) {
			changeSlide(activeIndex - 1);
		}
	});
	// Встановлюємо активний клас на першу кнопку при завантаженні
	buttons[0].classList.add('active');
});
document.addEventListener('DOMContentLoaded', () => {
	const submitButton = document.getElementById('submitButton');
	const emailInput = document.getElementById('email');
	const emailError = document.getElementById('emailError');
	const agreeCheckbox = document.getElementById('agree');
	const agreeError = document.getElementById('agreeError');

	// Створюємо блок для повідомлення про успіх
	const successMessage = document.createElement('div');
	successMessage.id = 'successMessage';
	successMessage.style.color = 'green';
	successMessage.style.fontSize = '16px';
	successMessage.style.marginTop = '10px';
	successMessage.style.display = 'none';
	submitButton.parentNode.appendChild(successMessage);

	submitButton.addEventListener('click', event => {
		event.preventDefault(); // Зупиняємо стандартне відправлення форми

		let isValid = true; // Перемикач для перевірки всіх полів
		const emailValue = emailInput.value.trim();
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Регулярний вираз для перевірки email

		// Перевірка email
		if (emailValue === '') {
			emailError.textContent = 'E-mail is required';
			emailError.style.display = 'block';
			isValid = false;
		} else if (emailPattern.test(emailValue)) {
			emailError.textContent = '';
			emailError.style.display = 'none';
		} else {
			emailError.textContent = 'Enter a valid e-mail';
			emailError.style.display = 'block';
			isValid = false;
		}

		// Перевірка чекбокса
		if (agreeCheckbox.checked) {
			agreeError.textContent = '';
			agreeError.style.display = 'none';
		} else {
			agreeError.textContent = 'You must agree to the terms';
			agreeError.style.display = 'block';
			isValid = false;
		}

		// Якщо форма валідна, виводимо повідомлення про успіх
		if (isValid) {
			successMessage.textContent = 'Form submitted successfully!';
			successMessage.style.display = 'block';

			// Тут можна викликати реальне відправлення форми через AJAX або `form.submit()`
			console.log('Form submitted successfully!'); // Логування у консоль
		}
	});
});

