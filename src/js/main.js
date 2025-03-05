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

