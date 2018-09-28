document.addEventListener('DOMContentLoaded', () => {

	document.querySelector('#logout-button').onclick = () => {

		localStorage.clear();
		window.location.href = '/login';
		
	};

});
