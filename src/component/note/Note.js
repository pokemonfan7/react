import React, {Component} from 'react'
import GithubSvg from '../github-svg/GithubSvg'
import Remarkable from 'remarkable'
import es6Note from '../../notes/ES6'
import './Note.less'

export default class Note extends Component {
	getRawMarkup() {
		const md = new Remarkable();
		return {__html: md.render(es6Note.promise)};
	}

	render() {
		return (
			<>
				<a className="github-link" target="_blank" rel="noopener noreferrer" href={es6Note.github}>
					<GithubSvg/>
				</a>
				<div dangerouslySetInnerHTML={this.getRawMarkup()}/>
			</>
		)
	}
}
