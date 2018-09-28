document.addEventListener('DOMContentLoaded', () => {

	// Connect to websocket
	var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
	localStorage.setItem('current-chatroom', document.querySelector('#chat-name').value);
	
	socket.on('connect', () => {
		document.querySelector('#say-something-form').onsubmit = () => {
			const message = document.querySelector('#say-something').value;
			const username = localStorage["username"]
			const chatName = document.querySelector('#chat-name').value;
			document.querySelector('#say-something').value = "";
			socket.emit("share message", {"message_info": [message, username, chatName]});
			return false;
		};
	});

	socket.on('update messages', data => {
		addMessage(data['message_info'][0], data['message_info'][1]);
	});

	function addMessage(username, message) {
		let noMessages = document.querySelector('#no-messages');
		if (noMessages) {
			noMessages.parentNode.removeChild(noMessages);
		}
		const p = document.createElement('p');
		p.innerHTML = username + ": " + message;
		document.querySelector('#messages').appendChild(p);
		scrollBottom();
	}

	// Keep scroll bar at the bottom of the chat window
	// Credit goes to: https://stackoverflow.com/questions/18614301/
	// keep-overflow-div-scrolled-to-bottom-unless-user-scrolls-up
	function scrollBottom(){
	    var messages = document.querySelector('#messages');
	    messages.scrollTop = messages.scrollHeight;
	}

});
