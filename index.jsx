import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import App from './src/components/App/App.jsx'
import Show from './src/components/Show/Show.jsx'
import List from './src/components/List/List.jsx'
import Search from './src/components/Search/Search.jsx'

render((
	<Router history={ hashHistory }>
		<Route path="/" component={App}/>
		<Route path="/show/:id" component={Show}/>
		<Route path="/list/:type" component={ List }/>
		<Route path="/search" component={ Search }/>
	</Router>
),document.getElementById('app'))