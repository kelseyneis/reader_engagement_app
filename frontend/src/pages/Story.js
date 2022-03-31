// Importing modules
import React, { Component, useState } from "react";
import {TextAnnotator} from 'react-text-annotate'

class Paragraph extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: [],
			tag: 'Confused',
			content: props.value
		};
	}

	COLORS = {Confused: "#CC79A7", Connected: "#D55E00", 
	Present: "#0072B2", Curious: "#F0E442", Other: "#009E73"}

	getAnnotate() {
		return (this.props.annotate ? "" : "none");
	}

	render() {
		return (
			<div className="paragraph visible"
			page={this.props.page} 
			style={this.props.style} index={this.props.index}>
				<select style={{display: this.getAnnotate() }}
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
						onChange={ value => this.setState({ value }) }
						getSpan={ span => ({
							...span,
							tag: this.state.tag,
							color: this.COLORS[this.state.tag],
						})}
						renderMark={props => (
							<mark
							key={props.key}
							onClick={() => props.onClick({start: props.start, end: props.end})}
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

const FirstQuestions = props => {
	const [inputs, setInputs] = useState({});

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs(values => ({...values, [name]: value}))
	 }

	 const handleSubmit = (event) => {
		event.preventDefault();
		
	 }

   return (
		<div className="paragraph visible" 
		id="firstQuestions"
		index={props.index}
		page={props.page}
		style={props.style}>
			<form onSubmit={handleSubmit}>
				<label>What did you like about the beginning of the story?</label>
				<br/>
				<textarea rows="4" cols="50" id="firstPageQuestions-1"
					type="text" 
					name="firstPageQuestion1" 
					value={inputs.firstPageQuestion1 || ""} 
					onChange={handleChange}></textarea>
				<br />
				<label>What do you want to know? Think of some questions you'd like the story to answer.</label>
				<br/>
				<textarea rows="4" cols="50" id="firstPageQuestions-2"
					type="text" 
					name="firstPageQuestion2" 
					value={inputs.firstPageQuestion2 || ""} 
					onChange={handleChange}></textarea>
				<br />
				<label>What did you not like about it?</label>
				<br/>
				<textarea rows="4" cols="50" id="firstPageQuestions-3"
					type="text" 
					name="firstPageQuestion3" 
					value={inputs.firstPageQuestion3 || ""} 
					onChange={handleChange}></textarea>
				<input type="submit" />
			</form>
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
					if (value.page !== 1) {
						return (
							<Paragraph key={index}
								index={index}
								value={value.paragraph}
								page={value.page} 
								annotate={this.props.annotate}/>
						)
						} else {
							return (
								<FirstQuestions 
								key={index}
								index={index}
								page={value.page}/>
							)
					}
			})}
			</div>
		);
	}
}

export default Story;
export { Paragraph, PageNumber, FirstQuestions };