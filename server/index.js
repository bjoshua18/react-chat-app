const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')

const PORT = process.env.PORT || 5000 // Puerto por defecto 5000

const router = require('./router') // Importamos el fichero con las rutas

// Estructura básica para crear un servidor con socket.io
const app = express()
const server = http.createServer(app)
const io = socketio(server)

// Escuchamos cuando haya una nueva conexion
io.on('connection', (socket) => {
	console.log('We have a new connection.')

	// Cuando alguien se apunta a un chat...
	socket.on('join', ({ name, room }, callback) => {
		const { error, user } = addUser({ id: socket.id, name, room }) // Agregamos al usuario

		if(error) return callback(error) // Terminamos si el usuario existe

		// Mensaje de bienvenida al usuario
		socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` })
		// Mensaje para todos los usuarios del room
		socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined` })

		socket.join(user.room) // Agregamos el socket al room
		callback() // Ejecutamos el callback sin errores
	})

	// Escuchamos cuando el socket se desconecte
	socket.on('disconnect', () => {
		console.log('User had left.')
	})
})

app.use(router) // Llamamos al router como a un middleware

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))
