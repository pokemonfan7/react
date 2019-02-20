import React, { Component } from 'react'
import './App.less'
import MyMenu from './component/my-header/MyMenu'

class App extends Component {
	render() {
		return (
			<div className="main-content">
				<MyMenu/>
				<div>
					77
				</div>
			</div>
		)
	}
}

export default App;
