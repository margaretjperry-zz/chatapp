import os

from flask import Flask


class Chatroom():

	def __init__(self, name):
		self.name = name
		self.messages = []

	def get_messages(self):
		return self.messages

	def add_message(self, username, message):
		self.messages.append({"username": username, "message": message})

	def delete_oldest_message(self):
		self.messages.pop(0)

	def get_name(self):
		return self.name

	def get_message_length(self):
		return len(self.messages)
