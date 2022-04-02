// Importing modules
import React, { Component, useState } from "react";
import { TextAnnotator } from 'react-text-annotate'
import { FirstQuestions, LastQuestions } from '../Questions'

const log = require('console-log-level')({
	prefix: function (level) {
		return new Date().toISOString()
	},
	level: 'info'
})

class Paragraph extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: [],
			tag: 'Confused',
			content: props.value
		};
		this.highlight = this.highlight.bind(this)
	}
	COLORS = {
		Confused: "#CC79A7", Connected: "#D55E00",
		Present: "#0072B2", Curious: "#F0E442", Other: "#009E73"
	}


	getAnnotate() {
		return (this.props.annotate ? "" : "none");
	}

	async highlight(value) {
		const highlight = value.concat({ paragraph: this.props.index });
		log.info(JSON.stringify(highlight));
		await fetch('./log_highlights', {
			method: 'POST', body: JSON.stringify(highlight),
			headers: { 'Content-Type': 'application/json' }
		});
	}

	render() {
		return (
			<div className="paragraph visible"
				page={this.props.page}
				style={this.props.style} index={this.props.index}>
				<select className="form-select form-select-sm"
					style={{ display: this.getAnnotate(), width: '15%' }}
					onChange={e => this.setState({ tag: e.target.value })}
					value={this.state.tag}
				>
					<option value="Confused">Confused</option>
					<option value="Connected">Connected</option>
					<option value="Present">Present in scene</option>
					<option value="Curious">Curious</option>
					<option value="Other">Liked (other)</option>
				</select>
				<p>
					<TextAnnotator
						content={this.props.value}
						value={this.state.value}
						onChange={value => {
							this.setState({ value });
							this.highlight(value)
						}}
						getSpan={span => ({
							...span,
							tag: this.state.tag,
							color: this.COLORS[this.state.tag],
						})}
						renderMark={props => (
							<mark
								key={props.key}
								onClick={() => props.onClick({ start: props.start, end: props.end })}
							>
								{props.content} [{props.tag}]
							</mark>
						)}
					>
					</TextAnnotator>
				</p>
			</div>
		)
	}
}

const PageNumber = props => {
	return (
		<div className="pagenumber">
			{props.page + 1} of {props.total + 1}
		</div>
	)
}

class Story extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="story" >
				{
					this.props.paragraphs.map((value, index) => {
						if (value.page === 1) {
							return (
								<FirstQuestions
									key={index}
									index={index}
									page={value.page} />
							)
						} else if (value.paragraph === "lastQuestions") {
							return (
								<LastQuestions
									id="lastQuestions"
									value="lastQuestions"
									key={index}
									index={index}
									page={value.page} />
							)
						} else {
							return (
								<Paragraph key={index}
									index={index}
									value={value.paragraph}
									page={value.page}
									annotate={this.props.annotate} />
							)
						}
					})}
			</div>
		);
	}
}

export default Story;
export { Paragraph, PageNumber, FirstQuestions };