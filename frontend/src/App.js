// Importing modules
import React, { useState, useEffect } from "react";
import "./App.css";
import { sizePage } from "./utils";

const story = {
	filename: "schoolmistress"
}
function Paragraph(props) {
	return (
		<p className="paragraph" onClick={props.onClick}>
			{props.value}
		</p>
	)
}

class Story extends React.Component {
	renderParagraph(i) {
		const lower = window.pageYOffset + window.innerHeight;
		const visible = i.offsetTop < lower ? "" : "hidden"
	  return (
		<Paragraph
			style={{visibility:visible}}
		  	value={this.props.paragraphs[i]}
		  	onClick={() => this.props.onClick(i)}
		/>
	  );
	}
  
	render() {
	  return (
		<div>
		  {this.props.paragraphs}
		</div>
	  );
	}
  }
// function Story(props) {
// 	const [data, setData] = useState([]);
// 	const loadData = async () => {
// 	  const res = await fetch(`./stories/${props.story}.txt`);
// 	  setData( (await res.text()).split('\n'));

// 	};  useEffect(() => {
// 	  loadData();
// 	  return () => {};
// 	}, [props]);
// 	return (data.map((paragraph, index) => (
// 						<p key={index}>
// 							  {paragraph}
// 						</p>
// 						)
// 					)
// 			)
//   }
  


  export default function App() {
	return (
	  <div id="story">
		<Story story={story.filename} />
	  </div>
	);
  }