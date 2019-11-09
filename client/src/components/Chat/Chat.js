import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

let socket

const Chat = ({ location }) => {
	const [name, setName] = useState('')
	const [room, setRoom] = useState('')
	const ENDPOINT = 'localhost:5000' // ruta del server

	useEffect(() => {
		const { name, room } = queryString.parse(location.search) // Pasa los parametros del GET a object

		socket = io(ENDPOINT) // Le damos la ruta del server al socket

		// Seteamos los states
		setName(name)
		setRoom(room)

		// Cuando alguien entra al chat, envia name y room al server
		socket.emit('join', { name, room })
	}, [ENDPOINT, location.search])

	return (
		<h1>Chat</h1>
	)
}

export default Chat