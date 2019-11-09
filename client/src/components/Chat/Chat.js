import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import './Chat.css'

import InfoBar from "../InfoBar/InfoBar"
import Input from "../Input/Input"
import Messages from "../Messages/Messages"

let socket

const Chat = ({ location }) => {
	const [name, setName] = useState('')
	const [room, setRoom] = useState('')
	const [message, setMessage] = useState('')
	const [messages, setMessages] = useState([])
	const ENDPOINT = 'localhost:5000' // ruta del server

	useEffect(() => {
		const { name, room } = queryString.parse(location.search) // Pasa los parametros del GET a object

		socket = io(ENDPOINT) // Le damos la ruta del server al socket

		// Seteamos los states
		setName(name)
		setRoom(room)

		// Cuando alguien entra al chat, envia name y room al server
		socket.emit('join', { name, room }, () => {

		})

		// Devuelve la funcion de desconexion
		return () => {
			socket.emit('disconnect')
			socket.off()
		}
	}, [ENDPOINT, location.search])

	// Cuando se crea un nuevo mensaje
	useEffect(() => {
		socket.on('message', (message) => {
			setMessages([...messages, message])
		})
	}, [messages])

	// function for sending messages
	const sendMessage = (event) => {
		if(message)
			socket.emit('sendMessage', message, () => setMessage(''))
		event.preventDefault()
	}

	console.log(message, messages)

	return (
		<div className="outerContainer">
			<div className="container">
				<InfoBar room={room} />
				<Messages messages={messages} name={name} />
				<Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
			</div>
		</div>
	)
}

export default Chat