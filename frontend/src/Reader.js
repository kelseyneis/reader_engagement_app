// Importing modules
import React, { Component } from "react";
import "./Reader.css";
import { Story, PageNumber, showFirstQuestions, showLastQuestions } from "./Story"
import { ReaderUtils } from './ReaderUtils'

/**
 * TODO:
 * 1. Add routing
 * 2. Add highlighting library
 * 3. Log highlights on frontend
 * 4. Add page 1 questions
 * 5. Add final questions 
 * 6. Add instructions page
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
			story: "",
			totalPages: 0
		};

		// Bind stateful functions
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.showPage = this.showPage.bind(this);
		this.updatePage = this.updatePage.bind(this);
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
		const paragraphs = ReaderUtils.elementsOnPage(-1);
		if(paragraphs.length === 0 ) { return; }

		for (let i of paragraphs) {
			i.classList.replace('hidden', 'visible');
			let bounding = i.getBoundingClientRect();
			if (ReaderUtils.isInBounds(bounding)) {
				this.updatePage(i, page)
			} else {
				i.classList.replace('visible', 'hidden')
				break;
			}
		}
	}

	showPage(page) {
		ReaderUtils.hideParagraphs(document.getElementsByTagName('p'));
		if (page === 1) {
			showFirstQuestions();
		} else if (page === this.state.totalPages) {
			//todo: double check index of last page
			showLastQuestions();
		} else if (page >= 0 && page < this.state.totalPages) {
			const paragraphs = ReaderUtils.elementsOnPage(page);
			for (let i of paragraphs) {
				i.classList.replace('hidden', 'visible');
			}
			this.setState({
				pageNumber: page
			})
		}
	}
	
	handleKeyUp(e) {
		this._isMounted = true;
		if (e.keyCode === 39) { // right arrow
			this.showPage(this.state.pageNumber + 1);
		} else if (e.keyCode === 37) { // left arrow
			this.showPage(this.state.pageNumber - 1)
		}
	}

	componentDidMount() {
		this._isMounted = true;

		// Add document/window event listeners
		window.addEventListener("keyup", this.handleKeyUp);

		// Get story from backend and set up pagination
		const fetchStoryText = async () => {
			// Todo: add error handling
			const ac = new AbortController();
			const story = await fetch(`./stories/${this.state.story}`, { signal: ac.signal })
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
			this._isMounted && this.setState({
				paragraphs: storyObjects,
				pageNumber: 0
			})

			// Set up page numbers of paragraphs for pagination
			ReaderUtils.hideParagraphs(ReaderUtils.elementsOnPage(-1));
			var total = 0;
			for (let i=0; i < this.state.paragraphs.length; i++) {
				ReaderUtils.hideParagraphs(document.getElementsByTagName('p'))
				this.setPageNumber(i);
				if (ReaderUtils.elementsOnPage(i).length === 0) { 
					total = i - 1;
					break;
				}
			}
			// Set total pages
			this._isMounted && this.setState({
				totalPages: total
			})

			// Show first page
			ReaderUtils.hideParagraphs(document.getElementsByTagName('p'))
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

	render() {
		const paragraphs = this.state.paragraphs;
		const page = this.state.pageNumber;
		const totalPages = this.state.totalPages;

		return (
			<div className="read">
					<Story
						paragraphs={paragraphs}
					/>
					<PageNumber
						page={page}
						total={totalPages}
					/>
				</div>
		);
	}
}

export default Reader;
