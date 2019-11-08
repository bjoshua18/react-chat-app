import React from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'

// Importamos los componentes
import Join from './components/Join'
import Chat from './components/Chat'

const App = () => ( // Creamos las rutas y enlazamos sus respectivos componentes
	<Router>
		<Route path="/" exact component={Join} />
		<Route path="/chat" component={Chat} />
	</Router>
)

export default App