// Importing modules
import ReactDOM from 'react-dom';
import React, { useState, useEffect } from "react";
import "./App.css";

function Paragraph(props) {
	return (
		<p className="paragraph" onClick={props.onClick}>
			{props.value}
		</p>
	)
}

function Story(props) {
	const [data, setData] = useState([]);
	useEffect(() => {
		const ac = new AbortController();
		fetch(`./stories/${props.story}.txt`, {signal: ac.signal})
    	.then((res) => {
			return res.text()
		})
		 .then((text) => {
			 setData(text.split('\n\n'));
		 })
      .catch(ex => console.error(ex));
    return () => ac.abort();
	}, [])
	componentDidMount(() => {
		console.log("done!")
	});
	return (
		data.map((paragraph, index) => {
			return (
					<Paragraph key={index}
						value={paragraph}
						page={0} />
			)
		})
	);
}

class Read extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			paragraphs: [],
			pageNumber: 0,
			story: ""
		};
	}

	handleClick(i) {
		this.setState({
			pageNumber: this.state.pageNumber + 1
		});

	}

	render() {
		const paragraphs = this.state.paragraphs;
		const pageNumber = this.state.pageNumber;
		const current_paragraphs = paragraphs.filter(function (par) {
			return par.page === pageNumber;
		});

		return (
			<div className="read">
				<div className="reader">
					<Story
						story="schoolmistress"
						onClick={(i) => this.handleClick(i)}
					/>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<Read />, document.getElementById("root"));

export default Read;
