// Importing modules
import React, { Component } from "react";
import "../Reader.css";
import Story, { PageNumber } from "../Story";
import { elementsOnPage, isInBounds, hideParagraphs } from '../readerUtils';

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
		this.setState({ data });
	}

	setPageNumber(page) {
		const paragraphs = elementsOnPage(-1);
		if (page === 1) {
			this.updatePage(document.getElementById("firstQuestions"), page);
			return;
		} else if (paragraphs.length === 0) {
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

	showPage(page, direction) {
		if (page >= 0 && page <= this.state.totalPages) {
			if (page === this.state.totalPages && this.state.annotate) {
				page = page - direction
			}
			hideParagraphs(document.getElementsByClassName('paragraph'));
			if (page === 1 && this.state.annotate) {
				// If the user is annotating, skip page 1 questions
				page = page + direction;
			}
			const paragraphs = elementsOnPage(page);
			for (let i of paragraphs) {
				i.classList.replace('hidden', 'visible');
			}
			if (page === this.state.totalPages && !this.state.annotate) {
				console.log("showing last questions")
				document.getElementById("lastQuestions")
					.classList.replace('hidden', 'visible');
			}

			this.setState({
				pageNumber: page
			})
			window.history.pushState(`${this.state.story}:${page}`, `${this.state.story}`, `/read/${this.state.story}/#${page}`);
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
			const story = await fetch(`../backend/stories/${this.state.story}.txt`, { signal: ac.signal })
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
			}).concat({
				paragraph: "lastQuestions",
				page: 100,
				style: "",
				index: storyObjects.length + 1
			});

			this._isMounted && this.setState({
				paragraphs: storiesWithQuestions,
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
				totalPages: total,
			})

			this.updatePage(document.getElementById("lastQuestions"), this.state.totalPages);

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
		const annotate = this.state.annotate;
		const story = this.state.story;

		return (
			<div className="read">
				<PageNumber
					page={page}
					total={totalPages}
				/>
				<button className={annotate ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"}
					id="annotate" onClick={this.toggleAnnotate} >Toggle highlighting</button>
				<Story
					paragraphs={paragraphs}
					annotate={annotate}
					story={story}
				/>
			</div>
		);
	}
}

export default Reader;
