const express = require('express')
const router = express.Router()

// Ruta raiz
router.get('/', (req, res) => {
	res.send('server is up and running')
})

module.exports = router