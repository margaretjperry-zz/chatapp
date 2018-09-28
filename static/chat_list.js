//If user tries to access this page with no username, redirect
if (localStorage.getItem('username') === null) {
		window.location.href = '/';
}

document.addEventListener('DOMContentLoaded', () => {

	var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
	
	socket.on('connect', () => {
		document.querySelector('#chatroom-name-form').onsubmit = () => {
			const name = document.querySelector('#chatroom-name').value;
			document.querySelector('#chatroom-name').value = '';
			socket.emit("create room", {"name": name});
			return false;
		};
	});

	socket.on('add room', data => {
		if (data["room_info"][1]) {
			document.querySelector('#chatlist-message').style.display = 'none'
			addToChatList([data["room_info"][0]]);
		} else {
			document.querySelector('#chatlist-message').style.display = 'inline';
		}
	});

	function addToChatList(chatList) {
		let noChats = document.querySelector('#no-chats');
		if (noChats) {
			noChats.parentNode.removeChild(noChats);
		}
		for (i = 0; i < chatList.length; i++) {
			const p = document.createElement('p');
			p.innerHTML = '<a href="/chat/' + chatList[i] + '">' + chatList[i] + '</a>';
			document.querySelector('#chatroom-list').append(p);
		}
	}
	
});
