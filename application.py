import os
import code
import requests

from flask import Flask, render_template, redirect, url_for, request, jsonify
from flask_socketio import SocketIO, emit

from models import *

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")

socketio = SocketIO(app)

chatrooms = {}


@app.route("/")
def index():
	return render_template('index.html')


@app.route("/chat_list")
def chat_list():
	return render_template('chat_list.html', chatroom_list=chatrooms)


@app.route("/login", methods=["POST", "GET"])
def login():
	if request.method == "GET":
		return render_template('login.html')

	else:
		username = request.form.get("username")
		return jsonify({"success": True})


@app.route("/chat/<string:chatroom_name>")
def chat(chatroom_name):
	if not chatrooms.get(chatroom_name):
		return render_template('error.html')

	else:
		chatroom = chatrooms[chatroom_name]
		return render_template('chat.html', chat=chatroom)


@app.route("/add_message", methods=["POST"])
def add_message():
	try:
		message = request.form.get("message")
		username = request.form.get("username")

		chat = chatrooms[request.form.get("chatroom_name")]
		chat.add_message(username, message)

		if chat.get_message_length() > 100:
			chat.delete_oldest_message()
			return jsonify({"success": True})

		else:
			return jsonify({"success": True})

	except ValueError:
		return jsonify({"success": False})


@socketio.on("share message")
def message(data):
	m = data['message_info'][0]
	username = data['message_info'][1]

	chat_name = data['message_info'][2]
	chat = chatrooms[chat_name]
	chat.add_message(username, m)

	if chat.get_message_length() > 100:
		chat.delete_oldest_message()

	emit("update messages", {"message_info": [username, m]}, broadcast=True)


@socketio.on("create room")
def add_room(data):
	name = data["name"]
	if chatrooms.get(name):
		emit("add room", {"room_info": [name, False]}, broadcast=False)
	else:
		chatroom = Chatroom(name)
		chatrooms[name] = chatroom
		emit("add room", {"room_info": [name, True]}, broadcast=True)
