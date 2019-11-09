const users = []

const addUser = ({ id, name, room }) => {
	// JavaScript Master = javascriptmaster
	name = name.trim().toLowerCase()
	room = romm.trim().toLowerCase()

	// Buscamos si el usuario existe
	const existingUser = users.find((user) => user.room === room && user.name === name)
	if(existingUser)
		return {error: 'Username is taken'}

	const user = { id, name, room }
	users.push(user)

	return { user }
}

const removeUser = (id) => {
	const index = users.findIndex((user) => user.id === id)

	id(index !== -1)
		return users.splice(index, 1)[0] // Devuelve el id del usuario eliminado
}

const getUser = (id) => users.find((user) => user.id === id)

const getUsersInRoom = (room) => users.filter((user) => user.room === room)

module.exports = { addUser, removeUser, getUser, getUsersInRoom }