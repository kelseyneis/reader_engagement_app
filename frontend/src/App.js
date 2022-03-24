// Importing modules
import ReactDOM from 'react-dom';
import React, { useState, useEffect, Component } from "react";
import "./App.css";

function Paragraph(props) {
	return (
		<p className="paragraph visible" onClick={props.onClick}
			page={props.page} style={props.style} index={props.index}>
			{props.value}
		</p>
	)
}

class Story extends Component {
	render() {
		return (
			this.props.paragraphs.map((value, index) => {
				return (
					<Paragraph key={index}
						index={index}
						value={value.paragraph}
						page={value.page} />
				)
			})
		);
	}
}

class Read extends Component {
	constructor(props) {
		super(props);
		this._isMounted = false;
		this.state = {
			paragraphs: [],
			pageNumber: -1,
			story: ""
		};

	}

	handleClick(i) {
		this.setState({
			pageNumber: this.state.pageNumber + 1
		});

	}

	elementsOnPage(page) {
		return document.querySelectorAll(`[page='${page}']`);
	}

	isInBounds(bounding) {
		return (
			bounding.top >= 0 && bounding.left >= 0 && bounding.right <= window.innerWidth
			&& bounding.bottom <= (.95 * window.innerHeight)
		)
	}

	hideParagraphs(paragraphs) {
		for (let i of paragraphs) {
			i.classList.replace('visible', 'hidden');
		}
	}

	updatePage(paragraph, page) {
		//TODO: refactor to get rid of DOM property
		paragraph.setAttribute("page", page)

		const data = [...this.state.paragraphs];
		const index = data.findIndex(obj => obj.index === parseInt(paragraph.getAttribute('index')));
		data[index].page = page;
		this.setState({data});
	}
	
	setFirstPage(page) {
		const prevPage = document.getElementsByClassName('visible');
		this.hideParagraphs(prevPage);
		const paragraphs = this.elementsOnPage(-1);
		if(paragraphs.length === 0 ) { return; }

		for (let i of paragraphs) {
			i.classList.replace('hidden', 'visible');
			let bounding = i.getBoundingClientRect();
			if (this.isInBounds(bounding)) {
				this.updatePage(i, page)
			} else {
				i.classList.replace('visible', 'hidden')
				break;
			}
		}
	}

	showPage(page) {
		const paragraphs = this.elementsOnPage(page);
		for (let i of paragraphs) {
			i.classList.replace('hidden', 'visible');
		}
	}
	
	componentDidMount() {
		this._isMounted = true;

		const fetchStoryText = async () => {
			const ac = new AbortController();
			const story = await fetch(`./stories/schoolmistress.txt`, { signal: ac.signal })
			const storyText = await story.text()
			const storyObjects = storyText.split('\n\n')
				.map((value, index) => {
					return {
						paragraph: value,
						page: -1,
						style: "",
						index: index
					}
				});
			this._isMounted && this.setState({
				paragraphs: storyObjects,
				pageNumber: 0
			})
			this.hideParagraphs(this.elementsOnPage(-1));
			for (let i=0; i < this.state.paragraphs.length; i++) {
				this.setFirstPage(i);
				if (this.elementsOnPage(i).length === 0) { break; }
			}
			this.hideParagraphs(document.getElementsByTagName('p'))
			this.showPage(this.state.pageNumber);

			return () => ac.abort();
		};
		this._isMounted && fetchStoryText();
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		const paragraphs = this.state.paragraphs;

		return (
			<div className="read">
				<div className="reader">
					<Story
						paragraphs={paragraphs}
						onClick={(i) => this.handleClick(i)}
					/>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<Read />, document.getElementById("root"));

export default Read;
