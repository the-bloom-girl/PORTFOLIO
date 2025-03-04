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
	const agree = document.getElementById('agree').checked;
	if (!agree) {
		document.getElementById('agreeError').textContent = 'You must agree to continue';
		isValid = false;
	}

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
});

