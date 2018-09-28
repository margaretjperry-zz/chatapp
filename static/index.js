document.addEventListener('DOMContentLoaded', () => {
	if(localStorage.getItem('username')) {
		if (localStorage.getItem('current-chatroom')) {
			window.location.href = '/chat/' + localStorage.getItem('current-chatroom');
		} else {
			window.location.href = '/chat_list';
		}
	} else {
		window.location.href = '/login';
	}
	
});
