document.addEventListener('DOMContentLoaded', () => {

	// If the user gets to the error page, they must have a chatroom name in localStorage that no longer exists
	// We remove the name so that they can be redirected correctly to the index page
	localStorage.removeItem('current-chatroom')

});
