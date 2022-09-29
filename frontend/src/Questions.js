import React, { useState } from "react";
import { Link } from "react-router-dom";

const log = require('console-log-level')({
   prefix: function (level) {
      return new Date().toISOString()
   },
   level: 'info'
})

export const FirstQuestions = props => {
   const [inputs, setInputs] = useState({});
   const [submitted, setSubmitted] = useState("")

   const questions = ['What do you like about the story so far?',
      'What do you want to know?']

   const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({ ...values, [name]: value }))
   }

   const handleSubmit = async ev => {
      ev.preventDefault();
      log.info(inputs)
      setInputs(inputs)
      setSubmitted(true);
      await fetch('/backend/log_questions/1', {
         method: 'POST', body: JSON.stringify(inputs),
         headers: { 'Content-Type': 'application/json' }
      });
   }

   return (
      <div className="paragraph visible"
         id="firstQuestions"
         index={props.index}
         page={props.page}
         style={props.style}>
         <form className="mb-3" onSubmit={handleSubmit}>
            {questions.map((value, index) => {
               return (
                  <div className="firstPageQuestions" key={index}>
                     <label className="form-label">{value}</label>
                     <textarea className="form-control" rows="4" cols="50"
                        id={`firstPageQuestions${index}`}
                        type="text"
                        name={`firstPageQuestions${index}`}
                        value={inputs[`firstPageQuestions${index}`] || ""}
                        onChange={handleChange}></textarea>
                  </div>
               )
            })}
            < button className="btn btn-primary btn-sm" type="submit" > Submit</button>
            {submitted ? <div style={{ color: "green", display: "inline", padding: "10px" }}>Submitted successfully!</div> : ""}
         </form>
      </div >
   )
}

const RadioQuestion = props => {
   return (
      <div className="radio" onChange={props.onChange}>
         <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name={props.name} id={`${props.name}1`} value="1" />
            <label className="form-check-label" htmlFor={`${props.name}1`}>1</label>
         </div>
         <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name={props.name} id={`${props.name}2`} value="2" />
            <label className="form-check-label" htmlFor={`${props.name}2`}>2</label>
         </div>
         <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name={props.name} id={`${props.name}3`} value="3" />
            <label className="form-check-label" htmlFor={`${props.name}3`}>3</label>
         </div>
         <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name={props.name} id={`${props.name}4`} value="4" />
            <label className="form-check-label" htmlFor={`${props.name}4`}>4</label>
         </div>
         <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name={props.name} id={`${props.name}5`} value="5" />
            <label className="form-check-label" htmlFor={`${props.name}5`}>5</label>
         </div>
      </div>
   )
}

export const LastQuestions = props => {
   const [inputs, setInputs] = useState({});
   const [submitted, setSubmitted] = useState("");
   const radioQuestions = ['I was curious about what would happen next.',
      'The story affected me emotionally.',
      'While reading my body was in the room, but my mind was inside the world created by the story.',
      'At times while reading, I wanted to know what the writer\'s intentions were.',
      'While reading, when a main character succeeded, I felt happy, and when they suffered in some way, I felt sad.',
      'The characters were alive in my imagination.',
      'I found my mind wandering while reading the story.',
      'I could vividly imagine the scenes in the story.',
      'At points, I had a hard time making sense of what was going on in the story.'];

   const freeQuestions = ['What did you think of the story overall? Feel free to share any thoughts and impressions you have.'];

   const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({ ...values, [name]: value }));
   }

   const handleSubmit = async ev => {
      ev.preventDefault();
      log.info(inputs);
      setInputs(inputs);
      setSubmitted(true);
      await fetch('/backend/log_questions/2', {
         method: 'POST', body: JSON.stringify(inputs),
         headers: { 'Content-Type': 'application/json' }
      });
      window.history.pushState(`Home`, `Home`, `/`);
   }

   return (
      <div className="paragraph hidden"
         id="lastQuestions"
         index={props.index}
         page={props.page}
         style={props.style}>
         <p>Please answer the following on a scale from 1 (Strongly Disagree) to 5 (Strongly Agree)</p>
         <form className="mb-3" onSubmit={handleSubmit}>
            <ol>
               {radioQuestions.map((value, index) => {
                  return (
                     <li className="radioQuestion" key={`1-${index}`} value={index + 1}>{value}
                        <RadioQuestion index={index}
                           value={inputs[`lastPageQuestionsRadio${index}`]}
                           name={`lastPageQuestionsRadio${index}`}
                           onChange={handleChange} />
                     </li>
                  )
               })}
            </ol>
            <br /><hr />
            {freeQuestions.map((value, index) => {
               return (
                  <div className="freeformQuestion" key={`2-${index}`}>
                     <label className="form-label">{value}</label>
                     <textarea className="form-control" rows="4" cols="50"
                        id={`lastPageQuestionsFreeform${index}`}
                        type="text"
                        name={`lastPageQuestionsFreeform${index}`}
                        value={inputs[`lastPageQuestionsFreeform${index}`] || ""}
                        onChange={handleChange}></textarea>
                  </div>
               )
            })}
            <button className="btn btn-primary btn-sm" type="submit">Submit</button>
            {submitted ? <div style={{ color: "green", display: "inline", padding: "10px" }}>Submitted successfully! Click  <Link to={`/`}>here</Link> to navigate to the other story. If you already read both stories, click <Link to={`/highlight`}>here</Link> see instructions for the highlighting exercise, then select the same story again and click the "Toggle Highlighting" to begin.</div> : ""}
         </form>
      </div>
   )
}