// Importing modules
import React, { Component } from "react";
import { ReaderUtils } from "../readerUtils";

const Paragraph = props => {
	return (
		<p className="paragraph visible" page={props.page} 
		style={props.style} index={props.index}>
			{props.value}
		</p>
	)
}

const PageNumber = props => {
	return (
		<div className="pagenumber">
			{props.page} of {props.total}
		</div>
	)
}

const FirstQuestions = props => {
   return (
		<p className="firstQuestions" 
		id="firstQuestions"
		index={props.index}
		page={props.page}
		style={props.style}>
			First Questions
		</p>
	)
}

const showLastQuestions = props => {

}

class Story extends Component {
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
								page={value.page} />
						)
						} else {
							return (
								<FirstQuestions key={index}
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
export { Paragraph, PageNumber, FirstQuestions, showLastQuestions };