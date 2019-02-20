import React, { Component } from 'react'
import './App.less'
import MyMenu from './component/my-menu/MyMenu'
import Note from './component/note/Note'

class App extends Component {
	render() {
		return (
			<div className="main-content">
				<MyMenu/>
				<div>
					<Note/>
				</div>
			</div>
		)
	}
}

export default App;
