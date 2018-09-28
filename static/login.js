document.addEventListener('DOMContentLoaded', () => {

	document.querySelector('#username-form').onsubmit = () => {

		const request = new XMLHttpRequest();
		const username = document.querySelector('#username').value;
		request.open('POST', '/login');

		request.onload = () => {

			const data = JSON.parse(request.responseText);

			if (data.success) {
				localStorage.setItem('username', username);
				window.location.href = '/';
			}
		}

		const data = new FormData();
		data.append('username', username);

		request.send(data);
		return false;
	};

});
