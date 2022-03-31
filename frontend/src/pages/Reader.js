// Importing modules
import React, { Component } from "react";
import "../Reader.css";
import Story, { PageNumber } from "./Story";
import { elementsOnPage, isInBounds, hideParagraphs } from '../readerUtils';

/**
 * TODO:
 * 3. Log highlights on frontend
 * 5. Add final questions 
 * 7. Select story and pass into Reader state
 * 8. Save highlights to file in backend
 * 9. Save question responses
 * 10. Add login page
 */

class Reader extends Component {
	constructor(props) {
		super(props);
		this._isMounted = false;
		this.state = {
			paragraphs: [],
			pageNumber: -1,
			story: this.props.story,
			totalPages: 0
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
		this.setState({data});
	}
	
	setPageNumber(page) {
		const paragraphs = elementsOnPage(-1);
		if (page === 1) {
			this.updatePage(document.getElementById("firstQuestions"), page);
			return;
		} else if(paragraphs.length === 0) {
			return;
		}

		for (let i of paragraphs) {
			i.classList.replace('hidden', 'visible');
			let bounding = i.getBoundingClientRect();
			if (isInBounds(bounding)) {
				this.updatePage(i, page)
			} else {
				i.classList.replace('visible', 'hidden')
				break;
			}
		}
	}

	showPage(page) {
		if (page >= 0 && page <= this.state.totalPages) {
			hideParagraphs(document.getElementsByClassName('paragraph'));
			const paragraphs = elementsOnPage(page);
				for (let i of paragraphs) {
					i.classList.replace('hidden', 'visible');
				}
				this.setState({
					pageNumber: page
				})
		}
	}
	
	handleKeyUp(e) {
		e.preventDefault();
		this._isMounted = true;
		if (e.keyCode === 39) { // right arrow
			this.showPage(this.state.pageNumber + 1);
		} else if (e.keyCode === 37) { // left arrow
			this.showPage(this.state.pageNumber - 1)
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
			const story = await fetch(`http://localhost:8080/stories/${this.state.story}.txt`, { signal: ac.signal, method: "GET" })
			const storyText = await story.text()
			const storyObjects = storyText.split('\n')
				.map((value, index) => {
					return {
						paragraph: value,
						page: -1,
						style: "",
						index: index
					}
				});
			const storiesWithQuestions = storyObjects.concat({
				paragraph: "firstQuestions",
				page: 1,
				style: "",
				index: storyObjects.length
			})
			this._isMounted && this.setState({
				paragraphs: storiesWithQuestions,
				pageNumber: 0
			})

			// Set up page numbers of paragraphs for pagination
			hideParagraphs(elementsOnPage(-1));
			var total = 0;
			for (let i=0; i < this.state.paragraphs.length; i++) {
				hideParagraphs(document.getElementsByClassName('paragraph'))
				this.setPageNumber(i);
				if (elementsOnPage(i).length === 0) { 
					total = i - 1;
					break;
				}
			}
			// Set total pages
			this._isMounted && this.setState({
				totalPages: total
			})

			// Show first page
			hideParagraphs(document.getElementsByClassName('paragraph'))
			this.showPage(this.state.pageNumber);

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
		const annotate = this.state.annotate;

		return (
			<div className="read">
				<PageNumber
						page={page}
						total={totalPages}
					/>
			<button id="annotate" onClick={this.toggleAnnotate} >Toggle highlighting</button>
				<Story
					paragraphs={paragraphs}
					annotate={annotate}
				/>
				</div>
		);
	}
}

export default Reader;
