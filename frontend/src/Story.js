// Importing modules
import React, { Component } from "react";
import { ReaderUtils } from "./ReaderUtils";

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

const showFirstQuestions = props => {
   
}

const showLastQuestions = props => {

}

class Story extends Component {
	render() {
		return (
			<div className="story" >
			{
				this.props.paragraphs.map((value, index) => {
					return (
						<Paragraph key={index}
							index={index}
							value={value.paragraph}
							page={value.page} />
					)
			})}
			</div>
		);
	}
}

export default Story;
export { Paragraph, PageNumber, showFirstQuestions, showLastQuestions };