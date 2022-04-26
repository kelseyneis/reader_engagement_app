// Importing modules
import React, { Component } from "react";
import { FirstQuestions, LastQuestions } from './Questions'
import Paragraph from "./Paragraph";
import { BsArrowRightSquare, BsArrowLeftSquare } from "react-icons/bs";

const PageNumber = props => {
	return (
		<div className="pagenumber">
			<BsArrowLeftSquare style={{ margin: "5px" }} title="Left arrow key"></BsArrowLeftSquare>
			{props.page + 1} of {props.total + 1}
			<BsArrowRightSquare style={{ margin: "5px" }} title="Right arrow key"></BsArrowRightSquare>
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
									page={value.page}
									story={this.props.story} />
							)
						} else {
							return (
								<Paragraph key={index}
									index={index}
									value={value.paragraph}
									page={value.page}
									annotate={this.props.annotate}
									tag={[]} />
							)
						}
					})}
			</div>
		);
	}
}

export default Story;
export { PageNumber };