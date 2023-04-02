// Importing modules
import React, { Component } from "react";
import "./Reader.css";
import Story, { PageNumber } from "./Story";
import { elementsOnPage, isInBounds, hideParagraphs } from './readerUtils';

function importAll(r) {
	let images = {};
  r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
	return images
}

const images = importAll(require.context('./background', false, /\.(png|jpe?g|svg)$/));
console.log(images)
class DisplayHighlights extends Component {
	constructor(props) {
		super(props);
		this._isMounted = false;
		this.state = {
			paragraphs: [],
			pageNumber: -1,
			story: this.props.story,
			totalPages: 0,
			participant: this.props.participant,
			key: this.props.key,
			image: images[this.props.pageNumber]
		};

		// Bind stateful functions
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.showPage = this.showPage.bind(this);
		this.updatePage = this.updatePage.bind(this);
		this.toggleAnnotate = this.toggleAnnotate.bind(this);
	}

	updatePage(paragraph, page) {
		//TODO: refactor to get rid of DOM property
		paragraph.setAttribute("page", page)

		// Make a copy of the paragraphs object, modify and replace
		const data = [...this.state.paragraphs];
		const index = data.findIndex(obj => obj.index === parseInt(paragraph.getAttribute('index')));
		data[index].page = page;
		this.setState({ data });
	}

	setPageNumber(page) {
		const paragraphs = elementsOnPage(-1);
		if (paragraphs.length === 0) {
			return;
		}
		let count = 0;

		for (let i of paragraphs) {
			count += 1;
			i.classList.replace('hidden', 'visible');
			let bounding = i.getBoundingClientRect();
			if (isInBounds(bounding) || count === 1) {
				this.updatePage(i, page)
			} else {
				i.classList.replace('visible', 'hidden')
				break;
			}
		}
	}

	showPage = async (page, direction) =>{
		if (page >= 0 && page < this.state.totalPages) {
			if (page === this.state.totalPages && this.state.annotate) {
				page = page - direction
			}
			hideParagraphs(document.getElementsByClassName('paragraph'));
			const paragraphs = elementsOnPage(page);
			for (let i of paragraphs) {
				i.classList.replace('hidden', 'visible');
			}

			this.setState({
				pageNumber: page,
			})
			// var count=0;
			// for (let i of document.getElementsByClassName('visible')) {
			// 	for (let j of i.getElementsByTagName('span')) {
			// 		let bounding_object = j.getBoundingClientRect();
			// 		count++;
			// 		await fetch('/backend/log_highlights', {
			// 			method: 'POST', body: `{"top_left": [${bounding_object.left}, ${bounding_object.top-80}], "bottom_right": [${bounding_object.right}, ${bounding_object.bottom-80}], "page": ${page}}`,
			// 			headers: { 'Content-Type': 'application/json' }
			// 		 });
			// 	}
			// }
			// await fetch('/backend/log_highlights', {
			// 	method: 'POST', body: `{"count": ${count}}`,
			// 	headers: { 'Content-Type': 'application/json' }
			//  });
			window.history.pushState(`${this.state.story}:${page}`, `${this.state.story}`, `/data/${this.state.story}/#${page}`);
		}
	}

	handleKeyUp(e) {
		e.preventDefault();
		this._isMounted = true;
		if (e.keyCode === 39) { // right arrow
			this.showPage(this.state.pageNumber + 1, 1);
		} else if (e.keyCode === 37) { // left arrow
			this.showPage(this.state.pageNumber - 1, -1)
		} else { return; }
	}

	componentDidMount() {
		this._isMounted = true;

		// Add document/window event listeners
		window.addEventListener("keyup", this.handleKeyUp);

		// Get story from backend and set up pagination
		const fetchStoryText = async () => {
			// Todo: add error handling
			const ac = new AbortController();
			const story = await fetch(`../../backend/stories/${this.state.story}.txt`, { signal: ac.signal })
			const highlights = await fetch(`../../backend/highlights/id${this.state.participant}_${this.state.story}_cleaned.log`, { signal: ac.signal })
			const highlight_text = await highlights.text()
			const highlight_obj = highlight_text.split('\n')

			const storyText = await story.text()
			const storyObjects = storyText.split('\n')
				.map((value, index) => {
					return {
						paragraph: value,
						page: -1,
						style: "",
						index: index,
						tag: JSON.parse(highlight_obj[index])
					}
				});

			this._isMounted && this.setState({
				paragraphs: storyObjects,
				pageNumber: 0
			})

			// Set up page numbers of paragraphs for pagination
			hideParagraphs(elementsOnPage(-1));
			var total = 0;
			for (let i = 0; i < this.state.paragraphs.length; i++) {
				hideParagraphs(document.getElementsByClassName('paragraph'))
				this.setPageNumber(i);
				if (elementsOnPage(i).length === 0) {
					total = i;
					break;
				}
			}
			// Set total pages
			this._isMounted && this.setState({
				totalPages: total
			})

			// this.updatePage(document.getElementById("lastQuestions"), this.state.totalPages);

			// Show first page
			hideParagraphs(document.getElementsByClassName('paragraph'))
			this.showPage(this.state.pageNumber, 1);

			// Unsubscribe from async action
			return () => ac.abort();
		};

		this._isMounted && fetchStoryText();
	}

	// Unsubscribe after unmounting component
	componentWillUnmount() {
		this._isMounted = false;
		window.removeEventListener("keyup", this);
	}

	toggleAnnotate() {
		this._isMounted = true;
		this.setState({
			annotate: !this.state.annotate
		})
	}

	render() {
		const paragraphs = this.state.paragraphs;
		const page = this.state.pageNumber;
		const totalPages = this.state.totalPages;
		const annotate = false;
		const story = this.state.story;
		const participant = this.state.participant;
		const img_story = this.state.story === "schoolmistress" ? "schoolmistress" : "el";

		return (
			<div className="read" key={participant}>
				<img src={images[`id${participant}_${img_story}-${page}.png`]} alt="background" className="background" style ={{position: "absolute"}}/>
				<Story
					paragraphs={paragraphs}
					annotate={annotate}
					story={story}
					participant={participant}
				/>
			</div>
		);
	}
}

export default DisplayHighlights;