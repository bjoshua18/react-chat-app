const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const PORT = process.env.PORT || 5000 // Puerto por defecto 5000

const router = require('./router') // Importamos el fichero con las rutas

// Estructura básica para crear un servidor con socket.io
const app = express()
const server = http.createServer(app)
const io = socketio(server)

// Escuchamos cuando haya una nueva conexion
io.on('connection', (socket) => {
	console.log('We have a new connection.')

	// Escuchamos cuando el socket se desconecte
	socket.on('disconnect', () => {
		console.log('User had left.')
	})
})

app.use(router) // Llamamos al router como a un middleware

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))
