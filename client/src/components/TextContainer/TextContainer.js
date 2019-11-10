import React from 'react'

import './TextContainer.css'

const TextContainer = ({ users }) => (
	<div className="textContainer">
		<ul>
			{users.map(user => <li>{user.name}</li>)}
		</ul>
	</div>
)

export default TextContainer